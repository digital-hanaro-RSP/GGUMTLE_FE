import { create } from 'zustand';

interface SignUpForm {
  name: string;
  birthDate: string;
  gender: string;
  tel: string;
  password: string;
  nickname: string;
}

interface SignUpStore {
  formData: Partial<SignUpForm>;
  setBasicInfo: (name: string, birthDate: string, gender: string) => void;
  setPhoneInfo: (tel: string) => void;
  setFinalInfo: (password: string, nickname: string) => void;
  resetForm: () => void;
}

export const useSignUpStore = create<SignUpStore>((set) => ({
  formData: {},
  setBasicInfo: (name, birthDate, gender) =>
    set((state) => ({
      formData: {
        ...state.formData,
        name,
        birthDate,
        gender,
      },
    })),
  setPhoneInfo: (tel) =>
    set((state) => ({
      formData: {
        ...state.formData,
        tel,
      },
    })),
  setFinalInfo: (password, nickname) =>
    set((state) => ({
      formData: {
        ...state.formData,
        password,
        nickname,
      },
    })),
  resetForm: () => set({ formData: {} }),
}));
