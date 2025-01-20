'use client';

import { Button } from '@/components/atoms/Button';
import CheckBox from '@/components/atoms/CheckBox';
import { RadioItem } from '@/components/atoms/RadioItem';
import { StatusBar } from '@/components/atoms/StatusBar';
import { SurveyCard } from '@/components/molecules/SurveyCard';
import { surveyQuestions } from '@/constants/surveyQuestions';
import { useSurveyStore } from '@/store/surveyStore';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

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
    const questionKey = `q${currentStep}`;
    const savedIds = selectedIds[questionKey] || [];
    setSelectedList(savedIds);
  }, [currentStep, selectedIds]);

  const question = surveyQuestions[currentStep];

  if (!question) {
    router.push('/');
    return null;
  }

  const handleChangeRadio = (id: string, value: number) => {
    setAnswer(`q${currentStep}`, value, id, false);
    setSelectedList([id]);
  };

  const handleChangeCheckbox = (
    id: string,
    value: number,
    checked: boolean
  ) => {
    setAnswer(`q${currentStep}`, value, id, true);

    if (checked) {
      setSelectedList((prev) => [...prev, id]);
    } else {
      setSelectedList((prev) => prev.filter((item) => item !== id));
    }
  };

  const handleNext = () => {
    if (selectedList.length === 0) return;

    if (currentStep < TOTAL_QUESTIONS) {
      router.push(`/investment/${currentStep + 1}`);
    } else {
      router.push('/investment/results');
    }
  };

  return (
    <div className='h-screen bg-gray-50'>
      <div className='max-w-2xl mx-auto px-2 h-full py-4'>
        <div className='bg-white rounded-lg shadow-md p-6 h-full flex flex-col'>
          {/* 상단 고정 영역 */}
          <div className='sticky top-0 bg-white z-10'>
            <div className='mb-6'>
              <StatusBar
                current={currentStep}
                total={TOTAL_QUESTIONS}
                className='mb-1'
              />
              <p className='text-sm text-gray-600 text-right'>
                {currentStep}/{TOTAL_QUESTIONS}
              </p>
            </div>

            <div className='question-section mb-5'>
              <SurveyCard
                sid={currentStep}
                question={question.question}
                direction='vertical'
              ></SurveyCard>
            </div>
          </div>

          {/* 스크롤 가능한 문항 영역 */}
          <div className='flex-1 overflow-y-auto'>
            <div className='options-container max-w-xl mx-auto'>
              {question.options.map((option) => {
                if (question.isMultiple) {
                  return (
                    <div
                      key={option.id}
                      className='flex items-center gap-2 mb-3'
                    >
                      <CheckBox
                        checked={selectedList.includes(option.id)}
                        onChange={(checked) =>
                          handleChangeCheckbox(option.id, option.value, checked)
                        }
                      />
                      <label
                        htmlFor={option.id}
                        className='cursor-pointer text-gray-700 flex-1 min-w-0 '
                      >
                        {option.label}
                      </label>
                    </div>
                  );
                } else {
                  return (
                    <RadioItem
                      key={option.id}
                      id={option.id}
                      name={`q${currentStep}`}
                      value={option.value}
                      checked={selectedList.includes(option.id)}
                      onChange={() =>
                        handleChangeRadio(option.id, option.value)
                      }
                      className='mb-3 flex items-center'
                      shape='circle'
                      contentDirection='horizontal'
                    >
                      <span className='flex-1 min-w-0'>{option.label}</span>
                    </RadioItem>
                  );
                }
              })}
            </div>
          </div>

          {/* 하단 버튼 영역 */}
          <div className='flex justify-between mt-8'>
            {currentStep > 1 && (
              <Button
                size='sm'
                onClick={() => router.push(`/investment/${currentStep - 1}`)}
                className='px-6 py-2 bg-gray-500 transition-colors duration-200'
              >
                이전
              </Button>
            )}
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
