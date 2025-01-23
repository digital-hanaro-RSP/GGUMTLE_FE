'use client';

import { Post } from '@/types/Community';
import { create } from 'zustand';

type PostState = {
  selectedPost: Post | undefined;
  setSelectedPost: (post: Post | undefined) => void;
};

export const usePostStore = create<PostState>((set) => ({
  selectedPost: undefined,
  setSelectedPost: (post: Post | undefined) =>
    set(() => ({ selectedPost: post })),
}));
