'use client';

import { LoadingBar } from '@/components/atoms/LoadingBar';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function SyncPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [isRouting, setIsRouting] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const loadingTimer = setTimeout(() => {
      setIsLoading(false);
    }, 5000);

    return () => clearTimeout(loadingTimer);
  }, []);

  useEffect(() => {
    if (!isLoading) {
      const routingTimer = setTimeout(() => {
        setIsRouting(true);
        // 페이드아웃 애니메이션을 위한 지연 시간 추가
        setTimeout(() => {
          router.push('/investment/start');
        }, 1500); // fadeOut 애니메이션 duration과 동일하게 설정
      }, 2000);

      return () => clearTimeout(routingTimer);
    }
  }, [isLoading, router]);

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
              className={`w-60 mt-40 ${!isLoading ? 'animate-fadeOut' : ''}`}
            >
              <LoadingBar />
            </div>
          </div>
        ) : (
          <div
            className={`animate-fadeIn flex flex-col items-center gap-24 ${isRouting ? 'animate-fadeOut' : ''}`}
          >
            <h1 className='text-xl font-bold tracking-tighter whitespace-pre-line text-center text-primary-main mb-2 mt-10'>
              마이데이터에서{'\n'}성공적으로 정보를 가져왔습니다!
            </h1>
            <div className='animate-bounce-slow mt-16'>
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
