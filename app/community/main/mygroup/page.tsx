'use client';

import GroupCard from '@/components/molecules/GroupCard';
import { Group } from '@/types/Community';

export default function CommunityMainMyGroupPage() {
  return (
    <div className='flex flex-col w-full gap-[20px]'>
      {MockGroups.map((group) => (
        <GroupCard key={group.id} {...group} />
      ))}
    </div>
  );
}

const MockGroups: Group[] = [
  {
    id: 1,
    name: '그룹 1',
    category: '여행',
    description: '그룹 1 설명',
    imageUrl: 'https://picsum.photos/700/700',
    memberCount: 10,
    createdAt: '2021-01-01',
  },
  {
    id: 2,
    name: '그룹 2',
    category: '재테크',
    description: '그룹 2 설명',
    imageUrl: 'https://picsum.photos/700/700',
    memberCount: 10,
    createdAt: '2021-01-01',
  },
  {
    id: 3,
    name: '그룹 3',
    category: '노후',
    description: '그룹 3 설명',
    imageUrl: 'https://picsum.photos/700/700',
    memberCount: 10,
    createdAt: '2021-01-01',
  },
  {
    id: 4,
    name: '그룹 4',
    category: '교육',
    description: '그룹 4 설명',
    imageUrl: 'https://picsum.photos/700/700',
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
];
