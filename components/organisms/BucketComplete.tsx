import { MockGroups } from '@/app/(main)/community/create/post/page';
import { Group } from '@/types/Community';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '../atoms/Button';
import { Card } from '../atoms/Card';
import GroupCard from '../molecules/GroupCard';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '../ui/drawer';

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
          unoptimized
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
  const router = useRouter();
  const [showBtn, setShowBtn] = useState<boolean>(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowBtn(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <div className='w-full h-[70vh] flex justify-center items-center flex-col'>
        <div className='w-full text-center text-2xl font-bold flex flex-col gap-5 pb-16 animate-fadeIn'>
          <h1>달성한 버킷리스트를</h1>
          <h1>꿈모임에 공유해보시겠어요?</h1>
        </div>
        <Card className='flex justify-center flex-col items-center animate-fadeIn'>
          <div className='flex p-[10px] items-center justify-between w-full py-3 h-fit min-h-[80px] border-y border-y-primary-main'>
            <Image
              src='/image/popper.gif'
              alt='Animated GIF'
              width={36}
              height={36}
              unoptimized
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
              unoptimized
            />
          </div>
          <GroupListDrawer />
        </Card>
        <Button
          onClick={() => router.push('/bucket-list')}
          className={cn('fixed bottom-20 animate-fadeIn', !showBtn && 'hidden')}
          size='lg'
        >
          완료하기
        </Button>
      </div>
    </>
  );
};

export const GroupListDrawer = () => {
  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);
  const [isOpenGroupDrawer, setIsOpenGroupDrawer] = useState(false);
  return (
    <Drawer
      open={isOpenGroupDrawer}
      onOpenChange={(open) => setIsOpenGroupDrawer(open)}
    >
      <DrawerTrigger>
        <div className='py-3'>
          <Button>공유하기</Button>
        </div>
      </DrawerTrigger>
      <DrawerContent className='h-[60%] max-h-[60%] max-w-screen-md mx-auto flex flex-col gap-[20px] px-[10px] pb-[60px] overflow-hidden'>
        <DrawerHeader>
          <DrawerTitle>공유할 꿈모임을 선택해주세요</DrawerTitle>
        </DrawerHeader>
        {/* 스크롤 영역 */}
        <div className='flex-1 overflow-y-auto flex flex-col gap-[20px]'>
          {MockGroups.map((group) => (
            <GroupCard
              key={group.id}
              {...group}
              onClick={() => {
                setSelectedGroup(group);
                setIsOpenGroupDrawer(false);
              }}
              rightIcon={false}
            />
          ))}
        </div>
      </DrawerContent>
    </Drawer>
  );
};
