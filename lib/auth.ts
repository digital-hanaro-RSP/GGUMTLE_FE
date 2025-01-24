import NextAuth from 'next-auth';
import type { User } from 'next-auth';
import type { JWT } from 'next-auth/jwt';
import CredentialsProvider from 'next-auth/providers/credentials';

interface RefreshTokenResponse {
  data: {
    accessToken: string;
    refreshToken: string;
  };
  code: number;
}

async function refreshToken(token: JWT): Promise<JWT> {
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

    const data = (await response.json()) as RefreshTokenResponse;

    if (!response.ok) throw data;

    return {
      ...token,
      jwt: data.data.accessToken,
      refreshToken: data.data.refreshToken,
      expiresAt: Math.floor(Date.now() / 1000 + 60 * 60), // 60분으로 설정
    };
  } catch (error) {
    console.error('RefreshAccessTokenError:', error);
    return {
      ...token,
      error: 'RefreshAccessTokenError',
    };
  }
}

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
    async jwt({ token, user, trigger, session }) {
      // update 호출 시 session 데이터로 token 업데이트
      if (trigger === 'update' && session?.user) {
        return {
          ...token,
          permission: session.user.permission,
        };
      }

      if (user) {
        return {
          jwt: user.jwt,
          id: user.id,
          permission: user.permission,
          refreshToken: user.refreshToken,
          expiresAt: Math.floor(Date.now() / 1000 + 60 * 60),
        } as JWT;
      }

      const currentTimestamp = Date.now() / 1000;
      if (currentTimestamp < token.expiresAt) {
        return token;
      }

      return refreshToken(token);
    },
    async session({ session, token }) {
      if (token.error) {
        return {
          ...session,
          error: token.error,
        };
      }

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
    maxAge: 24 * 60 * 60, // 60분으로 수정
  },
});
