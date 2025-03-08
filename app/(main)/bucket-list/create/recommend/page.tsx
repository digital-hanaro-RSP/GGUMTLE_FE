'use client';

import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { useBucketListApi } from '@/hooks/useBucketList/useBucketList';
import useRecommendBucketStore from '@/store/useRecommendBucketStore';
import { bucketListTagType, RecommendBucketListType } from '@/types/BucketList';
import { FiPlusCircle } from 'react-icons/fi';
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

export default function RecommendBucketPage() {
  const router = useRouter();
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState<number>(0);
  const {
    Popular,
    Do,
    Be,
    Go,
    Have,
    Learn,
    setPopular,
    setDo,
    setBe,
    setGo,
    setHave,
    setLearn,
    reset,
  } = useRecommendBucketStore();

  const bgColor = (type?: string) => {
    switch (type) {
      case 'DO':
        return '#FFF89F';
      case 'BE':
        return '#CDF5D8';
      case 'HAVE':
        return '#CDF7F7';
      case 'GO':
        return '#F5CFF6';
      case 'LEARN':
        return '#F3D0CE';
      default:
        return '#FFF';
    }
  };

  const getRecommendation = async (
    setData: (res: RecommendBucketListType[]) => void,
    tagType?: bucketListTagType
  ) => {
    await getRecommendBucklist(tagType)
      .then((res) => {
        setData(res);
      })
      .catch((err) => {
        Swal.fire({
          title: 'Oops!',
          text: err || '버킷리스트 추천 가져오기에 실패했습니다.',
          icon: 'error',
          confirmButtonText: '네',
          confirmButtonColor: '#069894',
        });
      });
  };

  useEffect(() => {
    reset();
    getRecommendation(setPopular);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const bucketType = [
    '인기',
    '해보고싶다',
    '되고 싶다',
    '갖고 싶다',
    '가보고 싶다',
    '배우고 싶다',
  ];

  const allType = [Popular, Do, Be, Have, Go, Learn];

  const { getRecommendBucklist } = useBucketListApi();

  useEffect(() => {
    if (!api) return;
    setCurrent(api.selectedScrollSnap());
    onClickMenuBar(api.selectedScrollSnap());

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap());
      onClickMenuBar(api.selectedScrollSnap());
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [api]);

  const onClickMenuBar = (index: number) => {
    if (!api) return;
    type categoriesProps = {
      list: RecommendBucketListType[];
      setter: (value: RecommendBucketListType[]) => void;
      type?: bucketListTagType;
    };
    const categories: categoriesProps[] = [
      { list: Popular, setter: setPopular },
      { list: Do, setter: setDo, type: 'DO' },
      { list: Be, setter: setBe, type: 'BE' },
      { list: Have, setter: setHave, type: 'HAVE' },
      { list: Go, setter: setGo, type: 'GO' },
      { list: Learn, setter: setLearn, type: 'LEARN' },
    ];

    if (index >= 0 && index < categories.length) {
      const category = categories[index];
      if (category.list.length === 0) {
        getRecommendation(category.setter, category.type);
      }
    }

    api.scrollTo(index);
  };

  const onClickRecommend = (
    title: string,
    id: number,
    followers: number,
    bucketType?: string
  ) => {
    router.push(
      `/bucket-list/create?title=${title}&tagType=${bucketType}&id=${id}&followers=${followers}`
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
                onClick={() => api?.scrollTo(index)}
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
            {allType.map((item, index) => (
              <CarouselItem key={index} className='w-full flex flex-col gap-3'>
                {item.map((buckets, index) => (
                  <div key={index} className='w-full flex flex-col gap-3'>
                    {buckets.recommendations.map((bucket, index) => (
                      <button
                        onClick={() =>
                          onClickRecommend(
                            bucket.title,
                            bucket.id,
                            bucket.followers,
                            buckets.tagType
                          )
                        }
                        key={index}
                        className='py-3 px-4 rounded-lg flex flex-row items-center w-full'
                        style={{ backgroundColor: bgColor(buckets.tagType) }}
                      >
                        <FiPlusCircle className='mr-2 bg-gray-200 rounded-full' />
                        {bucket.title}
                        <small className='ml-2 text-gray-500'>
                          {bucket.followers}명
                        </small>
                      </button>
                    ))}
                  </div>
                ))}
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
