'use client';

import {
  CompleteClapping,
  CompleteSendingMoney,
  ShareToGroup,
} from '@/components/organisms/BucketComplete';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function BucketListCompletePage() {
  const searchParams = useSearchParams();
  const howTo = searchParams.get('howto');
  const [step, setStep] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setStep((prevCount) => {
        if (prevCount < 2) {
          if (howTo !== 'MONEY') {
            return prevCount + 2;
          }
          return prevCount + 1;
        } else {
          clearInterval(interval);
          return prevCount;
        }
      });
    }, 3000);

    return () => clearInterval(interval); // Cleanup interval on unmount
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      {step === 0 && <CompleteClapping />}
      {step === 1 && <CompleteSendingMoney />}
      {step === 2 && <ShareToGroup />}
    </>
  );
}
