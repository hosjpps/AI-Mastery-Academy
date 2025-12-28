import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { DashboardSidebar } from '@/components/layout/dashboard-sidebar'
import { DashboardHeader } from '@/components/layout/dashboard-header'
import { AICoachProvider } from '@/components/chat/ai-coach-provider'

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .maybeSingle<{
      id: string
      username: string
      display_name: string | null
      avatar_url: string | null
      xp: number
      level: number
      current_streak: number
      onboarding_completed: boolean
    }>()

  if (!profile?.onboarding_completed) {
    redirect('/onboarding')
  }

  return (
    <div className="min-h-screen bg-zinc-950">
      <DashboardSidebar />
      <div className="lg:pl-64">
        <DashboardHeader profile={profile} />
        <main className="p-6">
          {children}
        </main>
      </div>
      <AICoachProvider />
    </div>
  )
}
