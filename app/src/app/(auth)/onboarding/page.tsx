'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { ArrowLeft, ArrowRight, Check, Sparkles } from 'lucide-react'

type LearningStyle = 'visual' | 'auditory' | 'kinesthetic'
type CareerTrack = 'freelancer' | 'entrepreneur' | 'career' | 'hobbyist'

const STEPS = ['Welcome', 'Learning Style', 'Career Track', 'Daily Goal', 'Ready']

export default function OnboardingPage() {
  const router = useRouter()
  const [step, setStep] = useState(0)
  const [loading, setLoading] = useState(false)

  const [learningStyle, setLearningStyle] = useState<LearningStyle | null>(null)
  const [careerTrack, setCareerTrack] = useState<CareerTrack | null>(null)
  const [dailyGoal, setDailyGoal] = useState(15)

  const progress = ((step + 1) / STEPS.length) * 100

  const canProceed = () => {
    if (step === 1) return learningStyle !== null
    if (step === 2) return careerTrack !== null
    return true
  }

  const handleNext = () => {
    if (step < STEPS.length - 1) {
      setStep(step + 1)
    }
  }

  const handleBack = () => {
    if (step > 0) {
      setStep(step - 1)
    }
  }

  const handleComplete = async () => {
    setLoading(true)
    const supabase = createClient()

    const { data: { user } } = await supabase.auth.getUser()

    if (user) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      await (supabase as any)
        .from('profiles')
        .update({
          learning_style: learningStyle,
          career_track: careerTrack,
          daily_goal_minutes: dailyGoal,
          onboarding_completed: true,
        })
        .eq('id', user.id)
    }

    router.push('/dashboard')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 px-4 py-12">
      <Card className="w-full max-w-xl border-zinc-800 bg-zinc-900/50 backdrop-blur">
        <CardHeader>
          <div className="mb-4">
            <Progress value={progress} className="h-2" />
            <p className="text-xs text-zinc-500 mt-2">Step {step + 1} of {STEPS.length}</p>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {step === 0 && <WelcomeStep />}
          {step === 1 && (
            <LearningStyleStep
              selected={learningStyle}
              onSelect={setLearningStyle}
            />
          )}
          {step === 2 && (
            <CareerTrackStep
              selected={careerTrack}
              onSelect={setCareerTrack}
            />
          )}
          {step === 3 && (
            <DailyGoalStep
              value={dailyGoal}
              onChange={setDailyGoal}
            />
          )}
          {step === 4 && <ReadyStep />}

          <div className="flex justify-between pt-4">
            {step > 0 ? (
              <Button
                variant="ghost"
                onClick={handleBack}
                className="text-zinc-400 hover:text-white"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
            ) : (
              <div />
            )}

            {step < STEPS.length - 1 ? (
              <Button
                onClick={handleNext}
                disabled={!canProceed()}
                className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500"
              >
                Continue
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            ) : (
              <Button
                onClick={handleComplete}
                disabled={loading}
                className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500"
              >
                {loading ? 'Starting...' : 'Start Learning'}
                <Sparkles className="w-4 h-4 ml-2" />
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function WelcomeStep() {
  return (
    <div className="text-center space-y-4">
      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center mx-auto">
        <span className="text-3xl">🎯</span>
      </div>
      <CardTitle className="text-2xl text-white">Welcome to AI Mastery Academy!</CardTitle>
      <CardDescription className="text-zinc-400 text-base">
        Let&apos;s personalize your learning journey. This will only take a minute.
      </CardDescription>
    </div>
  )
}

function LearningStyleStep({
  selected,
  onSelect,
}: {
  selected: LearningStyle | null
  onSelect: (style: LearningStyle) => void
}) {
  const styles: { value: LearningStyle; icon: string; title: string; desc: string }[] = [
    {
      value: 'visual',
      icon: '👁️',
      title: 'Visual Learner',
      desc: 'I learn best with diagrams, videos, and visual examples',
    },
    {
      value: 'auditory',
      icon: '👂',
      title: 'Auditory Learner',
      desc: 'I prefer listening to explanations and discussions',
    },
    {
      value: 'kinesthetic',
      icon: '🖐️',
      title: 'Hands-on Learner',
      desc: 'I learn by doing, experimenting, and practicing',
    },
  ]

  return (
    <div className="space-y-4">
      <div className="text-center">
        <CardTitle className="text-xl text-white">How do you learn best?</CardTitle>
        <CardDescription className="text-zinc-400">
          We&apos;ll adapt content to your preferred style
        </CardDescription>
      </div>

      <div className="space-y-3">
        {styles.map((style) => (
          <button
            key={style.value}
            onClick={() => onSelect(style.value)}
            className={`w-full p-4 rounded-xl border text-left transition-all ${
              selected === style.value
                ? 'border-violet-500 bg-violet-500/10'
                : 'border-zinc-700 bg-zinc-800/50 hover:border-zinc-600'
            }`}
          >
            <div className="flex items-center gap-4">
              <span className="text-2xl">{style.icon}</span>
              <div>
                <p className="font-medium text-white">{style.title}</p>
                <p className="text-sm text-zinc-400">{style.desc}</p>
              </div>
              {selected === style.value && (
                <Check className="w-5 h-5 text-violet-400 ml-auto" />
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}

function CareerTrackStep({
  selected,
  onSelect,
}: {
  selected: CareerTrack | null
  onSelect: (track: CareerTrack) => void
}) {
  const tracks: { value: CareerTrack; icon: string; title: string; desc: string }[] = [
    {
      value: 'freelancer',
      icon: '💼',
      title: 'Freelancer',
      desc: 'I want to offer AI services to clients',
    },
    {
      value: 'entrepreneur',
      icon: '🚀',
      title: 'Entrepreneur',
      desc: 'I want to build AI-powered products',
    },
    {
      value: 'career',
      icon: '📈',
      title: 'Career Growth',
      desc: 'I want to advance my career with AI skills',
    },
    {
      value: 'hobbyist',
      icon: '🎨',
      title: 'Hobbyist',
      desc: 'I&apos;m learning AI for fun and personal projects',
    },
  ]

  return (
    <div className="space-y-4">
      <div className="text-center">
        <CardTitle className="text-xl text-white">What&apos;s your goal?</CardTitle>
        <CardDescription className="text-zinc-400">
          This helps us recommend the right content for you
        </CardDescription>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {tracks.map((track) => (
          <button
            key={track.value}
            onClick={() => onSelect(track.value)}
            className={`p-4 rounded-xl border text-left transition-all ${
              selected === track.value
                ? 'border-violet-500 bg-violet-500/10'
                : 'border-zinc-700 bg-zinc-800/50 hover:border-zinc-600'
            }`}
          >
            <span className="text-2xl block mb-2">{track.icon}</span>
            <p className="font-medium text-white text-sm">{track.title}</p>
            <p className="text-xs text-zinc-400 mt-1">{track.desc}</p>
          </button>
        ))}
      </div>
    </div>
  )
}

function DailyGoalStep({
  value,
  onChange,
}: {
  value: number
  onChange: (value: number) => void
}) {
  const options = [5, 10, 15, 30, 60]

  return (
    <div className="space-y-4">
      <div className="text-center">
        <CardTitle className="text-xl text-white">Daily learning goal</CardTitle>
        <CardDescription className="text-zinc-400">
          How many minutes can you dedicate each day?
        </CardDescription>
      </div>

      <div className="flex justify-center gap-3">
        {options.map((minutes) => (
          <button
            key={minutes}
            onClick={() => onChange(minutes)}
            className={`w-14 h-14 rounded-xl border font-medium transition-all ${
              value === minutes
                ? 'border-violet-500 bg-violet-500/10 text-violet-400'
                : 'border-zinc-700 bg-zinc-800/50 text-zinc-300 hover:border-zinc-600'
            }`}
          >
            {minutes}
          </button>
        ))}
      </div>

      <p className="text-center text-sm text-zinc-500">
        {value} minutes per day • {Math.round(value * 7 / 60)} hours per week
      </p>
    </div>
  )
}

function ReadyStep() {
  return (
    <div className="text-center space-y-4">
      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center mx-auto">
        <Check className="w-8 h-8 text-white" />
      </div>
      <CardTitle className="text-2xl text-white">You&apos;re all set!</CardTitle>
      <CardDescription className="text-zinc-400 text-base">
        Your personalized learning path is ready. Start with the Foundation track to master the basics of AI.
      </CardDescription>

      <div className="p-4 rounded-xl bg-zinc-800/50 border border-zinc-700 text-left">
        <p className="text-sm font-medium text-white mb-1">🎯 Your first quest awaits:</p>
        <p className="text-sm text-zinc-400">What is AI? - Learn the fundamentals</p>
      </div>
    </div>
  )
}
