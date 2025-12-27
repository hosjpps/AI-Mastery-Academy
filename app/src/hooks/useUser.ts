'use client'

import { useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useUserStore } from '@/stores/userStore'

export function useUser() {
  const { profile, isLoading, error, setProfile, setLoading, setError, reset } =
    useUserStore()

  useEffect(() => {
    const supabase = createClient()

    async function getUser() {
      try {
        setLoading(true)

        const {
          data: { user },
          error: authError,
        } = await supabase.auth.getUser()

        if (authError) throw authError

        if (!user) {
          setProfile(null)
          return
        }

        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single()

        if (profileError) throw profileError

        setProfile(profile)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load user')
      }
    }

    getUser()

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_OUT') {
        reset()
      } else if (event === 'SIGNED_IN' && session?.user) {
        getUser()
      }
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [setProfile, setLoading, setError, reset])

  return { profile, isLoading, error }
}
