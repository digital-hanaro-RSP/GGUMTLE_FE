'use client';

import { Button } from '@/components/atoms/Button';
import Header from '@/components/atoms/Header';
import { ImageInputRef } from '@/components/atoms/Inputs';
import ShowSelectedImage from '@/components/atoms/ShowSelectedImage';
import TextArea from '@/components/atoms/TextArea';
import GroupCard from '@/components/molecules/GroupCard';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer';
import { Switch } from '@/components/ui/switch';
import { Group } from '@/types/Community';
import { IoIosArrowDown } from 'react-icons/io';
import { useState } from 'react';

export default function CreatePostPage() {
  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);
  const [isOpenGroupDrawer, setIsOpenGroupDrawer] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string[]>([]);
  const [content, setContent] = useState('');
  const [isPortfolioIncluded, setIsPortfolioIncluded] = useState(false);
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
        <div className='flex flex-col gap-[10px]'>
          <p className='text-[18px] font-bold'>
            글을 작성할 버킷리스트를 선택해주세요 (선택)
            {/* 일단 스킵 */}
          </p>
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

        <Button className='w-full' isDisabled={true}>
          완료
        </Button>
      </div>

      {/* 꿈모임 선택 Drawer */}
      <Drawer
        open={isOpenGroupDrawer}
        onOpenChange={(open) => setIsOpenGroupDrawer(open)}
      >
        <DrawerContent className='h-[60%] max-h-[60%] max-w-screen-md mx-auto flex flex-col gap-[20px] px-[10px] pb-[10px] overflow-hidden'>
          <DrawerHeader>
            <DrawerTitle>글을 작성할 꿈모임을 선택해주세요</DrawerTitle>
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
    </div>
  );
}

const MockGroups: Group[] = [
  {
    id: 1,
    name: '그룹 1',
    category: '여행',
    description: '그룹 1 설명',
    imageUrl: 'https://picsum.photos/699/699',
    memberCount: 10,
    createdAt: '2021-01-01',
  },
  {
    id: 2,
    name: '그룹 2',
    category: '재테크',
    description: '그룹 2 설명',
    imageUrl: 'https://picsum.photos/698/698',
    memberCount: 10,
    createdAt: '2021-01-01',
  },
  {
    id: 3,
    name: '그룹 3',
    category: '노후',
    description: '그룹 3 설명',
    imageUrl: 'https://picsum.photos/697/697',
    memberCount: 10,
    createdAt: '2021-01-01',
  },
  {
    id: 4,
    name: '그룹 4',
    category: '교육',
    description: '그룹 4 설명',
    imageUrl: 'https://picsum.photos/695/695',
    memberCount: 10,
    createdAt: '2021-01-01',
  },
  {
    id: 5,
    name: '그룹 5',
    category: '취미',
    description: '그룹 5 설명',
    imageUrl: 'https://picsum.photos/700/700',
    memberCount: 10,
    createdAt: '2021-01-01',
  },
  {
    id: 6,
    name: '그룹 6',
    category: '취미',
    description: '그룹 6 설명',
    imageUrl: 'https://picsum.photos/700/700',
    memberCount: 10,
    createdAt: '2021-01-01',
  },
  {
    id: 7,
    name: '그룹 7',
    category: '취미',
    description: '그룹 7 설명',
    imageUrl: 'https://picsum.photos/700/700',
    memberCount: 10,
    createdAt: '2021-01-01',
  },
  {
    id: 8,
    name: '그룹 8',
    category: '취미',
    description: '그룹 8 설명',
    imageUrl: 'https://picsum.photos/700/700',
    memberCount: 10,
    createdAt: '2021-01-01',
  },
  {
    id: 9,
    name: '그룹 9',
    category: '취미',
    description: '그룹 9 설명',
    imageUrl: 'https://picsum.photos/700/700',
    memberCount: 10,
    createdAt: '2021-01-01',
  },
];
