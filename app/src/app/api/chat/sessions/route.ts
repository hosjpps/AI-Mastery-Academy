import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Get user's chat sessions
    const { data: sessions, error } = await supabase
      .from('chat_sessions')
      .select('id, created_at')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .limit(10)

    if (error) {
      console.error('Sessions fetch error:', error)
      return NextResponse.json({ error: 'Failed to fetch sessions' }, { status: 500 })
    }

    if (!sessions || sessions.length === 0) {
      return NextResponse.json({ sessions: [] })
    }

    // Fetch first user message for each session as preview
    const formattedSessions = await Promise.all(
      sessions.map(async (session) => {
        const { data: firstMessage } = await supabase
          .from('chat_messages')
          .select('content')
          .eq('session_id', session.id)
          .eq('role', 'user')
          .order('created_at', { ascending: true })
          .limit(1)
          .maybeSingle()

        return {
          id: session.id,
          created_at: session.created_at,
          preview: firstMessage?.content?.slice(0, 50) || 'New conversation'
        }
      })
    )

    return NextResponse.json({ sessions: formattedSessions })
  } catch (error) {
    console.error('Sessions API error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
