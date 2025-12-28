import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const supabase = await createClient()

    // Get current user
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const today = new Date().toISOString().split('T')[0]

    // Get user's completed quests
    const { data: completedQuests } = await supabase
      .from('user_progress')
      .select('quest_id')
      .eq('user_id', user.id)
      .eq('status', 'completed')

    const completedIds = (completedQuests || []).map(p => p.quest_id)

    // Check if user already completed today's challenge
    const { data: todayActivity } = await supabase
      .from('daily_activity')
      .select('*')
      .eq('user_id', user.id)
      .eq('activity_date', today)
      .maybeSingle()

    // Get all published quests
    const { data: allQuests, error: questsError } = await supabase
      .from('quests')
      .select(`
        *,
        subtracks (
          title,
          tracks (
            title,
            icon
          )
        )
      `)
      .eq('is_published', true)
      .order('order_index')

    if (questsError || !allQuests || allQuests.length === 0) {
      return NextResponse.json({ error: 'No quests available' }, { status: 404 })
    }

    // Use date as seed for consistent daily selection
    const seed = parseInt(today.replace(/-/g, ''))

    // Filter to incomplete quests if possible
    const incompleteQuests = allQuests.filter(q => !completedIds.includes(q.id))
    const questPool = incompleteQuests.length > 0 ? incompleteQuests : allQuests

    // Select today's quest based on date seed
    const index = seed % questPool.length
    const dailyQuest = questPool[index]

    // Check if this specific quest is already completed
    const isQuestCompleted = completedIds.includes(dailyQuest.id)

    // Bonus XP for daily challenge
    const bonusXP = isQuestCompleted ? 25 : 50 // Less bonus if re-doing a quest

    return NextResponse.json({
      quest: dailyQuest,
      isCompleted: isQuestCompleted,
      hasActivityToday: !!todayActivity,
      bonusXP,
      date: today
    })
  } catch (error) {
    console.error('Daily challenge error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
