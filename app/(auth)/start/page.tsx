'use client';

import { Button } from '@/components/atoms/Button';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function StartPage() {
  const router = useRouter();

  return (
    <div className='fixed inset-0 flex flex-col items-center justify-center p-4 gap-32 bg-[#F2F5F6]'>
      {/* 상단 컨텐츠 그룹 */}
      <div className='flex flex-col items-center gap-4'>
        {/* 이름 섹션 */}
        <h1 className='font-cookie text-primary-main text-3xl translate-y-12'>
          꿈틀
        </h1>

        {/* 설명 섹션 */}
        <p className='text-[#7D8B8A] font-semibold text-center text-md translate-y-12'>
          맞춤형 자산 관리로
          <br />
          당신의{' '}
          <span className='font-bold text-primary-hover'>버킷리스트</span>를
          이루세요!
        </p>

        {/* GIF 섹션 */}
        <div className='relative w-60 h-60 translate-y-20'>
          <Image
            src='/gif/img8.gif'
            alt='Start page animation'
            fill
            priority
            className='object-cover'
          />
        </div>
      </div>

      {/* 하단 버튼/링크 그룹 */}
      <div className='flex flex-col items-center gap-3 mt-6'>
        <Button size='lg' onClick={() => router.push('/sign-up')}>
          시작하기
        </Button>

        <Link href='/sign-in' className='text-[#9D9D9D] underline text-sm'>
          이미 가입하셨나요?
        </Link>
      </div>
    </div>
  );
}
