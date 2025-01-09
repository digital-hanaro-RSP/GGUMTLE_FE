'use client';

import Image from 'next/image';
import { ButtonHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

/** 일반 버튼 관련 Props */
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
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
export interface ImgButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  src: string;
  size?: 'sm' | 'md' | 'lg';
}

/** 이미지 버튼입니다.
 * src에 imageUrl만 넣어도 되고
 * size로 크기 변경 가능합니다.
 * 기타 size 문의는 정성엽에게
 */
export const ImgButton = ({
  src,
  size = 'md',
  className = '',
  ...props
}: ImgButtonProps) => {
  return (
    <button
      className={cn(
        className,
        'flex flex-col overflow-hidden relative',
        size === 'sm' && 'w-14 h-14',
        size === 'md' && 'w-24 h-24',
        size === 'lg' && 'w-48 h-48'
      )}
      {...props}
    >
      <Image src={src} alt='Image Button' fill objectFit='cover' />
    </button>
  );
};
