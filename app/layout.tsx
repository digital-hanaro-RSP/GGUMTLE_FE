// app/layout.tsx
import { SessionProvider } from 'next-auth/react';
import type { Metadata } from 'next';
import { auth } from '@/lib/auth';
import './globals.css';

export const metadata: Metadata = {
  title: '꿈틀',
  description: '버킷리스트를 통한 자산 관리 서비스',
  icons: {
    icon: '/image/icons/favicon.png'
  },
};

// app/layout.tsx
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  return (
    <SessionProvider session={session}>
      <html lang='ko'>
        <body className='bg-white min-h-screen text-black'>{children}</body>
      </html>
    </SessionProvider>
  );
}
