export interface SignUpData {
  name: string;
  birthDate: string;
  gender: 'm' | 'f';
  tel: string;
  password: string;
  nickname: string;
  profileImageUrl: string | null;
}

export interface SignUpResponse {
  code: number;
  error: null | string;
  message: string;
  data: {
    id: string;
    tel: string;
    name: string;
    permission: number;
    birthDate: string;
    gender: 'm' | 'f';
    role: 'user' | 'admin';
    profileImageUrl: string | null;
    nickname: string;
    createdAt: string;
    updatedAt: string;
  };
}
