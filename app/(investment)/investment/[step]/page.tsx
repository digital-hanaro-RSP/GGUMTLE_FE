'use client';

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
  const { answers, setAnswer } = useSurveyStore();
  const [selectedValue, setSelectedValue] = useState<number | null>(null);
  const TOTAL_QUESTIONS = 2;
  useEffect(() => {
    // Zustand store에서 현재 질문에 대한 답변 불러오기
    const savedAnswer = answers[`q${currentStep}`];
    if (savedAnswer !== undefined) {
      setSelectedValue(savedAnswer);
    } else {
      setSelectedValue(null);
    }
  }, [currentStep, answers]);

  const handleChange = (value: number) => {
    setSelectedValue(value);
    setAnswer(`q${currentStep}`, value);
  };

  const handleNext = () => {
    if (selectedValue === null) return;

    if (currentStep < 2) {
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
    <div className='min-h-screen bg-gray-50 py-8'>
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
                checked={selectedValue === option.value}
                onChange={() => handleChange(option.value)}
                className='mb-3'
              >
                {option.label}
              </RadioItem>
            ))}
          </SurveyCard>

          <div className='flex justify-between mt-8'>
            {currentStep > 1 && (
              <button
                onClick={() => router.push(`/investment/${currentStep - 1}`)}
                className='px-6 py-2 bg-gray-200 hover:bg-gray-300 
                          rounded-lg transition-colors duration-200'
              >
                이전
              </button>
            )}
            <button
              onClick={handleNext}
              disabled={selectedValue === null}
              className='px-6 py-2 bg-blue-600 text-white rounded-lg
                        hover:bg-blue-700 transition-colors duration-200
                        disabled:opacity-50 disabled:cursor-not-allowed
                        ml-auto'
            >
              {currentStep === 2 ? '완료' : '다음'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
