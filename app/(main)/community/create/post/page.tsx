'use client';

import Header from '@/components/atoms/Header';
import GroupCard from '@/components/molecules/GroupCard';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer';
import { Group } from '@/types/Community';
import { useState } from 'react';

export default function CreatePostPage() {
  const [selectedGroup, setSelectedGroup] = useState<string>('');
  const [isOpenGroupDrawer, setIsOpenGroupDrawer] = useState(false);
  return (
    <div className='flex flex-col gap-[20px] w-full'>
      <Header text='커뮤니티 글 작성' showActionButton={false} />
      <div className='flex flex-col gap-[20px] w-full px-[20px]'>
        <div
          className='flex flex-col gap-[7px]'
          onClick={() => setIsOpenGroupDrawer(true)}
        >
          <p className='text-[18px] font-bold'>
            글을 작성할 꿈모임을 선택해주세요
          </p>
          <Drawer
            open={isOpenGroupDrawer}
            onOpenChange={(open) => setIsOpenGroupDrawer(open)}
            snapPoints={[0.2]}
          >
            <div className='flex p-[20px] h-[42px] items-center justify-between bg-white border border-primary-placeholder rounded-[10px]'>
              <p
                className={`text-[14px] ${selectedGroup === '' ? 'text-primary-placeholder' : 'text-black'}`}
              >
                {selectedGroup === ''
                  ? '선택된 꿈모임이 없습니다'
                  : selectedGroup}
              </p>
            </div>
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle>Are you absolutely sure?</DrawerTitle>
              </DrawerHeader>
              <div className='flex flex-col gap-[20px]'>
                {MockGroups.map((group) => (
                  <GroupCard
                    key={group.id}
                    {...group}
                    onClick={() => {
                      setSelectedGroup(group.name);
                      setIsOpenGroupDrawer(false);
                    }}
                  />
                ))}
              </div>
            </DrawerContent>
          </Drawer>
        </div>
      </div>
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
