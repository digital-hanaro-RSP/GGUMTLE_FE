import { useState } from 'react';
import { Button } from '../atoms/Button';
import TextArea from '../atoms/TextArea';
import UserProfile from '../atoms/UserProfile';

// 기본 높이 150 + 네비게이션 높이 58
// 150으로 하면 네비게이션 radius 때문에 공간 비어보임
// 패딩 bottom 58px 추가했음

// 유저 정보 쿠키에서 사용하기로 했음. 나중에 유저 정보 쿠키에서 꺼내자
// 필요한 것 유저 이미지, 유저 아이디

// 이미지 없으면 디폴트 이미지 넣어줘야함

export default function CommentInput() {
  const [comment, setComment] = useState('');

  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    console.log('댓글 변경', e.target.value === '\n');
    setComment(e.target.value);
  };

  const handleSubmit = () => {
    // 댓글 작성 로직 추가
    console.log('댓글', comment);
  };

  return (
    <div className='fixed bottom-[58px] left-1/2 -translate-x-1/2  max-w-screen-md flex flex-col gap-[10px] p-[10px] pb-[58px] w-full h-[158px] bg-white border-t border-[#B9B9B9] z-10'>
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
          onClick={handleSubmit}
        >
          작성
        </Button>
      </div>
    </div>
  );
}
