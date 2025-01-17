import { create } from 'zustand';

type CreateBucketStore = {
  title: string | undefined;
  tagType: string;
  date: Date | undefined;
  isDueDate: boolean | undefined;
  howTo: 'MONEY' | 'EFFORT' | 'WILL' | undefined;
  autoAllocate: boolean;
  cycleOpt1: string;
  cycleOpt2: string;
  allocateAmount: number | undefined;
  goalAmount: number | undefined;

  setTitle: (value: string) => void;
  setTagType: (value: string) => void;
  setDate: (value: Date | undefined) => void;
  setIsDueDate: (value: boolean) => void;
  setHowTo: (value: 'MONEY' | 'EFFORT' | 'WILL') => void;
  setAutoAllocate: (value: boolean) => void;
  setCycleOpt1: (value: string) => void;
  setCycleOpt2: (value: string) => void;
  setAllocateAmount: (value: number) => void;
  setGoalAmount: (value: number) => void;
};

const useCreateBucketStore = create<CreateBucketStore>()((set) => ({
  title: undefined,
  tagType: 'Default',
  date: undefined,
  isDueDate: undefined,
  howTo: undefined,
  autoAllocate: false,
  cycleOpt1: 'Default',
  cycleOpt2: 'Default',
  allocateAmount: undefined,
  goalAmount: undefined,

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
}));

export default useCreateBucketStore;
