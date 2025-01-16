import Image from 'next/image';

export default function ProfilePage() {
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
          <h1 className='text-xl font-bold tracking-tighter whitespace-pre-line text-center text-primary-main mb-4'>
            프로필 정보를 입력하고{'\n'}나만의 계정을 만들어보세요
          </h1>
        </div>
      </div>
    </div>
  );
}
