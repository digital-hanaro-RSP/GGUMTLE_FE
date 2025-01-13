export type User = {
  id: string;
  tel: string;
  password: string;
  name: string;
  permission: number;
  birthDate: string;
  gender: string;
  role: 'user' | 'admin';
  profileImageUrl?: string;
  nickname: string;
  createdAt: string;
  updatedAt: string;
};
