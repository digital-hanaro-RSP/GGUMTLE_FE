'use client';

import { Button } from '@/components/atoms/Button';
import { DefaultInputRef } from '@/components/atoms/Inputs';
import LoadingDot from '@/components/atoms/LoadingDot';
import { signIn } from 'next-auth/react';
import Swal from 'sweetalert2';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';

export default function SignInPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const formData = new FormData(e.currentTarget);
      const tel = formData.get('phone') as string;
      const password = formData.get('password') as string;

      const result = await signIn('credentials', {
        tel,
        password,
        redirect: false,
      });

      if (result?.error) {
        Swal.fire({
          title: 'Oops!',
          text: '전화번호와 비밀번호를 확인해주세요',
          icon: 'error',
          confirmButtonText: '네',
          confirmButtonColor: '#069894',
        });
        return;
      }

      // 로그인 성공
      Swal.fire({
        text: '로그인 성공! 환영합니다.',
        icon: 'success',
        showConfirmButton: false,
        timer: 1500,
        confirmButtonColor: '#069894',
      });
      router.push('/mydata/consent'); // 로그인 후 리다이렉트할 페이지
      router.refresh(); // 세션 상태 업데이트를 위한 새로고침
    } catch (error) {
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='w-full relative'>
      {isLoading && <LoadingDot />}

      <form onSubmit={handleSubmit} className='p-4'>
        <div className='flex flex-col items-center gap-14'>
          <div className='flex flex-col items-center mt-3'>
            <Image
              src={'/image/icons/Id_Card.png'}
              width={80}
              height={80}
              alt={'로그인 아이콘'}
              className='mb-3'
            />
            <h1 className='text-xl font-bold tracking-tighter whitespace-pre-line text-center text-primary-main mb-2'>
              당신의 버킷리스트를 이루는{'\n'}현명한 자산관리의 시작
            </h1>
          </div>
          <div className='w-full max-w-md space-y-6'>
            <div>
              <p className='text-lg font-bold mb-2 text-[#5B5B5B]'>전화번호</p>
              <DefaultInputRef
                name='phone'
                placeHolder='전화번호를 입력해주세요'
                required
                error='전화번호를 입력해주세요'
                disabled={isLoading}
                autoComplete='tel'
              />
            </div>
            <div>
              <p className='text-lg font-bold mb-2 text-[#5B5B5B]'>비밀번호</p>
              <DefaultInputRef
                type='password'
                name='password'
                placeHolder='비밀번호를 입력하세요'
                required
                error='비밀번호를 입력해주세요'
                disabled={isLoading}
                autoComplete='current-password'
              />
            </div>
          </div>
          <div className='flex flex-col items-center mt-20'>
            <Button type='submit' size='lg' disabled={isLoading}>
              {isLoading ? '로그인 중...' : '로그인'}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
