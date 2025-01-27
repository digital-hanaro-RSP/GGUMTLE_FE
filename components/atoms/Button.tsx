'use client';

import { FiPlus } from 'react-icons/fi';
import { IoIosArrowDown } from 'react-icons/io';
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
      <Image
        src={src}
        alt='Image Button'
        fill
        objectFit='cover'
      />
    </button>
  );
};

/** 더보기 버튼 관련 Props */
export interface MoreButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: 'xs' | 'sm' | 'md' | 'lg';
  /** down/up/left/right */
  direction: 'down' | 'up' | 'left' | 'right';
}

/** 더보기 버튼입니다.
 * 방향을 지정 가능.
 * 사이즈 지정 가능.
 */
export const MoreButton = ({
  size = 'xs',
  direction = 'down',
  className = '',
  ...props
}: MoreButtonProps) => {
  return (
    <button
      type='button'
      // 여기서 Spread 해줘야 onClick 등 다른 Props들이 button에 정상 전달됩니다.
      {...props}
      className={cn('flex flex-col items-center', className)}
    >
      <IoIosArrowDown
        // 아이콘에 조건부 클래스를 부여해 방향을 바꿉니다.
        className={cn(
          'transition-transform duration-300', // 회전 애니메이션(Optional)
          direction === 'down' && 'rotate-0',
          direction === 'left' && 'rotate-90',
          direction === 'up' && 'rotate-180',
          direction === 'right' && '-rotate-90',
          size === 'sm' && 'w-14 h-14',
          size === 'md' && 'w-24 h-24',
          size === 'lg' && 'w-48 h-48'
        )}
      />
    </button>
  );
};

/** 더하기 버튼 Props*/
export interface PlusButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: 'xs' | 'sm' | 'md' | 'lg';
}

/** 더하기 버튼입니다.
 * 크기 조절 가능
 * 기타 문의는 정성엽에게
 */
export const PlusButton = ({
  size = 'xs',
  className = '',
  ...props
}: PlusButtonProps) => {
  return (
    <>
      <button
        {...props}
        className={cn(className, 'rounded-full overflow-hidden')}
      >
        <FiPlus
          color='white'
          strokeWidth={4}
          className={cn(
            'bg-primary-main p-1',
            size === 'sm' && 'w-14 h-14',
            size === 'md' && 'w-24 h-24',
            size === 'lg' && 'w-48 h-48'
          )}
        />
      </button>
    </>
  );
};
