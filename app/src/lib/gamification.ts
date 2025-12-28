import { SupabaseClient } from '@supabase/supabase-js'

// XP thresholds for each level
export const XP_THRESHOLDS = [0, 100, 250, 500, 1000, 2000, 4000, 8000, 16000, 32000]

// Streak multipliers
export const STREAK_MULTIPLIERS: Record<number, number> = {
  3: 1.25,   // 3+ days = 25% bonus
  7: 1.5,   // 7+ days = 50% bonus
  14: 1.75, // 14+ days = 75% bonus
  30: 2.0,  // 30+ days = 100% bonus
}

// Badge definitions with their requirements
export const BADGE_REQUIREMENTS = {
  'first-quest': { type: 'quests_completed', value: 1 },
  'streak-7': { type: 'streak', value: 7 },
  'streak-30': { type: 'streak', value: 30 },
  'level-5': { type: 'level', value: 5 },
  'level-10': { type: 'level', value: 10 },
  'xp-1000': { type: 'xp', value: 1000 },
  'xp-5000': { type: 'xp', value: 5000 },
}

/**
 * Calculate level from XP
 */
export function calculateLevel(xp: number): number {
  for (let i = XP_THRESHOLDS.length - 1; i >= 0; i--) {
    if (xp >= XP_THRESHOLDS[i]) {
      return i + 1
    }
  }
  return 1
}

/**
 * Get streak multiplier based on current streak
 */
export function getStreakMultiplier(streak: number): number {
  let multiplier = 1.0
  for (const [days, mult] of Object.entries(STREAK_MULTIPLIERS)) {
    if (streak >= parseInt(days)) {
      multiplier = mult
    }
  }
  return multiplier
}

/**
 * Calculate XP with streak bonus
 */
export function calculateXPWithBonus(baseXP: number, streak: number): { total: number; bonus: number; multiplier: number } {
  const multiplier = getStreakMultiplier(streak)
  const total = Math.round(baseXP * multiplier)
  const bonus = total - baseXP
  return { total, bonus, multiplier }
}

/**
 * Update user streak on activity
 * Returns: { newStreak, streakLost, isNewDay }
 */
export async function updateStreak(
  supabase: SupabaseClient,
  userId: string
): Promise<{ newStreak: number; longestStreak: number; streakLost: boolean; isNewDay: boolean }> {
  // Get current profile
  const { data: profile, error } = await supabase
    .from('profiles')
    .select('current_streak, longest_streak, last_activity_date')
    .eq('id', userId)
    .single()

  if (error || !profile) {
    return { newStreak: 1, longestStreak: 1, streakLost: false, isNewDay: true }
  }

  const today = new Date().toISOString().split('T')[0]
  const lastActivity = profile.last_activity_date

  // Already active today
  if (lastActivity === today) {
    return {
      newStreak: profile.current_streak,
      longestStreak: profile.longest_streak,
      streakLost: false,
      isNewDay: false
    }
  }

  let newStreak = 1
  let streakLost = false

  if (lastActivity) {
    const lastDate = new Date(lastActivity)
    const todayDate = new Date(today)
    const diffDays = Math.floor((todayDate.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24))

    if (diffDays === 1) {
      // Consecutive day - increase streak
      newStreak = profile.current_streak + 1
    } else if (diffDays > 1) {
      // Streak broken
      newStreak = 1
      streakLost = profile.current_streak > 0
    }
  }

  const longestStreak = Math.max(newStreak, profile.longest_streak || 0)

  // Update profile
  await supabase
    .from('profiles')
    .update({
      current_streak: newStreak,
      longest_streak: longestStreak,
      last_activity_date: today
    })
    .eq('id', userId)

  return { newStreak, longestStreak, streakLost, isNewDay: true }
}

/**
 * Check and award badges based on user stats
 * Returns array of newly awarded badge slugs
 */
export async function checkAndAwardBadges(
  supabase: SupabaseClient,
  userId: string,
  stats: {
    questsCompleted: number
    currentStreak: number
    level: number
    totalXP: number
  }
): Promise<string[]> {
  // Get all badges and user's existing badges
  const [{ data: allBadges }, { data: userBadges }] = await Promise.all([
    supabase.from('badges').select('id, slug, requirements'),
    supabase.from('user_badges').select('badge_id').eq('user_id', userId)
  ])

  if (!allBadges) return []

  const existingBadgeIds = new Set((userBadges || []).map(ub => ub.badge_id))
  const newlyEarnedBadges: string[] = []

  for (const badge of allBadges) {
    // Skip if already earned
    if (existingBadgeIds.has(badge.id)) continue

    const req = badge.requirements as { type: string; value: number } | null
    if (!req) continue

    let earned = false

    switch (req.type) {
      case 'quests_completed':
        earned = stats.questsCompleted >= req.value
        break
      case 'streak':
        earned = stats.currentStreak >= req.value
        break
      case 'level':
        earned = stats.level >= req.value
        break
      case 'xp':
        earned = stats.totalXP >= req.value
        break
    }

    if (earned) {
      // Award badge
      const { error } = await supabase.from('user_badges').insert({
        user_id: userId,
        badge_id: badge.id
      })

      if (!error) {
        newlyEarnedBadges.push(badge.slug)
      }
    }
  }

  return newlyEarnedBadges
}

/**
 * Record daily activity
 */
