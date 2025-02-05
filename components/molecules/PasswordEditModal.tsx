'use client';

import Swal from 'sweetalert2';
import { useState } from 'react';
import { Button } from '../atoms/Button';
import { DefaultInputRef } from '../atoms/Inputs';

export interface PasswordEditModalProps {
  onSubmit: (passwords: {
    newPassword: string;
    confirmPassword: string;
  }) => void;
  onClose: () => void;
}

export const PasswordEditModal = ({
  onSubmit,
  onClose,
}: PasswordEditModalProps) => {
  const [passwords, setPasswords] = useState({
    newPassword: '',
    confirmPassword: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwords.newPassword !== passwords.confirmPassword) {
      Swal.fire({
        title: 'Oops!',
        text: '비밀번호가 일치하지 않습니다.',
        icon: 'error',
        confirmButtonText: '네',
        confirmButtonColor: '#069894',
      });
      return;
    }
    onSubmit(passwords);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswords((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center'>
      <div className='bg-white rounded-lg p-6 w-full max-w-md'>
        <h2 className='text-xl font-bold mb-4'>비밀번호 변경</h2>
        <form onSubmit={handleSubmit}>
          <div className='space-y-4'>
            <DefaultInputRef
              name='newPassword'
              type='password'
              value={passwords.newPassword}
              onChange={handleChange}
              placeHolder='새로운 비밀번호'
              required
              error='새로운 비밀번호를 입력해주세요'
            />
            <DefaultInputRef
              name='confirmPassword'
              type='password'
              value={passwords.confirmPassword}
              onChange={handleChange}
              placeHolder='새로운 비밀번호 확인'
              required
              error='비밀번호가 일치하지 않습니다'
            />
          </div>
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
