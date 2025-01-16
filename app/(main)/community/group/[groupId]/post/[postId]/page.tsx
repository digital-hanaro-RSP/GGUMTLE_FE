'use client';

import CommentCard from '@/components/molecules/CommentCard';
import Post from '@/components/molecules/Post';

export default function PostIdPage() {
  return (
    <div className='flex flex-col gap-[20px] w-full'>
      <Post {...postMockData} isDetailPage={true} />
      <div className='flex flex-col gap-[20px] pb-[200px]'>
        <p className='ml-[20px]'>{commentMockDatas.length}개의 댓글</p>
        {commentMockDatas.map((comment) => (
          <CommentCard key={comment.id} {...comment} />
        ))}
      </div>
    </div>
  );
}

const postMockData = {
  id: 1,
  userId: '058140b5-4688-4290-8387-e6aafa655416',
  groupId: 1,
  imageUrls: [],
  content:
    '안녕하세요!\n\n오늘 처음으로 꿈틀 서비스를 시작했어요.\n버킷리스트도 작성해보고, 자산 관리도 시작했네요.\n\n앞으로 열심히 모으면서 제 버킷리스트를 하나씩 이뤄나가고 싶어요!\n다들 화이팅하세요 😊',
  createdAt: '2025-01-10 16:30',
  updatedAt: '2025-01-10 16:30',
  postType: 'POST' as const,
  likeCount: 5,
  commentCount: 3,
  userBriefInfo: {
    name: '김꿈틀',
    profileImage: 'https://picsum.photos/36/36',
    nickname: '김꿈틀',
  },
  isLiked: true,
};

const commentMockDatas = [
  {
    id: 1,
    postId: 1,
    userId: '058140b5-4688-4290-8387-e6aafa655416',
    content: '크루즈 타기',
    createdAt: '2025-01-10 16:31',
    updatedAt: '2025-01-10 16:31',
    isLiked: false,
    userBriefInfo: {
      name: '김꿈틀',
      profileImage: 'https://picsum.photos/36/36',
      nickname: '김꿈틀',
    },
    likeCount: 1,
  },
  {
    id: 2,
    postId: 1,
    userId: '058140b5-4688-4290-8387-e6aafa655416',
    content: '크루즈 타기22',
    createdAt: '2025-01-10 16:32',
    updatedAt: '2025-01-10 16:32',
    isLiked: true,
    userBriefInfo: {
      name: '김꿈틀',
      profileImage: 'https://picsum.photos/36/36',
      nickname: '김꿈틀',
    },
    likeCount: 3,
  },
  {
    id: 3,
    postId: 1,
    userId: '058140b5-4688-4290-8387-e6aafa655416',
    content: '크루즈 타기33',
    createdAt: '2025-01-10 16:33',
    updatedAt: '2025-01-10 16:33',
    isLiked: false,
    userBriefInfo: {
      name: '김꿈틀',
      profileImage: 'https://picsum.photos/36/36',
      nickname: '김꿈틀',
    },
    likeCount: 5,
  },
];
