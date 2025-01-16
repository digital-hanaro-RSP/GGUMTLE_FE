'use client';

import { PlusButton } from '@/components/atoms/Button';
import Header from '@/components/atoms/Header';
import Post from '@/components/molecules/Post';
import { useRouter } from 'next/navigation';

export default function GroupIdPage() {
  const isMember = false;
  const router = useRouter();

  return (
    <div className='flex flex-col gap-[20px] w-full pt-[64px]'>
      {/* 상단 헤더 */}
      <div className='fixed top-0 left-0 right-0 z-10'>
        <div className='mx-auto max-w-screen-md'>
          <Header
            text='꿈그룹'
            showActionButton={true}
            actionLabel={isMember ? '그룹 탈퇴' : '그룹 가입'}
            actionTextColor={isMember ? 'primary-error' : 'primary-main'}
          />
        </div>
      </div>

      {/* <Header text='꿈그룹' showActionButton={false} /> */}

      {PostMockDatas.map((post) => (
        <Post key={post.id} {...post} />
      ))}

      {/* 플러스 버튼 */}
      {isMember && (
        <div className='fixed left-0 right-0 bottom-[68px] max-w-screen-md mx-auto pointer-events-none'>
          <PlusButton
            className='absolute bottom-[20px] right-[20px] pointer-events-auto'
            size='sm'
            onClick={() => {
              router.push('/community/create/post');
            }}
          />
        </div>
      )}
    </div>
  );
}

const PostMockDatas = [
  {
    id: 1,
    userId: '058140b5-4688-4290-8387-e6aafa655416',
    groupId: 1,
    snapshot: {
      bucketLists: [],
      portfolioLists: [],
    },
    imageUrls: {},
    content:
      '안녕하세요!\n\n오늘 처음으로 꿈틀 서비스를 시작했어요.\n버킷리스트도 작성해보고, 자산 관리도 시작했네요.\n\n앞으로 열심히 모으면서 제 버킷리스트를 하나씩 이뤄나가고 싶어요!\n다들 화이팅하세요 😊',
    createdAt: '2025-01-10 16:30',
    updatedAt: '2025-01-10 16:30',
    postType: 'POST' as const,
    likeCount: 5,
    commentCount: 3,
    author: {
      name: '김꿈틀',
      profileImage: 'https://picsum.photos/36/36',
    },
    isLiked: true,
  },
  {
    id: 2,
    userId: '058140b5-4688-4290-8387-e6aafa655416',
    groupId: 1,
    snapshot: {
      bucketLists: [],
      portfolioLists: [],
    },
    imageUrls: ['https://picsum.photos/1024/1024'],
    content:
      '안녕하세요!\n\n오늘 처음으로 꿈틀 서비스를 시작했어요.\n버킷리스트도 작성해보고, 자산 관리도 시작했네요.\n\n앞으로 열심히 모으면서 제 버킷리스트를 하나씩 이뤄나가고 싶어요!\n다들 화이팅하세요 😊',
    createdAt: '2025-01-10 16:31',
    updatedAt: '2025-01-10 16:31',
    postType: 'POST' as const,
    likeCount: 1,
    commentCount: 2,
    author: {
      name: '김꿈틀',
      profileImage: 'https://picsum.photos/36/36',
    },
    isLiked: true,
  },
  {
    id: 3,
    userId: '058140b5-4688-4290-8387-e6aafa655416',
    groupId: 1,
    snapshot: {
      bucketLists: [],
      portfolioLists: [],
    },
    imageUrls: [
      'https://picsum.photos/1024/1024',
      'https://picsum.photos/1024/1024',
    ],
    content:
      '안녕하세요!\n\n오늘 처음으로 꿈틀 서비스를 시작했어요.\n버킷리스트도 작성해보고, 자산 관리도 시작했네요.\n\n앞으로 열심히 모으면서 제 버킷리스트를 하나씩 이뤄나가고 싶어요!\n다들 화이팅하세요 😊',
    createdAt: '2025-01-10 16:31',
    updatedAt: '2025-01-10 16:31',
    postType: 'POST' as const,
    likeCount: 1,
    commentCount: 2,
    author: {
      name: '김꿈틀',
      profileImage: 'https://picsum.photos/36/36',
    },
    isLiked: true,
  },
];
