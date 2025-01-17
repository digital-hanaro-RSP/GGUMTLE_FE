import { create } from 'zustand';

type CreateBucketStore = {
  title: string;
  tagType: string;
  cycleOpt1: string;
  cycleOpt2: string;
  cycleMoney: number;
  setTitle: (value: string) => void;
  setTagType: (value: string) => void;
  setCycleOpt1: (value: string) => void;
  setCycleOpt2: (value: string) => void;
  setCycleMoney: (value: number) => void;
};

const useCreateBucketStore = create<CreateBucketStore>()((set) => ({
  title: '',
  tagType: 'Default',
  cycleOpt1: 'Default',
  cycleOpt2: 'Default',
  cycleMoney: 0,
  setTitle: (value) => set({ title: value }),
  setTagType: (value) => set({ tagType: value }),
  setCycleOpt1: (value) => set({ cycleOpt1: value }),
  setCycleOpt2: (value) => set({ cycleOpt2: value }),
  setCycleMoney: (value) => set({ cycleMoney: value }),
}));

export default useCreateBucketStore;
