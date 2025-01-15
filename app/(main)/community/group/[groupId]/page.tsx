'use client';

import { PlusButton } from '@/components/atoms/Button';
import Header from '@/components/atoms/Header';
import { useRouter } from 'next/navigation';

//

export default function GroupIdPage() {
  const router = useRouter();

  return (
    <div className='flex flex-col w-full'>
      <Header text='꿈그룹' showActionButton={false} />
      {/* 플러스 버튼 */}
      <div className='fixed left-0 right-0 bottom-[68px] max-w-screen-md mx-auto pointer-events-none'>
        <PlusButton
          className='absolute bottom-[20px] right-[20px] pointer-events-auto'
          size='sm'
          onClick={() => {
            router.push('/community/create/post');
          }}
        />
      </div>
    </div>
  );
}
