'use client';

import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import useCreateBucketStore from '@/contexts/useCreateBucketStore';
import { FiPlusCircle } from 'react-icons/fi';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

const data = [
  {
    bucketType: 'Do',
    recommendations: [
      { title: '하와이 여행', followers: 1500 },
      { title: '프랑스 와인 투어', followers: 1200 },
      { title: '제주도 한 달 살기', followers: 950 },
    ],
  },
  {
    bucketType: 'Be',
    recommendations: [
      { title: '하와이 여행', followers: 1500 },
      { title: '프랑스 와인 투어', followers: 1200 },
      { title: '제주도 한 달 살기', followers: 950 },
    ],
  },
  {
    bucketType: 'Have',
    recommendations: [
      { title: '스카이다이빙', followers: 2000 },
      { title: '클래식 피아노 배우기', followers: 1800 },
      { title: '서핑 배우기', followers: 1100 },
    ],
  },
  {
    bucketType: 'Go',
    recommendations: [
      { title: '스카이다이빙', followers: 2000 },
      { title: '클래식 피아노 배우기', followers: 1800 },
      { title: '서핑 배우기', followers: 1100 },
    ],
  },
  {
    bucketType: 'Learn',
    recommendations: [
      { title: '스카이다이빙', followers: 2000 },
      { title: '클래식 피아노 배우기', followers: 1800 },
      { title: '서핑 배우기', followers: 1100 },
    ],
  },
];

export default function RecommendBucketPage() {
  const router = useRouter();
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState<number>(0);

  const bgColor = (type: string) => {
    switch (type.toLowerCase()) {
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

  const bucketType = [
    '인기',
    '해보고싶다',
    '되고 싶다',
    '갖고 싶다',
    '가보고 싶다',
    '배우고 싶다',
  ];

  console.log(api?.selectedScrollSnap());

  useEffect(() => {
    if (!api) return;
    setCurrent(api.selectedScrollSnap());

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  const allRecommendations = data.flatMap((bucket) =>
    bucket.recommendations.map((item) => ({
      ...item,
      bucketType: bucket.bucketType,
    }))
  );

  // followers 기준으로 정렬
  const sortedRecommendations = allRecommendations.sort(
    (a, b) => b.followers - a.followers
  );

  const onClickMenuBar = (index: number) => {
    if (!api) return;
    api.scrollTo(index);
  };

  const onClickRecommend = (title: string, bucketType: string) => {
    router.push(
      `/bucket-list/create?title=${title}&tagType=${bucketType.toLowerCase()}`
    );
  };

  return (
    <>
      <div className='overflow-x-hidden'>
        <h1 className='text-xl font-bold'>버킷리스트 추천</h1>
        <div className='w-screen overflow-x-scroll scrollbar-hide'>
          <div className='flex flex-row gap-5 w-[650px] pt-3 relative'>
            {bucketType.map((type, index) => (
              <button
                key={index}
                onClick={() => onClickMenuBar(index)}
                className={cn('w-20 justify-center flex relative py-3')}
              >
                <h3
                  className={cn(
                    'animate-underline',
                    current === index
                      ? 'animate-underline-click text-primary-main font-bold'
                      : ''
                  )}
                >
                  {type}
                </h3>
              </button>
            ))}
          </div>
        </div>
        <Carousel setApi={setApi}>
          <CarouselContent>
            <CarouselItem>
              <div className='flex flex-col gap-3 pt-3'>
                {sortedRecommendations.map((item, index) => (
                  <button
                    onClick={() =>
                      onClickRecommend(item.title, item.bucketType)
                    }
                    key={index}
                    className='py-3 px-4 rounded-lg flex flex-row items-center'
                    style={{ backgroundColor: bgColor(item.bucketType) }}
                  >
                    <FiPlusCircle className='mr-2 bg-gray-200 rounded-full' />
                    {item.title}
                    <small className='ml-2 text-gray-500'>
                      {item.followers}명
                    </small>
                  </button>
                ))}
              </div>
            </CarouselItem>
            {data.map((tag) => (
              <CarouselItem key={tag.bucketType}>
                <div className='flex flex-col gap-3 pt-3'>
                  {tag.recommendations.map((recommend, index) => (
                    <button
                      onClick={() =>
                        onClickRecommend(recommend.title, tag.bucketType)
                      }
                      key={index}
                      className='py-3 px-4 rounded-lg flex flex-row items-center'
                      style={{ backgroundColor: bgColor(tag.bucketType) }}
                    >
                      <FiPlusCircle className='mr-2 bg-gray-200 rounded-full' />
                      {recommend.title}
                      <small className='ml-2 text-gray-500'>
                        {recommend.followers}명
                      </small>
                    </button>
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
