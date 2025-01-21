'use client';

import { Button } from '@/components/atoms/Button';
import LoadingCircle from '@/components/atoms/LoadingCircle';
import { useSurveyApi } from '@/hooks/useServey/useServey';
import { useSurveyStore } from '@/store/surveyStore';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface InvestmentType {
  type: string;
  character: string;
  description: string;
}

const INVESTMENT_TYPES: Record<string, InvestmentType & { color: string }> = {
  안정형: {
    type: '안정형',
    character: '/gif/Turtle.png',
    description:
      '예적금 수준의 수익률을 기대하며,\n투자원금에 손실이 발생하는것을 원하지 않는 성향입니다.',
    color: '#008715',
  },
  안정추구형: {
    type: '안정추구형',
    character: '/gif/Chipmunk.png',
    description:
      '투자원금의 손실을 최소화하고,\n이자소득이나 배당소득 수준의 안정적인 투자를 목표로 하는 성향입니다.',
    color: '#61A300',
  },
  위험중립형: {
    type: '위험중립형',
    character: '/gif/Kangaroo.png',
    description:
      '투자위험성에 대해 충분히 인식하고 있으며,\n예적금보다 높은 수익을 기대할 수 있다면 일정 수준의 손실위험을 감수할 수 있는 성향입니다.',
    color: '#BD8D00',
  },
  적극투자형: {
    type: '적극투자형',
    character: '/gif/Eagle.png',
    description:
      '투자원금 보전보다는 위험을 감내하더라도\n높은 수준의 투자수익을 추구하는 성향입니다.',
    color: '#E57A00',
  },
  공격투자형: {
    type: '공격투자형',
    character: '/gif/Rhinoceros.png',
    description:
      '시장 평균수익률을 훨씬 넘어서는 높은 수준의 투자수익을 추구하며,\n이를 위해 손실위험을 적극 수용할 수 있는 성향입니다.',
    color: '#FF0000',
  },
};

const TENDENCY_TO_INVESTMENT_TYPE = {
  안정형: 'CONSERVATIVE',
  안정추구형: 'MODERATELY_CONSERVATIVE',
  위험중립형: 'BALANCED',
  적극투자형: 'MODERATELY_AGGRESSIVE',
  공격투자형: 'AGGRESSIVE',
} as const;

type TendencyType = keyof typeof TENDENCY_TO_INVESTMENT_TYPE;

export default function ResultsPage() {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const { answers, getTotalScore, clearAnswers } = useSurveyStore();
  const { submitSurvey } = useSurveyApi();

  useEffect(() => {
    const totalAnswers = Object.keys(answers).length;
    if (totalAnswers < 8) {
      router.push('/investment/1');
    }
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, [answers, router]);

  if (isLoading) {
    return <LoadingCircle />;
  }

  const handleRestart = () => {
    clearAnswers();
    router.push('/');
  };

  const handleRegister = async () => {
    const investmentType = TENDENCY_TO_INVESTMENT_TYPE[tendency];
    try {
      const response = await submitSurvey({ investmentType });
      console.log('성향 등록 성공:', response);
      router.push('/');
    } catch (error) {
      console.error('성향 등록 실패:', error);
    }
  };

  const totalScore = getTotalScore();
  const maxScore = 46.5;
  const percentageScore = (totalScore / maxScore) * 100;

  let tendency: TendencyType = '안정형'; // 초기값 설정
  if (percentageScore < 43) {
    tendency = '안정형';
  } else if (percentageScore < 55) {
    tendency = '안정추구형';
  } else if (percentageScore < 68) {
    tendency = '위험중립형';
  } else if (percentageScore < 81) {
    tendency = '적극투자형';
  } else {
    tendency = '공격투자형';
  }

  const investmentType = INVESTMENT_TYPES[tendency];

  return (
    <div className='min-h-screen bg-gray-50 py-8 animate-fadeIn'>
      <div className='max-w-2xl mx-auto px-4'>
        <div className='bg-white rounded-lg shadow-md p-6'>
          <h1 className='text-2xl font-bold text-center mb-8'>
            당신의 투자성향은 <br />
            <span style={{ color: investmentType.color }}>{tendency}</span>
            입니다
          </h1>

          <div className='flex justify-center mb-8'>
            <div className='w-64 h-64 relative'>
              <Image
                src={investmentType.character}
                alt={investmentType.type}
                fill
                className='object-contain'
                unoptimized
              />
            </div>
          </div>

          <div className='bg-gray-50 p-6 rounded-lg mb-8'>
            <p className='text-md text-slate-500 text-center leading-relaxed whitespace-pre-line'>
              {investmentType.description}
            </p>
          </div>

          {/* <div className='text-sm text-gray-500 mb-8'>
            <p>총점: {totalScore.toFixed(1)}점</p>
            <p>환산점수: {percentageScore.toFixed(2)}점</p>
          </div> */}

          <div className='flex items-center justify-center gap-4'>
            <Button
              size='lg'
              onClick={handleRestart}
              className='px-6 py-2 text-sm'
            >
              다시 테스트하기
            </Button>
            <Button
              size='lg'
              onClick={handleRegister}
              className='px-6 py-2 text-sm'
            >
              성향 등록하기
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
