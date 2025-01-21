'use client';

import CommentCard from '@/components/molecules/CommentCard';
import Post from '@/components/molecules/Post';
import { useCommunityApi } from '@/hooks/useCommunity/useCommunity';
import { Post as PostType } from '@/types/Community';
import { LazyMotion, domAnimation, m } from 'motion/react';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function PostIdPage() {
  const [post, setPost] = useState<PostType | null>(null);
  const param = useParams();
  const { getPost } = useCommunityApi();

  useEffect(() => {
    const fetchPost = async () => {
      const res = await getPost(Number(param.groupId), Number(param.postId));

      const parsedSnapShot =
        typeof res.snapShot === 'string'
          ? JSON.parse(res.snapShot)
          : (res.snapShot ?? null);
      const parsedImageUrls =
        typeof res.imageUrls === 'string'
          ? JSON.parse(res.imageUrls)
          : (res.imageUrls ?? []);

      console.log(
        'parsedSnapShot : ' + JSON.parse(parsedSnapShot).currentPortfolio
      );
      setPost({
        ...res,
        snapShot: parsedSnapShot,
        imageUrls: parsedImageUrls,
      });
    };

    fetchPost();
  }, []);

  return (
    <div className='flex flex-col gap-[20px] w-full'>
      {post && <Post {...post} isDetailPage={true} />}
      <p className='ml-[20px]'>{commentMockDatas.length}개의 댓글</p>
      <LazyMotion features={domAnimation}>
        <div className='flex flex-col gap-[25px] pb-[200px] pt-[20px] bg-white'>
          {commentMockDatas.map((comment, index) => (
            <m.div
              key={comment.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
              }}
            >
              <CommentCard {...comment} />
              {index !== commentMockDatas.length - 1 && (
                <div className='h-[1px] w-[calc(100%-80px)] bg-[#D9D9D9] mx-auto mt-[25px]'></div>
              )}
            </m.div>
          ))}
        </div>
      </LazyMotion>
    </div>
  );
}

// const postMockData = {
//   id: 1,
//   userId: '058140b5-4688-4290-8387-e6aafa655416',
//   groupId: 1,
//   imageUrls: [],
//   content:
//     '안녕하세요!\n\n오늘 처음으로 꿈틀 서비스를 시작했어요.\n버킷리스트도 작성해보고, 자산 관리도 시작했네요.\n\n앞으로 열심히 모으면서 제 버킷리스트를 하나씩 이뤄나가고 싶어요!\n다들 화이팅하세요 😊',
//   createdAt: '2025-01-10 16:30',
//   updatedAt: '2025-01-10 16:30',
//   postType: 'POST' as const,
//   likeCount: 5,
//   commentCount: 3,
//   userBriefInfo: {
//     name: '김꿈틀',
//     profileImage: 'https://picsum.photos/36/36',
//     nickname: '김꿈틀',
//   },
//   isLiked: true,
// };

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
