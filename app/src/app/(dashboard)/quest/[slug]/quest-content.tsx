'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { useQuestStore } from '@/stores/questStore'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Progress } from '@/components/ui/progress'
import {
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  Award,
  BookOpen,
  CheckCircle2,
  Clock,
  Flame,
  Lightbulb,
  Loader2,
  PlayCircle,
  Send,
  Sparkles,
  Target,
  Trophy,
  Zap
} from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { completeQuestWithGamification } from '@/lib/gamification'

type Quest = {
  id: string
  slug: string
  title: string
  description: string | null
  difficulty: string
  quest_type: string
  xp_reward: number | null
  estimated_minutes: number | null
  content: unknown
  subtrack_id: string | null
  order_index: number | null
}

type Subtrack = {
  id: string
  title: string
  icon: string | null
  tracks: {
    id: string
    title: string
    icon: string | null
  } | null
} | null

type UserProgress = {
  id: string
  status: string
  started_at: string | null
  completed_at: string | null
  xp_earned: number | null
  submission_data: unknown
  ai_feedback: unknown
} | null

type NavQuest = {
  slug: string
  title: string
} | null

type QuestContentData = {
  theory?: string
  practice?: {
    instructions: string
    hints?: string[]
    examples?: string[]
  }
  quiz?: {
    questions: Array<{
      question: string
      options: string[]
      correct: number
    }>
  }
}

type Props = {
  quest: Quest
  subtrack: Subtrack
  userProgress: UserProgress
  nextQuest: NavQuest
  prevQuest: NavQuest
  userId: string
}

