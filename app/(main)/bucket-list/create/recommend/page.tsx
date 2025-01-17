'use client';

import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { useState } from 'react';

const data = [
  {
    bucketType: 'Go',
    recommendations: [
      { title: '하와이 여행', followers: 1500 },
      { title: '프랑스 와인 투어', followers: 1200 },
      { title: '제주도 한 달 살기', followers: 950 },
    ],
  },
  {
    bucketType: 'Do',
    recommendations: [
      { title: '스카이다이빙', followers: 2000 },
      { title: '클래식 피아노 배우기', followers: 1800 },
      { title: '서핑 배우기', followers: 1100 },
    ],
  },
];

export default function RecommendBucketPage() {
  const [api, setApi] = useState<CarouselApi>();

  const bgColor = (type: string) => {
    switch (type) {
      case 'do':
        return '#FFF89F';
      case 'be':
        return '#CDF5D8';
      case 'have':
        return '#CDF7F7';
      case 'go':
        return '#F5CFF6';
      case 'learn':
        return '#F3D0CE';
      default:
        return '#FFF';
    }
  };

  return (
    <>
      <div className='overflow-x-hidden overflow-y-hidden'>
        <h1 className='text-xl font-bold'>버킷리스트 추천</h1>
        <div className='w-screen overflow-x-scroll scrollbar-hide'>
          <div className='flex flex-row gap-5 w-[650px]'>
            <button
              onClick={() => api?.scrollTo(0)}
              className='w-20 justify-center flex'
            >
              인기
            </button>
            <button
              onClick={() => api?.scrollTo(1)}
              className='w-20 justify-center flex'
            >
              해보고 싶다
            </button>
            <button
              onClick={() => api?.scrollTo(2)}
              className='w-20 justify-center flex'
            >
              되고 싶다
            </button>
            <button
              onClick={() => api?.scrollTo(3)}
              className='w-20 justify-center flex'
            >
              갖고 싶다
            </button>
            <button
              onClick={() => api?.scrollTo(4)}
              className='w-20 justify-center flex'
            >
              가보고 싶다
            </button>
            <button
              onClick={() => api?.scrollTo(5)}
              className='w-20 justify-center flex'
            >
              배우고 싶다
            </button>
          </div>
        </div>
        <Carousel setApi={setApi}>
          <CarouselContent>
            {data.map((tag) => (
              <CarouselItem key={tag.bucketType}>
                <div>
                  {tag.recommendations.map((recommend, index) => (
                    <div
                      key={index}
                      style={{ backgroundColor: bgColor(tag.bucketType) }}
                    >
                      {recommend.title}
                    </div>
                  ))}
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </>
  );
}
