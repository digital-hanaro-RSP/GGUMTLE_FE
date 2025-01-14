'use client';

import CommunityHeader, { Tab } from '@/components/atoms/CommunityHeader';
import Header from '@/components/atoms/Header';
import { SearchInpuRef } from '@/components/atoms/Inputs';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { IoIosArrowDown } from 'react-icons/io';
import { usePathname, useRouter } from 'next/navigation';
import { useRef, useState } from 'react';

export default function CommunityMainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const searchInputRef = useRef<HTMLInputElement>(null);
  const categories = ['전체', '여행', '재테크', '노후', '교육', '취미'];
  const router = useRouter();
  const pathname = usePathname();

  const currentTab = (pathname.split('/').pop() as Tab) || 'popular';

  const handleTabChange = (tab: Tab) => {
    router.push(`/community/main/${tab}`);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    console.log('선택된 카테고리 :', category);
  };

  return (
    <div className='flex flex-col h-screen overflow-hidden'>
      <div className='flex flex-col gap-[20px] bg-white'>
        <Header text='커뮤니티' showActionButton={false} />
        <div className='px-[20px]'>
          <SearchInpuRef
            ref={searchInputRef}
            onSubmit={(e) => {
              e.preventDefault();
              const searchValue = searchInputRef.current?.value || '';
              console.log('검색어:', searchValue);
            }}
          />
        </div>
        <CommunityHeader
          selectedTab={currentTab}
          onTabChange={handleTabChange}
        />
      </div>
      <div className='flex flex-col w-full px-[20px] py-[10px]'>
        <div className='flex w-full justify-end'>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <div className='flex items-center w-[100px] p-[10px] gap-[20px] justify-between bg-white rounded-[10px] border border-primary-placeholder'>
                <span>{selectedCategory}</span>
                <IoIosArrowDown />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className=' min-w-[30px] w-fit px-[10px]'>
              <DropdownMenuLabel>카테고리</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {categories.map((category) => (
                <DropdownMenuItem
                  key={category}
                  onClick={() => handleCategoryChange(category)}
                >
                  {category}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div
        className='
          flex-1
          overflow-y-auto
          pt-[10px]
          pb-[78px]
          scrollbar-hide
        '
      >
        {children}
      </div>
    </div>
  );
}
