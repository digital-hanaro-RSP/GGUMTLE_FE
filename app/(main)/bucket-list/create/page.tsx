'use client';

import TextArea from '@/components/atoms/TextArea';
import {
  CreateBucketDueDate,
  CreateBucketHowTo,
  CreateBucketTitle,
} from '@/components/organisms/BucketCreateMenu';
import useCreateBucketStore from '@/contexts/useCreateBucketStore';
import { useRef, useState } from 'react';
import * as React from 'react';
import { cn } from '@/lib/utils';

export default function BucketListRegisterPage() {
  const [memo, setMemo] = useState<string>('');
  console.log('🚀 ~ BucketListRegisterPage ~ memo:', memo);

  const { cycleOpt1, date, isDueDate } = useCreateBucketStore();

  const handleMemoChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMemo(e.target.value);
  };

  return (
    <div className='p-4'>
      <CreateBucketTitle />
      <CreateBucketDueDate />
      <CreateBucketHowTo />

      <div className='w-full'>
        <h1 className='text-xl font-bold'>메모</h1>
        <div className='flex w-full justify-center items-center'>
          <TextArea type='memo' value={memo} onChange={handleMemoChange} />
        </div>
      </div>
    </div>
  );
}
