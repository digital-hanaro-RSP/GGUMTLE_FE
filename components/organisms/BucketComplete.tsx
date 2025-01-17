import Image from 'next/image';
import NewEvent from '../molecules/NewEvent';

export const CompleteClapping = () => {
  return (
    <>
      <div className='w-full h-[70vh] flex justify-center items-center flex-col'>
        <div className='w-full text-center text-2xl font-bold flex flex-col gap-5 pb-20 animate-fadeIn'>
          <h1>대단해요</h1>
          <h1>버킷리스트를 달성하셨군요!</h1>
        </div>
        <Image
          className='animate-fadeIn'
          src={'/image/icons/Clapping.png'}
          alt='img'
          width={200}
          height={200}
          priority
        />
      </div>
    </>
  );
};

export const CompleteSendingMoney = () => {
  return (
    <>
      <div className='w-full h-[70vh] flex justify-center items-center flex-col'>
        <div className='w-full text-center text-2xl font-bold flex flex-col gap-5 pb-20 animate-fadeIn'>
          <h1>달성한 금액은</h1>
          <h1>연결된 계좌로 바로 보내드릴게요</h1>
        </div>
        <video
          className='animate-fadeIn'
          src='/image/video/flyMoney.mp4'
          autoPlay
          loop
          muted
          playsInline
        />
      </div>
    </>
  );
};

export const ShareToGroup = () => {
  return (
    <>
      <div className='w-full h-[70vh] flex justify-center items-center flex-col'>
        <div className='w-full text-center text-2xl font-bold flex flex-col gap-5 pb-20 animate-fadeIn'>
          <h1>달성한 버킷리스트를</h1>
          <h1>꿈모임에 공유해보시겠어요?</h1>
        </div>
        <div className='flex p-[10px] items-center justify-between w-full py-3 h-fit min-h-[80px] border-y border-y-primary-main'>
          <Image
            src='/image/popper.gif'
            alt='Animated GIF'
            width={36}
            height={36}
          />
          <div className='flex flex-col'>
            <p className='text-center break-all'>
              <strong className='text-[15px] font-bold'>OOO님 &quot;</strong>
              <strong className='text-[16px] text-primary-main font-bold '>
                (히말라야)
              </strong>
              <strong className='text-[15px] font-bold'>
                &quot; 버킷리스트 달성!
              </strong>
            </p>
          </div>
          <Image
            src='/image/popperReverse.gif'
            alt='Animated GIF'
            width={36}
            height={36}
          />
        </div>
      </div>
    </>
  );
};
