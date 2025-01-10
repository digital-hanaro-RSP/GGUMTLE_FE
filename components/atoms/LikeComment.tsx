import { FaHeart, FaComment } from 'react-icons/fa';
import { useState } from 'react';

type LikeCommentProps = {
  initialIsLiked: boolean;
  likeCount: number;
  commentCount: number;
  onLikeChange: (isLiked: boolean) => void;
};

export default function LikeComment({
  initialIsLiked = false,
  likeCount = 4,
  commentCount = 4,
  onLikeChange,
}: LikeCommentProps) {
  const [isLiked, setIsLiked] = useState(initialIsLiked);

  const handleLikeClick = () => {
    const newLikeState = !isLiked;
    setIsLiked(newLikeState);
    onLikeChange?.(newLikeState);
  };

  return (
    <div className='flex gap-[20px]'>
      <div
        className='flex items-center gap-[7px] cursor-pointer select-none'
        onClick={handleLikeClick}
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

      <div className='flex items-center gap-[7px] select-none'>
        <FaComment className='w-[20px] h-[20px] text-primary-placeholder' />
        <span className='text-[14px] text-primary-placeholder'>
          {commentCount}
        </span>
      </div>
    </div>
  );
}
