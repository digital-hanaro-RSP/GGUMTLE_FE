'use client';

import { RadioItem } from '@/components/atoms/RadioItem';
import {
  DropCard,
  DropCardItem,
  DropCardItemList,
  DropDownTrigger,
} from '@/components/molecules/DropCard';
import { ProgressBar } from '@/components/molecules/ProgressBar';
import { SurveyCard } from '@/components/molecules/SurveyCard';
import { useState } from 'react';

export default function CompTest() {
  const [selectedValues, setSelectedValues] = useState<Record<string, number>>(
    {}
  );

  const handleChange = (questionId: string, value: number) => {
    setSelectedValues((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };

  return (
    <>
      <DropCard className='flex flex-col justify-center relative'>
        <DropDownTrigger>열기</DropDownTrigger>
        <DropCardItemList
          isBlur={true}
          direction='down'
          className='items-center gap-2 top-10'
        >
          <DropCardItem>
            <div className='bg-blue-100 w-fit'>bye</div>
          </DropCardItem>
          <DropCardItem>
            <div className='bg-blue-100 w-fit'>hi</div>
          </DropCardItem>
          <DropCardItem>
            <div className='bg-blue-100 w-fit'>hello</div>
          </DropCardItem>
          <DropCardItem>
            <div className='bg-blue-100 w-fit'>good</div>
          </DropCardItem>
          <DropCardItem>
            <div className='bg-blue-100 w-fit'>night</div>
          </DropCardItem>
        </DropCardItemList>
      </DropCard>

      <ProgressBar dataPercent={20} />
      <div>
        <h3>Selected Values:</h3>
        {Object.entries(selectedValues).map(([key, value]) => (
          <p key={key}>
            Question {key}: {value}
          </p>
        ))}
      </div>
      <SurveyCard
        sid={1}
        question={
          <>
            사용자의 <b className='text-primary-main'>연령대</b>를 선택해주세요.
          </>
        }
        direction='horizontal'
      >
        <RadioItem
          contentDirection='vertical'
          shape='circle'
          id='op1'
          name='q1'
          value={2.5}
          onChange={() => handleChange('q1', 2.5)}
        >
          19세 이하
        </RadioItem>
        <RadioItem
          contentDirection='vertical'
          shape='circle'
          id='op2'
          name='q1'
          value={2.5}
          onChange={() => handleChange('q1', 2.5)}
        >
          20대
        </RadioItem>
        <RadioItem
          contentDirection='vertical'
          shape='circle'
          id='op3'
          name='q1'
          value={2}
          onChange={() => handleChange('q1', 2.0)}
        >
          30대
        </RadioItem>
        <RadioItem
          contentDirection='vertical'
          shape='circle'
          id='op4'
          name='q1'
          value={1.5}
          onChange={() => handleChange('q1', 1.5)}
        >
          40대
        </RadioItem>
        <RadioItem
          contentDirection='vertical'
          shape='circle'
          id='op5'
          name='q1'
          value={1}
          onChange={() => handleChange('q1', 1.0)}
        >
          50대
        </RadioItem>
        <RadioItem
          contentDirection='vertical'
          shape='circle'
          id='op6'
          name='q1'
          value={0.5}
          onChange={() => handleChange('q1', 0.5)}
        >
          60대 이상
        </RadioItem>
      </SurveyCard>

      <DropCard className='flex flex-col justify-center relative'>
        <DropDownTrigger>열기</DropDownTrigger>
        <DropCardItemList
          isBlur={true}
          direction='up'
          className='items-center gap-2 bottom-10'
        >
          <DropCardItem>
            <div className='bg-blue-100 w-1/2 rounded-lg'>bye</div>
          </DropCardItem>
          <DropCardItem>
            <div className='bg-blue-100 w-1/2 rounded-lg'>hi</div>
          </DropCardItem>
          <DropCardItem>
            <div className='bg-blue-100 w-1/2 rounded-lg'>hello</div>
          </DropCardItem>
          <DropCardItem>
            <div className='bg-blue-100 w-1/2 rounded-lg'>good</div>
          </DropCardItem>
          <DropCardItem>
            <div className='bg-blue-100 w-1/2 rounded-lg'>night</div>
          </DropCardItem>
        </DropCardItemList>
      </DropCard>

      <SurveyCard
        sid={1}
        question={
          <>
            사용자의 <b className='text-primary-main'>연령대</b>를 선택해주세요.
          </>
        }
        direction='vertical'
      >
        <RadioItem
          contentDirection='horizontal'
          shape='circle'
          id='q2_op1'
          name='q2'
          value={2.5}
          onChange={() => handleChange('q2', 2.5)}
        >
          19세 이하
        </RadioItem>
        <RadioItem
          contentDirection='horizontal'
          shape='circle'
          id='q2_op2'
          name='q2'
          value={2.5}
          onChange={() => handleChange('q2', 2.5)}
        >
          20대
        </RadioItem>
        <RadioItem
          contentDirection='horizontal'
          shape='circle'
          id='q2_op3'
          name='q2'
          value={2}
          onChange={() => handleChange('q2', 2.0)}
        >
          30대
        </RadioItem>
        <RadioItem
          contentDirection='horizontal'
          shape='circle'
          id='q2_op4'
          name='q2'
          value={1.5}
          onChange={() => handleChange('q2', 1.5)}
        >
          40대
        </RadioItem>
        <RadioItem
          contentDirection='horizontal'
          shape='circle'
          id='q2_op5'
          name='q2'
          value={1}
          onChange={() => handleChange('q2', 1.0)}
        >
          50대
        </RadioItem>
        <RadioItem
          contentDirection='horizontal'
          shape='circle'
          id='q2_op6'
          name='q2'
          value={0.5}
          onChange={() => handleChange('q2', 0.5)}
        >
          60대 이상
        </RadioItem>
      </SurveyCard>
    </>
  );
}
