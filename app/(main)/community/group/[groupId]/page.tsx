'use client';

import Post from '@/components/molecules/Post';

export default function GroupIdPage() {
  return (
    <div className='flex flex-col gap-[20px] w-full '>
      {/* <Header text='꿈그룹' showActionButton={false} /> */}

      {PostMockDatas.map((post) => (
        <Post key={post.id} {...post} />
      ))}
    </div>
  );
}

const PostMockDatas = [
  {
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
  },
  {
    id: 2,
    userId: '058140b5-4688-4290-8387-e6aafa655416',
    groupId: 1,
    imageUrls: ['https://picsum.photos/1024/1024'],
    content:
      '안녕하세요!\n\n오늘 처음으로 꿈틀 서비스를 시작했어요.\n버킷리스트도 작성해보고, 자산 관리도 시작했네요.\n\n앞으로 열심히 모으면서 제 버킷리스트를 하나씩 이뤄나가고 싶어요!\n다들 화이팅하세요 😊',
    createdAt: '2025-01-10 16:31',
    updatedAt: '2025-01-10 16:31',
    postType: 'POST' as const,
    likeCount: 1,
    commentCount: 2,
    userBriefInfo: {
      name: '김꿈틀',
      profileImage: 'https://picsum.photos/36/36',
      nickname: '김꿈틀',
    },
    isLiked: true,
  },
  {
    id: 3,
    userId: '058140b5-4688-4290-8387-e6aafa655416',
    groupId: 1,
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
    userBriefInfo: {
      name: '김꿈틀',
      profileImage: 'https://picsum.photos/36/36',
      nickname: '김꿈틀',
    },
    isLiked: true,
  },
];
