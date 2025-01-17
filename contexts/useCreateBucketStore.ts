import { create } from 'zustand';

type CreateBucketStore = {
  cycleOpt1: string;
  cycleOpt2: string;
  cycleMoney: number;
  setCycleOpt1: (value: string) => void;
  setCycleOpt2: (value: string) => void;
  setCycleMoney: (value: number) => void;
};

const useCreateBucketStore = create<CreateBucketStore>()((set) => ({
  cycleOpt1: 'Default',
  cycleOpt2: 'Default',
  cycleMoney: 0,
  setCycleOpt1: (value) => set({ cycleOpt1: value }),
  setCycleOpt2: (value) => set({ cycleOpt2: value }),
  setCycleMoney: (value) => set({ cycleMoney: value }),
}));

export default useCreateBucketStore;
