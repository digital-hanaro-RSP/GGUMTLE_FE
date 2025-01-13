import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useCommunityApi } from '@/hooks/useCommunity/useCommunity';
import { Comment } from '@/types/Community';
import { BsThreeDots } from 'react-icons/bs';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import { getRelativeTimeString } from '@/lib/utils';
import { Card } from '../atoms/Card';
import LikeComment from '../atoms/LikeComment';
import UserProfile from '../atoms/UserProfile';

export default function CommentCard({
  postId,
  id,
  content,
  createdAt,
  isLiked: initialIsLiked,
  author,
  likeCount: initialLikeCount,
}: Comment) {
  const params = useParams();
  const { groupId: tempGroupId } = params;
  const [isLiked, setIsLiked] = useState(initialIsLiked);
  const [likeCount, setLikeCount] = useState(initialLikeCount);

  const { plusCommentLike, minusCommentLike } = useCommunityApi();

  const handleLikeChange = async (newLikeState: boolean) => {
    try {
      if (typeof tempGroupId === 'string') {
        const groupId = parseInt(tempGroupId);
        if (newLikeState) {
          await plusCommentLike(groupId, postId, id);
        } else {
          await minusCommentLike(groupId, postId, id);
        }
      }
      setIsLiked(newLikeState);
      setLikeCount((prev) => (newLikeState ? prev + 1 : prev - 1));
    } catch (error) {
      console.error('좋아요 처리 실패:', error);
      setIsLiked(!newLikeState);
      setLikeCount((prev) => (!newLikeState ? prev + 1 : prev - 1));
    }
  };

  return (
    <Card>
      <div className='flex flex-col gap-[20px]'>
        <div className='flex justify-between items-center'>
          <div className='flex gap-[20px] items-center'>
            <UserProfile
              imageUrl={author?.profileImage || 'https://picsum.photos/36/36'}
            />
            <div className='flex flex-col gap-[2px]'>
              <p className='text-[14px] md:text-[16px]'>{author.name}</p>
              <p className='text-[10px] md:text-[12px] text-primary-placeholder'>
                {getRelativeTimeString(createdAt)}
              </p>
            </div>
          </div>

          {/* TODO */}
          {/* 만약 본인이 작성자라면 드롭 다운 노출해야함 현재 본인이 작성자라는 판단을 할 수 없어서 구현 못했음*/}
          <DropdownMenu>
            <DropdownMenuTrigger>
              <BsThreeDots />
            </DropdownMenuTrigger>
            <DropdownMenuContent className=' min-w-[30px] w-fit px-[10px]'>
              <DropdownMenuSeparator />
              <DropdownMenuItem>수정</DropdownMenuItem>
              <DropdownMenuItem>삭제</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* 본문 */}
        <p>{content}</p>

        {/* 좋아요 */}
        <LikeComment
          initialIsLiked={isLiked}
          likeCount={likeCount}
          showComment={false}
          onLikeChange={handleLikeChange}
        />
      </div>
    </Card>
  );
}
