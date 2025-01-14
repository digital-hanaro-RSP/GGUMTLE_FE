'use client';

import { MoreButton } from '@/components/atoms/Button';
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
import { useState } from 'react';
import { cn } from '@/lib/utils';

export default function BucketListPage() {
  const [filter, setFilter] = useState<number>(0);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  console.log(isOpen);
  const categories = [
    '전체',
    '해보고 싶다',
    '되고 싶다',
    '갖고 싶다',
    '가보고 싶다',
    '배우고 싶다',
  ];
  return (
    <div className='gap-2 flex flex-col'>
      <AccountCard title='꿈 모음 계좌' balance='100000' />
      <div className='flex flex-row w-full justify-between'>
        <Tabs defaultValue='doing' className='w-[400px]'>
          <TabsList className='grid w-full grid-cols-4 gap-2'>
            <DropdownMenu onOpenChange={setIsOpen}>
              <DropdownMenuTrigger>
                <ColorChip
                  color='default'
                  className='py-1.5 bg-gray-400 text-white focus:outline-none rounded-md w-full'
                >
                  <div className='flex flex-row'>
                    <div className='flex-grow'>{categories[filter]}</div>
                    <div className='flex justify-end items-center flex-grow'>
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
                {categories.map((category, index) => (
                  <DropdownMenuItem
                    key={category}
                    onClick={() => setFilter(index)}
                  >
                    {category}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            <TabsTrigger value='doing'>진행 중</TabsTrigger>
            <TabsTrigger value='done'>완료</TabsTrigger>
            <TabsTrigger value='hold'>보류</TabsTrigger>
          </TabsList>
          <TabsContent value='doing'>
            <div className='flex flex-col gap-2'>
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
