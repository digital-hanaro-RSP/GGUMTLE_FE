import { useState } from 'react';
import { Button } from '../atoms/Button';
import TextArea from '../atoms/TextArea';
import UserProfile from '../atoms/UserProfile';

// 기본 높이 150 + 네비게이션 높이 58
// 150으로 하면 네비게이션 radius 때문에 공간 비어보임
// 패딩 bottom 58px 추가했음

// 여기서 Props로 User 받아야 함
// 아직 User 어떻게 받을 지 몰라서 일단 나머지 구현 보류
// 필요한것 유저 ID, 유저 이미지
export default function CommentInput() {
  const [comment, setComment] = useState('');

  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };

  return (
    <div className='fixed bottom-0 left-1/2 -translate-x-1/2  max-w-screen-md flex flex-col gap-[10px] p-[10px] pb-[58px] w-full h-[208px] bg-white border-t border-[#B9B9B9]'>
      <div className='flex gap-[10px] w-full'>
        <UserProfile imageUrl={'https://picsum.photos/36/36'} />
        <div className='flex-1'>
          <TextArea
            type='comment'
            value={comment}
            onChange={handleCommentChange}
          />
        </div>
      </div>
      <div className='flex justify-end'>
        <Button
          size='sm'
          isDisabled={!comment.trim()}
          className='opacity-70 hover:opacity-100'
        >
          작성
        </Button>
      </div>
    </div>
  );
}
