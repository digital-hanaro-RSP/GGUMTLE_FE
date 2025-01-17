'use client';

import { GiGraduateCap } from 'react-icons/gi';
import { GoHomeFill } from 'react-icons/go';
import { MdPerson } from 'react-icons/md';
import { PiListChecksFill } from 'react-icons/pi';
import { RiGroup2Fill } from 'react-icons/ri';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavigationProps {
  currentPath?: string;
}

export default function Navigation({ currentPath }: NavigationProps) {
  const pathname = usePathname();
  const activePath = currentPath || pathname;

  const navigationItems = [
    { href: '/', label: '홈', Icon: GoHomeFill },
    { href: '/bucket-list', label: '버킷리스트', Icon: PiListChecksFill },
    { href: '/community/main/popular', label: '커뮤니티', Icon: RiGroup2Fill },
    { href: '/support', label: '지원', Icon: GiGraduateCap },
    { href: '/mypage', label: '마이페이지', Icon: MdPerson },
  ];

  return (
    <nav
      className='z-[200] fixed -bottom-0.5 left-1/2 -translate-x-1/2 w-full max-w-screen-md bg-white bg-opacity-30 backdrop-blur-3xl flex items-center shadow-[0px_0px_8px_2px_rgba(136,137,157,0.30)]'
      style={{ height: '58px' }}
    >
      <div className='flex justify-around items-center w-full'>
        {navigationItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex flex-col items-center gap-1 transition-colors ${
              activePath === item.href
                ? 'text-primary-main font-bold'
                : 'text-[#8297AC]'
            }`}
          >
            <item.Icon
              size={30}
              color={
                activePath === item.href ? 'var(--primary-main)' : '#8297AC'
              }
            />
            <span className='text-xs' style={{ fontSize: '12px' }}>
              {item.label}
            </span>
          </Link>
        ))}
      </div>
    </nav>
  );
}
