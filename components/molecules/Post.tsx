/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useCommunityApi } from '@/hooks/useCommunity/useCommunity';
import { getAllBucketListRes } from '@/types/BucketList';
import { Post as PostType } from '@/types/Community';
import { BsThreeDots } from 'react-icons/bs';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { calculatePercent, getRelativeTimeString } from '@/lib/utils';
import LikeComment from '../atoms/LikeComment';
import UserProfile from '../atoms/UserProfile';
import { BucketListCard } from './BucketListCard';
import { PortfolioCard } from './PortfolioCard';

// TODO
// 추후 게시글 상세 페이지일떄 '더보기' 버튼 제거 하고 줄 수 제한 제거 로직 추가해야함.
// 아직 주소 못정해서 제거 로직 만들지 못했음.

type PostProps = PostType & {
  isDetailPage?: boolean;
  onDelete?: () => void;
};

export default function Post({
  groupId,
  id,
  userBriefInfo,
  snapShot,
  imageUrls,
  content,
  createdAt,
  likeCount: initialLikeCount,
  commentCount,
  liked: initialIsLiked,
  isDetailPage = false,
  onDelete,
  mine,
}: PostProps) {
  const [isExpanded, setIsExpanded] = useState(isDetailPage);
  const [isClamped, setIsClamped] = useState(false);
  const [likeCount, setLikeCount] = useState(initialLikeCount);
  const [isLiked, setIsLiked] = useState(initialIsLiked);
  const router = useRouter();
  console.log('snapShot', snapShot);
  const { plusLike, minusLike, deletePost } = useCommunityApi();

  const handleLikeClick = async () => {
    const newLikeState = !isLiked;
    try {
      if (newLikeState) {
        console.log('plusLike');
        await plusLike(groupId, id);
      } else {
        console.log('minusLike');
        await minusLike(groupId, id);
      }
      // API 성공 시에만 state 업데이트
      setIsLiked(newLikeState);
      setLikeCount((prev) => (newLikeState ? prev! + 1 : prev! - 1));
    } catch (error) {
      console.error('좋아요 처리 실패:', error);
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

  const handlePostClick = (e: React.MouseEvent) => {
    // 이벤트가 발생한 요소가 특정 기능이 있는 버튼이나 영역이 아닌 경우에만 이동
    const target = e.target as HTMLElement;
    if (
      !target.closest('button') && // 더보기 버튼
      !target.closest('.swiper-container') && // 이미지 슬라이더
      !target.closest('[role="menuitem"]') && // 드롭다운 메뉴 아이템
      !target.closest('.like-comment-section') // 좋아요/댓글 섹션
    ) {
      router.push(`/community/group/${groupId}/post/${id}`);
    }
  };

  const handleDelete = async () => {
    try {
      await deletePost(groupId, id);
      onDelete?.(); // 삭제 성공 시 콜백 호출
    } catch (error) {
      console.error('게시물 삭제 실패:', error);
    }
  };

  return (
    <div className='p-[20px] bg-white/80'>
      <div className='flex flex-col gap-[20px]' onClick={handlePostClick}>
        {/* 상단 프로필 */}
        <div className='flex justify-between items-center'>
          <div className='flex gap-[20px] items-center'>
            <UserProfile
              imageUrl={
                userBriefInfo?.profileImage || 'https://picsum.photos/36/36'
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
          {/* 만약 본인이 작성자라면 드롭 다운 노출해야함 현재 본인이 작성자라는 판단을 할 수 없어서 구현 못했음*/}
          {mine && (
            <DropdownMenu>
              <DropdownMenuTrigger>
                <BsThreeDots />
              </DropdownMenuTrigger>
              <DropdownMenuContent className=' min-w-[30px] w-fit px-[10px]'>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => {
                    router.push(`/community/edit/post/${id}?group=${groupId}`);
                  }}
                >
                  수정
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleDelete}>삭제</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>

        {/* 본문 영역 */}
        <div>
          <p
            ref={textRef}
            className={`whitespace-pre-wrap ${
              !isExpanded && !isDetailPage ? 'line-clamp-4' : ''
            }`}
          >
            {content}
          </p>

          {/* 실제 4줄 초과일 때만 "더보기" 버튼 노출 */}
          {!isDetailPage && isClamped && !isExpanded && (
            <button
              onClick={() => setIsExpanded(true)}
              className='text-primary-main text-sm mt-2'
            >
              더보기
            </button>
          )}
        </div>

        {/* 스냅샷이나 이미지가 있다면 표시 */}

        {/* 버킷리스트 와 포트폴리오는 추후 api 연동시 수정 */}

        {snapShot &&
          Array.isArray(snapShot.bucketLists) &&
          snapShot.bucketLists.length > 0 && (
            <div className='w-full z-0'>
              <Swiper
                modules={[Pagination]}
                pagination={{
                  clickable: true,
                }}
                spaceBetween={20}
                slidesPerView={1}
                className='w-full [&_.swiper-pagination-bullet]:bg-gray-300 [&_.swiper-pagination-bullet-active]:!bg-primary-main'
              >
                {snapShot.bucketLists.map(
                  (bucketList: getAllBucketListRes, idx: number) => (
                    <SwiperSlide key={idx}>
                      <BucketListCard
                        key={bucketList.id}
                        {...bucketList}
                        safeBox={bucketList.safeBox}
                        howTo={bucketList.howTo}
                        dataPercent={calculatePercent(
                          bucketList.howTo,
                          bucketList.goalAmount,
                          bucketList.safeBox,
                          new Date(bucketList.dueDate),
                          new Date(bucketList.createdAt)
                        )}
                        title={bucketList.title}
                        tagType={bucketList.tagType}
                        bucketId={bucketList.id}
                        isSelectMode={true}
                      />
                    </SwiperSlide>
                  )
                )}
              </Swiper>
            </div>
          )}

        {snapShot && snapShot.goalPortfolio && snapShot.currentPortfolio && (
          <div className='mt-4'>
            <PortfolioCard
              goalPortfolio={snapShot.goalPortfolio}
              currentPortfolio={snapShot.currentPortfolio}
            />
          </div>
        )}

        {Array.isArray(imageUrls) && imageUrls.length > 0 && (
          <div className='w-full z-0'>
            <Swiper
              modules={[Pagination]}
              pagination={{
                clickable: true,
              }}
              spaceBetween={20}
              slidesPerView={1}
              className='w-full [&_.swiper-pagination-bullet]:bg-gray-300 [&_.swiper-pagination-bullet-active]:!bg-primary-main'
            >
              {imageUrls.map((imageUrl: string, idx: number) => (
                <SwiperSlide key={idx}>
                  <div className='relative w-full aspect-video'>
                    <Image
                      src={imageUrl}
                      alt={`게시물 이미지 ${idx + 1}`}
                      className='w-full'
                      fill
                      priority={idx === 0}
                      unoptimized
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        )}

        <div className='like-comment-section'>
          <LikeComment
            isLiked={isLiked}
            likeCount={likeCount}
            commentCount={commentCount}
            onLikeClick={handleLikeClick}
          />
        </div>
      </div>
    </div>
  );
}
