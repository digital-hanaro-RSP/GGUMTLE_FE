import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface SurveyState {
  answers: Record<string, number>;
  setAnswer: (questionId: string, value: number) => void;
  clearAnswers: () => void;
  getTotalScore: () => number;
}

export const useSurveyStore = create<SurveyState>()(
  persist(
    (set, get) => ({
      answers: {},
      setAnswer: (questionId: string, value: number) =>
        set((state) => ({
          answers: { ...state.answers, [questionId]: value },
        })),
      clearAnswers: () => set({ answers: {} }),
      getTotalScore: () => {
        const { answers } = get();
        return Object.values(answers).reduce((sum, value) => sum + value, 0);
      },
    }),
    {
      name: 'survey-storage',
    }
  )
);
