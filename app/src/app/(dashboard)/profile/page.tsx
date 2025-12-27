import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Flame, Target, Trophy, Zap, Calendar, Award, BookOpen } from 'lucide-react'

export default async function ProfilePage() {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  // Get user badges
  const { data: userBadgesData } = await supabase
    .from('user_badges')
    .select('badge_id, earned_at')
    .eq('user_id', user.id)

  // Get badge details
  const badgeIds = userBadgesData?.map(ub => ub.badge_id) || []
  const { data: badgesData } = badgeIds.length > 0
    ? await supabase
        .from('badges')
        .select('id, title, description, icon')
        .in('id', badgeIds)
    : { data: [] }

  // Combine user badges with badge details
  const userBadges = userBadgesData?.map(ub => ({
    ...ub,
    badge: badgesData?.find(b => b.id === ub.badge_id)
  }))

  // Get completed quests count
  const { count: completedQuests } = await supabase
    .from('user_progress')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', user.id)
    .eq('status', 'completed')

  // Calculate stats
  const xpThresholds = [0, 100, 250, 500, 1000, 2000, 4000, 8000, 16000, 32000]
  const currentLevel = profile?.level || 1
  const currentLevelXp = xpThresholds[currentLevel - 1] || 0
  const nextLevelXp = xpThresholds[currentLevel] || xpThresholds[xpThresholds.length - 1]
  const xpProgress = ((profile?.xp || 0) - currentLevelXp) / (nextLevelXp - currentLevelXp) * 100

  const initials = profile?.display_name
    ? profile.display_name.split(' ').map((n: string) => n[0]).join('').toUpperCase()
    : profile?.username?.slice(0, 2).toUpperCase() || 'U'

  const memberSince = profile?.created_at
    ? new Date(profile.created_at).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
    : 'Unknown'

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-20 lg:pb-0">
      {/* Profile Header */}
      <Card className="border-zinc-800 bg-zinc-900/50">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <Avatar className="h-24 w-24">
              <AvatarImage src={profile?.avatar_url || undefined} />
              <AvatarFallback className="bg-violet-500/20 text-violet-400 text-2xl">
                {initials}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1 text-center sm:text-left">
              <h1 className="text-2xl font-bold text-white">
                {profile?.display_name || profile?.username}
              </h1>
              <p className="text-zinc-400">@{profile?.username}</p>

              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 mt-3">
                <Badge className="bg-violet-500/10 text-violet-400 border-violet-500/20">
                  Level {currentLevel}
                </Badge>
                {profile?.career_track && (
                  <Badge variant="secondary" className="bg-zinc-800 text-zinc-300">
                    {profile.career_track}
                  </Badge>
                )}
                {profile?.learning_style && (
                  <Badge variant="secondary" className="bg-zinc-800 text-zinc-300">
                    {profile.learning_style} learner
                  </Badge>
                )}
              </div>
            </div>

            {/* Level Progress */}
            <div className="w-full sm:w-48">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-zinc-400">Level {currentLevel}</span>
                <span className="text-zinc-400">Level {currentLevel + 1}</span>
              </div>
              <Progress value={xpProgress} className="h-2" />
              <p className="text-xs text-zinc-500 mt-1 text-center">
                {(profile?.xp || 0) - currentLevelXp} / {nextLevelXp - currentLevelXp} XP
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard
          icon={<Zap className="w-5 h-5 text-violet-400" />}
          label="Total XP"
          value={(profile?.xp || 0).toLocaleString()}
          bgColor="bg-violet-500/10"
        />
        <StatCard
          icon={<BookOpen className="w-5 h-5 text-blue-400" />}
          label="Quests Completed"
          value={String(completedQuests || 0)}
          bgColor="bg-blue-500/10"
        />
        <StatCard
          icon={<Flame className="w-5 h-5 text-orange-400" />}
          label="Current Streak"
          value={`${profile?.current_streak || 0} days`}
          bgColor="bg-orange-500/10"
        />
        <StatCard
          icon={<Trophy className="w-5 h-5 text-yellow-400" />}
          label="Longest Streak"
          value={`${profile?.longest_streak || 0} days`}
          bgColor="bg-yellow-500/10"
        />
      </div>

      {/* Badges Section */}
      <Card className="border-zinc-800 bg-zinc-900/50">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Award className="w-5 h-5 text-yellow-400" />
            Badges
          </CardTitle>
          <CardDescription>Achievements you've earned</CardDescription>
        </CardHeader>
        <CardContent>
          {userBadges && userBadges.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {userBadges.map((ub) => (
                <div
                  key={ub.badge_id}
                  className="flex flex-col items-center p-4 rounded-xl bg-zinc-800/50 border border-zinc-700"
                >
                  <span className="text-3xl mb-2">{ub.badge?.icon || '🏆'}</span>
                  <p className="text-sm font-medium text-white text-center">{ub.badge?.title}</p>
                  <p className="text-xs text-zinc-500 text-center mt-1">{ub.badge?.description}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Award className="w-12 h-12 mx-auto mb-3 text-zinc-700" />
              <p className="text-zinc-400">No badges earned yet</p>
              <p className="text-sm text-zinc-500 mt-1">Complete quests to earn your first badge!</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Account Info */}
      <Card className="border-zinc-800 bg-zinc-900/50">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Calendar className="w-5 h-5 text-zinc-400" />
            Account Info
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="flex justify-between py-2 border-b border-zinc-800">
              <span className="text-zinc-400">Email</span>
              <span className="text-white">{user.email}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-zinc-800">
              <span className="text-zinc-400">Member since</span>
              <span className="text-white">{memberSince}</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-zinc-400">Daily goal</span>
              <span className="text-white">{profile?.daily_goal_minutes || 15} minutes</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function StatCard({
  icon,
  label,
  value,
  bgColor,
}: {
  icon: React.ReactNode
  label: string
  value: string
  bgColor: string
}) {
  return (
    <Card className="border-zinc-800 bg-zinc-900/50">
      <CardContent className="p-4">
        <div className={`w-10 h-10 rounded-lg ${bgColor} flex items-center justify-center mb-3`}>
          {icon}
        </div>
        <p className="text-xs text-zinc-500">{label}</p>
        <p className="text-lg font-semibold text-white">{value}</p>
      </CardContent>
    </Card>
  )
}
