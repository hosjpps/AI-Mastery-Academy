'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Calendar, CheckCircle2, Clock, Flame, Loader2, Sparkles, Target, Zap } from 'lucide-react'

type DailyChallengeData = {
  quest: {
    id: string
    slug: string
    title: string
    description: string | null
    xp_reward: number
    estimated_minutes: number | null
    difficulty: string
    subtracks: {
      title: string
      tracks: {
        title: string
        icon: string
      } | null
    } | null
  }
  isCompleted: boolean
  hasActivityToday: boolean
  bonusXP: number
  date: string
}

export function DailyChallenge() {
  const [data, setData] = useState<DailyChallengeData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchChallenge() {
      try {
        const response = await fetch('/api/daily-challenge')
        if (response.ok) {
          const result = await response.json()
          setData(result)
        } else {
          setError('Could not load daily challenge')
        }
      } catch {
        setError('Could not load daily challenge')
      } finally {
        setLoading(false)
      }
    }

    fetchChallenge()
  }, [])

  if (loading) {
    return (
      <Card className="border-zinc-800 bg-gradient-to-br from-violet-900/20 to-indigo-900/20">
        <CardContent className="p-6 flex items-center justify-center">
          <Loader2 className="w-6 h-6 text-violet-400 animate-spin" />
        </CardContent>
      </Card>
    )
  }

  if (error || !data) {
    return null
  }

  const { quest, isCompleted, bonusXP } = data

  return (
    <Card className="border-violet-500/30 bg-gradient-to-br from-violet-900/20 to-indigo-900/20 overflow-hidden">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-violet-500/20 flex items-center justify-center">
              <Calendar className="w-4 h-4 text-violet-400" />
            </div>
            <CardTitle className="text-white text-base">Daily Challenge</CardTitle>
          </div>
          {isCompleted ? (
            <Badge className="bg-green-500/10 text-green-400 border-green-500/20">
              <CheckCircle2 className="w-3 h-3 mr-1" />
              Completed
            </Badge>
          ) : (
            <Badge className="bg-orange-500/10 text-orange-400 border-orange-500/20">
              <Flame className="w-3 h-3 mr-1" />
              +{bonusXP} Bonus XP
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-4">
          {/* Quest Info */}
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-violet-500/10 flex items-center justify-center flex-shrink-0">
              <Target className="w-5 h-5 text-violet-400" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-medium text-white truncate">{quest.title}</h3>
              <p className="text-sm text-zinc-400 line-clamp-2">{quest.description}</p>
            </div>
          </div>

          {/* Meta */}
          <div className="flex items-center gap-3 text-xs">
            <span className="flex items-center gap-1 text-violet-400">
              <Zap className="w-3 h-3" />
              {quest.xp_reward} XP
            </span>
            {bonusXP > 0 && !isCompleted && (
              <span className="flex items-center gap-1 text-orange-400">
                <Sparkles className="w-3 h-3" />
                +{bonusXP} bonus
              </span>
            )}
            {quest.estimated_minutes && (
              <span className="flex items-center gap-1 text-zinc-500">
                <Clock className="w-3 h-3" />
                {quest.estimated_minutes} min
              </span>
            )}
          </div>

          {/* CTA */}
          <Link href={`/quest/${quest.slug}`}>
            <Button
              className={`w-full ${
                isCompleted
                  ? 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
                  : 'bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white'
              }`}
              size="sm"
            >
              {isCompleted ? 'Review Quest' : 'Start Challenge'}
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
