'use client';

import Header from '@/components/atoms/Header';
import { DefaultInputRef } from '@/components/atoms/Inputs';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { IoIosArrowDown } from 'react-icons/io';
import { useState } from 'react';

export default function CreateGroupPage() {
  const [selectedCategory, setSelectedCategory] =
    useState('선택된 카테고리가 없습니다.');
  const categories = ['여행', '재테크', '노후', '교육', '취미'];
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  return (
    <div className='flex flex-col gap-[20px] w-full'>
      <Header text='꿈모임 만들기' showActionButton={false} />
      <div className='flex flex-col gap-[20px] w-full px-[20px]'>
        <div className='flex flex-col gap-[7px]'>
          <p className='text-[18px] font-bold'>
            생성할 꿈모임의 이름을 입력해주세요.
          </p>
          <DefaultInputRef placeHolder='꿈모임 이름을 입력해주세요.' />
        </div>

        <div className='flex flex-col gap-[7px] w-full'>
          <p className='text-[18px] font-bold'>
            꿈모임의 카테고리를 설정해주세요.
          </p>
          <div className='w-full'>
            <DropdownMenu>
              <DropdownMenuTrigger className='w-full'>
                <div className='flex items-center p-[10px] gap-[20px] justify-between bg-white rounded-[10px] border border-primary-placeholder w-full'>
                  <span
                    className={
                      selectedCategory === '선택된 카테고리가 없습니다.'
                        ? 'text-primary-placeholder'
                        : ''
                    }
                  >
                    {selectedCategory}
                  </span>
                  <IoIosArrowDown />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className=' min-w-[30px] w-fit px-[10px]'
                align='end'
              >
                <DropdownMenuLabel>카테고리</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {categories.map((category) => (
                  <DropdownMenuItem
                    key={category}
                    onClick={() => handleCategoryChange(category)}
                  >
                    {category}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <div className='flex flex-col gap-[7px]'>
          <p className='text-[18px] font-bold'>
            꿈모임 대표 사진을 선택해주세요
          </p>
        </div>
      </div>
    </div>
  );
}
