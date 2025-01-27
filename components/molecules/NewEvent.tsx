import { Post } from '@/types/Community';
import Image from 'next/image';

export default function NewEvent({ content, userBriefInfo }: Post) {
  return (
    <div className='flex p-[10px] items-center justify-between w-full h-[80px] border-y border-y-primary-main'>
      <Image
        src='/image/popper.gif'
        alt='Animated GIF'
        width={36}
        height={36}
        priority
        unoptimized
      />
      <div className='flex flex-col items-center'>
        <span className='text-[15px] font-bold'>
          {userBriefInfo.nickname}님
        </span>
        <span className='text-[16px] text-primary-main font-bold '>
          {content}
        </span>
        <span className='text-[15px] font-bold'>버킷리스트 달성!</span>
      </div>
      <Image
        src='/image/popperReverse.gif'
        alt='Animated GIF'
        width={36}
        height={36}
        priority
        unoptimized
      />
    </div>
  );
}
