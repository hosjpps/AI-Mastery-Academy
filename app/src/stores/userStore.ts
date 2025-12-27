import { create } from 'zustand'
import type { Database } from '@/types/database'

type Profile = Database['public']['Tables']['profiles']['Row']

interface UserState {
  profile: Profile | null
  isLoading: boolean
  error: string | null

  // Actions
  setProfile: (profile: Profile | null) => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
  updateXP: (xp: number) => void
  incrementStreak: () => void
  reset: () => void
}

export const useUserStore = create<UserState>((set) => ({
  profile: null,
  isLoading: true,
  error: null,

  setProfile: (profile) => set({ profile, isLoading: false }),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error, isLoading: false }),

  updateXP: (xp) =>
    set((state) => ({
      profile: state.profile
        ? { ...state.profile, xp: (state.profile.xp || 0) + xp }
        : null,
    })),

  incrementStreak: () =>
    set((state) => ({
      profile: state.profile
        ? {
            ...state.profile,
            current_streak: (state.profile.current_streak || 0) + 1,
            longest_streak: Math.max(
              state.profile.longest_streak || 0,
              (state.profile.current_streak || 0) + 1
            ),
          }
        : null,
    })),

  reset: () => set({ profile: null, isLoading: true, error: null }),
}))
