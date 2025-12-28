import { create } from 'zustand'

type QuestContext = {
  slug: string
  title: string
  description?: string
} | null

type QuestStore = {
  currentQuest: QuestContext
  setCurrentQuest: (quest: QuestContext) => void
  clearCurrentQuest: () => void
}

export const useQuestStore = create<QuestStore>((set) => ({
  currentQuest: null,
  setCurrentQuest: (quest) => set({ currentQuest: quest }),
  clearCurrentQuest: () => set({ currentQuest: null }),
}))
