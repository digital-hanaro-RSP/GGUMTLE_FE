/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import CommentCard from '@/components/molecules/CommentCard';
import CommentInput from '@/components/molecules/CommentInput';
import Post from '@/components/molecules/Post';
import { useCommunityApi } from '@/hooks/useCommunity/useCommunity';
import { useInfiniteScroll } from '@/hooks/useCommunity/useInfiniteScroll';
import { useUserApi } from '@/hooks/useUser/useUser';
import { Comment as CommentType, Post as PostType } from '@/types/Community';
import { LazyMotion, domAnimation, m } from 'motion/react';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { parsePostData } from '@/lib/utils';

export default function PostIdPage() {
  const [post, setPost] = useState<PostType | null>(null);
  const [isGroupMember, setIsGroupMember] = useState(false);
  const [commentTrigger, setCommentTrigger] = useState(0); // 댓글 추가 트리거
  const [userImage, setUserImage] = useState<string | null>(null);
  const param = useParams();

  const { getPost, getComments, createComment, isMember } = useCommunityApi();
  const { getUserInfo } = useUserApi();
  // 멤버십 확인
  useEffect(() => {
    const checkMembership = async () => {
      try {
        const res = await isMember(Number(param.groupId));
        setIsGroupMember(res?.isMember === true);
      } catch (error) {
        console.error('멤버십 확인 중 오류 발생:', error);
        setIsGroupMember(false);
      }
    };
    checkMembership();
  }, [param.groupId]);

  // 게시물 데이터 가져오기
  useEffect(() => {
    const fetchPost = async () => {
      const postRes = await getPost(
        Number(param.groupId),
        Number(param.postId)
      );
      setPost(parsePostData(postRes));
    };

    fetchPost();
  }, [param.groupId, param.postId]);

  // 임시로 유저 데이터 가져오기 나중에 zustand로 바꾸자
  useEffect(() => {
    const fetchUser = async () => {
      const userData = await getUserInfo();
      setUserImage(userData.profileImageUrl);
    };
    fetchUser();
  }, []);

  const {
    data: comments,
    isLoading,
    lastElementObserver,
  } = useInfiniteScroll<CommentType>({
    fetchData: ({ limit, offset }) =>
      getComments(limit, offset, Number(param.postId)),
    limit: 10,
    dependencies: [
      Array.isArray(param.postId) ? param.postId[0] : param.postId,
      commentTrigger,
    ],
  });

  const handleCreateComment = async (content: string) => {
    try {
      await createComment(Number(param.postId), content);

      setPost((prev) =>
        prev
          ? {
              ...prev,
              commentCount: (prev.commentCount || 0) + 1,
            }
          : null
      );

      setCommentTrigger((prev) => prev + 1);
    } catch (error) {
      console.error('댓글 작성 실패:', error);
    }
  };

  const handleCommentDelete = () => {
    setPost((prev) =>
      prev
        ? {
            ...prev,
            commentCount: Math.max((prev.commentCount || 0) - 1, 0),
          }
        : null
    );
    setCommentTrigger((prev) => prev + 1);
  };

  return (
    <div className='flex flex-col gap-[20px] w-full'>
      {post && <Post {...post} isDetailPage={true} />}
      <p className='ml-[20px]'>{post?.commentCount}개의 댓글</p>
      <LazyMotion features={domAnimation}>
        <div className='flex flex-col gap-[25px] pb-[200px] pt-[20px] bg-white'>
          {comments.map((comment, index) => (
            <m.div
              key={comment.id}
              ref={index === comments.length - 1 ? lastElementObserver : null}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
              }}
            >
              <CommentCard {...comment} onDelete={handleCommentDelete} />
              {index !== comments.length - 1 && (
                <div className='h-[1px] w-[calc(100%-80px)] bg-[#D9D9D9] mx-auto mt-[25px]'></div>
              )}
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

      {isGroupMember && (
        <CommentInput onClick={handleCreateComment} userImage={userImage} />
      )}
    </div>
  );
}
