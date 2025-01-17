// types/next-auth.d.ts
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import NextAuth from 'next-auth';

declare module 'next-auth' {
  interface User {
    id: string;
    name: string;
    jwt: string;
    permission: number;
    refreshToken: string;
  }

  interface Session {
    user: {
      id: string;
      name: string;
      jwt: string;
      permission: number;
    };
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    jwt: string;
    id: string;
    permission: number;
    refreshToken: string;
    exp: number; // 이 줄을 추가
  }
}
