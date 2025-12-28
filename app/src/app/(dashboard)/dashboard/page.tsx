import { createClient } from '@/lib/supabase/server'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { ArrowRight, Flame, Target, Trophy, Zap } from 'lucide-react'
import Link from 'next/link'
import { DailyChallenge } from '@/components/gamification/daily-challenge'

export default async function DashboardPage() {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return null
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .maybeSingle<{
      xp: number
      level: number
      current_streak: number
      longest_streak: number
      display_name: string | null
      username: string
    }>()

  type Track = {
    id: string
    slug: string
    title: string
    description: string | null
    icon: string | null
    order_index: number | null
  }

  type Quest = {
    id: string
    slug: string
    title: string
    description: string | null
    xp_reward: number
    estimated_minutes: number | null
  }

  const { data: tracks } = await supabase
    .from('tracks')
    .select('*')
    .order('order_index') as { data: Track[] | null }

  const { data: quests } = await supabase
    .from('quests')
    .select('*')
    .eq('is_published', true)
    .order('order_index')
    .limit(3) as { data: Quest[] | null }

  // Calculate XP progress to next level
  const xpThresholds = [0, 100, 250, 500, 1000, 2000, 4000, 8000, 16000, 32000]
  const currentLevelXp = xpThresholds[profile?.level ? profile.level - 1 : 0] || 0
  const nextLevelXp = xpThresholds[profile?.level || 1] || xpThresholds[xpThresholds.length - 1]
  const xpProgress = ((profile?.xp || 0) - currentLevelXp) / (nextLevelXp - currentLevelXp) * 100

  return (
    <div className="space-y-8 pb-20 lg:pb-0">
      {/* Welcome Section */}
      <div>
        <h1 className="text-2xl font-bold text-white">
          Welcome back{profile?.display_name ? `, ${profile.display_name.split(' ')[0]}` : ''}!
        </h1>
        <p className="text-zinc-400 mt-1">Continue your AI mastery journey</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon={<Zap className="w-5 h-5 text-violet-400" />}
          label="Total XP"
          value={profile?.xp?.toLocaleString() || '0'}
          bgColor="bg-violet-500/10"
        />
        <StatCard
          icon={<Target className="w-5 h-5 text-blue-400" />}
          label="Level"
          value={String(profile?.level || 1)}
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

      {/* Level Progress */}
      <Card className="border-zinc-800 bg-zinc-900/50">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center">
                <span className="text-lg font-bold text-white">{profile?.level || 1}</span>
              </div>
              <div>
                <p className="text-sm font-medium text-white">Level {profile?.level || 1}</p>
                <p className="text-xs text-zinc-500">{(profile?.xp || 0) - currentLevelXp} / {nextLevelXp - currentLevelXp} XP to next level</p>
              </div>
            </div>
            <Badge variant="secondary" className="bg-violet-500/10 text-violet-400 border-violet-500/20">
              {Math.round(xpProgress)}% complete
            </Badge>
          </div>
          <Progress value={xpProgress} className="h-2" />
        </CardContent>
      </Card>

      {/* Daily Challenge */}
      <DailyChallenge />

      {/* Continue Learning */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-white">Continue Learning</h2>
          <Link href="/quest-map">
            <Button variant="ghost" size="sm" className="text-violet-400 hover:text-violet-300">
              View all
              <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </Link>
        </div>

        <div className="grid gap-4">
          {quests && quests.length > 0 ? (
            quests.map((quest) => (
              <Link key={quest.id} href={`/quest/${quest.slug}`}>
                <Card className="border-zinc-800 bg-zinc-900/50 hover:border-zinc-700 transition-colors cursor-pointer">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-violet-500/10 flex items-center justify-center">
                        <Target className="w-6 h-6 text-violet-400" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-white">{quest.title}</h3>
                        <p className="text-sm text-zinc-400">{quest.description}</p>
                      </div>
                      <div className="text-right">
                        <Badge className="bg-green-500/10 text-green-400 border-green-500/20">
                          +{quest.xp_reward} XP
                        </Badge>
                        <p className="text-xs text-zinc-500 mt-1">{quest.estimated_minutes} min</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))
          ) : (
            <Card className="border-zinc-800 bg-zinc-900/50">
              <CardContent className="p-8 text-center">
                <p className="text-zinc-400">No quests available yet</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Learning Tracks */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-white">Learning Tracks</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {tracks?.map((track) => (
            <Card key={track.id} className="border-zinc-800 bg-zinc-900/50 hover:border-zinc-700 transition-colors">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{track.icon}</span>
                  <div>
                    <CardTitle className="text-white text-base">{track.title}</CardTitle>
                    <CardDescription>{track.description}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <Progress value={0} className="flex-1 mr-4 h-1.5" />
                  <span className="text-xs text-zinc-500">0%</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
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
