/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { BsThreeDots } from 'react-icons/bs';
import { useEffect, useRef, useState } from 'react';
import { getRelativeTimeString } from '@/lib/utils';
import { Card } from '../atoms/Card';
import LikeComment from '../atoms/LikeComment';
import UserProfile from '../atoms/UserProfile';

type PostProps = {
  postId: any;
  isLiked: boolean;
  snapshot?: any; // 자산 관련 게시물일 때만 존재
  imageUrl?: any;
  content: any;
  createdAt: any;
  likeCount: number;
  commentCount: number;
  userId: any; // 작성자 아이디
  author: any; // 작성자 준다고 가정
};

export default function Post({
  postId,
  isLiked,
  snapshot,
  imageUrl,
  content,
  createdAt,
  likeCount: initialLikeCount,
  commentCount,
  userId,
  author,
}: PostProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isClamped, setIsClamped] = useState(false);
  const [localLikeCount, setLocalLikeCount] = useState(initialLikeCount);
  const [localIsLiked, setLocalIsLiked] = useState(isLiked);

  // const author = {
  //   name: '임시작성자',
  //   profileImage: 'https://picsum.photos/36/36',
  // };

  const handleLikeChange = async (newLikeState: boolean) => {
    try {
      // API 연동 시 여기에 좋아요 요청 추가
      // const response = await likePost(postId, newLikeState);
      console.log(postId, userId);
      setLocalIsLiked(newLikeState);
      setLocalLikeCount((prev) => (newLikeState ? prev + 1 : prev - 1));
    } catch (error) {
      // 에러 처리
      console.error('실패:', error);
      // 실패 시 상태 롤백
      setLocalIsLiked(!newLikeState);
      setLocalLikeCount((prev) => (!newLikeState ? prev + 1 : prev - 1));
    }
  };

  const textRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    // 컴포넌트가 마운트된 뒤 실제 줄 수를 측정
    if (!textRef.current) return;

    // 현재 요소의 line-height 조회
    const lineHeight = parseFloat(
      window.getComputedStyle(textRef.current).lineHeight
    );
    // 4줄에 해당하는 높이
    const maxHeight = lineHeight * 4;

    // scrollHeight가 4줄 높이보다 큰지 확인
    if (textRef.current.scrollHeight > maxHeight) {
      setIsClamped(true); // 4줄을 넘어감
    }
  }, []);

  return (
    <Card>
      <div className='flex flex-col gap-[20px]'>
        {/* 상단 프로필, 드롭다운 */}
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

        {/* 본문 영역 */}
        <div>
          <p
            ref={textRef}
            className={`whitespace-pre-wrap ${
              !isExpanded ? 'line-clamp-4' : ''
            }`}
          >
            {content}
          </p>

          {/* 실제 4줄 초과일 때만 "더보기" 버튼 노출 */}
          {isClamped && !isExpanded && (
            <button
              onClick={() => setIsExpanded(true)}
              className='text-primary-main text-sm mt-2'
            >
              더보기
            </button>
          )}
          {/* 스냅샷이나 이미지가 있다면 표시 */}
          {snapshot && <div className='mt-4'>{/* 스냅샷 표시 로직 */}</div>}
          {imageUrl && <div className='mt-4'>{/* 이미지 표시 로직 */}</div>}
        </div>

        <LikeComment
          initialIsLiked={localIsLiked}
          likeCount={localLikeCount}
          commentCount={commentCount}
          onLikeChange={handleLikeChange}
        />
      </div>
    </Card>
  );
}
