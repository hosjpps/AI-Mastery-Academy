'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { MessageCircle, X, Send, Loader2, Sparkles, Bot, User, Lightbulb, BookOpen, Code2, History } from 'lucide-react'
import { cn } from '@/lib/utils'

type Message = {
  role: 'user' | 'assistant'
  content: string
}

type QuestContext = {
  slug: string
  title: string
  description?: string
}

type AICoachWidgetProps = {
  questContext?: QuestContext
}

export function AICoachWidget({ questContext }: AICoachWidgetProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [sessionId, setSessionId] = useState<string | null>(null)
  const [showHistory, setShowHistory] = useState(false)
  const [sessions, setSessions] = useState<{ id: string; created_at: string; preview: string }[]>([])
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const sendMessage = useCallback(async (customMessage?: string, actionType?: string) => {
    const messageText = customMessage || input.trim()
    if (!messageText || loading) return

    if (!customMessage) setInput('')
    setMessages(prev => [...prev, { role: 'user', content: messageText }])
    setLoading(true)
    setShowHistory(false)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: messageText,
          sessionId,
          questSlug: questContext?.slug,
          actionType
        })
      })

      if (!response.ok) {
        throw new Error('Failed to send message')
      }

      const data = await response.json()
      setMessages(prev => [...prev, { role: 'assistant', content: data.response }])

      if (data.sessionId && !sessionId) {
        setSessionId(data.sessionId)
      }
    } catch (error) {
      console.error('Chat error:', error)
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again.'
      }])
    } finally {
      setLoading(false)
    }
  }, [input, loading, sessionId, questContext?.slug])

  // Quick action handlers
  const handleQuickAction = (action: 'hint' | 'explain' | 'example') => {
    const messages: Record<string, string> = {
      hint: questContext
        ? `Give me a hint for the "${questContext.title}" quest`
        : "Can you give me a hint?",
      explain: questContext
        ? `Explain the concepts in "${questContext.title}"`
        : "Can you explain this concept?",
      example: questContext
        ? `Show me an example related to "${questContext.title}"`
        : "Can you show me an example?"
    }
    sendMessage(messages[action], action)
  }

  // Load chat sessions for history
  const loadSessions = async () => {
    try {
      const response = await fetch('/api/chat/sessions')
      if (response.ok) {
        const data = await response.json()
        setSessions(data.sessions || [])
      }
    } catch {
      console.error('Failed to load sessions')
    }
  }

  // Load a previous session
  const loadSession = async (id: string) => {
    try {
      const response = await fetch(`/api/chat/sessions/${id}`)
      if (response.ok) {
        const data = await response.json()
        setMessages(data.messages || [])
        setSessionId(id)
        setShowHistory(false)
      }
    } catch {
      console.error('Failed to load session')
    }
  }

  // Start new chat
  const startNewChat = () => {
    setMessages([])
    setSessionId(null)
    setShowHistory(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-20 right-4 lg:bottom-6 lg:right-6 h-14 w-14 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 shadow-lg shadow-violet-500/25 z-50"
      >
        <MessageCircle className="h-6 w-6" />
      </Button>
    )
  }

  return (
    <Card className="fixed bottom-20 right-4 lg:bottom-6 lg:right-6 w-[calc(100vw-2rem)] sm:w-96 h-[500px] border-zinc-800 bg-zinc-900/95 backdrop-blur shadow-xl z-50 flex flex-col">
      {/* Header */}
      <CardHeader className="pb-3 border-b border-zinc-800 shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <CardTitle className="text-white text-base">AI Coach</CardTitle>
              <p className="text-xs text-zinc-500">
                {questContext ? `Helping with: ${questContext.title}` : 'Here to help you learn'}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                setShowHistory(!showHistory)
                if (!showHistory) loadSessions()
              }}
              className="text-zinc-400 hover:text-white h-8 w-8"
              title="Chat history"
            >
              <History className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="text-zinc-400 hover:text-white h-8 w-8"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </CardHeader>

      {/* Messages */}
      <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* History Panel */}
        {showHistory && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-medium text-white text-sm">Chat History</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={startNewChat}
                className="text-violet-400 hover:text-violet-300 text-xs h-7"
              >
                New Chat
              </Button>
            </div>
            {sessions.length === 0 ? (
              <p className="text-sm text-zinc-500 text-center py-4">No previous chats</p>
            ) : (
              <div className="space-y-2">
                {sessions.map((session) => (
                  <button
                    key={session.id}
                    onClick={() => loadSession(session.id)}
                    className={cn(
                      "w-full text-left p-3 rounded-lg transition-colors",
                      session.id === sessionId
                        ? "bg-violet-500/20 border border-violet-500/30"
                        : "bg-zinc-800/50 hover:bg-zinc-800"
                    )}
                  >
                    <p className="text-sm text-zinc-300 truncate">{session.preview}</p>
                    <p className="text-xs text-zinc-500 mt-1">
                      {new Date(session.created_at).toLocaleDateString()}
                    </p>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Empty state with suggestions */}
        {messages.length === 0 && !showHistory && (
          <div className="h-full flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 rounded-full bg-violet-500/10 flex items-center justify-center mb-4">
              <Bot className="w-8 h-8 text-violet-400" />
            </div>
            <h3 className="font-medium text-white mb-2">How can I help you today?</h3>
            <p className="text-sm text-zinc-400 max-w-[250px]">
              {questContext
                ? `I can help you with "${questContext.title}". Ask me anything!`
                : 'Ask me anything about AI, prompts, or your learning journey!'}
            </p>

            {/* Quick Actions for Quest Context */}
            {questContext && (
              <div className="flex gap-2 mt-4 w-full">
                <button
                  onClick={() => handleQuickAction('hint')}
                  className="flex-1 flex items-center justify-center gap-2 text-sm p-2.5 rounded-lg bg-amber-500/10 text-amber-400 hover:bg-amber-500/20 transition-colors border border-amber-500/20"
                >
                  <Lightbulb className="w-4 h-4" />
                  Hint
                </button>
                <button
                  onClick={() => handleQuickAction('explain')}
                  className="flex-1 flex items-center justify-center gap-2 text-sm p-2.5 rounded-lg bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 transition-colors border border-blue-500/20"
                >
                  <BookOpen className="w-4 h-4" />
                  Explain
                </button>
                <button
                  onClick={() => handleQuickAction('example')}
                  className="flex-1 flex items-center justify-center gap-2 text-sm p-2.5 rounded-lg bg-green-500/10 text-green-400 hover:bg-green-500/20 transition-colors border border-green-500/20"
                >
                  <Code2 className="w-4 h-4" />
                  Example
                </button>
              </div>
            )}

            {/* Dynamic Suggestions */}
            <div className="grid gap-2 mt-4 w-full">
              {(questContext
                ? [
                    `What should I focus on in "${questContext.title}"?`,
                    "What are the key concepts here?",
                    "How do I approach this practice task?"
                  ]
                : [
                    "What is prompt engineering?",
                    "How do I improve my prompts?",
                    "What should I learn first?"
                  ]
              ).map((suggestion) => (
                <button
                  key={suggestion}
                  onClick={() => sendMessage(suggestion)}
                  className="text-left text-sm p-3 rounded-lg bg-zinc-800/50 text-zinc-300 hover:bg-zinc-800 transition-colors"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        )}

        {!showHistory && messages.map((message, index) => (
          <div
            key={index}
            className={cn(
              'flex gap-3',
              message.role === 'user' ? 'justify-end' : 'justify-start'
            )}
          >
            {message.role === 'assistant' && (
              <div className="w-8 h-8 rounded-full bg-violet-500/20 flex items-center justify-center shrink-0">
                <Bot className="w-4 h-4 text-violet-400" />
              </div>
            )}

            <div
              className={cn(
                'max-w-[80%] rounded-2xl px-4 py-2',
                message.role === 'user'
                  ? 'bg-violet-600 text-white rounded-br-md'
                  : 'bg-zinc-800 text-zinc-200 rounded-bl-md'
              )}
            >
              <p className="text-sm whitespace-pre-wrap">{message.content}</p>
            </div>

            {message.role === 'user' && (
              <div className="w-8 h-8 rounded-full bg-zinc-700 flex items-center justify-center shrink-0">
                <User className="w-4 h-4 text-zinc-300" />
              </div>
            )}
          </div>
        ))}

        {!showHistory && loading && (
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-violet-500/20 flex items-center justify-center shrink-0">
              <Bot className="w-4 h-4 text-violet-400" />
            </div>
            <div className="bg-zinc-800 rounded-2xl rounded-bl-md px-4 py-3">
              <div className="flex gap-1">
                <span className="w-2 h-2 bg-zinc-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-2 h-2 bg-zinc-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-2 h-2 bg-zinc-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </CardContent>

      {/* Input */}
      <div className="p-4 border-t border-zinc-800 shrink-0 space-y-3">
        {/* Quick Actions (when in conversation with quest context) */}
        {questContext && messages.length > 0 && !showHistory && (
          <div className="flex gap-2">
            <button
              onClick={() => handleQuickAction('hint')}
              disabled={loading}
              className="flex-1 flex items-center justify-center gap-1.5 text-xs py-1.5 rounded-md bg-amber-500/10 text-amber-400 hover:bg-amber-500/20 transition-colors border border-amber-500/20 disabled:opacity-50"
            >
              <Lightbulb className="w-3 h-3" />
              Hint
            </button>
            <button
              onClick={() => handleQuickAction('explain')}
              disabled={loading}
              className="flex-1 flex items-center justify-center gap-1.5 text-xs py-1.5 rounded-md bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 transition-colors border border-blue-500/20 disabled:opacity-50"
            >
              <BookOpen className="w-3 h-3" />
              Explain
            </button>
            <button
              onClick={() => handleQuickAction('example')}
              disabled={loading}
              className="flex-1 flex items-center justify-center gap-1.5 text-xs py-1.5 rounded-md bg-green-500/10 text-green-400 hover:bg-green-500/20 transition-colors border border-green-500/20 disabled:opacity-50"
            >
              <Code2 className="w-3 h-3" />
              Example
            </button>
          </div>
        )}

        <div className="flex gap-2">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={questContext ? `Ask about "${questContext.title}"...` : "Ask me anything..."}
            className="min-h-[44px] max-h-[120px] bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500 resize-none"
            rows={1}
          />
          <Button
            onClick={() => sendMessage()}
            disabled={!input.trim() || loading}
            className="bg-violet-600 hover:bg-violet-500 shrink-0"
          >
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>
    </Card>
  )
}
