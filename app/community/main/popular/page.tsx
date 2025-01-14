'use client';

import Post from '@/components/molecules/Post';

// 우선 fetch Mock 서버 제한량 때문에 막았습니다.

// import { useCommunityApi } from '@/hooks/useCommunity/useCommunity';
// import { useCategoryStore } from '@/store/useCategoryStore';
// import { Post as PostProps } from '@/types/Community';
// import { useEffect, useState } from 'react';

export default function CommunityMainPopularPage() {
  // const [posts, setPosts] = useState<PostProps[]>([]);
  // const { getPosts } = useCommunityApi();
  // const { selectedCategory } = useCategoryStore();

  // useEffect(() => {
  //   // 일단 임시로 1번 그룹 가져오기
  //   getPosts(1, selectedCategory).then((res) => {
  //     setPosts(res.data);
  //     console.log('selectedCategory :', selectedCategory);
  //   });
  // }, []);

  return (
    <div className='flex flex-col w-full gap-[20px]'>
      {posts.map((post) => (
        <Post key={post.id} {...post} />
      ))}
    </div>
  );
}

const posts = [
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
