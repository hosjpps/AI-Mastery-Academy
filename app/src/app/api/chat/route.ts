import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY

const BASE_SYSTEM_PROMPT = `You are an AI learning coach for AI Mastery Academy, a gamified platform teaching AI skills.

## Your Role
- Guide users through their learning journey
- Answer questions about AI concepts and tools
- Provide hints when users are stuck on quests
- Encourage and motivate learners
- Use the Socratic method - ask questions instead of giving direct answers

## Guidelines
1. Be encouraging but not patronizing
2. Keep responses concise (2-3 paragraphs max)
3. If user is stuck, ask clarifying questions first
4. Never give complete solutions for practice quests
5. Use markdown formatting for code and lists
6. Celebrate wins!

## Boundaries
- Only discuss topics related to AI, learning, and the platform
- Don't help with anything unethical or harmful
- Redirect off-topic questions politely`

type QuestContent = {
  theory?: string
  practice?: {
    instructions: string
    hints?: string[]
    examples?: string[]
  }
}

type QuestContext = {
  id: string
  title: string
  description: string | null
  content: QuestContent | null
  difficulty: string | null
  xp_reward: number | null
  subtrack_title?: string
  track_title?: string
}

type UserProfile = {
  level: number
  xp: number
  learning_style: string | null
  career_track: string | null
  current_streak: number
  display_name: string | null
}

type UserProgress = {
  status: string
  started_at: string | null
  completed_at: string | null
}

type Message = {
  role: 'user' | 'assistant' | 'system'
  content: string
}

