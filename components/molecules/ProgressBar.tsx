'use client';

import { Progress } from '@/components/ui/progress';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

export type ProgressBarProps = {
  dataPercent: number;
  className?: string;
};

export const ProgressBar = ({ dataPercent, className }: ProgressBarProps) => {
  const [progress, setProgress] = useState<number>(0);
  const [countProgress, setCountProgress] = useState<number>(0);
  const [showPercent, setShowPercent] = useState<boolean>(false);
  useEffect(() => {
    setTimeout(() => {
      setProgress(dataPercent);
      setShowPercent(true);
    }, 200);
  }, [dataPercent]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountProgress((prev) => {
        if (prev >= progress) {
          clearInterval(timer);
          return progress;
        }
        return prev + 1;
      });
    }, 1000 / progress);

    return () => clearInterval(timer);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showPercent]);
  return (
    <div className='w-full flex flex-col justify-center items-center'>
      <div className={cn('relative pt-10 pb-2 w-11/12', className)}>
        <Progress className='bg-primary-disable' value={progress} />
        <span
          className={cn('absolute -top-1 w-full transition duration-1000')}
          style={{ transform: `translateX(-${100 - (progress || 0)}%)` }}
        >
          <Image
            className={cn('-right-5 -top-5 absolute floating z-[50]')}
            src={'/image/icons/Hana_Airplane.png'}
            alt='img'
            width={70}
            height={70}
          />
          <div
            className={cn(
              'right-0 top-[68px] absolute transition duration-1000 font-semibold text-lg text-primary-main bg-white px-1 rounded-md',
              showPercent ? 'opacity-100' : 'opacity-0'
            )}
          >
            {countProgress.toFixed(0)}%
          </div>
        </span>
      </div>
      <div className='w-full flex justify-between font-semibold'>
        <p>0%</p>
        <p>100%</p>
      </div>
    </div>
  );
};
