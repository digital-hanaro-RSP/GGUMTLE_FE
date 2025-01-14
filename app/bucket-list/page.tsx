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

export default function BucketListPage() {
  const categories = [
    '해보고 싶다',
    '되고 싶다',
    '갖고 싶다',
    '가보고 싶다',
    '배우고 싶다',
  ];
  return (
    <div className='gap-2 flex flex-col'>
      <AccountCard title='꿈 모음 계좌' balance='100000' />
      <div>
        <div className='flex flex-row w-full justify-between'>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <ColorChip
                color='default'
                className='py-2 px-4 bg-primary-main text-white focus:outline-none'
              >
                전체
              </ColorChip>
            </DropdownMenuTrigger>
            <DropdownMenuContent className=' min-w-[30px] w-fit px-[10px]'>
              <DropdownMenuLabel className='flex justify-center'>
                카테고리
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              {categories.map((category) => (
                <DropdownMenuItem key={category}>{category}</DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <ColorChip color='default'>버킷리스트</ColorChip>
        </div>
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
          <AddNewCard usage='createBucket' size='lg' />
        </div>
      </div>
    </div>
  );
}
