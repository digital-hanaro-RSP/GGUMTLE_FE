import { FaHeart, FaComment } from 'react-icons/fa';

type LikeCommentProps = {
  isLiked: boolean; // 부모가 내려주는 상태
  likeCount: number;
  showComment?: boolean;
  commentCount?: number;
  onLikeClick?: () => void; // 부모가 내려주는 클릭 핸들러
};

export default function LikeComment({
  isLiked,
  likeCount,
  showComment = true,
  commentCount,
  onLikeClick,
}: LikeCommentProps) {
  return (
    <div className='flex gap-[20px]'>
      <div
        className='flex items-center gap-[7px] cursor-pointer select-none'
        onClick={onLikeClick}
      >
        <FaHeart
          className={`w-[20px] h-[20px] ${
            isLiked ? 'text-primary-main' : 'text-primary-placeholder'
          }`}
        />
        <span className='text-[14px] text-primary-placeholder'>
          {likeCount}
        </span>
      </div>
      {showComment && (
        <div className='flex items-center gap-[7px] select-none'>
          <FaComment className='w-[20px] h-[20px] text-primary-placeholder' />
          <span className='text-[14px] text-primary-placeholder'>
            {commentCount}
          </span>
        </div>
      )}
    </div>
  );
}
