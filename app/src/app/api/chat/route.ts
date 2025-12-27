import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY

const SYSTEM_PROMPT = `You are an AI learning coach for AI Mastery Academy, a gamified platform teaching AI skills.

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

type Message = {
  role: 'user' | 'assistant' | 'system'
  content: string
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

    const { message, sessionId } = await request.json()

    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      )
    }

    // Get user profile for context
    const { data: profile } = await supabase
      .from('profiles')
      .select('level, learning_style, career_track, current_streak')
      .eq('id', user.id)
      .single()

    // Build context-aware system prompt
    let contextPrompt = SYSTEM_PROMPT
    if (profile) {
      contextPrompt += `\n\n## User Context
- User level: ${profile.level || 1}
- Learning style: ${profile.learning_style || 'not specified'}
- Career track: ${profile.career_track || 'not specified'}
- Current streak: ${profile.current_streak || 0} days`
    }

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
