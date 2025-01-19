'use client';

import { Button } from '@/components/atoms/Button';
import { RadioItem } from '@/components/atoms/RadioItem';
import { StatusBar } from '@/components/atoms/StatusBar';
import { SurveyCard } from '@/components/molecules/SurveyCard';
import { surveyQuestions } from '@/constants/surveyQuestions';
import { useSurveyStore } from '@/store/surveyStore';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function SurveyStepPage({
  params,
}: {
  params: { step: string };
}) {
  const router = useRouter();
  const currentStep = parseInt(params.step);
  const { answers, selectedIds, setAnswer } = useSurveyStore();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const TOTAL_QUESTIONS = 8;

  useEffect(() => {
    // 모든 질문에 답변했는지 확인
    const totalAnswers = Object.keys(answers).length;
    if (totalAnswers === 0) {
      router.push('/investment/1');
    }

    // Zustand store에서 현재 질문에 대한 답변의 id 불러오기
    const questionKey = `q${currentStep}`;
    const savedId = selectedIds[questionKey];
    if (savedId) {
      setSelectedId(savedId);
    } else {
      setSelectedId(null);
    }
  }, [currentStep, selectedIds, answers, router]);

  const handleChange = (id: string, value: number) => {
    setSelectedId(id);
    setAnswer(`q${currentStep}`, value, id);
  };

  const handleNext = () => {
    if (selectedId === null) return;

    if (currentStep < 8) {
      router.push(`/investment/${currentStep + 1}`);
    } else {
      router.push('/investment/results');
    }
  };

  const question = surveyQuestions[currentStep];

  if (!question) {
    router.push('/');
    return null;
  }

  return (
    <div className='h-full bg-gray-50 py-8 overflow-y-auto'>
      <div className='max-w-2xl mx-auto px-4'>
        <div className='bg-white rounded-lg shadow-md p-6'>
          <div className='mb-6'>
            <StatusBar
              current={currentStep}
              total={TOTAL_QUESTIONS}
              className='mb-2'
            />
            <p className='text-sm text-gray-600 text-right'>
              {currentStep}/{TOTAL_QUESTIONS}
            </p>
          </div>

          <SurveyCard
            sid={currentStep}
            question={question.question}
            direction='vertical'
            className='mb-8'
          >
            {question.options.map((option) => (
              <RadioItem
                key={option.id}
                contentDirection='horizontal'
                shape='circle'
                id={option.id}
                name={`q${currentStep}`}
                value={option.value}
                checked={selectedId === option.id}
                onChange={() => handleChange(option.id, option.value)}
                className='mb-3'
              >
                {option.label}
              </RadioItem>
            ))}
          </SurveyCard>

          <div className='flex justify-between mt-8'>
            {currentStep > 1 && (
              <Button
                size='sm'
                onClick={() => router.push(`/investment/${currentStep - 1}`)}
                className='px-6 py-2 bg-gray-300 transition-colors duration-200'
              >
                이전
              </Button>
            )}
            <Button
              size='sm'
              onClick={handleNext}
              disabled={selectedId === null}
              className='px-6 py-2 transition-colors duration-200
                      disabled:opacity-50 disabled:cursor-not-allowed
                      ml-auto'
            >
              {currentStep === 8 ? '완료' : '다음'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
