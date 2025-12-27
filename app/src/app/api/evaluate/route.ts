import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY

type EvaluationRequest = {
  questId: string
  questTitle: string
  questDescription: string
  practiceInstructions: string
  submission: string
  difficulty: string
}

const EVALUATION_SYSTEM_PROMPT = `You are an expert AI learning evaluator for AI Mastery Academy. Your job is to evaluate student submissions for AI-related learning quests.

## Evaluation Criteria
1. **Understanding** (0-30): Does the submission demonstrate understanding of the core concepts?
2. **Application** (0-30): Did the student correctly apply what they learned?
3. **Completeness** (0-20): Did they address all parts of the task?
4. **Quality** (0-20): Is the work well-structured and clear?

## Guidelines
- Be encouraging but honest
- Provide specific, actionable feedback
- Highlight what they did well first
- Suggest concrete improvements
- Keep feedback concise (2-3 paragraphs)
- Use a friendly, supportive tone
- Adjust expectations based on difficulty level

## Response Format
You MUST respond with ONLY valid JSON in this exact format:
{
  "score": <number 0-100>,
  "feedback": "<your feedback as a single string>"
}

Do not include any text before or after the JSON.`

function getEvaluationPrompt(data: EvaluationRequest): string {
  return `Evaluate this submission for an AI learning quest.

## Quest Information
- **Title**: ${data.questTitle}
- **Description**: ${data.questDescription}
- **Difficulty**: ${data.difficulty}
- **Practice Instructions**: ${data.practiceInstructions}

## Student Submission
${data.submission}

## Your Task
Evaluate the submission and provide a score (0-100) and constructive feedback. Consider the difficulty level when scoring - be more lenient with beginner quests.

Remember to respond with ONLY valid JSON: {"score": <number>, "feedback": "<string>"}`
}

function getMockEvaluation(submission: string): { score: number; feedback: string } {
  const length = submission.length
  const hasStructure = submission.includes('\n') || submission.includes('.')
  const hasDetail = length > 100

  let baseScore = 70
  if (hasStructure) baseScore += 10
  if (hasDetail) baseScore += 10
  if (length > 200) baseScore += 5

  const score = Math.min(95, Math.max(65, baseScore + Math.floor(Math.random() * 10) - 5))

  const feedbacks = {
    excellent: "Excellent work! You've demonstrated a strong understanding of the concepts. Your response is well-structured and shows you've thought carefully about the material. To take it even further, consider exploring how these concepts apply in real-world scenarios.",
    good: "Good job! You've shown a solid grasp of the key concepts. Your submission addresses the main points of the exercise. To improve further, try adding more specific examples or diving deeper into the reasoning behind your approach.",
    developing: "Nice start! You're on the right track with your understanding. To strengthen your submission, try to be more specific with your examples and elaborate on your thought process. Remember, the more detail you provide, the better you can demonstrate your learning."
  }

  let feedback: string
  if (score >= 85) {
    feedback = feedbacks.excellent
  } else if (score >= 75) {
    feedback = feedbacks.good
  } else {
    feedback = feedbacks.developing
  }

  return { score, feedback }
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

    const body: EvaluationRequest = await request.json()

    if (!body.submission || !body.questId) {
      return NextResponse.json(
        { error: 'Submission and questId are required' },
        { status: 400 }
      )
    }

    // If no API key, return mock evaluation
    if (!OPENROUTER_API_KEY) {
      console.log('No OPENROUTER_API_KEY - using mock evaluation')
      const mockResult = getMockEvaluation(body.submission)
      return NextResponse.json(mockResult)
    }

    // Call OpenRouter API for real evaluation
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
        'X-Title': 'AI Mastery Academy - Evaluation'
      },
      body: JSON.stringify({
        model: 'openai/gpt-4o-mini',
        messages: [
          { role: 'system', content: EVALUATION_SYSTEM_PROMPT },
          { role: 'user', content: getEvaluationPrompt(body) }
        ],
        max_tokens: 500,
        temperature: 0.3 // Lower temperature for more consistent evaluations
      })
    })

    if (!response.ok) {
      const error = await response.text()
      console.error('OpenRouter evaluation error:', error)
      // Fallback to mock on API error
      const mockResult = getMockEvaluation(body.submission)
      return NextResponse.json(mockResult)
    }

    const data = await response.json()
    const content = data.choices[0]?.message?.content || ''

    // Parse JSON response
    try {
      // Try to extract JSON from the response
      const jsonMatch = content.match(/\{[\s\S]*\}/)
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0])
        if (typeof parsed.score === 'number' && typeof parsed.feedback === 'string') {
          // Ensure score is within bounds
          const score = Math.min(100, Math.max(0, Math.round(parsed.score)))
          return NextResponse.json({
            score,
            feedback: parsed.feedback
          })
        }
      }
      throw new Error('Invalid response format')
    } catch {
      console.error('Failed to parse evaluation response:', content)
      // Fallback to mock on parse error
      const mockResult = getMockEvaluation(body.submission)
      return NextResponse.json(mockResult)
    }

  } catch (error) {
    console.error('Evaluation API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
