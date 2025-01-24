'use client';

import { Button, ImgButton } from '@/components/atoms/Button';
import { Card } from '@/components/atoms/Card';
import {
  DropCard,
  DropCardItem,
  DropCardItemList,
  DropDownTrigger,
} from '@/components/molecules/DropCard';
import { NicknameEditModal } from '@/components/molecules/NicknameEditModal';
import { PasswordEditModal } from '@/components/molecules/PasswordEditModal';
import { useUserApi } from '@/hooks/useUser/useUser';
import { signOut } from 'next-auth/react';
import { IoMenu } from 'react-icons/io5';
import { useEffect, useRef, useState } from 'react';

interface UserInfo {
  id: string;
  tel: string;
  name: string;
  permission: number;
  birthDate: string;
  gender: string;
  role: string;
  profileImageUrl: string | null;
  nickname: string;
}

export default function MyPage() {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditingNickname, setIsEditingNickname] = useState(false);
  const [isEditingPassword, setIsEditingPassword] = useState(false);
  const { getUserInfo, updateUserInfo } = useUserApi();

  const isMounted = useRef(false);

  const formatBirthDate = (birthDate: string) => {
    const date = new Date(birthDate);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    if (isMounted.current) return;

    const fetchUserInfo = async () => {
      try {
        const data = await getUserInfo();
        setUserInfo(data);
      } catch (error) {
        console.error('Failed to fetch user info:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserInfo();
    isMounted.current = true;
  }, [getUserInfo]);

  const handleNicknameUpdate = async (newNickname: string) => {
    try {
      const updatedUser = await updateUserInfo({ nickname: newNickname });
      setUserInfo(updatedUser);
      setIsEditingNickname(false);
    } catch (error) {
      console.error('Failed to update nickname:', error);
    }
  };

  const handlePasswordUpdate = async (passwords: {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
  }) => {
    try {
      const updatedUser = await updateUserInfo({
        password: passwords.newPassword,
      });
      setUserInfo(updatedUser);
      setIsEditingPassword(false);
    } catch (error) {
      console.error('Failed to update password:', error);
    }
  };

  const handleLogout = async () => {
    await signOut({ callbackUrl: '/login' });
  };

  if (isLoading) {
    return (
      <div className='h-[100vh] flex items-center justify-center overflow-hidden'>
        Loading...
      </div>
    );
  }

  if (!userInfo) {
    return (
      <div className='h-[100vh] flex items-center justify-center overflow-hidden'>
        Failed to load user information
      </div>
    );
  }

  return (
    <div className='min-h-[calc(100vh-58px)] flex items-center justify-center overflow-hidden'>
      <div className='w-full max-w-2xl px-4 py-6 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]'>
        <div className='relative w-full'>
          <div className='absolute right-0 top-0'>
            <DropCard>
              <DropDownTrigger className='text-2xl pl-4 py-[2px] hover:bg-gray-100 rounded-md'>
                <IoMenu />
              </DropDownTrigger>
              <DropCardItemList
                direction='down'
                isBlur={true}
                className='w-24 right-1 mt-1'
              >
                <DropCardItem
                  className='bg-gray-100 px-4 py-2 hover:bg-gray-200 whitespace-nowrap'
                  onClick={handleLogout}
                >
                  로그아웃
                </DropCardItem>
                <DropCardItem className='bg-gray-100 px-4 py-2 hover:bg-gray-200 whitespace-nowrap'>
                  회원탈퇴
                </DropCardItem>
              </DropCardItemList>
            </DropCard>
          </div>
        </div>
        <div className='flex flex-col items-center gap-2 mb-1'>
          <h1 className='text-2xl font-bold text-center'>
            {userInfo.name}님의 정보
          </h1>
          <ImgButton
            src={userInfo.profileImageUrl || '/image/icons/default-profile.png'}
            size='lg'
            className='rounded-full mb-2'
          />
        </div>

        <Card className='max-w-md mx-auto'>
          <div className='space-y-5'>
            {/* 이름 */}
            <div className='flex items-center'>
              <span className='w-32 text-gray-600'>이름</span>
              <span className='flex-1 font-medium text-right'>
                {userInfo.name}
              </span>
            </div>

            {/* 별명 */}
            <div className='flex items-center'>
              <span className='w-32 text-gray-600'>별명</span>
              <span className='flex-1 font-medium text-right'>
                {userInfo.nickname}
              </span>
            </div>

            {/* 생년월일 */}
            <div className='flex items-center'>
              <span className='w-32 text-gray-600'>생년월일</span>
              <span className='flex-1 font-medium text-right'>
                {formatBirthDate(userInfo.birthDate)}
              </span>
            </div>

            {/* 휴대폰 번호 */}
            <div className='flex items-center'>
              <span className='w-32 text-gray-600'>휴대폰 번호</span>
              <span className='flex-1 font-medium text-right'>
                {userInfo.tel}
              </span>
            </div>
          </div>
        </Card>

        <div className='flex flex-col items-center gap-4 mt-7'>
          <Button
            size='lg'
            onClick={() => setIsEditingNickname(true)}
            className='px-4 py-2'
          >
            닉네임 수정
          </Button>
          <Button
            size='lg'
            onClick={() => setIsEditingPassword(true)}
            className='px-4 py-2'
          >
            비밀번호 변경
          </Button>
        </div>
      </div>
      {isEditingNickname && (
        <NicknameEditModal
          onSubmit={handleNicknameUpdate}
          onClose={() => setIsEditingNickname(false)}
        />
      )}
      {isEditingPassword && (
        <PasswordEditModal
          onSubmit={handlePasswordUpdate}
          onClose={() => setIsEditingPassword(false)}
        />
      )}
    </div>
  );
}
