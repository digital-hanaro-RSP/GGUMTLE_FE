'use client';

import { Button } from '@/components/atoms/Button';
import { BucketListCard } from '@/components/molecules/BucketListCard';
import { ProgressBar } from '@/components/molecules/ProgressBar';
import Image from 'next/image';

export default function BucketListDetail() {
  return (
    <>
      <div>
        <BucketListCard
          className='bg-gradient-to-t from-[#F4F6F8] from-[13%] to-white'
          showPercent={false}
          isSelectMode={false}
          balance={40000}
          type='money'
          dataPercent={80}
          title='예시'
          how='want'
          bid={1}
        >
          <div className='pt-10'>
            <ProgressBar dataPercent={30} />
          </div>
          <div className='pt-8 z-11 '>
            <div className='bg-gradient-to-t from-[#F4F6F8] to-white'>
              <h1 className='font-semibold text-3xl'>
                홍길동님의 <br /> 예상 완료 기간은?
              </h1>
              <div className='ml-1 pt-2'>
                <small className='text-gray-500'>
                  고객님께서 지금까지 달성한
                  <br /> 성과를 기준으로 선정했습니다.
                </small>
              </div>
              <div className='pt-4 ml-4'>
                <h1 className='text-5xl font-semibold'>
                  {' '}
                  <strong className='text-primary-main'>1.6</strong>
                  <small> 개월</small>
                </h1>
                <small className='text-gray-500'>2025년 1월 15일 기준</small>
              </div>
            </div>
            <div className=''>
              <video
                src='/image/video/pig.mp4'
                autoPlay
                loop
                muted
                playsInline
              />
            </div>
          </div>
          <div className='bg-[#F4F6F8] flex justify-center py-4 rounded-md flex-col items-center gap-2'>
            <Button size='lg'>편집하기</Button>
            <Button size='lg'>완료하기</Button>
          </div>
        </BucketListCard>
      </div>
    </>
  );
}
