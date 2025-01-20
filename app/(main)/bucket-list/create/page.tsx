'use client';

import { Button } from '@/components/atoms/Button';
import {
  CreateBucketDueDate,
  CreateBucketHowTo,
  CreateBucketMemo,
  CreateBucketTitle,
} from '@/components/organisms/BucketCreateMenu';
import useCreateBucketStore from '@/store/useCreateBucketStore';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { cn } from '@/lib/utils';

export default function BucketListRegisterPage() {
  const searchParams = useSearchParams();

  const {
    setTitle,
    setTagType,
    title,
    tagType,
    date,
    isDueDate,
    howTo,
    autoAllocate,
    cycleOpt1,
    cycleOpt2,
    allocateAmount,
    goalAmount,
    memo,
  } = useCreateBucketStore();

  useEffect(() => {
    const getTag = searchParams.get('tagType');
    console.log('🚀 ~ useEffect ~ getTag:', getTag);
    const getTitle = searchParams.get('title');
    console.log('🚀 ~ useEffect ~ getTitle:', getTitle);
    setTagType(getTag ?? 'Default');
    setTitle(getTitle ?? '');
  }, []);

  const activateButton = () => {
    const requiredDefaultVars = [title, tagType, isDueDate, howTo];
    const checkDefaultVars = () => {
      return requiredDefaultVars.every(
        (variable) => variable !== undefined && variable !== null
      );
    };
    const checkDueDateVars = () => {
      if (isDueDate) {
        return date !== undefined;
      }
      return true;
    };
    const checkHowToVars = () => {
      if (howTo !== 'MONEY') {
        return true;
      }
      if (autoAllocate) {
        if (cycleOpt1 === 'Daily' && allocateAmount !== undefined) return true;
        if (
          cycleOpt1 === 'Default' ||
          cycleOpt2 === 'Default' ||
          !allocateAmount
        )
          return false;
      }
      return !!goalAmount;
    };
    return (
      !!title && checkDefaultVars() && checkDueDateVars() && checkHowToVars()
    );
  };

  return (
    <form className='p-4 w-full'>
      <CreateBucketTitle />
      <CreateBucketDueDate />
      <CreateBucketHowTo />
      <CreateBucketMemo />
      <div
        className={cn(
          'pt-3 w-full flex justify-center items-center',
          activateButton() ? 'animate-fadeIn' : 'hidden'
        )}
      >
        <Button size='lg' isDisabled={!activateButton()}>
          생성하기
        </Button>
      </div>
    </form>
  );
}
