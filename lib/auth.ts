import NextAuth from 'next-auth';
import type { User } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        tel: { label: '전화번호', type: 'text' },
        password: { label: '비밀번호', type: 'password' },
      },
      async authorize(credentials): Promise<User | null> {
        if (!credentials?.tel || !credentials?.password) return null;

        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/data/auth/tokens`,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                tel: credentials.tel,
                password: credentials.password,
              }),
            }
          );

          const data = await response.json();

          if (response.ok && data.code === 200) {
            return {
              id: String(credentials.tel),
              name: String(credentials.tel),
              jwt: data.data.accessToken,
              permission: Number(data.data.permission),
              refreshToken: data.data.refreshToken,
            } as User;
          }

          return null;
        } catch (error: unknown) {
          console.error('Authorization error:', error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      // 최초 로그인 시
      if (user) {
        console.log('>>> [jwt callback] 최초 로그인. 1시간 후 토큰 만료 설정');
        return {
          ...token,
          jwt: user.jwt,
          id: user.id,
          permission: user.permission,
          refreshToken: user.refreshToken,
          exp: Math.floor(Date.now() / 1000) + 3600, // 만료시간을 1시간 후로 설정
        };
      }

      // 토큰이 아직 만료되지 않았다면 그대로 반환
      if (Date.now() < (token.exp as number) * 1000) {
        console.log('>>> [jwt callback] 토큰이 아직 만료되지 않았습니다.');
        return token;
      }

      // 만료되었다면 리프레시 시도
      console.log('>>> [jwt callback] 토큰 만료됨. 리프레시 시도...');
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/data/auth/refresh`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              refreshToken: token.refreshToken,
            }),
          }
        );

        const data = await response.json();

        if (response.ok && data.code === 200) {
          console.log('>>> [jwt callback] 토큰 재발급 성공!');
          return {
            ...token,
            jwt: data.data.accessToken,
            refreshToken: data.data.refreshToken,
            exp: Math.floor(Date.now() / 1000) + 3600, // 새로 1시간 뒤 만료
          };
        } else {
          console.log('>>> [jwt callback] 토큰 재발급 실패');
        }
      } catch (error) {
        console.error('Token refresh error:', error);
      }

      // 리프레시 실패 시 기존 토큰 그대로 반환
      return token;
    },
    async session({ session, token }) {
      session.user = {
        ...session.user,
        jwt: token.jwt as string,
        id: token.id as string,
        permission: token.permission as number,
      };
      return session;
    },
  },
  pages: {
    signIn: '/signin',
  },
  session: {
    strategy: 'jwt',
    maxAge: 3600, // 세션 유효기간 1시간
  },
});
