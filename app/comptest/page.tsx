'use client';

import Tag from '@/components/atoms/Tag';
import CommentCard from '@/components/molecules/CommentCard';
import CommentInput from '@/components/molecules/CommentInput';
import GroupCard from '@/components/molecules/GroupCard';
import NewEvent from '@/components/molecules/NewEvent';
import Post from '@/components/molecules/Post';

export default function CompTest() {
  return (
    <div className='h-[5000px] relative flex flex-col gap-[20px]'>
      <CommentInput />

      <GroupCard
        name='2060년 크루즈팟'
        category='여행'
        description='크루즈 타고 소중한 추억 만드는 모임'
        imageUrl='https://picsum.photos/700/700'
        memberCount={114}
        id={1}
        createdAt='2025-01-09T12:34:56Z'
      />

      <NewEvent {...NewEventMockData} />

      <CommentCard {...CommentMockData} />

      <Post {...PostMockData} />

      <div className='flex gap-2'>
        <Tag>여행</Tag>
        <Tag isSelected>크루즈</Tag>
        <Tag>친목</Tag>
      </div>
    </div>
  );
}

// 아래는 목업 데이터들 (실제 코드에서 사용 중)
const NewEventMockData = {
  id: 3,
  userId: '058140b5-4688-4290-8387-e6aafa655416',
  groupId: 1,
  content: '크루즈 타기',
  createdAt: '2025-01-10 16:31',
  updatedAt: '2025-01-10 16:31',
  postType: 'NEWS' as const,
  author: {
    name: '김꿈틀',
    profileImage: 'https://picsum.photos/36/36',
  },
};

const CommentMockData = {
  id: 1,
  postId: 1,
  userId: '058140b5-4688-4290-8387-e6aafa655416',
  content: '크루즈 타기',
  createdAt: '2025-01-10 16:31',
  updatedAt: '2025-01-10 16:31',
  isLiked: false,
  author: {
    name: '김꿈틀',
    profileImage: 'https://picsum.photos/36/36',
  },
  likeCount: 0,
};

const PostMockData = {
  id: 1,
  userId: '058140b5-4688-4290-8387-e6aafa655416',
  groupId: 1,
  content: '크루즈 타기',
  createdAt: '2025-01-10 16:31',
  updatedAt: '2025-01-10 16:31',
  postType: 'POST' as const,
  author: {
    name: '김꿈틀',
    profileImage: 'https://picsum.photos/36/36',
  },
  isLiked: false,
  likeCount: 0,
  commentCount: 0,
  imageUrls: ['https://picsum.photos/700/700', 'https://picsum.photos/700/700'],
  snapshot: {
    bucketLists: [],
    portfolioLists: [],
  },
};
