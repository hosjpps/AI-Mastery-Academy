import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ArrowRight, Sparkles, Target, Zap, Trophy, Brain, MessageCircle } from 'lucide-react'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950">
      {/* Header */}
      <header className="fixed top-0 w-full z-50 border-b border-zinc-800/50 bg-zinc-950/80 backdrop-blur-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center">
                <span className="text-lg">🎯</span>
              </div>
              <span className="font-bold text-lg text-white">AI Mastery</span>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/login">
                <Button variant="ghost" className="text-zinc-300 hover:text-white hover:bg-zinc-800">
                  Sign in
                </Button>
              </Link>
              <Link href="/register">
                <Button className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <Badge variant="secondary" className="mb-6 bg-violet-500/10 text-violet-400 border-violet-500/20">
            <Sparkles className="w-3 h-3 mr-1" />
            Gamified AI Learning
          </Badge>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Master AI Skills
            <br />
            <span className="bg-gradient-to-r from-violet-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
              One Quest at a Time
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-zinc-400 max-w-2xl mx-auto mb-10">
            Learn prompt engineering, AI automation, and more through interactive quests.
            Earn XP, level up, and get personalized guidance from your AI coach.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register">
              <Button size="lg" className="w-full sm:w-auto bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white text-lg px-8">
                Start Learning Free
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="w-full sm:w-auto border-zinc-700 text-zinc-300 hover:bg-zinc-800 text-lg px-8">
              See How It Works
            </Button>
          </div>

          <p className="mt-6 text-sm text-zinc-500">
            No credit card required. Start with our free Foundation track.
          </p>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-t border-zinc-800/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">
              Learning That Feels Like Playing
            </h2>
            <p className="text-zinc-400 max-w-2xl mx-auto">
              We&apos;ve combined proven learning techniques with game mechanics to make AI education actually enjoyable.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Target className="w-6 h-6" />}
              title="Quest-Based Learning"
              description="Complete interactive quests with theory, practice, and real AI challenges. Each quest builds on the last."
            />
            <FeatureCard
              icon={<Zap className="w-6 h-6" />}
              title="Earn XP & Level Up"
              description="Gain experience points for every completed quest. Watch your level grow as you master new skills."
            />
            <FeatureCard
              icon={<Trophy className="w-6 h-6" />}
              title="Streaks & Badges"
              description="Maintain daily streaks for bonus XP. Unlock badges as you hit milestones and show off your achievements."
            />
            <FeatureCard
              icon={<Brain className="w-6 h-6" />}
              title="Adaptive Learning"
              description="Tell us your style - visual, auditory, or hands-on. We adapt content to how you learn best."
            />
            <FeatureCard
              icon={<MessageCircle className="w-6 h-6" />}
              title="AI Coach"
              description="Stuck on a quest? Your personal AI coach provides hints, explanations, and encouragement 24/7."
            />
            <FeatureCard
              icon={<Sparkles className="w-6 h-6" />}
              title="Real AI Practice"
              description="Write real prompts, get AI feedback on your work. Learn by doing, not just reading."
            />
          </div>
        </div>
      </section>

      {/* Tracks Preview */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-zinc-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">
              Choose Your Path
            </h2>
            <p className="text-zinc-400 max-w-2xl mx-auto">
              Start with the Foundation track, then specialize in what matters most to you.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <TrackCard
              icon="🎯"
              title="AI Foundation"
              description="Master the basics of AI and prompt engineering"
              quests={10}
              status="available"
            />
            <TrackCard
              icon="✍️"
              title="Content Creation"
              description="Create amazing content with AI tools"
              quests={25}
              status="coming"
            />
            <TrackCard
              icon="⚡"
              title="Automation"
              description="Automate workflows and processes"
              quests={25}
              status="coming"
            />
            <TrackCard
              icon="💻"
              title="Development"
              description="Build applications with AI"
              quests={30}
              status="coming"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Ready to Start Your AI Journey?
          </h2>
          <p className="text-lg text-zinc-400 mb-10">
            Join thousands of learners mastering AI skills. Free to start, no credit card required.
          </p>
          <Link href="/register">
            <Button size="lg" className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white text-lg px-10">
              Create Free Account
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 px-4 sm:px-6 lg:px-8 border-t border-zinc-800/50">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center">
              <span className="text-xs">🎯</span>
            </div>
            <span className="text-sm text-zinc-400">AI Mastery Academy</span>
          </div>
          <div className="flex items-center gap-6 text-sm text-zinc-500">
            <Link href="/terms" className="hover:text-zinc-300">Terms</Link>
            <Link href="/privacy" className="hover:text-zinc-300">Privacy</Link>
            <Link href="/contact" className="hover:text-zinc-300">Contact</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode
  title: string
  description: string
}) {
  return (
    <div className="p-6 rounded-xl border border-zinc-800 bg-zinc-900/50 hover:border-zinc-700 transition-colors">
      <div className="w-12 h-12 rounded-lg bg-violet-500/10 flex items-center justify-center text-violet-400 mb-4">
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
      <p className="text-zinc-400 text-sm">{description}</p>
    </div>
  )
}

function TrackCard({
  icon,
  title,
  description,
  quests,
  status,
}: {
  icon: string
  title: string
  description: string
  quests: number
  status: 'available' | 'coming'
}) {
  return (
    <div className={`p-6 rounded-xl border ${status === 'available' ? 'border-violet-500/30 bg-violet-500/5' : 'border-zinc-800 bg-zinc-900/50'} transition-colors`}>
      <div className="text-3xl mb-4">{icon}</div>
      <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
      <p className="text-zinc-400 text-sm mb-4">{description}</p>
      <div className="flex items-center justify-between">
        <span className="text-xs text-zinc-500">{quests} quests</span>
        {status === 'available' ? (
          <Badge className="bg-green-500/10 text-green-400 border-green-500/20">Available</Badge>
        ) : (
          <Badge variant="secondary" className="bg-zinc-800 text-zinc-400">Coming Soon</Badge>
        )}
      </div>
    </div>
  )
}