function buildSystemPrompt(
  profile: UserProfile | null,
  quest: QuestContext | null,
  progress: UserProgress | null,
  actionType?: string
): string {
  let prompt = BASE_SYSTEM_PROMPT

  // Add learning style adaptations
  if (profile?.learning_style) {
    prompt += `\n\n## Teaching Style Adaptation
Adapt your explanations for a ${profile.learning_style} learner:`

    switch (profile.learning_style) {
      case 'visual':
        prompt += `
- Use diagrams, comparisons, and visual metaphors
- Structure information clearly with bullets and headers
- Describe how things "look" or can be visualized`
        break
      case 'auditory':
        prompt += `
- Use storytelling and conversational explanations
- Explain step-by-step as if talking through it
- Use rhythm and memorable phrases`
        break
      case 'kinesthetic':
        prompt += `
- Focus on hands-on practice and experiments
- Encourage "try this" and interactive exploration
- Connect concepts to physical actions or real tasks`
        break
    }
  }

  // Add user context
  if (profile) {
    prompt += `\n\n## User Context
- Name: ${profile.display_name || 'Learner'}
- Level: ${profile.level || 1} (${profile.xp || 0} XP)
- Learning style: ${profile.learning_style || 'not specified'}
- Career goal: ${profile.career_track || 'not specified'}
- Current streak: ${profile.current_streak || 0} days`
  }

  // Add quest context if available
  if (quest) {
    prompt += `\n\n## Current Quest
The user is currently working on this quest:
- **Quest:** ${quest.title}
- **Description:** ${quest.description || 'No description'}
- **Track:** ${quest.track_title || 'Unknown'} > ${quest.subtrack_title || 'Unknown'}
- **Difficulty:** ${quest.difficulty || 'beginner'}
- **XP Reward:** ${quest.xp_reward || 0} XP`

    if (progress) {
      prompt += `\n- **User's Status:** ${progress.status}${progress.started_at ? ` (started)` : ''}`
    }

    // Add quest content summary for context (truncated for token limits)
    if (quest.content?.theory) {
      const theorySummary = quest.content.theory.slice(0, 500)
      prompt += `\n\n### Quest Theory (Summary)
${theorySummary}${quest.content.theory.length > 500 ? '...' : ''}`
    }

    if (quest.content?.practice?.instructions) {
      const practiceSummary = quest.content.practice.instructions.slice(0, 300)
      prompt += `\n\n### Quest Practice Task
${practiceSummary}${quest.content.practice.instructions.length > 300 ? '...' : ''}`
    }
  }

  // Add action-specific guidance
  if (actionType) {
    prompt += `\n\n## User's Request Type: ${actionType.toUpperCase()}`

    switch (actionType) {
      case 'hint':
        prompt += `
The user is asking for a hint. Follow these rules:
- Give a subtle hint that points them in the right direction
- Ask a guiding question to help them think
- Do NOT give the complete answer
- Encourage them to try`
        break
      case 'explain':
        prompt += `
The user wants an explanation. Follow these rules:
- Explain the concept clearly using their learning style
- Use examples relevant to their career track
- Keep it educational but concise`
        break
      case 'example':
        prompt += `
The user wants to see an example. Follow these rules:
- Provide a practical, relevant example
- Show both good and bad versions if applicable
- Explain why the example works
- Do NOT solve their practice task directly`
        break
    }
  }

  return prompt
}

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { message, sessionId, questSlug, actionType } = await request.json()

    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      )
    }

    // Get user profile for context
    const { data: profile } = await supabase
      .from('profiles')
      .select('level, xp, learning_style, career_track, current_streak, display_name')
      .eq('id', user.id)
      .single() as { data: UserProfile | null }

    // Get quest context if questSlug provided
    let quest: QuestContext | null = null
    let progress: UserProgress | null = null

    if (questSlug) {
      const { data: questData } = await supabase
        .from('quests')
        .select('id, title, description, content, difficulty, xp_reward, subtrack_id')
        .eq('slug', questSlug)
        .single()

      if (questData) {
        let subtrackTitle: string | undefined
        let trackTitle: string | undefined

        // Fetch subtrack and track info if available
        if (questData.subtrack_id) {
          const { data: subtrackData } = await supabase
            .from('subtracks')
            .select('title, track_id')
            .eq('id', questData.subtrack_id)
            .single()

          if (subtrackData) {
            subtrackTitle = subtrackData.title
            if (subtrackData.track_id) {
              const { data: trackData } = await supabase
                .from('tracks')
                .select('title')
                .eq('id', subtrackData.track_id)
                .single()
              trackTitle = trackData?.title
            }
          }
        }

        quest = {
          id: questData.id,
          title: questData.title,
          description: questData.description,
          content: questData.content as QuestContent | null,
          difficulty: questData.difficulty,
          xp_reward: questData.xp_reward,
          subtrack_title: subtrackTitle,
          track_title: trackTitle
        }

        // Get user's progress on this quest
        const { data: progressData } = await supabase
          .from('user_progress')
          .select('status, started_at, completed_at')
          .eq('user_id', user.id)
          .eq('quest_id', questData.id)
          .maybeSingle()

        if (progressData) {
          progress = progressData as UserProgress
        }
      }
    }

    // Build context-aware system prompt
    const contextPrompt = buildSystemPrompt(profile, quest, progress, actionType)

    // Get chat history if session exists
    let messages: Message[] = [{ role: 'system', content: contextPrompt }]

    if (sessionId) {
      const { data: history } = await supabase
        .from('chat_messages')
        .select('role, content')
        .eq('session_id', sessionId)
        .order('created_at', { ascending: true })
        .limit(20)

      if (history) {
        messages = [
          ...messages,
          ...history.map(m => ({ role: m.role as 'user' | 'assistant', content: m.content }))
        ]
      }
    }

    // Add new user message
    messages.push({ role: 'user', content: message })

    // Check if OpenRouter API key is configured
    if (!OPENROUTER_API_KEY) {
      // Return mock response for development
      const mockResponse = getMockResponse(message)

      // Save to database
      let currentSessionId = sessionId
      if (!currentSessionId) {
        const { data: newSession } = await supabase
          .from('chat_sessions')
          .insert({ user_id: user.id })
          .select('id')
          .single()
        currentSessionId = newSession?.id
      }

      if (currentSessionId) {
        await supabase.from('chat_messages').insert([
          { session_id: currentSessionId, role: 'user', content: message },
          { session_id: currentSessionId, role: 'assistant', content: mockResponse }
        ])
      }

      return NextResponse.json({
        response: mockResponse,
        sessionId: currentSessionId
      })
    }

    // Call OpenRouter API
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
        'X-Title': 'AI Mastery Academy'
      },
      body: JSON.stringify({
        model: 'openai/gpt-4o-mini',
        messages,
        max_tokens: 500,
        temperature: 0.7
      })
    })

    if (!response.ok) {
      const error = await response.text()
      console.error('OpenRouter error:', error)
      return NextResponse.json(
        { error: 'Failed to get AI response' },
        { status: 500 }
      )
    }

    const data = await response.json()
    const assistantMessage = data.choices[0]?.message?.content || 'Sorry, I could not generate a response.'

    // Save to database
    let currentSessionId = sessionId
    if (!currentSessionId) {
      const { data: newSession } = await supabase
        .from('chat_sessions')
        .insert({ user_id: user.id })
        .select('id')
        .single()
      currentSessionId = newSession?.id
    }

    if (currentSessionId) {
      await supabase.from('chat_messages').insert([
        { session_id: currentSessionId, role: 'user', content: message },
        { session_id: currentSessionId, role: 'assistant', content: assistantMessage }
      ])
    }

    return NextResponse.json({
      response: assistantMessage,
      sessionId: currentSessionId
    })

  } catch (error) {
    console.error('Chat API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

function getMockResponse(message: string): string {
  const lowerMessage = message.toLowerCase()

  if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('привет')) {
    return "Hello! I'm your AI Coach. I'm here to help you on your journey to mastering AI skills. What would you like to learn about today?"
  }

  if (lowerMessage.includes('help') || lowerMessage.includes('stuck') || lowerMessage.includes('помощь')) {
    return "I'm here to help! Can you tell me more about what you're working on? What specific challenge are you facing? The more details you share, the better I can guide you."
  }

  if (lowerMessage.includes('prompt') || lowerMessage.includes('промпт')) {
    return "Great question about prompts! A good prompt should be clear, specific, and provide context. Think about: What do you want the AI to do? What format should the output be in? What constraints or guidelines should it follow?\n\nWould you like me to review a prompt you're working on?"
  }

  if (lowerMessage.includes('chatgpt') || lowerMessage.includes('gpt') || lowerMessage.includes('claude')) {
    return "Different AI models have their own strengths! GPT-4 is versatile and great for general tasks. Claude excels at nuanced conversations and longer content. For your learning journey, understanding how to work with multiple models will make you more versatile.\n\nWhat specific task are you trying to accomplish?"
  }

  return "That's a great question! To give you the best guidance, could you tell me more about:\n\n1. What you're trying to learn or accomplish?\n2. What have you already tried?\n3. Where specifically are you feeling stuck?\n\nI'm here to guide you through your AI learning journey! 🚀"
}
