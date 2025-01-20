'use client';

import ColorChip from '@/components/atoms/ColorChips';
import AccountCard from '@/components/molecules/AccountCard';
import { AddNewCard } from '@/components/molecules/AddNewCard';
import { BucketListCard } from '@/components/molecules/BucketListCard';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { IoIosArrowDown } from 'react-icons/io';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

export default function BucketListPage() {
  const [filter, setFilter] = useState<string>('DEFAULT');
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isAdd, setIsAdd] = useState<boolean>(false);
  const lastScrollY = useRef(0);
  const categories = new Map([
    ['DEFAULT', '전체'],
    ['DO', '해보고 싶다'],
    ['BE', '되고 싶다'],
    ['HAVE', '갖고 싶다'],
    ['GO', '가보고 싶다'],
    ['LEARN', '배우고 싶다'],
  ]);

  const router = useRouter();

  const [heightClass, setHeightClass] = useState(''); // 초기 높이 클래스

  const onAddClick = () => {
    document.body.classList.add('no-scroll');
    setIsAdd(!isAdd);
  };

  const handleScroll = () => {
    const scrollY = window.scrollY;
    if (scrollY > 200) {
      if (scrollY < lastScrollY.current) {
        setHeightClass('-translate-y-0 opacity-100');
      } else {
        setHeightClass('-translate-y-full opacity-0');
      }
    } else {
      setHeightClass('translate-y-0 opacity-100'); // 초기 높이로 복원
    }
    lastScrollY.current = scrollY;
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll); // 클린업
  }, []);

  return (
    <div className='gap-2 flex flex-col w-full relative'>
      <AccountCard
        title='꿈 모음 계좌'
        balance='100000'
        className={cn(
          // 'bg-opacity-30 w-[calc(100%-40px)] max-w-screen-md z-[99] overflow-hidden backdrop-blur-lg transition duration-1000 ',
          'bg-opacity-30 max-w-screen-md z-[99] overflow-hidden backdrop-blur-lg transition duration-100 '
          // heightClass
        )}
      />
      <div className='flex w-full'>
        <Tabs defaultValue='doing' className='w-full'>
          <TabsList
            className={cn(
              'w-full sticky top-10 z-[5] transition duration-500 ease-in-out',
              heightClass
            )}
          >
            <DropdownMenu onOpenChange={setIsOpen}>
              <DropdownMenuTrigger className={cn('w-36 mr-1 ')}>
                <ColorChip
                  color='default'
                  className='py-1 bg-gray-400 text-white focus:outline-none ring-0 text-sm rounded-md w-full'
                >
                  <div className='flex flex-row'>
                    <div className='flex-grow w-full flex justify-center items-center break-keep'>
                      {categories.get(filter)}
                    </div>
                    <div className='flex justify-end items-center flex-grow '>
                      <IoIosArrowDown
                        className={cn(isOpen ? 'rotate-180' : '', 'transition')}
                      />
                    </div>
                  </div>
                </ColorChip>
              </DropdownMenuTrigger>
              <DropdownMenuContent className=' min-w-[30px] w-fit px-[10px]'>
                <DropdownMenuLabel className='flex justify-center'>
                  카테고리
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                {Array.from(categories).map(([key, value]) => (
                  <DropdownMenuItem key={key} onClick={() => setFilter(key)}>
                    {value}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            <div className='grid grid-cols-3 w-full gap-1'>
              <TabsTrigger value='doing'>진행 중</TabsTrigger>
              <TabsTrigger value='done'>완료</TabsTrigger>
              <TabsTrigger value='hold'>보류</TabsTrigger>
            </div>
          </TabsList>
          <TabsContent value='doing'>
            <div className={cn('flex flex-col gap-2 overflow-visible')}>
              <BucketListCard
                isSelectMode={false}
                safeBox={40000}
                howTo='EFFORT'
                dataPercent={80}
                title='예시'
                tagType='DO'
                bucketId={1}
              />
              <BucketListCard
                isSelectMode={false}
                safeBox={40000}
                howTo='MONEY'
                dataPercent={80}
                title='예시'
                tagType='DO'
                bucketId={1}
              />
              <BucketListCard
                isSelectMode={false}
                safeBox={40000}
                howTo='MONEY'
                dataPercent={80}
                title='예시'
                tagType='DO'
                bucketId={1}
              />
              <BucketListCard
                isSelectMode={false}
                safeBox={40000}
                howTo='MONEY'
                dataPercent={80}
                title='예시'
                tagType='DO'
                bucketId={1}
              />
              <BucketListCard
                isSelectMode={false}
                safeBox={40000}
                howTo='MONEY'
                dataPercent={80}
                title='예시'
                tagType='DO'
                bucketId={1}
              />
              <BucketListCard
                isSelectMode={false}
                safeBox={40000}
                howTo='MONEY'
                dataPercent={80}
                title='예시'
                tagType='DO'
                bucketId={1}
              />
              <div className='relative flex flex-row w-full pb-32 '>
                <div
                  onClick={onAddClick}
                  className={cn(
                    'bg-black fixed top-0 left-0 h-screen w-screen duration-1000',
                    isAdd ? 'opacity-50 z-[100]' : 'opacity-0 z-[0] hidden'
                  )}
                />
                <AddNewCard
                  onClick={
                    isAdd
                      ? () => router.push('/bucket-list/create')
                      : onAddClick
                  }
                  usage='createBucket'
                  size={isAdd ? 'md' : 'lg'}
                  className={cn(
                    'transition-all absolute duration-1000 z-[102]'
                  )}
                />
                <AddNewCard
                  onClick={() => router.push('/bucket-list/create/recommend')}
                  usage='recommendBucket'
                  size='md'
                  className={cn(
                    isAdd ? 'opacity-100' : 'opacity-0',
                    'absolute  transition-all duration-1000 right-0 z-[101]'
                  )}
                />
              </div>
            </div>
          </TabsContent>
          <TabsContent value='done'>
            <div className='flex flex-col gap-2'>
              <BucketListCard
                isSelectMode={false}
                safeBox={40000}
                howTo='MONEY'
                dataPercent={80}
                title='예시'
                tagType='BE'
                bucketId={1}
              />
            </div>
          </TabsContent>
          <TabsContent value='hold'>
            <div className='flex flex-col gap-2'>
              <BucketListCard
                isSelectMode={false}
                safeBox={40000}
                howTo='MONEY'
                dataPercent={80}
                title='예시'
                tagType='BE'
                bucketId={1}
              />
            </div>
          </TabsContent>
        </Tabs>
      </div>
      <div></div>
    </div>
  );
}
