// app/api/auth/[...nextauth]/route.ts
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
        token.jwt = user.jwt;
        token.id = user.id;
        token.permission = user.permission;
        token.refreshToken = user.refreshToken;
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
    maxAge: 60 * 60, // 1 hour
  },
});
