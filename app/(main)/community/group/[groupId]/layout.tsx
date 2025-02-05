'use client';

import { PlusButton } from '@/components/atoms/Button';
import Header from '@/components/atoms/Header';
import { useCommunityApi } from '@/hooks/useCommunity/useCommunity';
import Swal from 'sweetalert2';
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
  const groupId = Number(params.groupId);
  const [groupName, setGroupName] = useState('');

  const fetchIsMember = async () => {
    try {
      const res = await isMember(groupId);

      if (res?.groupName) {
        // 너무 긴 그룹 이름 처리
        if (res.groupName.length > 18) {
          setGroupName(`${res.groupName.slice(0, 18)}...`);
        } else {
          setGroupName(res.groupName);
        }
      } else {
        setGroupName('꿈그룹');
      }

      setIsGroupMember(res?.isMember === true);
    } catch (error) {
      console.error('멤버십 확인 중 오류 발생:', error);
      setIsGroupMember(false);
      setGroupName('꿈그룹');
    }
  };

  useEffect(() => {
    fetchIsMember();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [groupId]);

  const handleJoinGroup = async () => {
    await joinGroup(groupId);
    fetchIsMember();

    Swal.fire({
      text: '가입 성공! 환영합니다.',
      icon: 'success',
      showConfirmButton: false,
      timer: 1500,
    }).then(() => {
      if (params.postId !== undefined) {
        // 일단 임시로 상세 글 페이지에서 가입하면 리로드해서 댓글 입력창 표시
        window.location.reload();
      }
    });
  };

  const handleLeaveGroup = async () => {
    // 이 부분 shadcn으로 할지 고민해보자
    Swal.fire({
      title: '정말 그룹을 탈퇴하시겠어요?',
      text: '이 작업은 되돌릴 수 없습니다.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#D80000',
      cancelButtonColor: '#C0C0C0',
      confirmButtonText: '네, 탈퇴할게요!',
      cancelButtonText: '취소',
    }).then(async (result) => {
      if (result.isConfirmed) {
        await leaveGroup(groupId);
        router.push('/community/main/mygroup');
        Swal.fire({
          title: '탈퇴되었어요!',
          icon: 'success',
          timer: 1500,
        });
      }
    });

    // fetchIsMember();
  };

  return (
    <div className='flex flex-col gap-[20px] w-full pt-[64px]'>
      {/* 상단 헤더 */}
      <div className='fixed top-0 left-0 right-0 z-10'>
        <div className='mx-auto max-w-screen-md'>
          <Header
            text={groupName}
            showActionButton={true}
            actionLabel={isGroupMember ? '그룹 탈퇴' : '그룹 가입'}
            actionTextColor={isGroupMember ? 'primary-error' : 'primary-main'}
            onAction={isGroupMember ? handleLeaveGroup : handleJoinGroup}
          />
        </div>
      </div>

      {children}

      {isGroupMember && params.postId === undefined && (
        <div className='fixed left-0 right-0 bottom-[68px] max-w-screen-md mx-auto pointer-events-none'>
          <PlusButton
            className='absolute bottom-[20px] right-[20px] pointer-events-auto'
            size='sm'
            onClick={() => {
              router.push(`/community/create/post?groupId=${groupId}`);
            }}
          />
        </div>
      )}
    </div>
  );
}
