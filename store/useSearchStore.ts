'use client';

import { create } from 'zustand';

type SearchState = {
  searchInput: string;
  setSearchInput: (search: string) => void;
};

export const useSearchStore = create<SearchState>((set) => ({
  searchInput: '',
  setSearchInput: (search: string) => set(() => ({ searchInput: search })),
}));
