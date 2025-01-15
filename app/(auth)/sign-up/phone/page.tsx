'use client';

import { Button } from '@/components/atoms/Button';
import { DefaultInputRef } from '@/components/atoms/Inputs';
import { LuListCheck } from 'react-icons/lu';
import { useState, useEffect } from 'react';

export default function PhonePage() {
  const [showVerification, setShowVerification] = useState(false);
  const [timeLeft, setTimeLeft] = useState(180); // 3 minutes in seconds
  const [timerExpired, setTimerExpired] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (showVerification && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(timer);
            setTimerExpired(true);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [showVerification, timeLeft]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleGetVerificationCode = () => {
    setShowVerification(true);
    setTimeLeft(180);
    setTimerExpired(false);
  };

  return (
    <div className='p-4'>
      <div className='flex flex-col items-center gap-10'>
        <div className='flex flex-col items-center mt-3'>
          <LuListCheck className='text-primary-main text-5xl mb-3' />
          <h1 className='text-xl font-bold tracking-tighter whitespace-pre-line text-center text-primary-main mb-4'>
            아래 내용을 하나씩{'\n'}차근차근 입력해주세요
          </h1>
        </div>
        <div className='w-full max-w-md space-y-6'>
          <div>
            <p className='text-lg font-bold mb-2 text-[#5B5B5B]'>휴대폰 인증</p>
            <div className='flex flex-row gap-2'>
              <div className='w-[70%]'>
                <DefaultInputRef
                  name='phone'
                  placeHolder='전화번호를 입력해주세요'
                  required
                  error='전화번호를 입력해주세요'
                />
              </div>
              <Button
                size='sm'
                className='text-xs bg-[#EFF0F4] text-[#5B5B5B] font-semibold'
                onClick={handleGetVerificationCode}
              >
                인증번호 받기
              </Button>
            </div>
          </div>

          {showVerification && (
            <>
              <div>
                <div className='text-primary-main font-medium'>
                  <span className='flex justify-center'>
                    전화번호로 인증번호를 보내드렸습니다.
                  </span>
                  <span className='flex justify-center'>
                    3분 안에 입력해 주세요.
                  </span>
                </div>
              </div>
              {/* <div className='w-10 h-10 mx-auto flex items-center justify-center'>
                <Image
                  src='/image/icons/hourglass.png'
                  alt={'hourglass icon'}
                  width={40}
                  height={40}
                />
              </div> */}
              <DefaultInputRef
                name='name'
                placeHolder='인증번호 입력해주세요'
                required
                error='인증번호 입력해주세요'
              />

              <div className='flex justify-center'>
                {!timerExpired ? (
                  <div className=' text-primary-main'>
                    유효시간 {formatTime(timeLeft)}
                  </div>
                ) : (
                  <div className=' text-primary-main'>
                    유효시간이 모두 끝났습니다.
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
