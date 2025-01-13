import Image from 'next/image';
import { ButtonHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';
import { Card } from './Card';

export interface AddNewCardProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  usage: 'createBucket' | 'recommendBucket' | 'newGroup' | 'newPost';
  className?: string;
  size: 'lg' | 'md';
}

export const AddNewCard = ({
  usage,
  size,
  className = '',
  ...props
}: AddNewCardProps) => {
  const renderImage = () => {
    switch (usage) {
      case 'createBucket':
        return (
          <Image
            src={'/image/icons/Plus.png'}
            alt='img'
            width={30}
            height={30}
          />
        );
      case 'recommendBucket':
        return (
          <Image
            src={'/image/icons/MagicWand.png'}
            alt='img'
            width={30}
            height={30}
          />
        );
      case 'newPost':
        return (
          <Image
            src={'/image/icons/Pencil.png'}
            alt='img'
            width={30}
            height={30}
          />
        );
      case 'newGroup':
        return (
          <Image
            src={'/image/icons/group2.png'}
            alt='img'
            width={50}
            height={50}
          />
        );
    }
  };

  const renderText = () => {
    switch (usage) {
      case 'createBucket':
        return size === 'lg'
          ? '새로운 버킷리스트를 만들어 보아요'
          : '버킷리스트 생성하기';
      case 'recommendBucket':
        return '버킷리스트 추천받기';
      case 'newPost':
        return '꿈모임 글쓰기';
      case 'newGroup':
        return '꿈모임 만들기';
    }
  };

  return (
    <>
      <button
        className={cn(
          { ...props },
          className,
          'h-24',
          size === 'lg' && 'w-full',
          size === 'md' && 'w-[calc(50%-5px)]'
        )}
      >
        <Card
          className={cn('h-full w-full flex justify-center items-center gap-1')}
        >
          {renderImage()}
          <span className='text-primary-placeholder text-[15px]'>
            {renderText()}
          </span>
        </Card>
      </button>
    </>
  );
};
