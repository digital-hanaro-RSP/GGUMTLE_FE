import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
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
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
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
  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);

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
          <GroupListDrawer
            selectedGroup={selectedGroup}
            setSelectedGroup={setSelectedGroup}
          />
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

type GroupListDrawerProps = {
  selectedGroup: Group | null;
  setSelectedGroup: (group: Group | null) => void;
};

export const GroupListDrawer = ({
  selectedGroup,
  setSelectedGroup,
}: GroupListDrawerProps) => {
  const [isOpenGroupDrawer, setIsOpenGroupDrawer] = useState(false);
  const [isCompleteSharing, setIsCompleteSharing] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();
  const onClickShare = () => {
    if (selectedGroup !== null) {
      
      setIsCompleteSharing(true);
      return;
    }
    setIsModalOpen(true);
    return;
  };
  return (
    <Drawer
      open={isOpenGroupDrawer}
      onOpenChange={(open) => setIsOpenGroupDrawer(open)}
    >
      <div
        className='p-4 rounded-xl text-[15px] btn-md bg-primary-main text-white mt-3'
        onClick={() => setIsOpenGroupDrawer(true)}
      >
        공유하기
      </div>
      <DrawerContent className='h-[80%] max-h-[80%] max-w-screen-md mx-auto flex flex-col gap-[0px] px-[10px] pb-[60px] overflow-hidden'>
        {!isCompleteSharing ? (
          <>
            <DrawerHeader>
              <DrawerTitle>글을 공유할 꿈모임을 선택해주세요</DrawerTitle>
            </DrawerHeader>
            {/* 스크롤 영역 */}
            <div className='flex-1 overflow-y-auto flex flex-col gap-[20px]'>
              {MockGroups.map((group) => (
                <GroupCard
                  key={group.id}
                  {...group}
                  onClick={() => {
                    setSelectedGroup(group);
                  }}
                  rightIcon={false}
                  className={cn(
                    'transition-all duration-700',
                    selectedGroup?.id === group.id
                      ? 'bg-primary-main text-white'
                      : ''
                  )}
                />
              ))}
            </div>
            <DrawerFooter className='flex flex-col justify-center items-center gap-0 py-0'>
              <AlertDialog
                open={isModalOpen}
                onOpenChange={(open) => setIsModalOpen(open)}
              >
                <AlertDialogContent className='bg-white'>
                  <AlertDialogHeader>
                    <AlertDialogTitle>꿈 모임을 선택해주세요.</AlertDialogTitle>
                    <AlertDialogDescription>
                      공유하기 위해서는 꿈 모임 1개를 꼭 선택해주셔야 해요.
                      <Image
                        src={'/image/gif/noData.gif'}
                        alt=''
                        width={150}
                        height={150}
                        className='mx-auto'
                      />
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>확인했어요</AlertDialogCancel>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
              <Button
                onClick={onClickShare}
                className='p-4 rounded-xl text-[15px] btn-lg bg-primary-main text-white mt-3'
              >
                공유하기
              </Button>
              <DrawerClose className='p-4 rounded-xl text-[15px] btn-lg bg-primary-disable text-white mt-3'>
                취소하기
              </DrawerClose>
            </DrawerFooter>
          </>
        ) : (
          <div className='animate-fadeIn flex-col flex h-full'>
            <DrawerHeader className='flex justify-center pt-20'>
              <DrawerTitle className='text-3xl font-bold'>
                공유하기가 완료되었어요.
              </DrawerTitle>
            </DrawerHeader>
            <div className='flex-1 overflow-y-auto flex flex-col h-full justify-center items-center'>
              <Image
                src={'/image/popper.gif'}
                alt=''
                width={150}
                height={150}
                className='mx-auto'
              />
            </div>
            <DrawerFooter className='flex flex-col justify-center items-center gap-0 py-0'>
              <Button
                onClick={() => router.push('/bucket-list')}
                className='p-4 rounded-xl text-[15px] btn-lg bg-primary-main text-white mt-3'
              >
                완료하기
              </Button>
            </DrawerFooter>
          </div>
        )}
      </DrawerContent>
    </Drawer>
  );
};

const MockGroups: Group[] = [
  {
    id: 1,
    name: '그룹 1',
    category: '여행',
    description: '그룹 1 설명',
    imageUrl: 'https://picsum.photos/699/699',
    memberCount: 10,
    createdAt: '2021-01-01',
    updatedAt: '2021-01-01',
  },
  {
    id: 2,
    name: '그룹 2',
    category: '재테크',
    description: '그룹 2 설명',
    imageUrl: 'https://picsum.photos/698/698',
    memberCount: 10,
    createdAt: '2021-01-01',
    updatedAt: '2021-01-01',
  },
  {
    id: 3,
    name: '그룹 3',
    category: '노후',
    description: '그룹 3 설명',
    imageUrl: 'https://picsum.photos/697/697',
    memberCount: 10,
    createdAt: '2021-01-01',
    updatedAt: '2021-01-01',
  },
  {
    id: 4,
    name: '그룹 4',
    category: '교육',
    description: '그룹 4 설명',
    imageUrl: 'https://picsum.photos/695/695',
    memberCount: 10,
    createdAt: '2021-01-01',
    updatedAt: '2021-01-01',
  },
  {
    id: 5,
    name: '그룹 5',
    category: '취미',
    description: '그룹 5 설명',
    imageUrl: 'https://picsum.photos/700/700',
    memberCount: 10,
    createdAt: '2021-01-01',
    updatedAt: '2021-01-01',
  },
  {
    id: 6,
    name: '그룹 6',
    category: '취미',
    description: '그룹 6 설명',
    imageUrl: 'https://picsum.photos/700/700',
    memberCount: 10,
    createdAt: '2021-01-01',
    updatedAt: '2021-01-01',
  },
  {
    id: 7,
    name: '그룹 7',
    category: '취미',
    description: '그룹 7 설명',
    imageUrl: 'https://picsum.photos/700/700',
    memberCount: 10,
    createdAt: '2021-01-01',
    updatedAt: '2021-01-01',
  },
  {
    id: 8,
    name: '그룹 8',
    category: '취미',
    description: '그룹 8 설명',
    imageUrl: 'https://picsum.photos/700/700',
    memberCount: 10,
    createdAt: '2021-01-01',
    updatedAt: '2021-01-01',
  },
  {
    id: 9,
    name: '그룹 9',
    category: '취미',
    description: '그룹 9 설명',
    imageUrl: 'https://picsum.photos/700/700',
    memberCount: 10,
    createdAt: '2021-01-01',
    updatedAt: '2021-01-01',
  },
];
