// store/surveyStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface SurveyState {
  // 하나의 질문에 대해 여러 값을 배열로 저장
  answers: Record<string, number[]>;
  selectedIds: Record<string, string[]>;
  setAnswer: (
    questionId: string,
    value: number,
    selectedId: string,
    isMulti?: boolean
  ) => void;
  clearAnswers: () => void;
  getTotalScore: () => number;
}

export const useSurveyStore = create<SurveyState>()(
  persist(
    (set, get) => ({
      answers: {},
      selectedIds: {},

      setAnswer: (questionId, value, selectedId, isMulti = false) =>
        set((state) => {
          const currentAnswers = state.answers[questionId] || [];
          const currentIds = state.selectedIds[questionId] || [];

          if (!isMulti) {
            // 단일 선택: 항상 배열을 새로 교체
            return {
              ...state,
              answers: { ...state.answers, [questionId]: [value] },
              selectedIds: { ...state.selectedIds, [questionId]: [selectedId] },
            };
          } else {
            // 다중 선택(체크박스) -> 이미 있으면 제거, 없으면 추가
            const index = currentIds.indexOf(selectedId);
            const hasSelected = index !== -1;

            if (hasSelected) {
              // 제거
              const updatedIds = [...currentIds];
              updatedIds.splice(index, 1);

              const updatedAnswers = [...currentAnswers];
              updatedAnswers.splice(index, 1);

              return {
                ...state,
                answers: { ...state.answers, [questionId]: updatedAnswers },
                selectedIds: { ...state.selectedIds, [questionId]: updatedIds },
              };
            } else {
              // 추가
              return {
                ...state,
                answers: {
                  ...state.answers,
                  [questionId]: [...currentAnswers, value],
                },
                selectedIds: {
                  ...state.selectedIds,
                  [questionId]: [...currentIds, selectedId],
                },
              };
            }
          }
        }),

      clearAnswers: () => ({ answers: {}, selectedIds: {} }),

      getTotalScore: () => {
        const { answers } = get();
        return Object.values(answers).reduce((total, nums) => {
          return total + nums.reduce((acc, val) => acc + val, 0);
        }, 0);
      },
    }),
    {
      name: 'survey-storage',
    }
  )
);
