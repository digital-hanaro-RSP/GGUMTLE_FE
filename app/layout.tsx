// app/layout.tsx
import Navigation from '@/components/layout/Navigation';
import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: '꿈틀',
  description: '버킷리스트를 통한 자산 관리 서비스',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='ko'>
      <body className='bg-background min-h-screen pb-16'>
        <main>{children}</main>
        <Navigation />
      </body>
    </html>
  );
}
