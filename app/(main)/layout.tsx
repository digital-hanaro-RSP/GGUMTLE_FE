// app/layout.tsx
import Navigation from '@/components/atoms/NavigationBar';
import type { Metadata } from 'next';
import '../globals.css';

export const metadata: Metadata = {
  title: '꿈틀',
  description: '버킷리스트를 통한 자산 관리 서비스',
};

// app/layout.tsx
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='relative mx-auto max-w-screen-md min-h-screen bg-background pb-[58px]'>
      {children}
      <Navigation />
    </div>
  );
}
