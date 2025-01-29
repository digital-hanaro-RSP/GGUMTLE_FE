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
import { useDreamAccountApi } from '@/hooks/useDreamAccount/useDreamAccount';
import { transferReq } from '@/types/Account';
import { getBucketListbyIdRes } from '@/types/BucketList';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { calculatePercent, changeStatus, cn } from '@/lib/utils';

export default function BucketListDetail({
  params,
}: {
  params: { bid: number };
}) {
  const router = useRouter();
  const { getBucketListbyId, deleteBucketListbyId, changeBucketListStatus } =
    useBucketListApi();
  const [bucketList, setBucketList] = useState<getBucketListbyIdRes>();
  const [percent, setPercent] = useState<number>(0);

  useEffect(() => {
    setPercent(
      parseInt(
        calculatePercent(
          bucketList?.howTo,
          bucketList?.goalAmount,
          bucketList?.safeBox,
          new Date(bucketList?.dueDate ?? 0),
          new Date(bucketList?.createdAt ?? 0)
        )
      )
    );
  }, [bucketList]);

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
    fetchBucketListbyId();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const { getAccountInfo, bringOutMoneyToDreamAccount } = useDreamAccountApi();

  const deleteBucket = () => {
    const del = async () => {
      if (bucketList?.id) {
        await getAccountInfo()
          .then(async (res) => {
            if (bucketList.safeBox) {
              const formData: transferReq = {
                amount: bucketList.safeBox,
              };
              await bringOutMoneyToDreamAccount(formData, res.id, params.bid)
                .then(async () => {
                  await deleteBucketListbyId(bucketList?.id)
                    .then(() => {
                      alert(
                        '삭제에 성공했습니다. 잔액은 꿈 계좌로 이동시켜드릴게요.'
                      );
                      router.push('/bucket-list?getRecommend=true');
                    })
                    .catch((err) => {
                      alert(err);
                    });
                })
                .catch(() => {
                  alert('돈을 내보내는데 실패했습니다.');
                  window.location.reload();
                });
            }
          })
          .catch(() => {
            alert('삭제에 실패했습니다.');
          });
      }
    };
    del();
  };

  const calculateExpect = () => {
    if (percent === 0) {
      return '언젠가';
    }
    if (bucketList) {
      const now = new Date();
      const start = new Date(bucketList.createdAt);
      const restPercentRatio = (100 - percent) / percent;
      if (bucketList.howTo === 'MONEY') {
        const result =
          (Math.floor(
            (now.getTime() - start.getTime()) / (1000 * 60 * 60 * 24 * 30)
          ) +
            1) *
          restPercentRatio;

        return `${result.toFixed(1)} 개월`;
      } else {
        const dueDate = new Date(bucketList.dueDate);
        const result = dueDate.getTime() - now.getTime();
        if (result > 1000 * 60 * 60 * 24 * 30)
          return `${(result / (1000 * 60 * 60 * 24 * 30)).toFixed(1)} 개월`;
        return `${Math.floor(result / (1000 * 60 * 60 * 24))}일`;
      }
    }

    return '언젠가';
  };

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
              dataPercent={percent}
              title={bucketList?.title}
              tagType={bucketList?.tagType}
              bucketId={bucketList?.id}
              status={bucketList.status}
              dueDate={bucketList.dueDate}
              isDueDate={bucketList.isDueSet}
            >
              <div className='pt-10'>
                <ProgressBar
                  dataPercent={parseInt(
                    calculatePercent(
                      bucketList.howTo,
                      bucketList.goalAmount,
                      bucketList.safeBox,
                      new Date(bucketList.dueDate),
                      new Date(bucketList.createdAt)
                    )
                  )}
                />
              </div>
              <div className='pt-8 pb-20 z-11 relative'>
                <div className='bg-[#F4F6F8]'>
                  <h1 className='font-semibold text-3xl'>
                    고객님의 <br /> 예상 완료 기간은?
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
                      <strong className='text-primary-main'>
                        {calculateExpect()}
                      </strong>
                    </h1>
                    <small className='text-gray-500'>
                      {format(new Date(), 'yyyy년 M월 d일', { locale: ko })}{' '}
                      기준
                    </small>
                  </div>
                </div>
                <div className='w-full flex justify-end items-center bg-none'>
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
                    <DropCardItem onClick={() => deleteBucket()}>
                      <div className='bg-white text-primary-error btn-lg p-4 rounded-xl text-[15px]'>
                        삭제하기
                      </div>
                    </DropCardItem>
                    <DropCardItem
                      onClick={() =>
                        router.push(`/bucket-list/edit/${bucketList.id}`)
                      }
                    >
                      <div className='bg-white text-black btn-lg p-4 rounded-xl text-[15px]'>
                        수정하기
                      </div>
                    </DropCardItem>
                    <DropCardItem
                      onClick={(e) =>
                        changeStatus(
                          e,
                          bucketList.id,
                          'DONE',
                          bucketList.howTo,
                          bucketList.title,
                          changeBucketListStatus
                        )
                      }
                      className={cn(bucketList.status === 'DONE' && 'hidden')}
                    >
                      <div className='bg-white text-black btn-lg p-4 rounded-xl text-[15px]'>
                        완료하기
                      </div>
                    </DropCardItem>
                    <DropCardItem
                      onClick={(e) =>
                        changeStatus(
                          e,
                          bucketList.id,
                          'HOLD',
                          bucketList.howTo,
                          bucketList.title,
                          changeBucketListStatus
                        )
                      }
                      className={cn(bucketList.status === 'HOLD' && 'hidden')}
                    >
                      <div className='bg-white text-black btn-lg p-4 rounded-xl text-[15px]'>
                        보류하기
                      </div>
                    </DropCardItem>
                    <DropCardItem
                      onClick={(e) =>
                        changeStatus(
                          e,
                          bucketList.id,
                          'DOING',
                          bucketList.howTo,
                          bucketList.title,
                          changeBucketListStatus
                        )
                      }
                      className={cn(bucketList.status === 'DOING' && 'hidden')}
                    >
                      <div className='bg-white text-black btn-lg p-4 rounded-xl text-[15px]'>
                        진행하기
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
