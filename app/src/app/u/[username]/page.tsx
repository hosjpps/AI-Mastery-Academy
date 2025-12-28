import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Flame, Trophy, Zap, Award, BookOpen, Share2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Metadata } from 'next'
import { ShareProfileButton } from './share-button'

interface PageProps {
  params: Promise<{ username: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { username } = await params
  const supabase = await createClient()

  const { data: profile } = await supabase
    .from('profiles')
    .select('display_name, username, xp, level')
    .eq('username', username)
    .single()

  if (!profile) {
    return {
      title: 'User Not Found | AI Mastery Academy',
    }
  }

  const displayName = profile.display_name || profile.username

  return {
    title: `${displayName} | AI Mastery Academy`,
    description: `${displayName} is Level ${profile.level} with ${profile.xp} XP on AI Mastery Academy - the gamified platform for learning AI skills.`,
    openGraph: {
      title: `${displayName} - Level ${profile.level} | AI Mastery Academy`,
      description: `${displayName} has earned ${profile.xp} XP mastering AI skills. Join AI Mastery Academy!`,
      type: 'profile',
    },
    twitter: {
      card: 'summary',
      title: `${displayName} - Level ${profile.level}`,
      description: `${displayName} has earned ${profile.xp} XP on AI Mastery Academy`,
    },
  }
}

export default async function PublicProfilePage({ params }: PageProps) {
  const { username } = await params
  const supabase = await createClient()

  // Get profile by username
  const { data: profile, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('username', username)
    .single()

  if (error || !profile) {
    notFound()
  }

  // Get user badges (using service role or RLS-allowed query)
  const { data: userBadgesData } = await supabase
    .from('user_badges')
    .select('badge_id, earned_at')
    .eq('user_id', profile.id)

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
    .eq('user_id', profile.id)
    .eq('status', 'completed')

  // Calculate stats
  const xpThresholds = [0, 100, 250, 500, 1000, 2000, 4000, 8000, 16000, 32000]
  const currentLevel = profile.level || 1
  const currentLevelXp = xpThresholds[currentLevel - 1] || 0
  const nextLevelXp = xpThresholds[currentLevel] || xpThresholds[xpThresholds.length - 1]
  const xpProgress = ((profile.xp || 0) - currentLevelXp) / (nextLevelXp - currentLevelXp) * 100

  const initials = profile.display_name
    ? profile.display_name.split(' ').map((n: string) => n[0]).join('').toUpperCase()
    : profile.username?.slice(0, 2).toUpperCase() || 'U'

  const memberSince = profile.created_at
    ? new Date(profile.created_at).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
    : 'Unknown'

  const profileUrl = `/u/${profile.username}`

  return (
    <div className="min-h-screen bg-zinc-950">
      {/* Header with gradient */}
      <div className="bg-gradient-to-b from-violet-500/20 to-zinc-950 pt-12 pb-20">
        <div className="max-w-4xl mx-auto px-4">
          {/* Profile Header */}
          <div className="flex flex-col items-center text-center">
            <Avatar className="h-28 w-28 border-4 border-zinc-950 shadow-xl">
              <AvatarImage src={profile.avatar_url || undefined} />
              <AvatarFallback className="bg-violet-500/20 text-violet-400 text-3xl">
                {initials}
              </AvatarFallback>
            </Avatar>

            <h1 className="mt-4 text-3xl font-bold text-white">
              {profile.display_name || profile.username}
            </h1>
            <p className="text-zinc-400">@{profile.username}</p>

            <div className="flex flex-wrap items-center justify-center gap-2 mt-4">
              <Badge className="bg-violet-500/20 text-violet-300 border-violet-500/30">
                Level {currentLevel}
              </Badge>
              {profile.career_track && (
                <Badge variant="secondary" className="bg-zinc-800 text-zinc-300 border-zinc-700">
                  {profile.career_track}
                </Badge>
              )}
            </div>

            {/* Share Button */}
            <ShareProfileButton username={profile.username} />
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 -mt-10 space-y-6 pb-12">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard
            icon={<Zap className="w-5 h-5 text-violet-400" />}
            label="Total XP"
            value={(profile.xp || 0).toLocaleString()}
            bgColor="bg-violet-500/10"
          />
          <StatCard
            icon={<BookOpen className="w-5 h-5 text-blue-400" />}
            label="Quests"
            value={String(completedQuests || 0)}
            bgColor="bg-blue-500/10"
          />
          <StatCard
            icon={<Flame className="w-5 h-5 text-orange-400" />}
            label="Streak"
            value={`${profile.current_streak || 0} days`}
            bgColor="bg-orange-500/10"
          />
          <StatCard
            icon={<Trophy className="w-5 h-5 text-yellow-400" />}
            label="Best Streak"
            value={`${profile.longest_streak || 0} days`}
            bgColor="bg-yellow-500/10"
          />
        </div>

        {/* Level Progress */}
        <Card className="border-zinc-800 bg-zinc-900/50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-zinc-400">Level Progress</span>
              <span className="text-sm text-zinc-400">
                {(profile.xp || 0) - currentLevelXp} / {nextLevelXp - currentLevelXp} XP
              </span>
            </div>
            <Progress value={xpProgress} className="h-3" />
            <div className="flex items-center justify-between mt-2">
              <span className="text-xs text-zinc-500">Level {currentLevel}</span>
              <span className="text-xs text-zinc-500">Level {currentLevel + 1}</span>
            </div>
          </CardContent>
        </Card>

        {/* Badges Section */}
        <Card className="border-zinc-800 bg-zinc-900/50">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Award className="w-5 h-5 text-yellow-400" />
              Badges ({userBadges?.length || 0})
            </CardTitle>
            <CardDescription>Achievements earned on the journey</CardDescription>
          </CardHeader>
          <CardContent>
            {userBadges && userBadges.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {userBadges.map((ub) => (
                  <div
                    key={ub.badge_id}
                    className="flex flex-col items-center p-4 rounded-xl bg-zinc-800/50 border border-zinc-700 hover:border-zinc-600 transition-colors"
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
              </div>
            )}
          </CardContent>
        </Card>

        {/* Member Since */}
        <div className="text-center text-sm text-zinc-500">
          Member since {memberSince}
        </div>

        {/* CTA for visitors */}
        <Card className="border-violet-500/30 bg-gradient-to-r from-violet-500/10 to-blue-500/10">
          <CardContent className="p-6 text-center">
            <h3 className="text-lg font-semibold text-white mb-2">
              Join AI Mastery Academy
            </h3>
            <p className="text-zinc-400 mb-4">
              Learn AI skills through gamified quests and earn badges like {profile.display_name || profile.username}!
            </p>
            <Button asChild className="bg-violet-600 hover:bg-violet-700">
              <a href="/register">Start Learning Free</a>
            </Button>
          </CardContent>
        </Card>
      </div>
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
