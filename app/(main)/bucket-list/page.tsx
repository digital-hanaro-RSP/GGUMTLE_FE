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
import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

export default function BucketListPage() {
  const [filter, setFilter] = useState<string>('default');
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const lastScrollY = useRef(0);
  const categories = new Map([
    ['default', '전체'],
    ['want', '해보고 싶다'],
    ['become', '되고 싶다'],
    ['have', '갖고 싶다'],
    ['visit', '가보고 싶다'],
    ['learn', '배우고 싶다'],
  ]);

  const [heightClass, setHeightClass] = useState(''); // 초기 높이 클래스

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
              'w-full sticky top-10 z-[99] transition duration-500 ease-in-out',
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
                balance={40000}
                type='effort'
                dataPercent={80}
                title='예시'
                how='want'
                bid={1}
              />
              <BucketListCard
                isSelectMode={false}
                balance={40000}
                type='money'
                dataPercent={80}
                title='예시'
                how='want'
                bid={1}
              />
              <BucketListCard
                isSelectMode={false}
                balance={40000}
                type='money'
                dataPercent={80}
                title='예시'
                how='want'
                bid={1}
              />
              <BucketListCard
                isSelectMode={false}
                balance={40000}
                type='money'
                dataPercent={80}
                title='예시'
                how='want'
                bid={1}
              />
              <BucketListCard
                isSelectMode={false}
                balance={40000}
                type='effort'
                dataPercent={80}
                title='예시'
                how='want'
                bid={1}
              />
              <BucketListCard
                isSelectMode={false}
                balance={40000}
                type='money'
                dataPercent={80}
                title='예시'
                how='want'
                bid={1}
              />
              <AddNewCard usage='createBucket' size='lg' />
            </div>
          </TabsContent>
          <TabsContent value='done'>
            <div className='flex flex-col gap-2'>
              <BucketListCard
                isSelectMode={false}
                balance={40000}
                type='money'
                dataPercent={80}
                title='예시'
                how='want'
                bid={1}
              />
            </div>
          </TabsContent>
          <TabsContent value='hold'>
            <div className='flex flex-col gap-2'>
              <BucketListCard
                isSelectMode={false}
                balance={40000}
                type='money'
                dataPercent={80}
                title='예시'
                how='want'
                bid={1}
              />
            </div>
          </TabsContent>
        </Tabs>
      </div>
      <div></div>
    </div>
  );
}
