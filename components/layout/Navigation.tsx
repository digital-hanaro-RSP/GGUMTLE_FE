'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navigation() {
  const pathname = usePathname();

  const navigationItems = [
    { href: '/', label: '홈' },
    { href: '/bucket-list', label: '버킷리스트' },
    { href: '/community', label: '커뮤니티' },
    { href: '/support', label: '지원' },
    { href: '/mypage', label: '마이페이지' },
  ];

  return (
    <nav className='fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4'>
      <div className='flex justify-around items-center max-w-screen-xl mx-auto'>
        {navigationItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex flex-col items-center transition-colors ${
              pathname === item.href
                ? 'text-primary-main font-bold'
                : 'text-gray-500'
            }`}
          >
            <span>{item.label}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
}
