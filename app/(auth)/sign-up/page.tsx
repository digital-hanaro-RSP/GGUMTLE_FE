'use client';

import { DefaultInputRef } from '@/components/atoms/Inputs';
import { LuListCheck } from 'react-icons/lu';
import { ChangeEvent, useState } from 'react';

export default function SignUpPage() {
  const [name, setName] = useState('');
  const [birth, setBirth] = useState({
    year: '',
    month: '',
    day: '',
  });

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleBirthChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBirth((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className='p-4'>
      <div className='flex flex-col items-center'>
        <LuListCheck className='text-primary-main text-5xl mb-3' />
        <h1 className='text-xl font-extrabold whitespace-pre-line text-center text-primary-main mb-8'>
          아래 내용을 하나씩{'\n'}차근차근 입력해주세요
        </h1>

        <div className='w-full max-w-md space-y-6'>
          <div>
            <p className='text-lg font-bold mb-2 text-[#5B5B5B]'>이름</p>
            <DefaultInputRef
              name='name'
              placeHolder='이름을 입력해주세요'
              onChange={handleNameChange}
              value={name}
              required
              error='이름을 입력해주세요'
            />
          </div>

          <div>
            <p className='text-lg font-bold mb-2 text-[#5B5B5B]'>생년월일</p>
            <div className='flex justify-between'>
              <div className='w-[30%]'>
                <DefaultInputRef
                  name='year'
                  placeHolder='출생연도'
                  onChange={handleBirthChange}
                  value={birth.year}
                  required
                  maxLength={4}
                />
              </div>
              <div className='w-[30%]'>
                <DefaultInputRef
                  name='month'
                  placeHolder='월'
                  onChange={handleBirthChange}
                  value={birth.month}
                  required
                  maxLength={2}
                />
              </div>
              <div className='w-[30%]'>
                <DefaultInputRef
                  name='day'
                  placeHolder='일'
                  onChange={handleBirthChange}
                  value={birth.day}
                  required
                  maxLength={2}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
