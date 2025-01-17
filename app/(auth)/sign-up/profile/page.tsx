'use client';

import { Button } from '@/components/atoms/Button';
import { DefaultInputRef } from '@/components/atoms/Inputs';
import { useSignUpStore } from '@/store/useSignUpStore';
import { SignUpData } from '@/types/Auth';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function ProfilePage() {
  const { formData, setFinalInfo } = useSignUpStore();
  const router = useRouter();

  useEffect(() => {
    if (formData.password && formData.nickname) {
      console.log('최종 회원가입 정보:', formData);
    }
  }, [formData]);

  const handleSignUp = async () => {
    const passwordInput = document.querySelector(
      "input[name='password']"
    ) as HTMLInputElement;
    const nicknameInput = document.querySelector(
      "input[name='nickname']"
    ) as HTMLInputElement;

    if (passwordInput?.value && nicknameInput?.value) {
      setFinalInfo(passwordInput.value, nicknameInput.value);

      const signUpData: SignUpData = {
        name: formData.name,
        birthDate: formData.birthDate,
        gender: formData.gender as 'm' | 'f',
        tel: formData.tel,
        password: passwordInput.value,
        nickname: nicknameInput.value,
      };

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/data/user`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(signUpData),
          }
        );

        const data = await response.json();

        if (data.code === 200) {
          alert('회원가입이 성공적으로 완료되었습니다.');
          router.push('/sign-in');
        } else {
          throw new Error(data.message || '회원가입에 실패했습니다.');
        }
      } catch (error) {
        console.error('회원가입 실패:', error);
        alert('회원가입 중 오류가 발생했습니다.');
      }
    } else {
      alert('모든 필수 항목을 입력해주세요');
    }
  };

  return (
    <div className='p-4'>
      <div className='flex flex-col items-center gap-14'>
        <div className='flex flex-col items-center mt-3'>
          <Image
            src={'/image/icons/smile.png'}
            width={80}
            height={80}
            alt={''}
            className='mb-3'
          />
          <h1 className='text-xl font-bold tracking-tighter whitespace-pre-line text-center text-primary-main mb-2'>
            프로필 정보를 입력하고{'\n'}나만의 계정을 만들어보세요
          </h1>
        </div>

        <div className='w-full max-w-md space-y-6'>
          <div>
            <p className='text-lg font-bold mb-2 text-[#5B5B5B]'>비밀번호</p>
            <DefaultInputRef
              type='password'
              name='password'
              placeHolder='비밀번호를 입력하세요'
              required
              error='비밀번호를 입력해주세요'
            />
          </div>
          <div>
            <p className='text-lg font-bold mb-2 text-[#5B5B5B]'>
              비밀번호 확인
            </p>
            <DefaultInputRef
              type='password'
              name='password'
              placeHolder='비밀번호를 다시 입력해주세요'
              required
              error='비밀번호를 입력해주세요'
            />
          </div>
          <div>
            <p className='text-lg font-bold mb-2 text-[#5B5B5B]'>닉네임</p>
            <DefaultInputRef
              type='name'
              name='nickname'
              placeHolder='닉네임은 10글자까지 가능해요.'
              required
              error='닉네임을 입력해주세요'
            />
          </div>
          <div className='flex flex-col items-center mt-2'>
            <Button size='lg' onClick={handleSignUp}>
              회원가입 완료
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
