'use client';

import { FaArrowLeft } from 'react-icons/fa6';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';

type HeaderProps = {
  className?: string;
  text: string;
  showBackButton?: boolean;
  onBack?: () => void;
  showActionButton?: boolean;
  actionLabel?: string;
  onAction?: () => void;
};

export default function Header({
  className,
  text = '',
  showBackButton = true,
  onBack,
  showActionButton = true,
  actionLabel = '완료',
  onAction,
}: HeaderProps) {
  // Back 버튼 default값
  const router = useRouter();
  const handleOnBack = () => {
    if (onBack) onBack();
    else router.back();
  };

  return (
    <div
      className={cn(
        'flex justify-center items-center bg-white px-[20px] py-[11.5px] max-h-[44px] max-w-screen-md',
        className
      )}
    >
      {/* 뒤로 가기 버튼 */}
      {showBackButton && (
        <button className='pr-[8px]' onClick={handleOnBack}>
          <FaArrowLeft size={20} />
        </button>
      )}

      {/* text */}
      <h1 className='text-[18px] font-semibold flex-grow'>{text}</h1>

      {/* 완료 버튼 */}
      {showActionButton && (
        <button
          onClick={onAction}
          className='text-[18px] font-medium text-black text-right'
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}
