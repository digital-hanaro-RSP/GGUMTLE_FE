import { create } from 'zustand';

interface SignUpForm {
  name: string;
  birthDate: string;
  gender: 'm' | 'f';
  tel: string;
  password: string;
  nickname: string;
}

interface SignUpStore {
  formData: SignUpForm;
  setBasicInfo: (name: string, birthDate: string, gender: 'm' | 'f') => void;
  setPhoneInfo: (tel: string) => void;
  setFinalInfo: (password: string, nickname: string) => void;
  resetForm: () => void;
}

// 초기값 설정
const initialFormData: SignUpForm = {
  name: '',
  birthDate: '',
  gender: 'm',
  tel: '',
  password: '',
  nickname: '',
};

export const useSignUpStore = create<SignUpStore>((set) => ({
  formData: initialFormData,
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
  resetForm: () => set({ formData: initialFormData }),
}));
