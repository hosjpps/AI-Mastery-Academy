'use client'

import dynamic from 'next/dynamic'
import { useQuestStore } from '@/stores/questStore'

// Dynamic import - AI Coach loads only when needed, not on initial page load
const AICoachWidget = dynamic(
  () => import('./ai-coach-widget').then((mod) => mod.AICoachWidget),
  {
    ssr: false,
    loading: () => null, // No loading indicator - widget appears when ready
  }
)

export function AICoachProvider() {
  const currentQuest = useQuestStore((state) => state.currentQuest)

  return <AICoachWidget questContext={currentQuest || undefined} />
}
