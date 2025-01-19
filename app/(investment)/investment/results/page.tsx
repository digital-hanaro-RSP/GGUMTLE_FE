'use client';

import { useSurveyStore } from '@/store/surveyStore';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function ResultsPage() {
  const router = useRouter();
  const { answers, getTotalScore, clearAnswers } = useSurveyStore();

  useEffect(() => {
    // 모든 질문에 답변했는지 확인
    const totalAnswers = Object.keys(answers).length;
    if (totalAnswers < 8) {
      router.push('/investment/1');
    }
  }, [answers, router]);

  const handleRestart = () => {
    clearAnswers();
    router.push('/');
  };

  const totalScore = getTotalScore();

  return (
    <div className='h-full bg-gray-50 py-8'>
      <div className='max-w-2xl mx-auto px-4'>
        <div className='bg-white rounded-lg shadow-md p-6'>
          <h2 className='text-2xl font-bold mb-6'>설문조사 결과</h2>

          <div className='mb-8'>
            <p className='text-xl mb-4'>
              총점:{' '}
              <span className='font-bold text-blue-600'>
                {totalScore.toFixed(1)}점
              </span>
            </p>
            <div className='space-y-2'>
              {Object.entries(answers).map(([questionId, value]) => (
                <div
                  key={questionId}
                  className='flex justify-between items-center'
                >
                  <span className='text-gray-600'>
                    문항 {questionId.replace('q', '')}
                  </span>
                  <span className='font-medium'>{value.toFixed(1)}점</span>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={handleRestart}
            className='w-full px-6 py-2 bg-blue-600 text-white rounded-lg
                      hover:bg-blue-700 transition-colors duration-200'
          >
            다시 시작하기
          </button>
        </div>
      </div>
    </div>
  );
}
