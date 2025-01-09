'use client';

import Image from 'next/image';
import { ButtonHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

/** 일반 버튼 관련 Props */
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isDisabled?: boolean; // 클릭 불가능 상태를 위한 props
  size?: 'sm' | 'md' | 'lg';
}

/** 일반 버튼입니다.
 * default = primary-main,
 * disabled = grey,
 * 색깔 변경은 className 통해서
 */
export const Button = ({
  children,
  isDisabled = false,
  className = '',
  size = 'md',
  ...props
}: ButtonProps) => {
  return (
    <button
      className={cn(
        'p-4 rounded-xl text-[15px]',
        isDisabled
          ? 'bg-primary-disable text-black cursor-not-allowed' // unclickable
          : 'bg-primary-main text-white', // clickable
        size === 'sm' && 'btn-sm p-3',
        size === 'md' && 'btn-md',
        size === 'lg' && 'btn-lg',
        className
      )}
      disabled={isDisabled}
      {...props}
    >
      {children}
    </button>
  );
};

/** 이미지 버튼 관련 Props*/
interface ImgButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  src: string;
  size?: 'sm' | 'md' | 'lg';
}

export const ImgButton = ({
  src,
  size = 'md',
  className = '',
  children,
  ...props
}: ImgButtonProps) => {
  return (
    <button className={cn(className, 'flex flex-col')} {...props}>
      <Image
        src={src}
        alt='Image Button'
        width={
          size === 'sm'
            ? 50
            : size === 'md'
              ? 100
              : size === 'lg'
                ? 200
                : undefined
        }
        height={
          size === 'sm'
            ? 50
            : size === 'md'
              ? 100
              : size === 'lg'
                ? 200
                : undefined
        }
      />
      {children}
    </button>
  );
};
