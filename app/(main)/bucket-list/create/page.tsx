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
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { cn } from '@/lib/utils';

export default function BucketListRegisterPage() {
  const searchParams = useSearchParams();
  const { createBucketList } = useBucketListApi();

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

  const createCronCode = (
    cycleOpt1: string | undefined,
    cycleOpt2: string | undefined
  ): string | undefined => {
    if (autoAllocate) {
      switch (cycleOpt1) {
        case 'Daily':
          return '0 9 * * * ';
        case 'Weekly':
          return `0 9 * * ${cycleOpt2}`;
        case 'Monthly':
          return `0 9 ${cycleOpt2} * *`;
      }
    }
  };

  useEffect(() => {
    const getTag = searchParams.get('tagType');
    const getTitle = searchParams.get('title');

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const createBucket = async () => {
    const formData: createBucketListReq = {
      title: title,
      tagType: tagType,
      isDueSet: isDueDate,
      dueDate: date,
      howTo: howTo,
      isAutoAllocate: autoAllocate,
      allocateAmount: allocateAmount,
      cronCycle: createCronCode(cycleOpt1, cycleOpt2),
      goalAmount: goalAmount,
      memo: memo,
      status: 'DOING',
      isRecommended: false, //추후 보완 필요
      followers: 0, //추후 보완 필요
      safeBox: 0, //추후 보완 필요
    };
    await createBucketList(formData)
      .then((res) => {
        console.log(res);
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
