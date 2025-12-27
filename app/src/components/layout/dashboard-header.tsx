'use client'

import { signOut } from '@/lib/auth/actions'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Flame, Zap, LogOut, Settings, User } from 'lucide-react'
import Link from 'next/link'

type Profile = {
  id: string
  username: string
  display_name: string | null
  avatar_url: string | null
  xp: number
  level: number
  current_streak: number
}

export function DashboardHeader({ profile }: { profile: Profile }) {
  const initials = profile.display_name
    ? profile.display_name.split(' ').map(n => n[0]).join('').toUpperCase()
    : profile.username.slice(0, 2).toUpperCase()

  return (
    <header className="sticky top-0 z-40 border-b border-zinc-800 bg-zinc-900/80 backdrop-blur-lg">
      <div className="flex h-16 items-center justify-between px-6">
        {/* Mobile Logo */}
        <div className="flex items-center gap-2 lg:hidden">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center">
            <span className="text-lg">🎯</span>
          </div>
        </div>

        {/* Stats */}
        <div className="hidden sm:flex items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-orange-500/10 flex items-center justify-center">
              <Flame className="w-4 h-4 text-orange-400" />
            </div>
            <div>
              <p className="text-xs text-zinc-500">Streak</p>
              <p className="text-sm font-medium text-white">{profile.current_streak} days</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-violet-500/10 flex items-center justify-center">
              <Zap className="w-4 h-4 text-violet-400" />
            </div>
            <div>
              <p className="text-xs text-zinc-500">Level {profile.level}</p>
              <p className="text-sm font-medium text-white">{profile.xp.toLocaleString()} XP</p>
            </div>
          </div>
        </div>

        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-10 w-10 rounded-full">
              <Avatar className="h-10 w-10">
                <AvatarImage src={profile.avatar_url || undefined} alt={profile.username} />
                <AvatarFallback className="bg-violet-500/20 text-violet-400">
                  {initials}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 bg-zinc-900 border-zinc-800" align="end">
            <div className="flex items-center gap-2 p-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src={profile.avatar_url || undefined} alt={profile.username} />
                <AvatarFallback className="bg-violet-500/20 text-violet-400 text-xs">
                  {initials}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium text-white">{profile.display_name || profile.username}</p>
                <p className="text-xs text-zinc-500">@{profile.username}</p>
              </div>
            </div>
            <DropdownMenuSeparator className="bg-zinc-800" />
            <DropdownMenuItem asChild className="text-zinc-300 focus:bg-zinc-800 focus:text-white cursor-pointer">
              <Link href="/profile">
                <User className="mr-2 h-4 w-4" />
                Profile
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild className="text-zinc-300 focus:bg-zinc-800 focus:text-white cursor-pointer">
              <Link href="/settings">
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-zinc-800" />
            <DropdownMenuItem
              className="text-red-400 focus:bg-red-500/10 focus:text-red-400 cursor-pointer"
              onClick={() => signOut()}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Sign out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
