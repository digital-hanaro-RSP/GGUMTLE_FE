'use client';

import Post from '@/components/molecules/Post';
import { useCommunityApi } from '@/hooks/useCommunity/useCommunity';
import { Post as PostType } from '@/types/Community';
import { useParams } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';

export default function GroupIdPage() {
  const [posts, setPosts] = useState<PostType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [offset, setOffset] = useState(0);
  const observerRef = useRef<IntersectionObserver>();

  const params = useParams();
  const { getPosts } = useCommunityApi();

  const fetchGetPosts = async (isInitial: boolean = false) => {
    if (!isInitial && (isLoading || !hasMore)) return;

    setIsLoading(true);

    const limit = 10;
    const currentOffset = isInitial ? 0 : offset;

    try {
      const res = await getPosts(Number(params.groupId), currentOffset, limit);
      console.log('데이터 패칭 완료, 데이터 ' + res.length + '개');
      for (let i = 0; i < res.length; i++) {
        console.log(res[i]);
      }
      if (res.length < limit) {
        setHasMore(false);
      }
      setPosts((prev) => (isInitial ? res : [...prev, ...res]));
      setOffset(currentOffset + limit);
    } catch (err) {
      console.log('데이터 fetch중 에러 :', err);
    } finally {
      setIsLoading(false);
    }
  };

  const lastElementObserver = useCallback(
    (node: HTMLDivElement) => {
      if (isLoading) return;

      if (observerRef.current) {
        observerRef.current.disconnect();
      }

      observerRef.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          fetchGetPosts();
        }
      });

      if (node) {
        observerRef.current.observe(node);
      }
    },
    [isLoading, hasMore]
  );

  useEffect(() => {
    setOffset(0); // 처음 렌더링
    setHasMore(true);
    fetchGetPosts(true);

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  return (
    <div className='flex flex-col gap-[20px] w-full '>
      {/* <Header text='꿈그룹' showActionButton={false} /> */}

      {posts.map((post, index) => (
        <div
          key={post.id}
          ref={index === posts.length - 1 ? lastElementObserver : null}
        >
          <Post {...post} />
        </div>
      ))}
    </div>
  );
}

// const PostMockDatas = [
//   {
//     id: 1,
//     userId: '058140b5-4688-4290-8387-e6aafa655416',
//     groupId: 1,
//     imageUrls: [],
//     content:
//       '안녕하세요!\n\n오늘 처음으로 꿈틀 서비스를 시작했어요.\n버킷리스트도 작성해보고, 자산 관리도 시작했네요.\n\n앞으로 열심히 모으면서 제 버킷리스트를 하나씩 이뤄나가고 싶어요!\n다들 화이팅하세요 😊',
//     createdAt: '2025-01-10 16:30',
//     updatedAt: '2025-01-10 16:30',
//     postType: 'POST' as const,
//     likeCount: 5,
//     commentCount: 3,
//     userBriefInfo: {
//       name: '김꿈틀',
//       profileImage: 'https://picsum.photos/36/36',
//       nickname: '김꿈틀',
//     },
//     isLiked: true,
//   },
//   {
//     id: 2,
//     userId: '058140b5-4688-4290-8387-e6aafa655416',
//     groupId: 1,
//     imageUrls: ['https://picsum.photos/1024/1024'],
//     content:
//       '안녕하세요!\n\n오늘 처음으로 꿈틀 서비스를 시작했어요.\n버킷리스트도 작성해보고, 자산 관리도 시작했네요.\n\n앞으로 열심히 모으면서 제 버킷리스트를 하나씩 이뤄나가고 싶어요!\n다들 화이팅하세요 😊',
//     createdAt: '2025-01-10 16:31',
//     updatedAt: '2025-01-10 16:31',
//     postType: 'POST' as const,
//     likeCount: 1,
//     commentCount: 2,
//     userBriefInfo: {
//       name: '김꿈틀',
//       profileImage: 'https://picsum.photos/36/36',
//       nickname: '김꿈틀',
//     },
//     isLiked: true,
//   },
//   {
//     id: 3,
//     userId: '058140b5-4688-4290-8387-e6aafa655416',
//     groupId: 1,
//     imageUrls: [
//       'https://picsum.photos/1024/1024',
//       'https://picsum.photos/1024/1024',
//     ],
//     content:
//       '안녕하세요!\n\n오늘 처음으로 꿈틀 서비스를 시작했어요.\n버킷리스트도 작성해보고, 자산 관리도 시작했네요.\n\n앞으로 열심히 모으면서 제 버킷리스트를 하나씩 이뤄나가고 싶어요!\n다들 화이팅하세요 😊',
//     createdAt: '2025-01-10 16:31',
//     updatedAt: '2025-01-10 16:31',
//     postType: 'POST' as const,
//     likeCount: 1,
//     commentCount: 2,
//     userBriefInfo: {
//       name: '김꿈틀',
//       profileImage: 'https://picsum.photos/36/36',
//       nickname: '김꿈틀',
//     },
//     isLiked: true,
//   },
// ];
