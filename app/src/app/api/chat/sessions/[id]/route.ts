import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Verify session belongs to user
    const { data: session } = await supabase
      .from('chat_sessions')
      .select('id')
      .eq('id', id)
      .eq('user_id', user.id)
      .single()

    if (!session) {
      return NextResponse.json({ error: 'Session not found' }, { status: 404 })
    }

    // Get all messages for this session
    const { data: messages, error } = await supabase
      .from('chat_messages')
      .select('role, content')
      .eq('session_id', id)
      .order('created_at', { ascending: true })

    if (error) {
      console.error('Messages fetch error:', error)
      return NextResponse.json({ error: 'Failed to fetch messages' }, { status: 500 })
    }

    return NextResponse.json({
      messages: messages?.map(m => ({
        role: m.role as 'user' | 'assistant',
        content: m.content
      })) || []
    })
  } catch (error) {
    console.error('Session API error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
