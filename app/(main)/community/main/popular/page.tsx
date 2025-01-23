'use client';

import Post from '@/components/molecules/Post';
import { useCommunityApi } from '@/hooks/useCommunity/useCommunity';
import { useInfiniteScroll } from '@/hooks/useCommunity/useInfiniteScroll';
import { useCategoryStore } from '@/store/useCategoryStore';
import { useSearchStore } from '@/store/useSearchStore';
import { PostResponse } from '@/types/Community';
import { Post as PostType } from '@/types/Community';
import { domAnimation, LazyMotion, m } from 'motion/react';
import { useEffect, useState } from 'react';
import { convertCategoryToCode } from '@/lib/utils';
import { parsePostData } from '@/lib/utils';

export default function CommunityMainPopularPage() {
  const { selectedCategory } = useCategoryStore();
  const { searchInput } = useSearchStore();
  const { getPopularPosts } = useCommunityApi();
  const category = convertCategoryToCode(selectedCategory);
  const [posts, setPosts] = useState<PostType[]>([]);

  const { data, isLoading, lastElementObserver } =
    useInfiniteScroll<PostResponse>({
      fetchData: ({ limit, offset }) => getPopularPosts(limit, offset),
      dependencies: [searchInput, selectedCategory],
      category,
      search: searchInput,
    });

  useEffect(() => {
    if (Array.isArray(data)) {
      setPosts(data.map(parsePostData));
    } else {
      console.log('data는 array가 아닙니다.');
    }
  }, [data]);

  return (
    <LazyMotion features={domAnimation}>
      <div className='flex flex-col w-full gap-[20px]'>
        {posts.map((post, index) => (
          <m.div
            key={post.id}
            ref={index === posts.length - 1 ? lastElementObserver : null}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className='cursor-pointer'
          >
            <Post {...post} />
          </m.div>
        ))}
        {isLoading && (
          <div className='w-full flex justify-center mt-[20px]'>
            <div className='dot-loading'>
              <div className='middle-dot'></div>
            </div>
          </div>
        )}
      </div>
    </LazyMotion>
  );
}

// const posts = [
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
