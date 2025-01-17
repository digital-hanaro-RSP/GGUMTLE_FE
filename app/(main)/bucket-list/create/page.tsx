'use client';

import {
  CreateBucketDueDate,
  CreateBucketHowTo,
  CreateBucketMemo,
  CreateBucketTitle,
} from '@/components/organisms/BucketCreateMenu';
import useCreateBucketStore from '@/contexts/useCreateBucketStore';

export default function BucketListRegisterPage() {
  const { cycleOpt1, date, isDueDate } = useCreateBucketStore();

  return (
    <form className='p-4'>
      <CreateBucketTitle />
      <CreateBucketDueDate />
      <CreateBucketHowTo />
      <CreateBucketMemo />
    </form>
  );
}
