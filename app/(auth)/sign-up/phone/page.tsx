'use client';

import { Button } from '@/components/atoms/Button';
import { DefaultInputRef } from '@/components/atoms/Inputs';
import { useSignUpStore } from '@/store/useSignUpStore';
import { RiPhoneFindLine } from 'react-icons/ri';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function PhonePage() {
  const [showVerification, setShowVerification] = useState(false);
  const [timeLeft, setTimeLeft] = useState(180); // 3 minutes in seconds
  const [timerExpired, setTimerExpired] = useState(false);
  const setPhoneInfo = useSignUpStore((state) => state.setPhoneInfo);
  const router = useRouter();

  const formatPhoneNumber = (phoneNumber: string) => {
    const cleaned = phoneNumber.replace(/\D/g, '');
    const match = cleaned.match(/^(\d{3})(\d{4})(\d{4})$/);
    if (match) {
      return `${match[1]}-${match[2]}-${match[3]}`;
    }
    return phoneNumber;
  };

  const handleVerificationSuccess = () => {
    const phoneInput = document.querySelector(
      "input[name='phone']"
    ) as HTMLInputElement;
    if (phoneInput) {
      const formattedPhone = formatPhoneNumber(phoneInput.value);
      setPhoneInfo(formattedPhone);
      console.log('저장된 정보: ', useSignUpStore.getState().formData);
      alert('인증에 성공하였습니다.');
      router.push('/sign-up/profile');
    }
  };

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
      <div className='flex flex-col items-center gap-14'>
        <div className='flex flex-col items-center mt-3'>
          <RiPhoneFindLine className='text-primary-main text-5xl mb-3' />
          <h1 className='text-xl font-bold tracking-tighter whitespace-pre-line text-center text-primary-main mb-4'>
            간단한 휴대폰 인증으로{'\n'}본인 확인을 완료하세요
          </h1>
        </div>
        <div className='w-full max-w-md space-y-10'>
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
            <div className='animate-fadeIn space-y-10'>
              <div className='text-primary-main font-medium'>
                <span className='flex justify-center'>
                  전화번호로 인증번호를 보내드렸습니다.
                </span>
                <span className='flex justify-center'>
                  3분 안에 입력해 주세요.
                </span>
              </div>

              <div className='space-y-4'>
                <DefaultInputRef
                  name='name'
                  placeHolder='인증번호 입력해주세요'
                  required
                  error='인증번호 입력해주세요'
                />

                <div className='flex justify-center'>
                  {!timerExpired ? (
                    <div className='text-primary-main'>
                      유효시간 {formatTime(timeLeft)}
                    </div>
                  ) : (
                    <div className='text-primary-main'>
                      유효시간이 모두 끝났습니다.
                    </div>
                  )}
                </div>
              </div>

              <div className='flex flex-col items-center'>
                <Button size='lg' onClick={handleVerificationSuccess}>
                  인증번호 확인
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
