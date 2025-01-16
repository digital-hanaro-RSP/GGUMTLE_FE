'use server';

import { AuthError } from 'next-auth';
import { signIn, signOut } from '@/lib/auth';

export { signIn as mySignIn, signOut as mySignOut };

export async function authenticate(
  prevState: string | undefined,
  formData: FormData
) {
  const tel = formData.get('phone');
  const password = formData.get('password');

  if (!tel || !password) {
    return '전화번호와 비밀번호를 입력해주세요.';
  }

  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return '아이디 혹은 비밀번호가 일치하지 않습니다.';
        default:
          return '로그인 중 오류가 발생했습니다.';
      }
    }
    throw error;
  }
}
