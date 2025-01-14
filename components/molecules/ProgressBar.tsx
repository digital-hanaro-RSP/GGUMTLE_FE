'use client';

import { Progress } from '@/components/ui/progress';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

export type ProgressBarProps = {
  dataPercent: number;
};

export const ProgressBar = ({ dataPercent }: ProgressBarProps) => {
  const [progress, setProgress] = useState<number>(0);
  useEffect(() => {
    setTimeout(() => {
      setProgress(dataPercent);
    }, 500);
  }, [dataPercent]);
  return (
    <>
      <div className='relative py-10'>
        <Progress className='bg-primary-disable' value={progress} />
        <span
          className={cn('absolute -top-1 w-full transition duration-1000')}
          style={{ transform: `translateX(-${100 - (progress || 0)}%)` }}
        >
          <Image
            className={cn('-right-5 absolute floating')}
            src={'/image/icons/Hana_Airplane.png'}
            alt='img'
            width={50}
            height={50}
          />
        </span>
      </div>
    </>
  );
};