export function QuestContent({ quest, subtrack, userProgress, nextQuest, prevQuest, userId }: Props) {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<'theory' | 'practice'>('theory')
  const [submission, setSubmission] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [showHints, setShowHints] = useState(false)
  const [feedback, setFeedback] = useState<{ score: number; feedback: string } | null>(
    userProgress?.ai_feedback as { score: number; feedback: string } | null
  )
  const [gamificationResult, setGamificationResult] = useState<{
    xpEarned: number
    xpBonus: number
    streakMultiplier: number
    newStreak: number
    leveledUp: boolean
    newLevel: number
    newBadges: string[]
  } | null>(null)

  const content = quest.content as QuestContentData | null
  const isCompleted = userProgress?.status === 'completed'
  const isInProgress = userProgress?.status === 'in_progress'

  // Set quest context for AI Coach
  const setCurrentQuest = useQuestStore((state) => state.setCurrentQuest)
  const clearCurrentQuest = useQuestStore((state) => state.clearCurrentQuest)

  useEffect(() => {
    setCurrentQuest({
      slug: quest.slug,
      title: quest.title,
      description: quest.description || undefined
    })

    return () => {
      clearCurrentQuest()
    }
  }, [quest.slug, quest.title, quest.description, setCurrentQuest, clearCurrentQuest])

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-500/10 text-green-400 border-green-500/20'
      case 'intermediate': return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'
      case 'advanced': return 'bg-orange-500/10 text-orange-400 border-orange-500/20'
      case 'expert': return 'bg-red-500/10 text-red-400 border-red-500/20'
      default: return 'bg-zinc-500/10 text-zinc-400 border-zinc-500/20'
    }
  }

  const getQuestTypeIcon = (questType: string) => {
    switch (questType) {
      case 'theory': return <BookOpen className="w-5 h-5" />
      case 'practice': return <Target className="w-5 h-5" />
      case 'project': return <Sparkles className="w-5 h-5" />
      case 'quiz': return <Lightbulb className="w-5 h-5" />
      default: return <BookOpen className="w-5 h-5" />
    }
  }

  const startQuest = async () => {
    const supabase = createClient()

    // Check if progress exists
    const { data: existing } = await supabase
      .from('user_progress')
      .select('id')
      .eq('user_id', userId)
      .eq('quest_id', quest.id)
      .maybeSingle()

    if (existing) {
      await supabase
        .from('user_progress')
        .update({
          status: 'in_progress',
          started_at: new Date().toISOString(),
        })
        .eq('id', existing.id)
    } else {
      await supabase.from('user_progress').insert({
        user_id: userId,
        quest_id: quest.id,
        status: 'in_progress',
        started_at: new Date().toISOString(),
      })
    }

    router.refresh()
  }

  const submitQuest = async () => {
    if (!submission.trim()) return

    setSubmitting(true)
    const supabase = createClient()

    try {
      // Get AI evaluation from the API
      const practiceContent = content?.practice
      const evaluationResponse = await fetch('/api/evaluate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          questId: quest.id,
          questTitle: quest.title,
          questDescription: quest.description || '',
          practiceInstructions: practiceContent?.instructions || '',
          submission: submission,
          difficulty: quest.difficulty
        })
      })

      let aiFeedback: { score: number; feedback: string }

      if (evaluationResponse.ok) {
        aiFeedback = await evaluationResponse.json()
      } else {
        // Fallback if API fails
        aiFeedback = {
          score: 75,
          feedback: "Great effort! Your submission has been recorded. Keep practicing to improve your AI skills."
        }
      }

      // Use gamification system for quest completion
      const result = await completeQuestWithGamification(
        supabase,
        userId,
        quest.id,
        quest.xp_reward || 0,
        { type: 'text', data: { text: submission } },
        aiFeedback
      )

      setFeedback(aiFeedback)
      setGamificationResult(result)
      router.refresh()
    } catch (error) {
      console.error('Error submitting quest:', error)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-20 lg:pb-0">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-zinc-400">
        <Link href="/quest-map" className="hover:text-white transition-colors">
          Quest Map
        </Link>
        {subtrack && (
          <>
            <span>/</span>
            <span>{subtrack.tracks?.title}</span>
            <span>/</span>
            <span>{subtrack.title}</span>
          </>
        )}
      </div>

      {/* Quest Header */}
      <Card className="border-zinc-800 bg-zinc-900/50">
        <CardHeader>
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-lg bg-violet-500/10 flex items-center justify-center text-violet-400">
                  {getQuestTypeIcon(quest.quest_type)}
                </div>
                <div>
                  <CardTitle className="text-xl text-white">{quest.title}</CardTitle>
                  <CardDescription>{quest.description}</CardDescription>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-end gap-2">
              {isCompleted && (
                <Badge className="bg-green-500/10 text-green-400 border-green-500/20">
                  <CheckCircle2 className="w-3 h-3 mr-1" />
                  Completed
                </Badge>
              )}
              {isInProgress && !isCompleted && (
                <Badge className="bg-violet-500/10 text-violet-400 border-violet-500/20">
                  <PlayCircle className="w-3 h-3 mr-1" />
                  In Progress
                </Badge>
              )}
            </div>
          </div>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-3 pt-4">
            <Badge className={getDifficultyColor(quest.difficulty)}>
              {quest.difficulty}
            </Badge>
            <Badge className="bg-green-500/10 text-green-400 border-green-500/20">
              <Zap className="w-3 h-3 mr-1" />
              +{quest.xp_reward || 0} XP
            </Badge>
            {quest.estimated_minutes && (
              <Badge variant="secondary" className="bg-zinc-800 text-zinc-300">
                <Clock className="w-3 h-3 mr-1" />
                {quest.estimated_minutes} min
              </Badge>
            )}
          </div>
        </CardHeader>
      </Card>

      {/* Content Tabs */}
      {content && (content.theory || content.practice) && (
        <div className="flex gap-2">
          {content.theory && (
            <Button
              variant={activeTab === 'theory' ? 'default' : 'ghost'}
              onClick={() => setActiveTab('theory')}
              className={cn(
                activeTab === 'theory'
                  ? 'bg-violet-600 hover:bg-violet-500'
                  : 'text-zinc-400 hover:text-white'
              )}
            >
              <BookOpen className="w-4 h-4 mr-2" />
              Theory
            </Button>
          )}
          {content.practice && (
            <Button
              variant={activeTab === 'practice' ? 'default' : 'ghost'}
              onClick={() => setActiveTab('practice')}
              className={cn(
                activeTab === 'practice'
                  ? 'bg-violet-600 hover:bg-violet-500'
                  : 'text-zinc-400 hover:text-white'
              )}
            >
              <Target className="w-4 h-4 mr-2" />
              Practice
            </Button>
          )}
        </div>
      )}

      {/* Theory Content */}
      {activeTab === 'theory' && content?.theory && (
        <Card className="border-zinc-800 bg-zinc-900/50">
          <CardContent className="p-6">
            <div className="prose prose-invert prose-zinc max-w-none">
              <div dangerouslySetInnerHTML={{ __html: content.theory }} />
            </div>
          </CardContent>
        </Card>
      )}

      {/* Practice Content */}
      {activeTab === 'practice' && content?.practice && (
        <div className="space-y-4">
          <Card className="border-zinc-800 bg-zinc-900/50">
            <CardHeader>
              <CardTitle className="text-lg text-white">Instructions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose prose-invert prose-zinc max-w-none">
                <div dangerouslySetInnerHTML={{ __html: content.practice.instructions }} />
              </div>

              {/* Hints */}
              {content.practice.hints && content.practice.hints.length > 0 && (
                <div className="mt-6">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowHints(!showHints)}
                    className="text-yellow-400 hover:text-yellow-300"
                  >
                    <Lightbulb className="w-4 h-4 mr-2" />
                    {showHints ? 'Hide Hints' : 'Show Hints'}
                  </Button>

                  {showHints && (
                    <ul className="mt-3 space-y-2">
                      {content.practice.hints.map((hint, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-zinc-400">
                          <span className="text-yellow-400">💡</span>
                          {hint}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      {/* Start/Submit Section */}
      {!isCompleted && (
        <Card className="border-zinc-800 bg-zinc-900/50">
          <CardContent className="p-6">
            {!isInProgress && !userProgress ? (
              <div className="text-center">
                <Button
                  onClick={startQuest}
                  size="lg"
                  className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500"
                >
                  <PlayCircle className="w-5 h-5 mr-2" />
                  Start Quest
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Your Response
                  </label>
                  <Textarea
                    value={submission}
                    onChange={(e) => setSubmission(e.target.value)}
                    placeholder="Share what you've learned or your solution..."
                    className="min-h-[150px] bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500"
                  />
                </div>

                <div className="flex justify-end">
                  <Button
                    onClick={submitQuest}
                    disabled={!submission.trim() || submitting}
                    className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500"
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Evaluating...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        Submit for Review
                      </>
                    )}
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Feedback Section */}
      {feedback && (
        <Card className="border-green-500/20 bg-green-500/5">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg text-white flex items-center gap-2">
                <Trophy className="w-5 h-5 text-yellow-400" />
                Quest Complete!
              </CardTitle>
              <Badge className="bg-green-500/10 text-green-400 border-green-500/20 text-lg px-3 py-1">
                {feedback.score}/100
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Progress value={feedback.score} className="h-2" />
              <p className="text-zinc-300">{feedback.feedback}</p>

              {/* XP Earned with Streak Bonus */}
              <div className="p-4 rounded-lg bg-violet-500/10 border border-violet-500/20 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Zap className="w-5 h-5 text-violet-400" />
                    <span className="text-violet-300">XP Earned</span>
                  </div>
                  <span className="text-xl font-bold text-violet-300">
                    +{gamificationResult?.xpEarned || quest.xp_reward || 0}
                  </span>
                </div>

                {/* Streak Bonus */}
                {gamificationResult && gamificationResult.xpBonus > 0 && (
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2 text-orange-400">
                      <Flame className="w-4 h-4" />
                      <span>{gamificationResult.newStreak}-day streak bonus ({Math.round((gamificationResult.streakMultiplier - 1) * 100)}%)</span>
                    </div>
                    <span className="text-orange-400">+{gamificationResult.xpBonus}</span>
                  </div>
                )}

                {/* Current Streak */}
                {gamificationResult && gamificationResult.newStreak > 1 && (
                  <div className="flex items-center gap-2 pt-2 border-t border-violet-500/20">
                    <Flame className="w-5 h-5 text-orange-400" />
                    <span className="text-zinc-300">
                      {gamificationResult.newStreak} day streak!
                    </span>
                  </div>
                )}
              </div>

              {/* Level Up */}
              {gamificationResult?.leveledUp && (
                <div className="p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-yellow-500/20 flex items-center justify-center">
                      <ArrowUp className="w-6 h-6 text-yellow-400" />
                    </div>
                    <div>
                      <h4 className="font-bold text-yellow-400">Level Up!</h4>
                      <p className="text-zinc-300">You reached <strong>Level {gamificationResult.newLevel}</strong></p>
                    </div>
                  </div>
                </div>
              )}

              {/* New Badges */}
              {gamificationResult?.newBadges && gamificationResult.newBadges.length > 0 && (
                <div className="p-4 rounded-lg bg-indigo-500/10 border border-indigo-500/20">
                  <div className="flex items-center gap-2 mb-3">
                    <Award className="w-5 h-5 text-indigo-400" />
                    <span className="font-semibold text-indigo-400">New Badge{gamificationResult.newBadges.length > 1 ? 's' : ''} Earned!</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {gamificationResult.newBadges.map((badge) => (
                      <Badge key={badge} className="bg-indigo-500/20 text-indigo-300 border-indigo-500/30">
                        {badge.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Navigation */}
      <div className="flex items-center justify-between">
        {prevQuest ? (
          <Link href={`/quest/${prevQuest.slug}`}>
            <Button variant="ghost" className="text-zinc-400 hover:text-white">
              <ArrowLeft className="w-4 h-4 mr-2" />
              {prevQuest.title}
            </Button>
          </Link>
        ) : (
          <div />
        )}

        {nextQuest ? (
          <Link href={`/quest/${nextQuest.slug}`}>
            <Button
              className={cn(
                isCompleted
                  ? 'bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500'
                  : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700'
              )}
            >
              {nextQuest.title}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        ) : (
          <Link href="/quest-map">
            <Button className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500">
              Back to Quest Map
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        )}
      </div>
    </div>
  )
}
