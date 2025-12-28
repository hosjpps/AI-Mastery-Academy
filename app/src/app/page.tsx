import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  ArrowRight,
  Sparkles,
  Target,
  Zap,
  Trophy,
  Brain,
  MessageCircle,
  CheckCircle2,
  Play,
  BookOpen,
  Award,
  Users,
  Clock,
  Star,
  ChevronDown
} from 'lucide-react'

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
            <nav className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-sm text-zinc-400 hover:text-white transition-colors">Features</a>
              <a href="#how-it-works" className="text-sm text-zinc-400 hover:text-white transition-colors">How It Works</a>
              <a href="#tracks" className="text-sm text-zinc-400 hover:text-white transition-colors">Tracks</a>
              <a href="#faq" className="text-sm text-zinc-400 hover:text-white transition-colors">FAQ</a>
            </nav>
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
            <a href="#how-it-works">
              <Button size="lg" variant="outline" className="w-full sm:w-auto border-zinc-700 text-zinc-300 hover:bg-zinc-800 text-lg px-8">
                See How It Works
              </Button>
            </a>
          </div>

          <p className="mt-6 text-sm text-zinc-500">
            No credit card required. Start with our free Foundation track.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 border-y border-zinc-800/50 bg-zinc-900/30">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <StatCard number="10+" label="Interactive Quests" icon={<BookOpen className="w-5 h-5" />} />
            <StatCard number="925" label="XP to Earn" icon={<Zap className="w-5 h-5" />} />
            <StatCard number="24/7" label="AI Coach Support" icon={<MessageCircle className="w-5 h-5" />} />
            <StatCard number="100%" label="Free Foundation" icon={<Award className="w-5 h-5" />} />
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4 bg-violet-500/10 text-violet-400 border-violet-500/20">
              Features
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
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

      {/* How It Works */}
      <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8 bg-zinc-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4 bg-violet-500/10 text-violet-400 border-violet-500/20">
              How It Works
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Your Journey to AI Mastery
            </h2>
            <p className="text-zinc-400 max-w-2xl mx-auto">
              From complete beginner to AI power user in just a few steps.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <StepCard
              number={1}
              title="Create Account"
              description="Sign up free and tell us about your learning goals and style preferences."
              icon={<Users className="w-6 h-6" />}
            />
            <StepCard
              number={2}
              title="Start Foundation"
              description="Begin with the AI Foundation track - 10 quests covering all the basics."
              icon={<Play className="w-6 h-6" />}
            />
            <StepCard
              number={3}
              title="Complete Quests"
              description="Learn theory, practice with real AI, and get instant feedback on your work."
              icon={<CheckCircle2 className="w-6 h-6" />}
            />
            <StepCard
              number={4}
              title="Level Up"
              description="Earn XP, unlock badges, climb the leaderboard, and master advanced skills."
              icon={<Trophy className="w-6 h-6" />}
            />
          </div>
        </div>
      </section>

      {/* AI Coach Preview */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge variant="secondary" className="mb-4 bg-violet-500/10 text-violet-400 border-violet-500/20">
                AI Coach
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
                Your Personal AI Learning Assistant
              </h2>
              <p className="text-zinc-400 mb-8">
                Never get stuck again. Our AI Coach is available 24/7 to help you understand concepts,
                provide hints on quests, and guide you through challenging material.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                  <span className="text-zinc-300">Get instant answers to your questions</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                  <span className="text-zinc-300">Request hints without spoiling the solution</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                  <span className="text-zinc-300">Understand complex concepts with simple explanations</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                  <span className="text-zinc-300">Get personalized learning recommendations</span>
                </li>
              </ul>
            </div>
            <div className="relative">
              <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 shadow-2xl">
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-zinc-800">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">AI Coach</h4>
                    <p className="text-xs text-green-400">Online</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-end">
                    <div className="bg-violet-600 text-white px-4 py-2 rounded-2xl rounded-br-md max-w-xs">
                      How do I write better prompts?
                    </div>
                  </div>
                  <div className="flex justify-start">
                    <div className="bg-zinc-800 text-zinc-200 px-4 py-3 rounded-2xl rounded-bl-md max-w-sm">
                      Great question! The key to better prompts is the RICE framework:
                      <strong className="text-violet-400"> Role, Instructions, Context, Examples</strong>.
                      Would you like me to explain each part?
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <div className="bg-violet-600 text-white px-4 py-2 rounded-2xl rounded-br-md max-w-xs">
                      Yes, please explain!
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute -z-10 inset-0 bg-gradient-to-r from-violet-500/20 to-indigo-500/20 blur-3xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Tracks Preview */}
      <section id="tracks" className="py-20 px-4 sm:px-6 lg:px-8 bg-zinc-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4 bg-violet-500/10 text-violet-400 border-violet-500/20">
              Learning Tracks
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
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
              xp={925}
              status="available"
            />
            <TrackCard
              icon="✍️"
              title="Content Creation"
              description="Create amazing content with AI tools"
              quests={25}
              xp={2500}
              status="coming"
            />
            <TrackCard
              icon="⚡"
              title="Automation"
              description="Automate workflows and processes"
              quests={25}
              xp={2500}
              status="coming"
            />
            <TrackCard
              icon="💻"
              title="Development"
              description="Build applications with AI"
              quests={30}
              xp={3000}
              status="coming"
            />
          </div>
        </div>
      </section>

      {/* Quest Preview */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4 bg-violet-500/10 text-violet-400 border-violet-500/20">
              Quest Preview
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              What You&apos;ll Learn
            </h2>
            <p className="text-zinc-400 max-w-2xl mx-auto">
              Here&apos;s a sneak peek at some quests from the Foundation track.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <QuestPreviewCard
              title="What is AI?"
              description="Understand the fundamentals of artificial intelligence and how it works."
              xp={50}
              difficulty="Beginner"
              time="10 min"
            />
            <QuestPreviewCard
              title="Your First Prompt"
              description="Write your first AI prompt and learn the basics of prompt structure."
              xp={75}
              difficulty="Beginner"
              time="15 min"
            />
            <QuestPreviewCard
              title="The RICE Framework"
              description="Master the Role-Instructions-Context-Examples framework for better prompts."
              xp={100}
              difficulty="Beginner"
              time="20 min"
            />
            <QuestPreviewCard
              title="Context is King"
              description="Learn the 5W1H method to provide perfect context in your prompts."
              xp={100}
              difficulty="Intermediate"
              time="20 min"
            />
            <QuestPreviewCard
              title="Output Formatting"
              description="Control AI output format - JSON, tables, lists, and more."
              xp={100}
              difficulty="Intermediate"
              time="25 min"
            />
            <QuestPreviewCard
              title="Iterative Prompting"
              description="Master the art of refining prompts through conversation."
              xp={125}
              difficulty="Advanced"
              time="30 min"
            />
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-zinc-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4 bg-violet-500/10 text-violet-400 border-violet-500/20">
              Testimonials
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Loved by Learners
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <TestimonialCard
              quote="Finally, an AI course that doesn't feel like a boring lecture. The quest system keeps me coming back every day!"
              author="Sarah K."
              role="Marketing Manager"
              stars={5}
            />
            <TestimonialCard
              quote="The AI Coach is a game-changer. Whenever I'm stuck, I get instant help that actually makes sense."
              author="Mike T."
              role="Freelance Writer"
              stars={5}
            />
            <TestimonialCard
              quote="I went from AI-curious to AI-confident in just two weeks. The gamification really works!"
              author="Lisa M."
              role="Small Business Owner"
              stars={5}
            />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4 bg-violet-500/10 text-violet-400 border-violet-500/20">
              FAQ
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4">
            <FAQItem
              question="Is AI Mastery Academy really free?"
              answer="Yes! The Foundation track with 10 quests is completely free. No credit card required. Premium tracks with advanced content will be available for subscribers in the future."
            />
            <FAQItem
              question="Do I need any prior AI experience?"
              answer="Not at all! We start from the very basics. If you've never used AI tools before, that's perfectly fine. Our Foundation track is designed for complete beginners."
            />
            <FAQItem
              question="How long does it take to complete the Foundation track?"
              answer="Most learners complete the Foundation track in 1-2 weeks, spending about 15-30 minutes per day. But you can go at your own pace!"
            />
            <FAQItem
              question="What makes this different from YouTube tutorials?"
              answer="Unlike passive video watching, our quests require you to practice. You write real prompts, get AI feedback, and actually build skills. Plus, gamification keeps you motivated."
            />
            <FAQItem
              question="Can I use this for my team?"
              answer="Currently, AI Mastery Academy is designed for individual learners. Team features and enterprise plans are on our roadmap for the future."
            />
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-violet-900/20 to-indigo-900/20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Ready to Master AI?
          </h2>
          <p className="text-lg text-zinc-400 mb-10 max-w-2xl mx-auto">
            Join thousands of learners who are already leveling up their AI skills.
            Start your journey today - it&apos;s free!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register">
              <Button size="lg" className="w-full sm:w-auto bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white text-lg px-10">
                Create Free Account
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
          <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-zinc-500">
            <span className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-green-400" />
              No credit card required
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-green-400" />
              10 free quests
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-green-400" />
              AI Coach included
            </span>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8 border-t border-zinc-800/50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center">
                  <span className="text-lg">🎯</span>
                </div>
                <span className="font-bold text-white">AI Mastery</span>
              </div>
              <p className="text-sm text-zinc-500">
                Master AI skills through gamified learning.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-zinc-500">
                <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#tracks" className="hover:text-white transition-colors">Tracks</a></li>
                <li><a href="#faq" className="hover:text-white transition-colors">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-zinc-500">
                <li><Link href="/about" className="hover:text-white transition-colors">About</Link></li>
                <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-zinc-500">
                <li><Link href="/terms" className="hover:text-white transition-colors">Terms</Link></li>
                <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-zinc-500">
              © {new Date().getFullYear()} AI Mastery Academy. All rights reserved.
            </p>
            <p className="text-sm text-zinc-600">
              Made with ❤️ for AI learners worldwide
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

function StatCard({
  number,
  label,
  icon,
}: {
  number: string
  label: string
  icon: React.ReactNode
}) {
  return (
    <div className="text-center">
      <div className="flex items-center justify-center gap-2 mb-2">
        <span className="text-violet-400">{icon}</span>
        <span className="text-2xl sm:text-3xl font-bold text-white">{number}</span>
      </div>
      <p className="text-sm text-zinc-500">{label}</p>
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
    <div className="p-6 rounded-xl border border-zinc-800 bg-zinc-900/50 hover:border-violet-500/30 transition-colors group">
      <div className="w-12 h-12 rounded-lg bg-violet-500/10 flex items-center justify-center text-violet-400 mb-4 group-hover:bg-violet-500/20 transition-colors">
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
      <p className="text-zinc-400 text-sm">{description}</p>
    </div>
  )
}

function StepCard({
  number,
  title,
  description,
  icon,
}: {
  number: number
  title: string
  description: string
  icon: React.ReactNode
}) {
  return (
    <div className="relative p-6 rounded-xl border border-zinc-800 bg-zinc-900/50 text-center">
      <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 flex items-center justify-center text-white font-bold text-sm">
        {number}
      </div>
      <div className="w-12 h-12 rounded-lg bg-violet-500/10 flex items-center justify-center text-violet-400 mb-4 mx-auto mt-4">
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
  xp,
  status,
}: {
  icon: string
  title: string
  description: string
  quests: number
  xp: number
  status: 'available' | 'coming'
}) {
  return (
    <div className={`p-6 rounded-xl border ${status === 'available' ? 'border-violet-500/30 bg-violet-500/5' : 'border-zinc-800 bg-zinc-900/50'} transition-colors`}>
      <div className="text-3xl mb-4">{icon}</div>
      <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
      <p className="text-zinc-400 text-sm mb-4">{description}</p>
      <div className="flex items-center gap-4 mb-4 text-xs text-zinc-500">
        <span>{quests} quests</span>
        <span>•</span>
        <span>{xp} XP</span>
      </div>
      {status === 'available' ? (
        <Badge className="bg-green-500/10 text-green-400 border-green-500/20">Available Now</Badge>
      ) : (
        <Badge variant="secondary" className="bg-zinc-800 text-zinc-400">Coming Soon</Badge>
      )}
    </div>
  )
}

function QuestPreviewCard({
  title,
  description,
  xp,
  difficulty,
  time,
}: {
  title: string
  description: string
  xp: number
  difficulty: string
  time: string
}) {
  return (
    <div className="p-5 rounded-xl border border-zinc-800 bg-zinc-900/50 hover:border-violet-500/30 transition-colors">
      <div className="flex items-center justify-between mb-3">
        <Badge
          variant="secondary"
          className={`text-xs ${
            difficulty === 'Beginner'
              ? 'bg-green-500/10 text-green-400'
              : difficulty === 'Intermediate'
              ? 'bg-yellow-500/10 text-yellow-400'
              : 'bg-red-500/10 text-red-400'
          }`}
        >
          {difficulty}
        </Badge>
        <span className="text-xs text-zinc-500 flex items-center gap-1">
          <Clock className="w-3 h-3" />
          {time}
        </span>
      </div>
      <h3 className="font-semibold text-white mb-2">{title}</h3>
      <p className="text-zinc-400 text-sm mb-3">{description}</p>
      <div className="flex items-center gap-1 text-violet-400 text-sm">
        <Zap className="w-4 h-4" />
        <span>{xp} XP</span>
      </div>
    </div>
  )
}

function TestimonialCard({
  quote,
  author,
  role,
  stars,
}: {
  quote: string
  author: string
  role: string
  stars: number
}) {
  return (
    <div className="p-6 rounded-xl border border-zinc-800 bg-zinc-900/50">
      <div className="flex gap-1 mb-4">
        {Array.from({ length: stars }).map((_, i) => (
          <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
        ))}
      </div>
      <p className="text-zinc-300 mb-6">&ldquo;{quote}&rdquo;</p>
      <div>
        <p className="font-semibold text-white">{author}</p>
        <p className="text-sm text-zinc-500">{role}</p>
      </div>
    </div>
  )
}

function FAQItem({
  question,
  answer,
}: {
  question: string
  answer: string
}) {
  return (
    <details className="group p-6 rounded-xl border border-zinc-800 bg-zinc-900/50">
      <summary className="flex items-center justify-between cursor-pointer list-none">
        <span className="font-semibold text-white pr-4">{question}</span>
        <ChevronDown className="w-5 h-5 text-zinc-400 group-open:rotate-180 transition-transform flex-shrink-0" />
      </summary>
      <p className="mt-4 text-zinc-400">{answer}</p>
    </details>
  )
}
