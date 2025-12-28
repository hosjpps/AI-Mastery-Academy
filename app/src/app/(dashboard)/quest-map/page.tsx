import { createClient } from '@/lib/supabase/server'
import { unstable_cache } from 'next/cache'
import { QuestMapClient } from './quest-map-client'

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

// Cache static content for 1 hour (tracks, subtracks, quests rarely change)
const getCachedQuestData = unstable_cache(
  async () => {
    const supabase = await createClient()

    const [tracksRes, subtracksRes, questsRes] = await Promise.all([
      supabase.from('tracks').select('*').order('order_index'),
      supabase.from('subtracks').select('*').order('order_index'),
      supabase.from('quests').select('*').eq('is_published', true).order('order_index'),
    ])

    return {
      tracks: (tracksRes.data as Track[]) || [],
      subtracks: (subtracksRes.data as Subtrack[]) || [],
      quests: (questsRes.data as Quest[]) || [],
    }
  },
  ['quest-map-data'],
  {
    revalidate: 3600, // Cache for 1 hour
    tags: ['quest-data'],
  }
)

export default async function QuestMapPage() {
  const supabase = await createClient()

  // Get cached static data
  const { tracks, subtracks, quests } = await getCachedQuestData()

  // Get fresh user progress (this changes frequently)
  const { data: { user } } = await supabase.auth.getUser()

  let userProgress: UserProgress[] = []
  if (user) {
    const { data } = await supabase
      .from('user_progress')
      .select('quest_id, status, completed_at, xp_earned')
      .eq('user_id', user.id)

    userProgress = (data as UserProgress[]) || []
  }

  return (
    <QuestMapClient
      tracks={tracks}
      subtracks={subtracks}
      quests={quests}
      userProgress={userProgress}
    />
  )
}
