'use client';

import { Button } from '@/components/atoms/Button';
import { useSurveyStore } from '@/store/surveyStore';
import { useRouter } from 'next/navigation';

export default function StartPage() {
  const router = useRouter();
  const { clearAnswers } = useSurveyStore();

  const handleClick = () => {
    clearAnswers();
    router.push('/investment/1');
  };

  return (
    <div className='h-full bg-[#F2F5F6]'>
      <div className='flex flex-col items-center gap-14'>
        <div className='flex flex-col items-center mt-3'>
          <h1 className='text-xl font-bold tracking-tighter whitespace-pre-line text-center text-primary-main mb-2 mt-10'>
            1분만에{'\n'}나의 투자성향을 알아볼까요?
          </h1>
          <div className='w-52 h-52'>
            <video
              src={'/image/video/investment.mp4'}
              autoPlay
              loop
              muted
              playsInline
              className='mb-3 mt-10'
            />
          </div>
          <p className='text-[#7D8B8A] font-semibold text-center text-md translate-y-36'>
            간단한 테스트로
            <br />더 나은 투자 여정의 시작을 함께하세요
          </p>
        </div>
        <div className='flex flex-col items-center mt-36'>
          <Button size='lg' onClick={handleClick}>
            투자성향 알아보러 가기
          </Button>
        </div>
      </div>
    </div>
  );
}
