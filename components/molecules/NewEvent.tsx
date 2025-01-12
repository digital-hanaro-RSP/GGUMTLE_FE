import Image from 'next/image';

export default function NewEvent() {
  return (
    <div className='flex p-[10px] items-center justify-between w-full h-[80px] border border-y-primary-main'>
      <Image
        src='/image/popper.gif'
        alt='Animated GIF'
        width={36}
        height={36}
      />
      <div className='flex '>
        <span className='text-[15px] font-bold'>홍길동님 &quot;</span>
        <span className='text-[16px] text-primary-main font-bold '>
          크루즈 타기
        </span>
        <span className='text-[15px] font-bold'>&quot; 버킷리스트 달성!</span>
      </div>
      <Image
        src='/image/popperReverse.gif'
        alt='Animated GIF'
        width={36}
        height={36}
      />
    </div>
  );
}
