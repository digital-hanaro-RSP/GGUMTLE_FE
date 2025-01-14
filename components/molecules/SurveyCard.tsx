'use client';

// import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Card } from '../atoms/Card';

export interface SurveyCardProps extends React.HTMLAttributes<HTMLDivElement> {
  sid: number;
  question: React.ReactNode;
  direction: 'horizontal' | 'vertical';
}

export const SurveyCard = ({
  sid,
  question,
  direction,
  children,
  ...props
}: SurveyCardProps) => {
  // const [answer, setAnswer] = useState(null);
  return (
    <>
      <Card {...props} className='p-0'>
        <div>
          <div className='question-block text-lg p-5 rounded-t-xl bg-[#F5FFFE]'>
            <strong className='text-primary-main'>{`Q${sid}. `}</strong>
            <strong>{question}</strong>
          </div>
          <div className=''></div>
        </div>
        <fieldset
          className={cn('flex p-3 gap-2 items-start break-keep', direction === 'vertical' && 'flex-col')}
        >
          {children}
        </fieldset>
      </Card>
    </>
  );
};
