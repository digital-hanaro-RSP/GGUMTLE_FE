// app/(investment)/investment/[step]/page.tsx
'use client';

import { Button } from '@/components/atoms/Button';
import CheckBox from '@/components/atoms/CheckBox';
import { RadioItem } from '@/components/atoms/RadioItem';
// 우리가 만든 컴포넌트
import { StatusBar } from '@/components/atoms/StatusBar';
import { SurveyCard } from '@/components/molecules/SurveyCard';
import { surveyQuestions } from '@/constants/surveyQuestions';
import { useSurveyStore } from '@/store/surveyStore';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

// app/(investment)/investment/[step]/page.tsx

// app/(investment)/investment/[step]/page.tsx

// app/(investment)/investment/[step]/page.tsx

// app/(investment)/investment/[step]/page.tsx

// app/(investment)/investment/[step]/page.tsx

// app/(investment)/investment/[step]/page.tsx

// app/(investment)/investment/[step]/page.tsx

// app/(investment)/investment/[step]/page.tsx

export default function SurveyStepPage({
  params,
}: {
  params: { step: string };
}) {
  const router = useRouter();
  const currentStep = parseInt(params.step);
  const TOTAL_QUESTIONS = 8;

  const { selectedIds, setAnswer } = useSurveyStore();
  const [selectedList, setSelectedList] = useState<string[]>([]);

  useEffect(() => {
    // 1. 질문 불러오기
    const questionKey = `q${currentStep}`;
    // 2. 이미 저장된 답안 id들
    const savedIds = selectedIds[questionKey] || [];
    setSelectedList(savedIds);
  }, [currentStep, selectedIds]);

  const question = surveyQuestions[currentStep];

  // 질문 id가 잘못된 경우
  if (!question) {
    router.push('/');
    return null;
  }

  const handleChangeRadio = (id: string, value: number) => {
    setAnswer(`q${currentStep}`, value, id, false /* 단일 선택 */);
    setSelectedList([id]);
  };

  const handleChangeCheckbox = (
    id: string,
    value: number,
    checked: boolean
  ) => {
    // checked = 현재 토글 이후의 상태
    // store에 넣으면 알아서 토글 처리
    setAnswer(`q${currentStep}`, value, id, true /* 다중 선택 */);

    // 로컬 state도 토글
    if (checked) {
      // 새로 추가
      setSelectedList((prev) => [...prev, id]);
    } else {
      // 이미 있던 것을 제거
      setSelectedList((prev) => prev.filter((item) => item !== id));
    }
  };

  const handleNext = () => {
    // 선택이 하나도 없는 경우 넘어가지 못하도록 막을 수도 있음
    if (selectedList.length === 0) return;

    if (currentStep < TOTAL_QUESTIONS) {
      router.push(`/investment/${currentStep + 1}`);
    } else {
      router.push('/investment/results');
    }
  };

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
            {/* 문항 options 렌더링 */}
            {question.options.map((option) => {
              // 다중 선택 여부 판단
              if (question.isMultiple) {
                // ------ CheckBox 사용 ------
                return (
                  <div key={option.id} className='flex items-center gap-2 mb-3'>
                    <CheckBox
                      checked={selectedList.includes(option.id)}
                      onChange={(checked) =>
                        handleChangeCheckbox(option.id, option.value, checked)
                      }
                    />
                    <label
                      htmlFor={option.id}
                      className='cursor-pointer text-gray-700'
                    >
                      {option.label}
                    </label>
                  </div>
                );
              } else {
                // ------ RadioItem 사용 ------
                return (
                  <RadioItem
                    key={option.id}
                    id={option.id}
                    name={`q${currentStep}`}
                    value={option.value}
                    checked={selectedList.includes(option.id)}
                    onChange={() => handleChangeRadio(option.id, option.value)}
                    className='mb-3'
                    shape='circle'
                    contentDirection='horizontal'
                  >
                    {option.label}
                  </RadioItem>
                );
              }
            })}
          </SurveyCard>

          <div className='flex justify-between mt-8'>
            {/* 이전 버튼 */}
            {currentStep > 1 && (
              <Button
                size='sm'
                onClick={() => router.push(`/investment/${currentStep - 1}`)}
                className='px-6 py-2 bg-gray-300 transition-colors duration-200'
              >
                이전
              </Button>
            )}
            {/* 다음 버튼 */}
            <Button
              size='sm'
              onClick={handleNext}
              disabled={selectedList.length === 0}
              className='px-6 py-2 transition-colors duration-200
                         disabled:opacity-50 disabled:cursor-not-allowed
                         ml-auto'
            >
              {currentStep === TOTAL_QUESTIONS ? '완료' : '다음'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
