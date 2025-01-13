/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useCommunityApi } from '@/hooks/useCommunity/useCommunity';
import { Post as PostType } from '@/types/Community';
import { BsThreeDots } from 'react-icons/bs';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { getRelativeTimeString } from '@/lib/utils';
import { Card } from '../atoms/Card';
import LikeComment from '../atoms/LikeComment';
import UserProfile from '../atoms/UserProfile';

// TODO
// 추후 게시글 상세 페이지일떄 '더보기' 버튼 제거 하고 줄 수 제한 제거 로직 추가해야함.
// 아직 주소 못정해서 제거 로직 만들지 못했음.

export default function Post({
  groupId,
  id,
  author,
  snapshot,
  imageUrls,
  content,
  createdAt,
  likeCount: initialLikeCount,
  commentCount,
  isLiked: initialIsLiked,
}: PostType) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isClamped, setIsClamped] = useState(false);
  const [likeCount, setLikeCount] = useState(initialLikeCount);
  const [isLiked, setIsLiked] = useState(initialIsLiked);

  const { plusLike, minusLike } = useCommunityApi();

  const handleLikeChange = async (newLikeState: boolean) => {
    try {
      if (newLikeState) {
        console.log('plusLike', groupId, id);
        await plusLike(groupId, id);
      } else {
        console.log('minusLike', groupId, id);
        await minusLike(groupId, id);
      }
      setIsLiked(newLikeState);
      setLikeCount((prev) => (newLikeState ? prev! + 1 : prev! - 1));
    } catch (error) {
      console.error('좋아요 처리 실패:', error);
      setIsLiked(!newLikeState);
      setLikeCount((prev) => (!newLikeState ? prev! + 1 : prev! - 1));
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
        {/* 상단 프로필 */}
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
        </div>

        {/* 스냅샷이나 이미지가 있다면 표시 */}
        {snapshot && snapshot.bucketLists.length > 0 && (
          <div className='mt-4'>{/* 버킷리스트 */}</div>
        )}
        {snapshot && snapshot.portfolioLists.length > 0 && (
          <div className='mt-4'>{/* 포트폴리오 */}</div>
        )}
        {imageUrls.length > 0 && (
          <div className='flex flex-col gap-[20px]'>
            {imageUrls.map((imageUrl: any, idx: any) => (
              <div key={idx} className='relative w-full aspect-auto'>
                <Image
                  src={imageUrl}
                  alt={`게시물 이미지 ${idx + 1}`}
                  className='object-contain'
                  width={0}
                  height={0}
                  sizes='100vw'
                  style={{ width: '100%', height: 'auto' }}
                  priority={idx === 0}
                />
              </div>
            ))}
          </div>
        )}
        <LikeComment
          initialIsLiked={isLiked!}
          likeCount={likeCount!}
          commentCount={commentCount}
          onLikeChange={handleLikeChange}
        />
      </div>
    </Card>
  );
}
