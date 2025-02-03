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
import { createBucketListReq, getBucketListbyIdRes } from '@/types/BucketList';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

export default function BucketListEdit({
  params,
}: {
  params: { bid: number };
}) {
  const {
    setTitle,
    setTagType,
    setDate,
    setIsDueDate,
    setHowTo,
    setAutoAllocate,
    setCycleOpt1,
    setCycleOpt2,
    setAllocateAmount,
    setGoalAmount,
    setMemo,
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
  const [bucketList, setBucketList] = useState<getBucketListbyIdRes>();
  const { getBucketListbyId, editBucketListbyId } = useBucketListApi();
  useEffect(() => {
    const fetchBucketListbyId = async () => {
      await getBucketListbyId(params.bid)
        .then((res) => {
          setBucketList(res);
        })
        .catch((err) => {
          alert(err);
        });
    };
    reset();
    fetchBucketListbyId();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  const router = useRouter();

  const updateBucket = async () => {
    if (date) {
      const formData: createBucketListReq = {
        title: title,
        tagType: tagType,
        isDueSet: isDueDate,
        dueDate: new Date(date).toISOString().split('T')[0],
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
      await editBucketListbyId(params.bid, formData)
        .then(() => {
          reset();
          router.push('/bucket-list?getRecommend=true');
        })
        .catch((err) => {
          alert(err);
        });
    } else {
      const formData: createBucketListReq = {
        title: title,
        tagType: tagType,
        isDueSet: isDueDate,
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
      await editBucketListbyId(params.bid, formData)
        .then(() => {
          reset();
          router.push('/bucket-list?getRecommend=true');
        })
        .catch((err) => {
          alert(err);
        });
    }
  };
  useEffect(() => {
    if (bucketList) {
      setTitle(bucketList.title);
      setTagType(bucketList.tagType);
      setDate(bucketList.dueDate);
      setIsDueDate(bucketList.isDueSet);
      setHowTo(bucketList.howTo);
      setAutoAllocate(bucketList.isAutoAllocate);
      setAllocateAmount(bucketList.allocateAmount ?? 0);
      setGoalAmount(bucketList.goalAmount);
      setMemo(bucketList.memo);
      const interval = (bucketList.cronCycle ?? '').split(' ');
      if (interval[2] !== '*') {
        setCycleOpt1('Monthly');
        setCycleOpt2(interval[2]);
      } else if (interval[4] !== '*') {
        setCycleOpt1('Weekly');
        setCycleOpt2(interval[4]);
      } else {
        setCycleOpt1('Daily');
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bucketList]);

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
    <>
      <form action={updateBucket} className='p-4 w-full'>
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
            수정하기
          </Button>
        </div>
      </form>
    </>
  );
}
