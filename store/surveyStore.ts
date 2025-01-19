import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// store/surveyStore.ts
interface SurveyState {
  answers: Record<string, number>;
  selectedIds: Record<string, string>; // 추가
  setAnswer: (questionId: string, value: number, selectedId: string) => void; // 수정
  clearAnswers: () => void;
  getTotalScore: () => number;
}

export const useSurveyStore = create<SurveyState>()(
  persist(
    (set, get) => ({
      answers: {},
      selectedIds: {}, // 추가
      setAnswer: (
        questionId: string,
        value: number,
        selectedId: string // 수정
      ) =>
        set((state) => ({
          answers: { ...state.answers, [questionId]: value },
          selectedIds: { ...state.selectedIds, [questionId]: selectedId },
        })),
      clearAnswers: () => set({ answers: {}, selectedIds: {} }), // 수정
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
