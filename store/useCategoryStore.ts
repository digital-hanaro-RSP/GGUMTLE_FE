'use client';

import { create } from 'zustand';

type CategoryState = {
  selectedCategory: string; // 현재 선택된 카테고리
  setSelectedCategory: (category: string) => void; // 카테고리 상태를 변경하는 함수
};

export const useCategoryStore = create<CategoryState>((set) => ({
  // 초기에 선택된 카테고리는 '전체'로 설정
  selectedCategory: '전체',
  setSelectedCategory: (category: string) =>
    set(() => ({ selectedCategory: category })),
}));
