import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useBucketListApi } from '@/hooks/useBucketList/useBucketList';
import {
  bucketListHowTo,
  bucketListStatus,
  bucketListTagType,
} from '@/types/BucketList';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { BsThreeDots } from 'react-icons/bs';
import { FaCheckCircle } from 'react-icons/fa';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { changeStatus, cn, dDayCalculator } from '@/lib/utils';
import { Button } from '../atoms/Button';
import { Card } from '../atoms/Card';
import ColorChip from '../atoms/ColorChips';
import { MoneyTransferDrawer } from '../organisms/MoneyTransferDrawer';

ChartJS.register(ArcElement, Tooltip, Legend);

export interface BucketListCardProps {
  isDueDate?: boolean;
  dueDate?: Date;
  howTo: bucketListHowTo;
  dataPercent: number;
  title: string;
  tagType: bucketListTagType;
  safeBox?: number;
  isSelectMode?: boolean; //커뮤니티 용인지 체크
  bucketId: number;
  status: bucketListStatus;
  children?: React.ReactNode;
  showPercent?: boolean;
  className?: string;
  onClick?: () => void;
}

export const BucketListCard = ({
  className,
  howTo,
  dataPercent,
  title,
  tagType,
  safeBox,
  isSelectMode,
  bucketId,
  children,
  showPercent = true,
  status,
  dueDate,
  isDueDate,
  onClick,
}: BucketListCardProps) => {
  console.log('🚀 ~ dueDate:', dueDate);
  const router = useRouter();
  const [transferDrawerOpen, setTransferDrawerOpen] = useState<boolean>(false);
  console.log('🚀 ~ isDueDate:', isDueDate);
  const data = {
    datasets: [
      {
        data: [dataPercent, 100 - dataPercent], // progress를 사용하여 데이터 설정
        backgroundColor: ['rgb(6 152 148)', 'rgb(196 196 196)'],
        borderWidth: 0,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: false, // 라벨 숨기기
      },
      tooltip: {
        enabled: false, // 툴팁 비활성화
      },
    },
    cutout: '70%', // 도넛 두께 조정
    animation: {
      duration: 1000, // 애니메이션 지속 시간 (ms)
    },
  };

  const getTagType = (tagType: string) => {
    switch (tagType) {
      case 'DO':
        return '해보고 싶다';
      case 'BE':
        return '되고 싶다';
      case 'HAVE':
        return '갖고 싶다';
      case 'GO':
        return '가보고 싶다';
      case 'LEARN':
        return '배우고 싶다';
      default:
        return '오류';
    }
  };

  const handleClick = () => {
    if (showPercent && !isSelectMode) router.push(`/bucket-list/${bucketId}`);
    if (isSelectMode) {
      if (onClick) onClick();
    }
  };

  const handleTransferClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    type: 'BRINGOUT' | 'FILLUP'
  ) => {
    e.stopPropagation();
    setTransferDrawerOpen(true);
    setTransferType(type);
  };

  const [transferType, setTransferType] = useState<
    'BRINGOUT' | 'FILLUP' | undefined
  >();

  const { changeBucketListStatus } = useBucketListApi();

  return (
    <>
      <Card className={cn('flex-col', className)} onClick={handleClick}>
        <div className='flex-row flex'>
          {showPercent && (
            <div className='relative justify-center items-center flex w-14 h-14 mt-2'>
              <Doughnut
                className='w-14 h-14 bg-[#c4c4c4] rounded-full'
                data={data}
                options={options}
              />
              <div className='absolute top-[calc((100%-44px)/2)] left-1.5 w-11 h-11 justify-center items-center flex bg-white rounded-full'>
                {dataPercent >= 100 ? (
                  <FaCheckCircle size={30} />
                ) : howTo === 'EFFORT' || howTo === 'WILL' ? (
                  <Image
                    src={'/image/icons/Fire.png'}
                    alt='img'
                    width={40}
                    height={40}
                  />
                ) : (
                  <Image
                    src={'/image/icons/Money_Won2.png'}
                    alt='img'
                    width={40}
                    height={40}
                  />
                )}
              </div>
            </div>
          )}

          <div
            className={cn(
              ' p-1',
              showPercent ? 'w-[calc(100%-54px)]' : 'w-full'
            )}
          >
            <div className='flex flex-row gap-1 w-full'>
              {isDueDate && dueDate ? (
                <ColorChip color='gray' className='text-lg'>
                  D{dDayCalculator(new Date(dueDate.toString()))}
                </ColorChip>
              ) : (
                <ColorChip color='gray' className='text-lg'>
                  언젠가
                </ColorChip>
              )}

              <ColorChip color={tagType}>{getTagType(tagType)}</ColorChip>
              {isSelectMode !== true && (
                <div className='flex-grow justify-end items-end flex'>
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <BsThreeDots />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className='text-center w-10 z-[105]'>
                      <DropdownMenuLabel>상태 변경하기</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={(e) =>
                          changeStatus(
                            e,
                            bucketId,
                            'DONE',
                            howTo,
                            title,
                            changeBucketListStatus
                          )
                        }
                        className={cn(status === 'DONE' && 'hidden')}
                      >
                        완료하기
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={(e) =>
                          changeStatus(
                            e,
                            bucketId,
                            'HOLD',
                            howTo,
                            title,
                            changeBucketListStatus
                          )
                        }
                        className={cn(status === 'HOLD' && 'hidden')}
                      >
                        보류하기
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={(e) =>
                          changeStatus(
                            e,
                            bucketId,
                            'DOING',
                            howTo,
                            title,
                            changeBucketListStatus
                          )
                        }
                        className={cn(status === 'DOING' && 'hidden')}
                      >
                        진행하기
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              )}
            </div>
            <div className='p-1 flex flex-col font-bold'>
              <h1 className='truncate w-full'>
                <span className='ml-2 text-xl'>{title}</span>
              </h1>
              {howTo === 'MONEY' && isSelectMode === false && (
                <>
                  <div className='text-2xl truncate ml-2'>
                    {`${safeBox?.toLocaleString() ?? 0}원`}
                  </div>
                  <div className='flex flex-row gap-2'>
                    <Button
                      size='sm'
                      className='bg-[#EFF0F4] text-black w-1/2'
                      onClick={(e) => handleTransferClick(e, 'BRINGOUT')}
                    >
                      꺼내기
                    </Button>
                    <Button
                      size='sm'
                      className='w-1/2'
                      onClick={(e) => handleTransferClick(e, 'FILLUP')}
                    >
                      채우기
                    </Button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {children}
      </Card>
      <div>
        {transferType === 'BRINGOUT' && (
          <MoneyTransferDrawer
            transferDrawerOpen={transferDrawerOpen}
            setTransferDrawerOpen={(open) => setTransferDrawerOpen(open)}
            transferType={'BRINGOUT'}
            toId={undefined}
            fromId={bucketId}
          />
        )}
        {transferType === 'FILLUP' && (
          <MoneyTransferDrawer
            transferDrawerOpen={transferDrawerOpen}
            setTransferDrawerOpen={(open) => setTransferDrawerOpen(open)}
            transferType={'FILLUP'}
            toId={bucketId}
            fromId={undefined}
          />
        )}
      </div>
    </>
  );
};
