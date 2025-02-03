'use client';

import { Button } from '@/components/atoms/Button';
import { DefaultInputRef } from '@/components/atoms/Inputs';
import { useSignUpStore } from '@/store/useSignUpStore';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function PhonePage() {
  const [showVerification, setShowVerification] = useState(false);
  const [timeLeft, setTimeLeft] = useState(180); // 3분
  const [timerExpired, setTimerExpired] = useState(false);
  const setPhoneInfo = useSignUpStore((state) => state.setPhoneInfo);
  const router = useRouter();
  const [buttonText, setButtonText] = useState('인증번호 받기');
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const formatPhoneNumber = (phoneNumber: string) => {
    const cleaned = phoneNumber.replace(/\D/g, '');
    const match = cleaned.match(/^(\d{3})(\d{4})(\d{4})$/);
    if (match) {
      return `${match[1]}${match[2]}${match[3]}`;
    }
    return phoneNumber;
  };

  const buttonStyles = isButtonDisabled
    ? 'text-xs bg-[#B0B0B0] text-white font-semibold cursor-not-allowed'
    : 'text-xs bg-[#EFF0F4] text-[#5B5B5B] font-semibold hover:bg-[#E0E1E5]';

  const handleVerificationSuccess = async () => {
    const phoneInput = document.querySelector(
      "input[name='phone']"
    ) as HTMLInputElement;
    const codeInput = document.querySelector(
      "input[name='name']"
    ) as HTMLInputElement;

    if (!phoneInput?.value || !codeInput?.value) {
      alert('전화번호와 인증번호를 모두 입력해주세요');
      return;
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/data/verification-code/validation`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            tel: phoneInput.value,
            code: codeInput.value,
          }),
        }
      );

      if (response.status === 200) {
        const formattedPhone = formatPhoneNumber(phoneInput.value);
        setPhoneInfo(formattedPhone);
        alert('인증에 성공하였습니다.');
        router.push('/sign-up/profile');
      } else if (response.status === 401) {
        alert('인증번호가 일치하지 않습니다.');
      } else {
        alert('인증에 실패했습니다. 다시 시도해주세요.');
      }
    } catch (error) {
      alert('요청 중 오류가 발생했습니다.');
      console.error(error);
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

  const handleGetVerificationCode = async () => {
    const phoneInput = document.querySelector(
      "input[name='phone']"
    ) as HTMLInputElement;
    if (!phoneInput?.value) {
      alert('휴대전화 번호를 입력해주세요');
      return;
    }

    setButtonText('발송중...');
    setIsButtonDisabled(true);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/data/verification-code`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            tel: phoneInput.value,
          }),
        }
      );

      const data = await response.json();

      if (response.status === 200) {
        setShowVerification(true); // 순서 변경
        setTimeLeft(180);
        setTimerExpired(false);

        setTimeout(() => {
          alert('문자가 발송되었습니다. 잠시만 기다려주세요.');
        }, 100);

        setTimeout(() => {
          setButtonText('인증번호 받기');
          setIsButtonDisabled(false);
        }, 180000);
      } else if (response.status === 409) {
        alert('이미 가입된 휴대전화 번호입니다.');
      } else if (response.status === 400) {
        alert(data.message);
      } else if (response.status === 500) {
        alert('SMS 발송에 실패했습니다. 잠시 후 다시 시도해주세요.');
      }
    } catch (error) {
      console.error('Error:', error); // 디버깅용
      alert('요청 중 오류가 발생했습니다.');
      setButtonText('인증번호 받기');
      setIsButtonDisabled(false);
    }
  };

  return (
    <div className='p-4'>
      <div className='flex flex-col items-center gap-14'>
        <div className='flex flex-col items-center mt-3'>
          <Image
            src={'/image/icons/phone.png'}
            width={60}
            height={60}
            alt={'휴대폰 아이콘'}
            className='mb-3'
          />
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
                className={buttonStyles}
                onClick={handleGetVerificationCode}
                disabled={isButtonDisabled}
              >
                {buttonText}
              </Button>
            </div>
          </div>

          {showVerification && (
            <div className='animate-fadeIn space-y-10'>
              <div className='text-sm text-primary-main font-medium'>
                <span className='flex justify-center'>
                  {' '}
                  문자로 도착한 인증번호를 입력해주세요.
                </span>{' '}
                <span className='flex justify-center'>
                  {' '}
                  문자가 오지 않으시면 3분 후에 다시 받으실 수 있습니다.
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
