const OPENROUTER_API_URL = 'https://openrouter.ai/api/v1'

export const MODELS = {
  // High quality - for evaluation and complex tasks
  CLAUDE_SONNET: 'anthropic/claude-3.5-sonnet',

  // Cost-effective - for hints, simple chat, classification
  GPT_4O_MINI: 'openai/gpt-4o-mini',
} as const

export type ModelId = typeof MODELS[keyof typeof MODELS]

interface ChatMessage {
  role: 'system' | 'user' | 'assistant'
  content: string
}

interface ChatCompletionOptions {
  model?: ModelId
  temperature?: number
  maxTokens?: number
  stream?: boolean
}

export async function chatCompletion(
  messages: ChatMessage[],
  options: ChatCompletionOptions = {}
) {
  const {
    model = MODELS.GPT_4O_MINI,
    temperature = 0.7,
    maxTokens = 2048,
    stream = false,
  } = options

  const response = await fetch(`${OPENROUTER_API_URL}/chat/completions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
      'HTTP-Referer': process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
      'X-Title': 'AI Mastery Academy',
    },
    body: JSON.stringify({
      model,
      messages,
      temperature,
      max_tokens: maxTokens,
      stream,
    }),
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.error?.message || 'OpenRouter API error')
  }

  if (stream) {
    return response
  }

  const data = await response.json()
  return data.choices[0].message.content
}

// Convenience functions for different use cases
export async function evaluateSubmission(
  submission: string,
  questContext: string
): Promise<string> {
  const messages: ChatMessage[] = [
    {
      role: 'system',
      content: `You are an expert AI evaluator for AI Mastery Academy.

Evaluate the user's submission for the following quest:
${questContext}

Return a JSON object with:
- score (0-100)
- passed (boolean, true if score >= 60)
- feedback (constructive feedback paragraph)
- strengths (array of strengths)
- improvements (array of improvements)`,
    },
    {
      role: 'user',
      content: submission,
    },
  ]

  return chatCompletion(messages, {
    model: MODELS.CLAUDE_SONNET,
    temperature: 0.3,
  })
}

export async function generateHint(
  questContext: string,
  userAttempt: string,
  hintLevel: 1 | 2 | 3 = 1
): Promise<string> {
  const hintInstructions = {
    1: 'Give a subtle hint - ask a guiding question without revealing the answer.',
    2: 'Give a moderate hint - point to the specific technique or concept needed.',
    3: 'Give a direct hint - show a partial example or structure of the solution.',
  }

  const messages: ChatMessage[] = [
    {
      role: 'system',
      content: `You are a helpful AI tutor for AI Mastery Academy.

Quest: ${questContext}
Hint level: ${hintLevel}

${hintInstructions[hintLevel]}

Keep your response concise and encouraging.`,
    },
    {
      role: 'user',
      content: `I'm stuck. Here's what I tried: ${userAttempt}`,
    },
  ]

  return chatCompletion(messages, {
    model: MODELS.GPT_4O_MINI,
    temperature: 0.7,
    maxTokens: 500,
  })
}
