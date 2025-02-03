'use client';

import { Button } from '@/components/atoms/Button';
import {
  CreateBucketDueDate,
  CreateBucketHowTo,
  CreateBucketMemo,
  CreateBucketTitle,
} from '@/components/organisms/BucketCreateMenu';
import { useBucketListApi } from '@/hooks/useBucketList/useBucketList';
import useCreateBucketStore from '@/store/useCreateBucketStore';
import { bucketListTagType, createBucketListReq } from '@/types/BucketList';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { cn } from '@/lib/utils';

export default function BucketListRegisterPage() {
  const searchParams = useSearchParams();
  const { createBucketList } = useBucketListApi();
  const router = useRouter();

  const {
    setTitle,
    setTagType,
    setOriginId,
    reset,
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
    originId,
  } = useCreateBucketStore();

  const createCronCode = (
    cycleOpt1: string | undefined,
    cycleOpt2: string | undefined
  ): string | undefined => {
    if (autoAllocate) {
      switch (cycleOpt1) {
        case 'Daily':
          return '0 1 * * * ';
        case 'Weekly':
          return `0 1 * * ${cycleOpt2}`;
        case 'Monthly':
          return `0 1 ${cycleOpt2} * *`;
      }
    }
  };

  useEffect(() => {
    reset();
    const getTag = searchParams.get('tagType');
    const getTitle = searchParams.get('title');
    const getOriginId = searchParams.get('id');

    const getTagType = (tag: string | null): bucketListTagType | undefined => {
      switch (tag) {
        case 'DO':
        case 'GO':
        case 'LEARN':
        case 'BE':
        case 'HAVE':
          return tag;
        default:
          return undefined;
      }
    };
    setTagType(getTagType(getTag));
    setTitle(getTitle ?? '');
    setOriginId(parseInt(getOriginId ?? ''));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const createBucket = async () => {
    const formData: createBucketListReq = {
      title: title,
      tagType: tagType,
      isDueSet: isDueDate,
      dueDate: date?.toISOString().split('T')[0],
      howTo: howTo,
      isAutoAllocate: autoAllocate,
      allocateAmount: allocateAmount,
      cronCycle: createCronCode(cycleOpt1, cycleOpt2),
      goalAmount: goalAmount,
      memo: memo,
      isRecommended: false,
      originId: originId,
      // safeBox: 0,
    };
    await createBucketList(formData)
      .then(() => {
        reset();
        router.push('/bucket-list?getRecommend=true');
      })
      .catch((err) => {
        alert(err);
      });
  };

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
          cycleOpt1 === 'DEFAULT' ||
          cycleOpt2 === 'DEFAULT' ||
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
    <form action={createBucket} className='p-4 w-full'>
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
