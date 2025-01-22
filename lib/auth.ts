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
      if (user) {
        // 최초 로그인 시
        return {
          ...token,
          jwt: user.jwt,
          id: user.id,
          permission: user.permission,
          refreshToken: user.refreshToken,
          exp: Math.floor(Date.now() / 1000) + 3600,
        };
      }

      // 토큰이 만료되지 않았으면 그대로 반환
      if (Date.now() < (token.exp as number) * 1000) {
        return token;
      }

      // 토큰이 만료되었으면 리프레시 시도
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
          console.log('Token refreshed successfully');
          return {
            ...token,
            jwt: data.data.accessToken,
            refreshToken: data.data.refreshToken,
            exp: Math.floor(Date.now() / 1000) + 3600,
          };
        }
      } catch (error) {
        console.error('Token refresh error:', error);
        return token;
      }

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
    maxAge: 24 * 60 * 60, // 세션 유효기간을 24시간으로 설정
  },
});
