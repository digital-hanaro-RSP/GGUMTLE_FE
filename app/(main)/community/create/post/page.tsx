'use client';

import { Button } from '@/components/atoms/Button';
import Header from '@/components/atoms/Header';
import { ImageInputRef } from '@/components/atoms/Inputs';
import ShowSelectedImage from '@/components/atoms/ShowSelectedImage';
import TextArea from '@/components/atoms/TextArea';
import {
  BucketListCard,
  BucketListCardProps,
} from '@/components/molecules/BucketListCard';
import GroupCard from '@/components/molecules/GroupCard';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer';
import { Switch } from '@/components/ui/switch';
import { useCommunityApi } from '@/hooks/useCommunity/useCommunity';
import { Group } from '@/types/Community';
import { IoIosArrowDown } from 'react-icons/io';
import { useEffect, useState } from 'react';

export default function CreatePostPage() {
  const [myGroups, setMyGroups] = useState<Group[]>([]);
  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);
  const [isOpenGroupDrawer, setIsOpenGroupDrawer] = useState(false);
  const [selectedBucketList, setSelectedBucketList] =
    useState<BucketListCardProps | null>(null);
  const [isOpenBucketListDrawer, setIsOpenBucketListDrawer] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string[]>([]);
  const [content, setContent] = useState('');
  const [isPortfolioIncluded, setIsPortfolioIncluded] = useState(false);
  const { createPost, getMyGroups } = useCommunityApi();

  const onChangeContent = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage([...selectedImage, imageUrl]);
    }
  };

  const handleImageRemove = (imageUrl: string) => {
    setSelectedImage(selectedImage.filter((url) => url !== imageUrl));
  };

  const handleDisabled = () => {
    return selectedGroup === null || content === '';
  };

  const handleSubmit = async () => {
    if (!selectedGroup || !selectedGroup.id) return;

    console.log('꿈모임 : ' + JSON.stringify(selectedGroup));
    console.log('버킷리스트 : ' + JSON.stringify(selectedBucketList));
    console.log('포트폴리오 추가 여부 : ' + isPortfolioIncluded);
    console.log('이미지 : ' + JSON.stringify(selectedImage));
    console.log('본문 : ' + content);

    const imageUrls = JSON.stringify(selectedImage);

    const snapshot = JSON.stringify({
      // bucketId: selectedBucketList ? [selectedBucketList.bucketId] : [],
      bucketId: selectedBucketList ? [] : [],
      portfolio: isPortfolioIncluded,
    });

    const response = await createPost(
      selectedGroup?.id,
      imageUrls,
      content,
      snapshot
    );

    console.log('응답 : ' + response);
  };

  useEffect(() => {
    const fetchMyGroups = async () => {
      await getMyGroups(30, 0, '', '').then((res) => {
        setMyGroups(res);
        console.log(res);
      });
    };
    fetchMyGroups();
  }, []);

  return (
    <div className='flex flex-col gap-[20px] w-full'>
      <Header text='커뮤니티 글 작성' showActionButton={false} />

      {/* 이미지 입력 칸 간격이 너무 좁아서 간격 7 -> 10으로 조정했습니다. */}
      <div className='flex flex-col gap-[20px] w-full px-[20px]'>
        {/* 꿈모임 선택 */}
        <div
          className='flex flex-col gap-[10px]'
          onClick={() => setIsOpenGroupDrawer(true)}
        >
          <p className='text-[18px] font-bold'>
            글을 작성할 꿈모임을 선택해주세요
          </p>
          <div className='flex p-[20px] h-[42px] items-center justify-between bg-white border border-primary-placeholder rounded-[10px]'>
            <p
              className={`text-[14px] ${selectedGroup === null ? 'text-primary-placeholder' : 'text-black'}`}
            >
              {selectedGroup === null
                ? '선택된 꿈모임이 없습니다'
                : selectedGroup.name}
            </p>
            <IoIosArrowDown
              width={20}
              height={20}
              className='-rotate-90 text-black'
            />
          </div>
        </div>

        {/* 버킷리스트 선택 */}
        <div
          className='flex flex-col gap-[10px]'
          onClick={() => setIsOpenBucketListDrawer(true)}
        >
          <p className='text-[18px] font-bold'>
            글을 작성할 버킷리스트를 선택해주세요 (선택)
          </p>
          <div className='flex p-[20px] h-[42px] items-center justify-between bg-white border border-primary-placeholder rounded-[10px]'>
            <p
              className={`text-[14px] ${selectedBucketList === null ? 'text-primary-placeholder' : 'text-black'}`}
            >
              {selectedBucketList === null
                ? '선택된 꿈모임이 없습니다'
                : selectedBucketList.title}
            </p>
            <IoIosArrowDown
              width={20}
              height={20}
              className='-rotate-90 text-black'
            />
          </div>
        </div>

        {/* 포트폴리오 선택 */}
        <div className='flex flex-col gap-[10px]'>
          <p className='text-[18px] font-bold'>
            내 포트폴리오를 포함할까요? (선택)
          </p>
          <div className='flex p-[20px] h-[42px] items-center justify-between bg-white border border-primary-placeholder rounded-[10px]'>
            <span>내 포트폴리오 포함하기</span>
            <Switch
              checked={isPortfolioIncluded}
              onCheckedChange={setIsPortfolioIncluded}
            />
          </div>
        </div>

        {/* 이미지 선택 */}
        <div className='flex flex-col gap-[10px]'>
          <p className='text-[18px] font-bold'>이미지를 선택해주세요 (선택)</p>
          <div className='flex flex-wrap gap-[20px]'>
            {selectedImage.map((image) => (
              <ShowSelectedImage
                key={image}
                imageUrl={image}
                onRemove={() => handleImageRemove(image)}
              />
            ))}
            {selectedImage.length < 4 && (
              <ImageInputRef onChange={handleImageSelect} />
            )}
          </div>
        </div>

        {/* 본문 입력 */}
        <div className='flex flex-col gap-[10px]'>
          <p className='text-[18px] font-bold'>본문을 입력해주세요</p>
          <TextArea type='post' value={content} onChange={onChangeContent} />
        </div>

        <Button
          className='w-full'
          isDisabled={handleDisabled()}
          onClick={handleSubmit}
        >
          완료
        </Button>
      </div>

      {/* 꿈모임 선택 Drawer */}
      <Drawer
        open={isOpenGroupDrawer}
        onOpenChange={(open) => setIsOpenGroupDrawer(open)}
      >
        <DrawerContent className='h-[60%] max-h-[60%] max-w-screen-md mx-auto flex flex-col gap-[20px] px-[10px] pb-[70px] overflow-hidden'>
          <DrawerHeader>
            <DrawerTitle>글을 작성할 꿈모임을 선택해주세요</DrawerTitle>
          </DrawerHeader>
          {/* 스크롤 영역 */}
          <div className='flex-1 overflow-y-auto flex flex-col gap-[20px]'>
            {myGroups.map((group) => (
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

      {/* 버킷리스트 선택 Drawer */}
      <Drawer
        open={isOpenBucketListDrawer}
        onOpenChange={(open) => setIsOpenBucketListDrawer(open)}
      >
        <DrawerContent className='h-[60%] max-h-[60%] max-w-screen-md mx-auto flex flex-col gap-[20px] px-[10px] pb-[70px] overflow-hidden'>
          <DrawerHeader>
            <DrawerTitle>버킷리스트를 선택해주세요</DrawerTitle>
          </DrawerHeader>
          {/* 스크롤 영역 */}
          <div className='flex-1 overflow-y-auto flex flex-col gap-[20px]'>
            {MockBucketLists.map((bucketList) => (
              <BucketListCard
                key={bucketList.bucketId}
                {...bucketList}
                onClick={() => {
                  setSelectedBucketList(bucketList);
                  setIsOpenBucketListDrawer(false);
                }}
                isSelectMode={true}
              />
            ))}
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
}

const MockBucketLists: BucketListCardProps[] = [
  {
    isSelectMode: false,
    safeBox: 40000,
    howTo: 'EFFORT',
    dataPercent: 80,
    title: '새로운 기술 배우기',
    tagType: 'DO',
    bucketId: 1,
  },
  {
    isSelectMode: false,
    safeBox: 50000,
    howTo: 'MONEY',
    dataPercent: 60,
    title: '여행을 떠나기',
    tagType: 'DO',
    bucketId: 2,
  },
  {
    isSelectMode: false,
    safeBox: 30000,
    howTo: 'MONEY',
    dataPercent: 70,
    title: '책 10권 읽기',
    tagType: 'DO',
    bucketId: 3,
  },
  {
    isSelectMode: false,
    safeBox: 45000,
    howTo: 'MONEY',
    dataPercent: 85,
    title: '운동 루틴 완성',
    tagType: 'DO',
    bucketId: 4,
  },
  {
    isSelectMode: false,
    safeBox: 60000,
    howTo: 'MONEY',
    dataPercent: 90,
    title: '외국어 공부',
    tagType: 'DO',
    bucketId: 5,
  },
  {
    isSelectMode: false,
    safeBox: 35000,
    howTo: 'MONEY',
    dataPercent: 50,
    title: '음악 연주 배우기',
    tagType: 'DO',
    bucketId: 6,
  },
];

// const MockGroups: Group[] = [
//   {
//     id: 1,
//     name: '그룹 1',
//     category: '여행',
//     description: '그룹 1 설명',
//     imageUrl: 'https://picsum.photos/699/699',
//     memberCount: 10,
//     createdAt: '2021-01-01',
//     updatedAt: '2021-01-01',
//   },
//   {
//     id: 2,
//     name: '그룹 2',
//     category: '재테크',
//     description: '그룹 2 설명',
//     imageUrl: 'https://picsum.photos/698/698',
//     memberCount: 10,
//     createdAt: '2021-01-01',
//     updatedAt: '2021-01-01',
//   },
//   {
//     id: 3,
//     name: '그룹 3',
//     category: '노후',
//     description: '그룹 3 설명',
//     imageUrl: 'https://picsum.photos/697/697',
//     memberCount: 10,
//     createdAt: '2021-01-01',
//     updatedAt: '2021-01-01',
//   },
//   {
//     id: 4,
//     name: '그룹 4',
//     category: '교육',
//     description: '그룹 4 설명',
//     imageUrl: 'https://picsum.photos/695/695',
//     memberCount: 10,
//     createdAt: '2021-01-01',
//     updatedAt: '2021-01-01',
//   },
//   {
//     id: 5,
//     name: '그룹 5',
//     category: '취미',
//     description: '그룹 5 설명',
//     imageUrl: 'https://picsum.photos/700/700',
//     memberCount: 10,
//     createdAt: '2021-01-01',
//     updatedAt: '2021-01-01',
//   },
//   {
//     id: 6,
//     name: '그룹 6',
//     category: '취미',
//     description: '그룹 6 설명',
//     imageUrl: 'https://picsum.photos/700/700',
//     memberCount: 10,
//     createdAt: '2021-01-01',
//     updatedAt: '2021-01-01',
//   },
//   {
//     id: 7,
//     name: '그룹 7',
//     category: '취미',
//     description: '그룹 7 설명',
//     imageUrl: 'https://picsum.photos/700/700',
//     memberCount: 10,
//     createdAt: '2021-01-01',
//     updatedAt: '2021-01-01',
//   },
//   {
//     id: 8,
//     name: '그룹 8',
//     category: '취미',
//     description: '그룹 8 설명',
//     imageUrl: 'https://picsum.photos/700/700',
//     memberCount: 10,
//     createdAt: '2021-01-01',
//     updatedAt: '2021-01-01',
//   },
//   {
//     id: 9,
//     name: '그룹 9',
//     category: '취미',
//     description: '그룹 9 설명',
//     imageUrl: 'https://picsum.photos/700/700',
//     memberCount: 10,
//     createdAt: '2021-01-01',
//     updatedAt: '2021-01-01',
//   },
// ];
