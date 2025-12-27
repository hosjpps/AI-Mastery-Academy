import { createClient } from '@/lib/supabase/server'
import { notFound, redirect } from 'next/navigation'
import { QuestContent } from './quest-content'

type Props = {
  params: Promise<{ slug: string }>
}

export default async function QuestPage({ params }: Props) {
  const { slug } = await params
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  // Fetch quest
  const { data: quest } = await supabase
    .from('quests')
    .select('*')
    .eq('slug', slug)
    .eq('is_published', true)
    .single()

  if (!quest) {
    notFound()
  }

  // Fetch subtrack info
  const { data: subtrackData } = quest.subtrack_id
    ? await supabase
        .from('subtracks')
        .select('id, title, icon, track_id')
        .eq('id', quest.subtrack_id)
        .single()
    : { data: null }

  // Fetch track info if subtrack exists
  const { data: trackData } = subtrackData?.track_id
    ? await supabase
        .from('tracks')
        .select('id, title, icon')
        .eq('id', subtrackData.track_id)
        .single()
    : { data: null }

  const subtrack = subtrackData
    ? {
        id: subtrackData.id,
        title: subtrackData.title,
        icon: subtrackData.icon,
        tracks: trackData,
      }
    : null

  // Fetch user progress for this quest
  const { data: userProgress } = await supabase
    .from('user_progress')
    .select('*')
    .eq('user_id', user.id)
    .eq('quest_id', quest.id)
    .maybeSingle()

  // Fetch next quest in sequence
  const { data: nextQuest } = quest.subtrack_id
    ? await supabase
        .from('quests')
        .select('slug, title')
        .eq('subtrack_id', quest.subtrack_id)
        .eq('is_published', true)
        .gt('order_index', quest.order_index || 0)
        .order('order_index')
        .limit(1)
        .maybeSingle()
    : { data: null }

  // Fetch previous quest
  const { data: prevQuest } = quest.subtrack_id
    ? await supabase
        .from('quests')
        .select('slug, title')
        .eq('subtrack_id', quest.subtrack_id)
        .eq('is_published', true)
        .lt('order_index', quest.order_index || 0)
        .order('order_index', { ascending: false })
        .limit(1)
        .maybeSingle()
    : { data: null }

  return (
    <QuestContent
      quest={quest}
      subtrack={subtrack}
      userProgress={userProgress}
      nextQuest={nextQuest}
      prevQuest={prevQuest}
      userId={user.id}
    />
  )
}
