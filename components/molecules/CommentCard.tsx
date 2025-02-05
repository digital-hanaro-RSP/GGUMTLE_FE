import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useCommunityApi } from '@/hooks/useCommunity/useCommunity';
import { Comment } from '@/types/Community';
import { BsThreeDots } from 'react-icons/bs';
import Swal from 'sweetalert2';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import { getRelativeTimeString } from '@/lib/utils';
import LikeComment from '../atoms/LikeComment';
import UserProfile from '../atoms/UserProfile';

export default function CommentCard({
  id,
  content,
  createdAt,
  liked: initialIsLiked,
  userBriefInfo,
  likeCount: initialLikeCount,
  mine,
  onDelete,
}: Comment & { onDelete?: () => void }) {
  const params = useParams();
  const { groupId: tempGroupId } = params;
  const [isLiked, setIsLiked] = useState(initialIsLiked);
  const [likeCount, setLikeCount] = useState(initialLikeCount);

  const { plusCommentLike, minusCommentLike, delelteComment, isMember } =
    useCommunityApi();

  const handleLikeClick = async () => {
    if (typeof tempGroupId !== 'string') return;
    const newLikeState = !isLiked;
    const groupId = parseInt(tempGroupId);
    const res = await isMember(groupId);
    if (res.isMember === false) {
      Swal.fire({
        title: 'Oops!',
        text: '좋아요를 원하시면 그룹에 가입해 주세요.',
        icon: 'error',
        confirmButtonText: '네',
        confirmButtonColor: '#069894',
      });
      return;
    }

    try {
      if (newLikeState) {
        // 좋아요
        await plusCommentLike(id);
      } else {
        // 좋아요 취소
        await minusCommentLike(id);
      }

      // API 성공 시에만 state 업데이트
      setIsLiked(newLikeState);
      setLikeCount((prev) => (newLikeState ? prev + 1 : prev - 1));
    } catch (error) {
      console.error('좋아요 처리 실패:', error);
      // API 실패 시에는 setState 하지 않음
    }
  };

  const handleDelete = async () => {
    await Swal.fire({
      title: '정말 삭제하시겠어요?',
      text: '삭제는 되돌릴 수 없어요',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#D80000',
      cancelButtonColor: '#C0C0C0',
      confirmButtonText: '네, 삭제할게요.',
      cancelButtonText: '취소',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await delelteComment(id);
          onDelete?.();
        } catch (error) {
          console.error('댓글 삭제 실패:', error);
        }
      }
    });
  };

  return (
    <div className='px-[40px]'>
      <div className='flex flex-col gap-[10px]'>
        <div className='flex justify-between items-center'>
          <div className='flex gap-[20px] items-center'>
            <UserProfile
              imageUrl={
                userBriefInfo?.profileImageUrl ||
                '/image/icons/default-profile.png'
              }
            />
            <div className='flex flex-col gap-[2px]'>
              <p className='text-[14px] md:text-[16px]'>
                {userBriefInfo.nickname}
              </p>
              <p className='text-[10px] md:text-[12px] text-primary-placeholder'>
                {getRelativeTimeString(createdAt)}
              </p>
            </div>
          </div>

          {/* TODO */}
          {mine && (
            <DropdownMenu>
              <DropdownMenuTrigger>
                <BsThreeDots />
              </DropdownMenuTrigger>
              <DropdownMenuContent className=' min-w-[30px] w-fit px-[10px]'>
                <DropdownMenuItem onClick={handleDelete}>삭제</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>

        {/* 본문 */}
        <p>{content}</p>

        {/* 좋아요 */}
        <LikeComment
          isLiked={isLiked}
          likeCount={likeCount}
          showComment={false}
          onLikeClick={handleLikeClick}
        />
      </div>
    </div>
  );
}
