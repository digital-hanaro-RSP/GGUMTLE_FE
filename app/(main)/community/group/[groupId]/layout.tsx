'use client';

import { PlusButton } from '@/components/atoms/Button';
import Header from '@/components/atoms/Header';
import CommentInput from '@/components/molecules/CommentInput';
import { useCommunityApi } from '@/hooks/useCommunity/useCommunity';
import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function GroupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { joinGroup, leaveGroup, isMember } = useCommunityApi();
  const params = useParams();
  const [isGroupMember, setIsGroupMember] = useState(false);
  const router = useRouter();
  const postId = params.postId;
  const groupId = Number(params.groupId);
  console.log('postId', postId);

  const fetchIsMember = async () => {
    try {
      const res = await isMember(groupId);
      if (res === true) {
        setIsGroupMember(true);
      } else {
        setIsGroupMember(false);
      }
      console.log(res);
    } catch (error) {
      console.error('멤버십 확인 중 오류 발생:', error);
      setIsGroupMember(false);
    }
  };

  useEffect(() => {
    fetchIsMember();
  }, [groupId]);

  const handleJoinGroup = async () => {
    const response = await joinGroup(groupId);
    fetchIsMember();
    console.log('handleJoinGroup : ' + response);
  };

  const handleLeaveGroup = async () => {
    const response = await leaveGroup(groupId);
    fetchIsMember();
    console.log('handleLeaveGroup : ' + response);
  };

  return (
    <div className='flex flex-col gap-[20px] w-full pt-[64px]'>
      {/* 상단 헤더 */}
      <div className='fixed top-0 left-0 right-0 z-10'>
        <div className='mx-auto max-w-screen-md'>
          <Header
            text='꿈그룹'
            showActionButton={true}
            actionLabel={isGroupMember ? '그룹 탈퇴' : '그룹 가입'}
            actionTextColor={isGroupMember ? 'primary-error' : 'primary-main'}
            onAction={isGroupMember ? handleLeaveGroup : handleJoinGroup}
          />
        </div>
      </div>

      {children}

      {/* 플러스 버튼 */}
      {/* {isMember && postId === undefined ? (
        <div className='fixed left-0 right-0 bottom-[68px] max-w-screen-md mx-auto pointer-events-none'>
          <PlusButton
            className='absolute bottom-[20px] right-[20px] pointer-events-auto'
            size='sm'
            onClick={() => {
              router.push('/community/create/post');
            }}
          />
        </div>
      ) : (
        <CommentInput />
      )} */}

      {isGroupMember && postId === undefined ? (
        <div className='fixed left-0 right-0 bottom-[68px] max-w-screen-md mx-auto pointer-events-none'>
          <PlusButton
            className='absolute bottom-[20px] right-[20px] pointer-events-auto'
            size='sm'
            onClick={() => {
              router.push('/community/create/post');
            }}
          />
        </div>
      ) : postId ? (
        <CommentInput />
      ) : null}
    </div>
  );
}
