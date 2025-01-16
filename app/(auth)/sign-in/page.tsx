import { Button } from '@/components/atoms/Button';
import { DefaultInputRef } from '@/components/atoms/Inputs';
import Image from 'next/image';

export default function SignInPage() {
  return (
    <div className='p-4'>
      <div className='flex flex-col items-center gap-14'>
        <div className='flex flex-col items-center mt-3'>
          <Image
            src={'/image/icons/Id_Card.png'}
            width={80}
            height={80}
            alt={''}
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
            />
          </div>
          <div className='flex flex-col items-center mt-2'>
            <Button size='lg'>로그인</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
