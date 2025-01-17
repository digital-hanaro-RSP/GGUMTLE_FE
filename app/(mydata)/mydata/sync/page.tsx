'use client';

import { LoadingBar } from '@/components/atoms/LoadingBar';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function SyncPage() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className='p-4 bg-[#F2F5F6]'>
      <div className='flex flex-col items-center gap-14'>
        {isLoading ? (
          <div
            className={`flex flex-col items-center mt-3 ${!isLoading ? 'animate-fadeOut' : ''}`}
          >
            <h1 className='text-xl font-bold tracking-tighter whitespace-pre-line text-center text-primary-main mb-2 mt-10'>
              빠르게 데이터를{'\n'}가져오고 있어요
            </h1>
            <div className='w-60 h-60'>
              <video
                src={'/image/video/mydata.mp4'}
                autoPlay
                loop
                muted
                playsInline
                className='mb-3 mt-20'
              />
            </div>
            <div
              className={`w-60 mt-24 ${!isLoading ? 'animate-fadeOut' : ''}`}
            >
              <LoadingBar />
            </div>
          </div>
        ) : (
          <div className='animate-fadeIn flex flex-col items-center gap-24'>
            <h1 className='text-xl font-bold tracking-tighter whitespace-pre-line text-center text-primary-main mb-2 mt-10'>
              마이데이터에서{'\n'}성공적으로 정보를 가져왔습니다!
            </h1>
            <div className='animate-bounce-slow'>
              <Image
                src={'/image/icons/CheckMarkButton.png'}
                alt=''
                width={120}
                height={120}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
