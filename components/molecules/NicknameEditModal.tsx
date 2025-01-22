'use client';

import { useState } from 'react';
import { Button } from '../atoms/Button';
import { DefaultInputRef } from '../atoms/Inputs';

interface NicknameEditModalProps {
  onSubmit: (nickname: string) => void;
  onClose: () => void;
}

export const NicknameEditModal = ({
  onSubmit,
  onClose,
}: NicknameEditModalProps) => {
  const [nickname, setNickname] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(nickname);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
  };

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center'>
      <div className='bg-white rounded-lg p-6 w-full max-w-md'>
        <h2 className='text-xl font-bold mb-4'>닉네임을 입력해주세요</h2>
        <form onSubmit={handleSubmit}>
          <DefaultInputRef
            name='nickname'
            value={nickname}
            onChange={handleChange}
            placeHolder='새로운 닉네임'
            required
            error='닉네임을 입력해주세요'
          />
          <div className='flex justify-end space-x-2 mt-4'>
            <Button size='sm' onClick={onClose}>
              취소
            </Button>
            <Button size='sm'>확인</Button>
          </div>
        </form>
      </div>
    </div>
  );
};
