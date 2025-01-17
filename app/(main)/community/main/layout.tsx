'use client';

import { PlusButton } from '@/components/atoms/Button';
import CategoryTag from '@/components/atoms/CategoryTag';
import CommunityHeader, { Tab } from '@/components/atoms/CommunityHeader';
import Header from '@/components/atoms/Header';
import { SearchInpuRef } from '@/components/atoms/Inputs';
import { AddNewCard } from '@/components/molecules/AddNewCard';
import { useCategoryStore } from '@/store/useCategoryStore';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

export default function CommunityMainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isAdd, setIsAdd] = useState(false);
  const [isSearchVisible, setIsSearchVisible] = useState(true);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const categories = ['전체', '여행', '재테크', '노후', '교육', '취미'];
  const router = useRouter();
  const pathname = usePathname();
  const { selectedCategory, setSelectedCategory } = useCategoryStore();

  const currentTab = (pathname.split('/').pop() as Tab) || 'popular';

  const handleTabChange = (tab: Tab) => router.push(`/community/main/${tab}`);

  useEffect(() => {
    const handleScroll = () => {
      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          if (currentScrollY > lastScrollY.current && currentScrollY > 20) {
            setIsSearchVisible(false);
          } else if (currentScrollY < lastScrollY.current) {
            setIsSearchVisible(true);
          }
          lastScrollY.current = currentScrollY;
          ticking.current = false;
        });
        ticking.current = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className='flex flex-col min-h-[calc(100vh-58px)] relative'>
      {/* 배경 영역 */}
      <div
        className={`fixed mx-auto max-w-screen-md inset-0 ${
          isSearchVisible ? 'h-[262px]' : 'h-[134px]'
        } bg-white bg-opacity-30 backdrop-blur-3xl z-10 transform transition-all duration-300 ease-in-out`}
      />

      {/* 상단 헤더 */}
      <div className='fixed top-0 left-0 right-0 z-10'>
        <div className='mx-auto max-w-screen-md'>
          <Header text='커뮤니티' showActionButton={false} bgNone={true} />
        </div>
      </div>

      <div className='mt-[44px]'>
        {/* 검색 및 탭 영역 */}
        <div
          className={`fixed top-[44px] left-0 right-0 z-10 ${
            isSearchVisible ? 'slide-animation' : 'slide-animation-out'
          }`}
        >
          <div className='mx-auto max-w-screen-md'>
            <div className='flex flex-col gap-[20px] '>
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
          </div>
        </div>

        {/* 카테고리 태그 영역 */}
        <div
          className={`fixed top-[154px] left-0 right-0 z-10 transform transition-transform duration-300 ease-in-out ${
            isSearchVisible ? 'translate-y-0' : '-translate-y-[111px]'
          }`}
        >
          <div className='mx-auto max-w-screen-md'>
            <div
              className={`flex flex-col w-full px-[20px] ${isSearchVisible ? 'py-[10px]' : ''} `}
            >
              <div className='flex items-center justify-between gap-[20px] overflow-x-scroll scrollbar-hide'>
                {categories.map((category) => (
                  <CategoryTag
                    key={category}
                    content={category}
                    isContentShow={isSearchVisible}
                    isSelected={selectedCategory === category}
                    onClick={() => setSelectedCategory(category)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 메인 콘텐츠 */}
      <div className='flex-1 pt-[220px] pb-[20px]'>{children}</div>

      {/* 플러스 버튼 */}
      <div className='fixed left-0 right-0 bottom-[68px] max-w-screen-md mx-auto pointer-events-none'>
        <PlusButton
          className='absolute bottom-[20px] right-[20px] pointer-events-auto'
          size='sm'
          onClick={() => setIsAdd(true)}
        />
      </div>

      {/* 추가 카드 모달 */}
      {isAdd && (
        <div
          className='bg-black/70 fixed mx-auto w-full md:w-[768px] h-full z-[123] flex gap-4 justify-center items-center sm:px-[100px] md:px-[150px]'
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsAdd(false);
          }}
        >
          <AddNewCard
            usage='newPost'
            size='md'
            className='h-[100px]'
            onClick={() => router.push('/community/create/post')}
          />
          <AddNewCard
            usage='newGroup'
            size='md'
            className='h-[100px]'
            onClick={() => router.push('/community/create/group')}
          />
        </div>
      )}
    </div>
  );
}
