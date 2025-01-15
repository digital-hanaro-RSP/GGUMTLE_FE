'use client';

import { PlusButton } from '@/components/atoms/Button';
import CategoryTag from '@/components/atoms/CategoryTag';
import CommunityHeader, { Tab } from '@/components/atoms/CommunityHeader';
import Header from '@/components/atoms/Header';
import { SearchInpuRef } from '@/components/atoms/Inputs';
import { AddNewCard } from '@/components/molecules/AddNewCard';
import { useCategoryStore } from '@/store/useCategoryStore';
import { usePathname, useRouter } from 'next/navigation';
import { useRef, useState } from 'react';

export default function CommunityMainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const [selectedCategory, setSelectedCategory] = useState('전체');
  const [isAdd, setIsAdd] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const categories = ['전체', '여행', '재테크', '노후', '교육', '취미'];
  const router = useRouter();
  const pathname = usePathname();
  const { selectedCategory, setSelectedCategory } = useCategoryStore();

  const currentTab = (pathname.split('/').pop() as Tab) || 'popular';

  const handleTabChange = (tab: Tab) => {
    router.push(`/community/main/${tab}`);
  };

  return (
    <div className='flex flex-col h-[calc(100vh-58px)] overflow-hidden relative'>
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
        <div className='flex justify-between gap-[20px] overflow-x-scroll scrollbar-hide '>
          {categories.map((category) => (
            <CategoryTag
              key={category}
              content={category}
              isSelected={selectedCategory === category}
              onClick={() => setSelectedCategory(category)}
            />
          ))}
        </div>
      </div>
      <div
        className='
          flex-1
          overflow-y-auto
          pt-[10px]
          pb-[20px]
          scrollbar-hide
        '
      >
        {children}
      </div>
      <PlusButton
        className='absolute bottom-[20px] right-[20px]'
        size='sm'
        onClick={() => {
          setIsAdd(true);
        }}
      />
      {isAdd && (
        <div
          className='bg-black/70 absolute top-0 left-0 w-full h-full z-1 flex gap-4 justify-center items-center sm:px-[100px] md:px-[150px]'
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setIsAdd(false);
            }
          }}
        >
          <AddNewCard
            usage='newPost'
            size='md'
            className='h-[100px]'
            onClick={() => {
              router.push('/community/create/post');
            }}
          />
          <AddNewCard
            usage='newGroup'
            size='md'
            className='h-[100px]'
            onClick={() => {
              router.push('/community/create/group');
            }}
          />
        </div>
      )}
    </div>
  );
}
