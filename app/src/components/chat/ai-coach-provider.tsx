'use client'

import { useQuestStore } from '@/stores/questStore'
import { AICoachWidget } from './ai-coach-widget'

export function AICoachProvider() {
  const currentQuest = useQuestStore((state) => state.currentQuest)

  return <AICoachWidget questContext={currentQuest || undefined} />
}
