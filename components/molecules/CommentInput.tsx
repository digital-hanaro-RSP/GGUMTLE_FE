import { IoIosSend } from 'react-icons/io';
import { useState } from 'react';
import TextArea from '../atoms/TextArea';
import UserProfile from '../atoms/UserProfile';

// 기본 높이 150 + 네비게이션 높이 58
// 150으로 하면 네비게이션 radius 때문에 공간 비어보임
// 패딩 bottom 58px 추가했음
// -> 네비게이션 수정으로 인해 pb 삭제함

// 유저 정보 쿠키에서 사용하기로 했음. 나중에 유저 정보 쿠키에서 꺼내자
// 필요한 것 유저 이미지, 유저 아이디

// 이미지 없으면 디폴트 이미지 넣어줘야함

export default function CommentInput({
  onClick,
  userImage,
}: {
  onClick: (comment: string) => void;
  userImage: string | null;
}) {
  const [comment, setComment] = useState('');

  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    console.log('댓글 변경', e.target.value === '\n');
    setComment(e.target.value);
  };

  const handleSubmit = () => {
    // 댓글 작성 로직 추가
    if (!comment.trim()) {
      console.log('댓글 작성 실패');
      return;
    }
    if (onClick) {
      onClick(comment);
    }
    setComment('');
    console.log('댓글', comment);
  };

  return (
    <div className='fixed bottom-[48px] left-1/2 -translate-x-1/2  max-w-screen-md flex flex-col gap-[10px] p-[10px] w-full h-[90px] bg-white border-t border-[#D9D9D9] z-10'>
      <div className='flex gap-[10px] w-full items-center'>
        <UserProfile
          imageUrl={userImage || '/image/icons/default-profile.png'}
        />

        <div className='flex-1 '>
          <TextArea
            type='comment'
            value={comment}
            onChange={handleCommentChange}
          />
        </div>

        <div
          className='flex items-center justify-center'
          onClick={handleSubmit}
        >
          <div
            className={` ${
              comment.trim() ? 'text-primary-main' : 'text-primary-placeholder'
            } cursor-pointer`}
          >
            <IoIosSend size={34} />
          </div>
        </div>
      </div>
    </div>
  );
}
