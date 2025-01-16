import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useBucketListApi } from '@/hooks/useBucketList/useBucketList';
import { completeBucketList } from '@/types/BucketList';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { BsThreeDots } from 'react-icons/bs';
import { FaCheckCircle } from 'react-icons/fa';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { cn, formatNumberWithCommas } from '@/lib/utils';
import { Button } from '../atoms/Button';
import { Card } from '../atoms/Card';
import ColorChip from '../atoms/ColorChips';

ChartJS.register(ArcElement, Tooltip, Legend);

export interface BucketListCardProps {
  type: 'effort' | 'money';
  dataPercent: number;
  title: string;
  how: 'have' | 'want' | 'become' | 'visit' | 'learn';
  balance?: number;
  isSelectMode?: boolean; //커뮤니티 용인지 체크
  bid: number;
  children?: React.ReactNode;
  showPercent?: boolean;
  className?: string;
}

export const BucketListCard = ({
  className,
  type,
  dataPercent,
  title,
  how,
  balance,
  isSelectMode,
  bid,
  children,
  showPercent = true,
}: BucketListCardProps) => {
  const { completeBucketList } = useBucketListApi();
  const router = useRouter();

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

  const howto = (how: string) => {
    switch (how) {
      case 'want':
        return '해보고 싶다';
      case 'become':
        return '되고 싶다';
      case 'have':
        return '갖고 싶다';
      case 'visit':
        return '가보고 싶다';
      case 'learn':
        return '배우고 싶다';
      default:
        return '오류';
    }
  };

  const complete = async (e: MouseEvent, bid: number) => {
    e.stopPropagation();
    const data: completeBucketList = {
      status: 'done',
    };
    router.push('/');
    // await completeBucketList(bid, data).then((res) => {
    //   router.push('/completePage')
    // });
  };

  const handleClick = () => {
    if (showPercent) router.push(`/bucket-list/${bid}`);
  };

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
                ) : type === 'effort' ? (
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
              <ColorChip color='gray'>언제까지</ColorChip>
              <ColorChip color={how}>{howto(how)}</ColorChip>
              {isSelectMode !== true && (
                <div className='flex-grow justify-end items-end flex'>
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <BsThreeDots />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className='text-center w-10'>
                      <DropdownMenuLabel>상태 변경하기</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={(e) => complete(e, bid)}>
                        완료하기
                      </DropdownMenuItem>
                      <DropdownMenuItem>보류하기</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              )}
            </div>
            <div className='p-1 flex flex-col font-bold'>
              <h1 className='truncate w-full'>
                <span className='ml-2 text-xl'>{title}</span>
              </h1>
              {type === 'money' && isSelectMode === false && (
                <>
                  <div className='text-2xl truncate ml-2'>
                    {`${formatNumberWithCommas(balance?.toString() ?? '0')}원`}
                  </div>
                  <div className='flex flex-row gap-2'>
                    <Button size='sm' className='bg-[#EFF0F4] text-black w-1/2'>
                      꺼내기
                    </Button>
                    <Button size='sm' className='w-1/2'>
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
    </>
  );
};