export async function recordDailyActivity(
  supabase: SupabaseClient,
  userId: string,
  xpEarned: number,
  questsCompleted: number = 1
): Promise<void> {
  const today = new Date().toISOString().split('T')[0]

  // Try to update existing record, or insert new one
  const { data: existing } = await supabase
    .from('daily_activity')
    .select('id, xp_earned, quests_completed')
    .eq('user_id', userId)
    .eq('activity_date', today)
    .maybeSingle()

  if (existing) {
    await supabase
      .from('daily_activity')
      .update({
        xp_earned: (existing.xp_earned || 0) + xpEarned,
        quests_completed: (existing.quests_completed || 0) + questsCompleted
      })
      .eq('id', existing.id)
  } else {
    await supabase.from('daily_activity').insert({
      user_id: userId,
      activity_date: today,
      xp_earned: xpEarned,
      quests_completed: questsCompleted
    })
  }
}

/**
 * Get user's total quests completed
 */
export async function getQuestsCompletedCount(
  supabase: SupabaseClient,
  userId: string
): Promise<number> {
  const { count } = await supabase
    .from('user_progress')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', userId)
    .eq('status', 'completed')

  return count || 0
}

/**
 * Complete quest with full gamification
 * This is the main function to call when a quest is completed
 */
export async function completeQuestWithGamification(
  supabase: SupabaseClient,
  userId: string,
  questId: string,
  baseXP: number,
  submission: { type: string; data: unknown },
  aiFeedback: { score: number; feedback: string }
): Promise<{
  xpEarned: number
  xpBonus: number
  streakMultiplier: number
  newStreak: number
  streakLost: boolean
  newLevel: number
  leveledUp: boolean
  newBadges: string[]
}> {
  // 1. Update streak first
  const streakResult = await updateStreak(supabase, userId)

  // 2. Calculate XP with streak bonus
  const xpResult = calculateXPWithBonus(baseXP, streakResult.newStreak)

  // 3. Get current profile
  const { data: profile } = await supabase
    .from('profiles')
    .select('xp, level')
    .eq('id', userId)
    .single()

  const currentXP = profile?.xp || 0
  const currentLevel = profile?.level || 1
  const newTotalXP = currentXP + xpResult.total
  const newLevel = calculateLevel(newTotalXP)
  const leveledUp = newLevel > currentLevel

  // 4. Update user progress
  const { data: existingProgress } = await supabase
    .from('user_progress')
    .select('id')
    .eq('user_id', userId)
    .eq('quest_id', questId)
    .maybeSingle()

  if (existingProgress) {
    await supabase
      .from('user_progress')
      .update({
        status: 'completed',
        completed_at: new Date().toISOString(),
        submission_type: submission.type,
        submission_data: submission.data,
        ai_feedback: aiFeedback,
        xp_earned: xpResult.total
      })
      .eq('id', existingProgress.id)
  } else {
    await supabase.from('user_progress').insert({
      user_id: userId,
      quest_id: questId,
      status: 'completed',
      completed_at: new Date().toISOString(),
      submission_type: submission.type,
      submission_data: submission.data,
      ai_feedback: aiFeedback,
      xp_earned: xpResult.total
    })
  }

  // 5. Update profile XP and level
  await supabase
    .from('profiles')
    .update({
      xp: newTotalXP,
      level: newLevel
    })
    .eq('id', userId)

  // 6. Record daily activity
  await recordDailyActivity(supabase, userId, xpResult.total, 1)

  // 7. Get quests completed count
  const questsCompleted = await getQuestsCompletedCount(supabase, userId)

  // 8. Check and award badges
  const newBadges = await checkAndAwardBadges(supabase, userId, {
    questsCompleted,
    currentStreak: streakResult.newStreak,
    level: newLevel,
    totalXP: newTotalXP
  })

  return {
    xpEarned: xpResult.total,
    xpBonus: xpResult.bonus,
    streakMultiplier: xpResult.multiplier,
    newStreak: streakResult.newStreak,
    streakLost: streakResult.streakLost,
    newLevel,
    leveledUp,
    newBadges
  }
}

/**
 * Get today's daily challenge quest
 */
export async function getDailyChallenge(
  supabase: SupabaseClient,
  userId: string
): Promise<{ quest: unknown; isCompleted: boolean; bonusXP: number } | null> {
  const today = new Date().toISOString().split('T')[0]

  // Get all available quests that user hasn't completed
  const { data: completedQuests } = await supabase
    .from('user_progress')
    .select('quest_id')
    .eq('user_id', userId)
    .eq('status', 'completed')

  const completedIds = (completedQuests || []).map(p => p.quest_id)

  // Get quests not completed
  let query = supabase
    .from('quests')
    .select('*')
    .eq('is_published', true)

  if (completedIds.length > 0) {
    query = query.not('id', 'in', `(${completedIds.join(',')})`)
  }

  const { data: availableQuests } = await query

  if (!availableQuests || availableQuests.length === 0) {
    // All quests completed - pick a random one for re-challenge
    const { data: allQuests } = await supabase
      .from('quests')
      .select('*')
      .eq('is_published', true)

    if (!allQuests || allQuests.length === 0) return null

    // Use date as seed for consistent daily selection
    const seed = parseInt(today.replace(/-/g, ''))
    const index = seed % allQuests.length
    return { quest: allQuests[index], isCompleted: true, bonusXP: 25 }
  }

  // Pick based on date for consistency
  const seed = parseInt(today.replace(/-/g, ''))
  const index = seed % availableQuests.length
  return { quest: availableQuests[index], isCompleted: false, bonusXP: 50 }
}
