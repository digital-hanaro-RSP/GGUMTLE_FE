import { bucketListTagType, RecommendBucketListType } from '@/types/BucketList';
import { create } from 'zustand';

type RecommendBucketStoreState = {
  Popular: RecommendBucketListType[];
  Do: RecommendBucketListType[];
  Be: RecommendBucketListType[];
  Go: RecommendBucketListType[];
  Have: RecommendBucketListType[];
  Learn: RecommendBucketListType[];
};

type RecommendBucketStoreAction = {
  setPopular: (value: RecommendBucketListType[]) => void;
  setDo: (value: RecommendBucketListType[]) => void;
  setBe: (value: RecommendBucketListType[]) => void;
  setGo: (value: RecommendBucketListType[]) => void;
  setHave: (value: RecommendBucketListType[]) => void;
  setLearn: (value: RecommendBucketListType[]) => void;
  reset: () => void;
};

const initialState: RecommendBucketStoreState = {
  Popular: [],
  Do: [],
  Be: [],
  Go: [],
  Have: [],
  Learn: [],
};

const useRecommendBucketStore = create<
  RecommendBucketStoreState & RecommendBucketStoreAction
>()((set) => ({
  ...initialState,
  setPopular: (value) => set({ Popular: value }),
  setDo: (value) => set({ Do: value }),
  setBe: (value) => set({ Be: value }),
  setGo: (value) => set({ Go: value }),
  setHave: (value) => set({ Have: value }),
  setLearn: (value) => set({ Learn: value }),
  reset: () => {
    set(initialState);
  },
}));

export default useRecommendBucketStore;
