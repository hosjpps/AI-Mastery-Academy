'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { toast } from 'sonner'
import { Loader2, Save, User, Bell, Shield, Palette } from 'lucide-react'

type Profile = {
  id: string
  username: string
  display_name: string | null
  learning_style: string | null
  career_track: string | null
  daily_goal_minutes: number | null
}

export default function SettingsPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [profile, setProfile] = useState<Profile | null>(null)

  const [displayName, setDisplayName] = useState('')
  const [dailyGoal, setDailyGoal] = useState(15)
  const [learningStyle, setLearningStyle] = useState('')
  const [careerTrack, setCareerTrack] = useState('')

  useEffect(() => {
    async function loadProfile() {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()

      if (!user) {
        router.push('/login')
        return
      }

      const { data } = await supabase
        .from('profiles')
        .select('id, username, display_name, learning_style, career_track, daily_goal_minutes')
        .eq('id', user.id)
        .single()

      if (data) {
        setProfile(data as Profile)
        setDisplayName(data.display_name || '')
        setDailyGoal(data.daily_goal_minutes || 15)
        setLearningStyle(data.learning_style || '')
        setCareerTrack(data.career_track || '')
      }

      setLoading(false)
    }

    loadProfile()
  }, [router])

  const handleSave = async () => {
    if (!profile) return

    setSaving(true)
    const supabase = createClient()

    const { error } = await supabase
      .from('profiles')
      .update({
        display_name: displayName || null,
        daily_goal_minutes: dailyGoal,
        learning_style: learningStyle || null,
        career_track: careerTrack || null,
      })
      .eq('id', profile.id)

    if (error) {
      toast.error('Failed to save settings')
    } else {
      toast.success('Settings saved successfully')
      router.refresh()
    }

    setSaving(false)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-violet-500" />
      </div>
    )
  }

  const dailyGoalOptions = [5, 10, 15, 30, 60]
  const learningStyles = [
    { value: 'visual', label: 'Visual', icon: '👁️' },
    { value: 'auditory', label: 'Auditory', icon: '👂' },
    { value: 'kinesthetic', label: 'Hands-on', icon: '🖐️' },
  ]
  const careerTracks = [
    { value: 'freelancer', label: 'Freelancer', icon: '💼' },
    { value: 'entrepreneur', label: 'Entrepreneur', icon: '🚀' },
    { value: 'career', label: 'Career Growth', icon: '📈' },
    { value: 'hobbyist', label: 'Hobbyist', icon: '🎨' },
  ]

  return (
    <div className="max-w-2xl mx-auto space-y-6 pb-20 lg:pb-0">
      <div>
        <h1 className="text-2xl font-bold text-white">Settings</h1>
        <p className="text-zinc-400 mt-1">Manage your account preferences</p>
      </div>

      {/* Profile Settings */}
      <Card className="border-zinc-800 bg-zinc-900/50">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <User className="w-5 h-5 text-violet-400" />
            Profile
          </CardTitle>
          <CardDescription>Update your personal information</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="username" className="text-zinc-300">Username</Label>
            <Input
              id="username"
              value={profile?.username || ''}
              disabled
              className="bg-zinc-800 border-zinc-700 text-zinc-400"
            />
            <p className="text-xs text-zinc-500 mt-1">Username cannot be changed</p>
          </div>

          <div>
            <Label htmlFor="displayName" className="text-zinc-300">Display Name</Label>
            <Input
              id="displayName"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              placeholder="Enter your display name"
              className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500"
            />
          </div>
        </CardContent>
      </Card>

      {/* Learning Preferences */}
      <Card className="border-zinc-800 bg-zinc-900/50">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Palette className="w-5 h-5 text-blue-400" />
            Learning Preferences
          </CardTitle>
          <CardDescription>Customize your learning experience</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Daily Goal */}
          <div>
            <Label className="text-zinc-300 mb-3 block">Daily Goal (minutes)</Label>
            <div className="flex gap-2">
              {dailyGoalOptions.map((minutes) => (
                <button
                  key={minutes}
                  onClick={() => setDailyGoal(minutes)}
                  className={`w-12 h-12 rounded-lg border font-medium transition-all ${
                    dailyGoal === minutes
                      ? 'border-violet-500 bg-violet-500/10 text-violet-400'
                      : 'border-zinc-700 bg-zinc-800/50 text-zinc-300 hover:border-zinc-600'
                  }`}
                >
                  {minutes}
                </button>
              ))}
            </div>
          </div>

          {/* Learning Style */}
          <div>
            <Label className="text-zinc-300 mb-3 block">Learning Style</Label>
            <div className="grid grid-cols-3 gap-3">
              {learningStyles.map((style) => (
                <button
                  key={style.value}
                  onClick={() => setLearningStyle(style.value)}
                  className={`p-4 rounded-lg border text-center transition-all ${
                    learningStyle === style.value
                      ? 'border-violet-500 bg-violet-500/10'
                      : 'border-zinc-700 bg-zinc-800/50 hover:border-zinc-600'
                  }`}
                >
                  <span className="text-2xl block mb-1">{style.icon}</span>
                  <span className="text-sm text-white">{style.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Career Track */}
          <div>
            <Label className="text-zinc-300 mb-3 block">Career Track</Label>
            <div className="grid grid-cols-2 gap-3">
              {careerTracks.map((track) => (
                <button
                  key={track.value}
                  onClick={() => setCareerTrack(track.value)}
                  className={`p-4 rounded-lg border text-left transition-all ${
                    careerTrack === track.value
                      ? 'border-violet-500 bg-violet-500/10'
                      : 'border-zinc-700 bg-zinc-800/50 hover:border-zinc-600'
                  }`}
                >
                  <span className="text-xl block mb-1">{track.icon}</span>
                  <span className="text-sm font-medium text-white">{track.label}</span>
                </button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button
          onClick={handleSave}
          disabled={saving}
          className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500"
        >
          {saving ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </>
          )}
        </Button>
      </div>
    </div>
  )
}
