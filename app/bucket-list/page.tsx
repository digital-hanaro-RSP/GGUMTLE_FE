'use client';

import ColorChip from '@/components/atoms/ColorChips';
import AccountCard from '@/components/molecules/AccountCard';
import { AddNewCard } from '@/components/molecules/AddNewCard';
import { BucketListCard } from '@/components/molecules/BucketListCard';

export default function BucketListPage() {
  return (
    <div className='gap-2 flex flex-col'>
      <AccountCard title='꿈 모음 계좌' balance='100000' />
      <div>
        <div className='flex flex-row'>
          <ColorChip color='default' className='py-2 px-4 bg-primary-main text-white'>전체</ColorChip>
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
