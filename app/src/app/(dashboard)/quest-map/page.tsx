'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Button } from '@/components/ui/button'
import { ChevronDown, ChevronRight, Lock, CheckCircle2, Circle, PlayCircle, Sparkles } from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

type Track = {
  id: string
  slug: string
  title: string
  description: string | null
  icon: string | null
  order_index: number | null
  is_locked: boolean | null
}

type Subtrack = {
  id: string
  slug: string
  title: string
  description: string | null
  icon: string | null
  order_index: number | null
  is_locked: boolean | null
  track_id: string | null
}

type Quest = {
  id: string
  slug: string
  title: string
  description: string | null
  difficulty: string
  quest_type: string
  xp_reward: number | null
  estimated_minutes: number | null
  subtrack_id: string | null
  order_index: number | null
  is_published: boolean | null
}

type UserProgress = {
  quest_id: string | null
  status: string
  completed_at: string | null
  xp_earned: number | null
}

export default function QuestMapPage() {
  const [tracks, setTracks] = useState<Track[]>([])
  const [subtracks, setSubtracks] = useState<Subtrack[]>([])
  const [quests, setQuests] = useState<Quest[]>([])
  const [userProgress, setUserProgress] = useState<UserProgress[]>([])
  const [expandedTracks, setExpandedTracks] = useState<Set<string>>(new Set())
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadData() {
      const supabase = createClient()

      const { data: { user } } = await supabase.auth.getUser()

      const [tracksRes, subtracksRes, questsRes, progressRes] = await Promise.all([
        supabase.from('tracks').select('*').order('order_index'),
        supabase.from('subtracks').select('*').order('order_index'),
        supabase.from('quests').select('*').eq('is_published', true).order('order_index'),
        user
          ? supabase.from('user_progress').select('quest_id, status, completed_at, xp_earned').eq('user_id', user.id)
          : Promise.resolve({ data: [] })
      ])

      setTracks((tracksRes.data as Track[]) || [])
      setSubtracks((subtracksRes.data as Subtrack[]) || [])
      setQuests((questsRes.data as Quest[]) || [])
      setUserProgress((progressRes.data as UserProgress[]) || [])

      // Auto-expand first track
      if (tracksRes.data && tracksRes.data.length > 0) {
        setExpandedTracks(new Set([tracksRes.data[0].id]))
      }

      setLoading(false)
    }

    loadData()
  }, [])

  const toggleTrack = (trackId: string) => {
    setExpandedTracks(prev => {
      const next = new Set(prev)
      if (next.has(trackId)) {
        next.delete(trackId)
      } else {
        next.add(trackId)
      }
      return next
    })
  }

  const getQuestStatus = (questId: string): 'completed' | 'in_progress' | 'not_started' | 'locked' => {
    const progress = userProgress.find(p => p.quest_id === questId)
    if (progress) {
      if (progress.status === 'completed') return 'completed'
      if (progress.status === 'in_progress') return 'in_progress'
    }
    return 'not_started'
  }

  const getSubtrackProgress = (subtrackId: string) => {
    const subtrackQuests = quests.filter(q => q.subtrack_id === subtrackId)
    const completed = subtrackQuests.filter(q => getQuestStatus(q.id) === 'completed').length
    return {
      completed,
      total: subtrackQuests.length,
      percentage: subtrackQuests.length > 0 ? (completed / subtrackQuests.length) * 100 : 0
    }
  }

  const getTrackProgress = (trackId: string) => {
    const trackSubtracks = subtracks.filter(s => s.track_id === trackId)
    const trackQuests = quests.filter(q =>
      trackSubtracks.some(s => s.id === q.subtrack_id)
    )
    const completed = trackQuests.filter(q => getQuestStatus(q.id) === 'completed').length
    return {
      completed,
      total: trackQuests.length,
      percentage: trackQuests.length > 0 ? (completed / trackQuests.length) * 100 : 0
    }
  }

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
      case 'theory': return '📚'
      case 'practice': return '💻'
      case 'project': return '🚀'
      case 'quiz': return '❓'
      default: return '📝'
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-violet-500" />
      </div>
    )
  }

  return (
    <div className="space-y-6 pb-20 lg:pb-0">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">Quest Map</h1>
        <p className="text-zinc-400 mt-1">Your journey to AI mastery</p>
      </div>

      {/* Tracks */}
      <div className="space-y-4">
        {tracks.map((track) => {
          const isExpanded = expandedTracks.has(track.id)
          const trackProgress = getTrackProgress(track.id)
          const trackSubtracks = subtracks.filter(s => s.track_id === track.id)

          return (
            <Card key={track.id} className="border-zinc-800 bg-zinc-900/50 overflow-hidden">
              {/* Track Header */}
              <button
                onClick={() => toggleTrack(track.id)}
                className="w-full text-left"
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500/20 to-indigo-500/20 flex items-center justify-center text-2xl">
                        {track.icon || '🎯'}
                      </div>
                      <div>
                        <CardTitle className="text-white text-lg flex items-center gap-2">
                          {track.title}
                          {track.is_locked && <Lock className="w-4 h-4 text-zinc-500" />}
                        </CardTitle>
                        <CardDescription className="text-sm">
                          {trackProgress.completed}/{trackProgress.total} quests completed
                        </CardDescription>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="hidden sm:block w-32">
                        <Progress value={trackProgress.percentage} className="h-2" />
                      </div>
                      <Badge variant="secondary" className="bg-violet-500/10 text-violet-400 border-violet-500/20">
                        {Math.round(trackProgress.percentage)}%
                      </Badge>
                      {isExpanded ? (
                        <ChevronDown className="w-5 h-5 text-zinc-400" />
                      ) : (
                        <ChevronRight className="w-5 h-5 text-zinc-400" />
                      )}
                    </div>
                  </div>
                </CardHeader>
              </button>

              {/* Subtracks and Quests */}
              {isExpanded && (
                <CardContent className="pt-0 space-y-6">
                  {trackSubtracks.map((subtrack) => {
                    const subtrackProgress = getSubtrackProgress(subtrack.id)
                    const subtrackQuests = quests.filter(q => q.subtrack_id === subtrack.id)

                    return (
                      <div key={subtrack.id} className="space-y-3">
                        {/* Subtrack Header */}
                        <div className="flex items-center justify-between px-2">
                          <div className="flex items-center gap-2">
                            <span className="text-lg">{subtrack.icon || '📁'}</span>
                            <h3 className="font-medium text-white">{subtrack.title}</h3>
                            {subtrack.is_locked && <Lock className="w-3 h-3 text-zinc-500" />}
                          </div>
                          <span className="text-xs text-zinc-500">
                            {subtrackProgress.completed}/{subtrackProgress.total}
                          </span>
                        </div>

                        {/* Quest Path */}
                        <div className="relative">
                          {/* Connection Line */}
                          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-zinc-800" />

                          {/* Quests */}
                          <div className="space-y-2">
                            {subtrackQuests.map((quest, idx) => {
                              const status = getQuestStatus(quest.id)
                              const isLast = idx === subtrackQuests.length - 1

                              return (
                                <Link
                                  key={quest.id}
                                  href={status === 'locked' ? '#' : `/quest/${quest.slug}`}
                                  className={cn(
                                    'relative flex items-center gap-4 p-3 rounded-lg transition-all',
                                    status === 'locked'
                                      ? 'opacity-50 cursor-not-allowed'
                                      : 'hover:bg-zinc-800/50 cursor-pointer'
                                  )}
                                >
                                  {/* Status Icon */}
                                  <div className={cn(
                                    'relative z-10 w-8 h-8 rounded-full flex items-center justify-center',
                                    status === 'completed' && 'bg-green-500/20',
                                    status === 'in_progress' && 'bg-violet-500/20',
                                    status === 'not_started' && 'bg-zinc-800',
                                    status === 'locked' && 'bg-zinc-800/50'
                                  )}>
                                    {status === 'completed' && <CheckCircle2 className="w-5 h-5 text-green-400" />}
                                    {status === 'in_progress' && <PlayCircle className="w-5 h-5 text-violet-400" />}
                                    {status === 'not_started' && <Circle className="w-5 h-5 text-zinc-500" />}
                                    {status === 'locked' && <Lock className="w-4 h-4 text-zinc-600" />}
                                  </div>

                                  {/* Quest Info */}
                                  <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2">
                                      <span className="text-sm">{getQuestTypeIcon(quest.quest_type)}</span>
                                      <h4 className="font-medium text-white truncate">{quest.title}</h4>
                                    </div>
                                    {quest.description && (
                                      <p className="text-sm text-zinc-400 truncate">{quest.description}</p>
                                    )}
                                  </div>

                                  {/* Quest Meta */}
                                  <div className="flex items-center gap-2 shrink-0">
                                    <Badge className={getDifficultyColor(quest.difficulty)}>
                                      {quest.difficulty}
                                    </Badge>
                                    <Badge className="bg-green-500/10 text-green-400 border-green-500/20">
                                      +{quest.xp_reward || 0} XP
                                    </Badge>
                                    {quest.estimated_minutes && (
                                      <span className="text-xs text-zinc-500 hidden sm:inline">
                                        {quest.estimated_minutes} min
                                      </span>
                                    )}
                                  </div>
                                </Link>
                              )
                            })}
                          </div>
                        </div>
                      </div>
                    )
                  })}

                  {trackSubtracks.length === 0 && (
                    <div className="text-center py-8 text-zinc-500">
                      <Sparkles className="w-8 h-8 mx-auto mb-2 opacity-50" />
                      <p>Coming soon!</p>
                    </div>
                  )}
                </CardContent>
              )}
            </Card>
          )
        })}

        {tracks.length === 0 && (
          <Card className="border-zinc-800 bg-zinc-900/50">
            <CardContent className="py-12 text-center">
              <Sparkles className="w-12 h-12 mx-auto mb-4 text-violet-400 opacity-50" />
              <h3 className="text-lg font-medium text-white mb-2">No tracks available yet</h3>
              <p className="text-zinc-400">Check back soon for new learning content!</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
