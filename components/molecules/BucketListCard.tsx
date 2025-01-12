import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { AiFillFire } from 'react-icons/ai';
import { FaCheckCircle } from 'react-icons/fa';
import { PiMoneyFill } from 'react-icons/pi';
import { useState, useEffect } from 'react';
import { formatNumberWithCommas } from '@/lib/utils';
import { Button } from '../atoms/Button';
import { Card } from '../atoms/Card';
import ColorChip from '../atoms/ColorChips';

ChartJS.register(ArcElement, Tooltip, Legend);

export interface BucketListCardProps {
  type: 'effort' | 'money';
  dataPercent: number;
  title: string;
  how: 'have' | 'want' | 'become' | 'have' | 'visit' | 'learn';
  balance?: number;
}

export const BucketListCard = ({
  type,
  dataPercent,
  title,
  how,
  balance,
}: BucketListCardProps) => {
  // 초기 진행률은 0으로 설정
  const [progress, setProgress] = useState<number>(0);

  useEffect(() => {
    // 컴포넌트가 마운트된 후 일정 시간 뒤에 실제 진행률로 업데이트
    const timeout = setTimeout(() => {
      setProgress(dataPercent); // progress를 실제 데이터로 업데이트
    }, 500); // 0.5초 지연 (원하는 시간으로 조정 가능)

    return () => clearTimeout(timeout); // 컴포넌트 언마운트 시 타이머 정리
  }, [dataPercent]);

  const data = {
    datasets: [
      {
        data: [progress, 100 - progress], // progress를 사용하여 데이터 설정
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
    cutout: '80%', // 도넛 두께 조정
    animation: {
      duration: 500, // 애니메이션 지속 시간 (ms)
    },
  };

  const howto = (how: string) => {
    switch (how) {
      case 'want':
        return '하고싶다';
      case 'become':
        return '되고싶다';
      case 'have':
        return '하고싶다';
      case 'visit':
        return '가보고싶다';
      case 'learn':
        return '배우고싶다';
      default:
        return '오류';
    }
  };

  return (
    <>
      <Card className='flex-row'>
        <div className='relative justify-center items-center flex'>
          <Doughnut className='w-14 h-14' data={data} options={options} />
          <div className='absolute top-[calc((100%-40px)/2)] left-2 w-10 h-10 justify-center items-center flex'>
            {progress >= 100 ? (
              <FaCheckCircle size={30} />
            ) : type === 'effort' ? (
              <AiFillFire size={30} />
            ) : (
              <PiMoneyFill size={30} />
            )}
          </div>
        </div>
        <div className='w-[calc(100%-54px)] p-1'>
          <div className='flex flex-row gap-1'>
            <ColorChip color='gray'>언제까지</ColorChip>
            <ColorChip color={how}>{howto(how)}</ColorChip>
          </div>
          <div className='p-1 flex flex-col font-bold'>
            <h1 className='truncate w-full'>{title}</h1>
            {type === 'money' && (
              <>
                <div className='text-2xl truncate '>
                  {`${formatNumberWithCommas(balance?.toString() ?? '0')}원`}
                </div>
                <div className='flex flex-row gap-2'>
                  <Button
                    size='sm'
                    className='bg-primary-placeholder text-black'
                  >
                    꺼내기
                  </Button>
                  <Button size='sm'>채우기</Button>
                </div>
              </>
            )}
          </div>
        </div>
      </Card>
    </>
  );
};
