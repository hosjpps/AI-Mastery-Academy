import { createClient } from '@/lib/supabase/server'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Trophy, Medal, Award, Flame, Zap } from 'lucide-react'
import { cn } from '@/lib/utils'

type LeaderboardUser = {
  id: string
  username: string
  display_name: string | null
  avatar_url: string | null
  xp: number | null
  level: number | null
  current_streak: number | null
}

export default async function LeaderboardPage() {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()

  // Get top users by XP
  const { data: topUsers } = await supabase
    .from('profiles')
    .select('id, username, display_name, avatar_url, xp, level, current_streak')
    .order('xp', { ascending: false })
    .limit(50)

  // Get current user's rank
  let userRank = 0
  if (user && topUsers) {
    const index = topUsers.findIndex(u => u.id === user.id)
    userRank = index >= 0 ? index + 1 : 0
  }

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="w-6 h-6 text-yellow-400" />
      case 2:
        return <Medal className="w-6 h-6 text-zinc-400" />
      case 3:
        return <Award className="w-6 h-6 text-amber-600" />
      default:
        return <span className="w-6 h-6 flex items-center justify-center text-zinc-500 font-medium">{rank}</span>
    }
  }

  const getRankStyle = (rank: number) => {
    switch (rank) {
      case 1:
        return 'bg-yellow-500/10 border-yellow-500/30'
      case 2:
        return 'bg-zinc-500/10 border-zinc-500/30'
      case 3:
        return 'bg-amber-500/10 border-amber-500/30'
      default:
        return 'bg-zinc-800/50 border-zinc-700'
    }
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-20 lg:pb-0">
      <div>
        <h1 className="text-2xl font-bold text-white">Leaderboard</h1>
        <p className="text-zinc-400 mt-1">See how you rank among other learners</p>
      </div>

      {/* User's Current Rank */}
      {user && userRank > 0 && (
        <Card className="border-violet-500/30 bg-violet-500/5">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-violet-500/20 flex items-center justify-center">
                  <span className="text-violet-400 font-bold">#{userRank}</span>
                </div>
                <div>
                  <p className="text-white font-medium">Your Rank</p>
                  <p className="text-sm text-zinc-400">Keep learning to climb higher!</p>
                </div>
              </div>
              <Badge className="bg-violet-500/10 text-violet-400 border-violet-500/20">
                Top {Math.round((userRank / (topUsers?.length || 1)) * 100)}%
              </Badge>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Top 3 Podium */}
      {topUsers && topUsers.length >= 3 && (
        <div className="grid grid-cols-3 gap-4">
          {/* 2nd Place */}
          <Card className={cn('border mt-8', getRankStyle(2))}>
            <CardContent className="p-4 text-center">
              <div className="relative inline-block">
                <Avatar className="h-16 w-16 mx-auto">
                  <AvatarImage src={topUsers[1]?.avatar_url || undefined} />
                  <AvatarFallback className="bg-zinc-700 text-zinc-300 text-lg">
                    {(topUsers[1]?.display_name || topUsers[1]?.username)?.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-zinc-400 flex items-center justify-center">
                  <span className="text-xs font-bold text-zinc-900">2</span>
                </div>
              </div>
              <p className="font-medium text-white mt-3 truncate">
                {topUsers[1]?.display_name || topUsers[1]?.username}
              </p>
              <p className="text-sm text-violet-400">{(topUsers[1]?.xp || 0).toLocaleString()} XP</p>
            </CardContent>
          </Card>

          {/* 1st Place */}
          <Card className={cn('border', getRankStyle(1))}>
            <CardContent className="p-4 text-center">
              <div className="relative inline-block">
                <Avatar className="h-20 w-20 mx-auto ring-2 ring-yellow-400">
                  <AvatarImage src={topUsers[0]?.avatar_url || undefined} />
                  <AvatarFallback className="bg-yellow-500/20 text-yellow-400 text-xl">
                    {(topUsers[0]?.display_name || topUsers[0]?.username)?.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-yellow-400 flex items-center justify-center">
                  <Trophy className="w-4 h-4 text-yellow-900" />
                </div>
              </div>
              <p className="font-medium text-white mt-3 truncate">
                {topUsers[0]?.display_name || topUsers[0]?.username}
              </p>
              <p className="text-sm text-violet-400">{(topUsers[0]?.xp || 0).toLocaleString()} XP</p>
            </CardContent>
          </Card>

          {/* 3rd Place */}
          <Card className={cn('border mt-8', getRankStyle(3))}>
            <CardContent className="p-4 text-center">
              <div className="relative inline-block">
                <Avatar className="h-16 w-16 mx-auto">
                  <AvatarImage src={topUsers[2]?.avatar_url || undefined} />
                  <AvatarFallback className="bg-amber-500/20 text-amber-400 text-lg">
                    {(topUsers[2]?.display_name || topUsers[2]?.username)?.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-amber-600 flex items-center justify-center">
                  <span className="text-xs font-bold text-white">3</span>
                </div>
              </div>
              <p className="font-medium text-white mt-3 truncate">
                {topUsers[2]?.display_name || topUsers[2]?.username}
              </p>
              <p className="text-sm text-violet-400">{(topUsers[2]?.xp || 0).toLocaleString()} XP</p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Full Leaderboard */}
      <Card className="border-zinc-800 bg-zinc-900/50">
        <CardHeader>
          <CardTitle className="text-white">Rankings</CardTitle>
          <CardDescription>Top learners this month</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {topUsers?.map((leaderboardUser, index) => {
              const rank = index + 1
              const isCurrentUser = user?.id === leaderboardUser.id

              return (
                <div
                  key={leaderboardUser.id}
                  className={cn(
                    'flex items-center gap-4 p-3 rounded-lg transition-colors',
                    isCurrentUser ? 'bg-violet-500/10 border border-violet-500/20' : 'hover:bg-zinc-800/50',
                    rank <= 3 && 'border',
                    rank <= 3 && getRankStyle(rank)
                  )}
                >
                  {/* Rank */}
                  <div className="w-8 flex justify-center">
                    {getRankIcon(rank)}
                  </div>

                  {/* Avatar */}
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={leaderboardUser.avatar_url || undefined} />
                    <AvatarFallback className="bg-zinc-700 text-zinc-300">
                      {(leaderboardUser.display_name || leaderboardUser.username)?.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>

                  {/* Name */}
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-white truncate">
                      {leaderboardUser.display_name || leaderboardUser.username}
                      {isCurrentUser && <span className="text-violet-400 ml-2">(You)</span>}
                    </p>
                    <p className="text-sm text-zinc-500">Level {leaderboardUser.level || 1}</p>
                  </div>

                  {/* Stats */}
                  <div className="flex items-center gap-4">
                    {(leaderboardUser.current_streak || 0) > 0 && (
                      <div className="hidden sm:flex items-center gap-1 text-orange-400">
                        <Flame className="w-4 h-4" />
                        <span className="text-sm">{leaderboardUser.current_streak}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-1 text-violet-400">
                      <Zap className="w-4 h-4" />
                      <span className="text-sm font-medium">{(leaderboardUser.xp || 0).toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              )
            })}

            {(!topUsers || topUsers.length === 0) && (
              <div className="text-center py-8">
                <Trophy className="w-12 h-12 mx-auto mb-3 text-zinc-700" />
                <p className="text-zinc-400">No learners on the leaderboard yet</p>
                <p className="text-sm text-zinc-500 mt-1">Start learning to be the first!</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
