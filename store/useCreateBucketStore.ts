import { bucketListHowTo, bucketListTagType } from '@/types/BucketList';
import { create } from 'zustand';

type CreateBucketStoreState = {
  title: string | undefined;
  tagType: bucketListTagType | undefined;
  date: Date | undefined;
  isDueDate: boolean | undefined;
  howTo: bucketListHowTo | undefined;
  autoAllocate: boolean;
  cycleOpt1: string | undefined;
  cycleOpt2: string | undefined;
  allocateAmount: number | undefined;
  goalAmount: number | undefined;
  memo: string | undefined;
};

type CreateBucketStoreAction = {
  setTitle: (value: string) => void;
  setTagType: (value: bucketListTagType | undefined) => void;
  setDate: (value: Date | undefined) => void;
  setIsDueDate: (value: boolean) => void;
  setHowTo: (value: bucketListHowTo) => void;
  setAutoAllocate: (value: boolean) => void;
  setCycleOpt1: (value: string) => void;
  setCycleOpt2: (value: string) => void;
  setAllocateAmount: (value: number) => void;
  setGoalAmount: (value: number) => void;
  setMemo: (value: string) => void;
  reset: () => void;
};

const initialState: CreateBucketStoreState = {
  title: '',
  tagType: undefined,
  date: undefined,
  isDueDate: undefined,
  howTo: undefined,
  autoAllocate: false,
  cycleOpt1: undefined,
  cycleOpt2: undefined,
  allocateAmount: undefined,
  goalAmount: undefined,
  memo: undefined,
};

const useCreateBucketStore = create<
  CreateBucketStoreState & CreateBucketStoreAction
>()((set) => ({
  ...initialState,
  setTitle: (value) => set({ title: value }),
  setTagType: (value) => set({ tagType: value }),
  setDate: (value) => set({ date: value }),
  setIsDueDate: (value) => set({ isDueDate: value }),
  setHowTo: (value) => set({ howTo: value }),
  setAutoAllocate: (value) => set({ autoAllocate: value }),
  setCycleOpt1: (value) => set({ cycleOpt1: value }),
  setCycleOpt2: (value) => set({ cycleOpt2: value }),
  setAllocateAmount: (value) => set({ allocateAmount: value }),
  setGoalAmount: (value) => set({ goalAmount: value }),
  setMemo: (value) => set({ memo: value }),
  reset: () => {
    set(initialState);
  },
}));

export default useCreateBucketStore;
