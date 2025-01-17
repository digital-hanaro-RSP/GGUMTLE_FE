'use client';

import GroupCard from '@/components/molecules/GroupCard';
import { useCategoryStore } from '@/store/useCategoryStore';
import { Group } from '@/types/Community';
import { domAnimation, LazyMotion, m } from 'motion/react';
import { useRouter } from 'next/navigation';

export default function CommunityMainGroupPage() {
  const router = useRouter();
  const { selectedCategory } = useCategoryStore();
  console.log('selectedCategory :', selectedCategory);
  return (
    <LazyMotion features={domAnimation}>
      <div className='flex flex-col w-full gap-[20px] '>
        {MockGroups.map((group, index) => (
          <m.div
            key={group.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            onClick={() => {
              router.push(`/community/group/${group.id}`);
            }}
            className='cursor-pointer'
          >
            <GroupCard {...group} />
          </m.div>
        ))}
      </div>
    </LazyMotion>
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
