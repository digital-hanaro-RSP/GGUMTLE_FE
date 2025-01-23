'use client';

import { Button } from '@/components/atoms/Button';
import { BucketListCard } from '@/components/molecules/BucketListCard';
import {
  DropCard,
  DropCardItem,
  DropCardItemList,
  DropDownTrigger,
} from '@/components/molecules/DropCard';
import { ProgressBar } from '@/components/molecules/ProgressBar';
import { useBucketListApi } from '@/hooks/useBucketList/useBucketList';
import { getBucketListbyIdRes } from '@/types/BucketList';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { calculatePercent } from '@/lib/utils';

export default function BucketListDetail({
  params,
}: {
  params: { bid: number };
}) {
  const router = useRouter();
  const { getBucketListbyId } = useBucketListApi();
  const [bucketList, setBucketList] = useState<getBucketListbyIdRes>();

  useEffect(() => {
    const fetchBucketListbyId = async () => {
      await getBucketListbyId(params.bid)
        .then((res) => {
          setBucketList(res.data);
        })
        .catch((err) => {
          alert(err);
        });
    };
    fetchBucketListbyId();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div>
        {bucketList && (
          <>
            <BucketListCard
              className='bg-gradient-to-t from-[#F4F6F8] from-[70%] to-white'
              showPercent={false}
              isSelectMode={false}
              safeBox={bucketList?.safeBox}
              howTo={bucketList?.howTo}
              dataPercent={calculatePercent(
                bucketList?.howTo,
                bucketList?.goalAmount,
                bucketList?.safeBox,
                new Date(bucketList?.dueDate ?? 0),
                new Date(bucketList?.createdAt ?? 0)
              )}
              title={bucketList?.title}
              tagType={bucketList?.tagType}
              bucketId={bucketList?.id}
            >
              <div className='pt-10'>
                <ProgressBar
                  dataPercent={calculatePercent(
                    bucketList.howTo,
                    bucketList.goalAmount,
                    bucketList.safeBox,
                    new Date(bucketList.dueDate),
                    new Date(bucketList.createdAt)
                  )}
                />
              </div>
              <div className='pt-8 pl-20 pb-20 z-11 relative'>
                <div className='bg-[#F4F6F8]'>
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
                    <small className='text-gray-500'>
                      {format(new Date(), 'yyyy년 M월 d일', { locale: ko })}{' '}
                      기준
                    </small>
                  </div>
                </div>
                <div className='w-full flex justify-end items-center bg-none absolute top-28 right-10'>
                  <video
                    className='w-96'
                    src='/image/video/pig.mp4'
                    autoPlay
                    loop
                    muted
                    playsInline
                  />
                </div>
              </div>
              <div className='bg-[#F4F6F8]'>
                <small className='text-left '>
                  <h3 className='text-lg'>메모</h3>
                  <div className='bg-white py-3 px-5 mx-2 mt-2 rounded-lg border-2 min-h-40 text-base'>
                    {bucketList.memo}
                  </div>
                </small>
              </div>
              <div className='bg-[#F4F6F8] flex justify-center py-4 rounded-md flex-col items-center gap-2'>
                <DropCard className='flex flex-col justify-center relative'>
                  <DropDownTrigger>
                    <div className='bg-primary-disable text-black btn-lg p-4 rounded-xl text-[15px]'>
                      편집하기
                    </div>
                  </DropDownTrigger>
                  <DropCardItemList
                    isBlur={true}
                    direction='up'
                    className='items-center gap-3 bottom-16'
                  >
                    <DropCardItem>
                      <div className='bg-white text-black btn-lg p-4 rounded-xl text-[15px]'>
                        수정하기
                      </div>
                    </DropCardItem>
                    <DropCardItem>
                      <div className='bg-white text-black btn-lg p-4 rounded-xl text-[15px]'>
                        완료하기
                      </div>
                    </DropCardItem>
                    <DropCardItem>
                      <div className='bg-white text-black btn-lg p-4 rounded-xl text-[15px]'>
                        보류하기
                      </div>
                    </DropCardItem>
                  </DropCardItemList>
                </DropCard>

                <Button onClick={() => router.push('/bucket-list')} size='lg'>
                  뒤로가기
                </Button>
              </div>
            </BucketListCard>
          </>
        )}
      </div>
    </>
  );
}
