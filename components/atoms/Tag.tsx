import { PropsWithChildren } from 'react';

type TagProps = PropsWithChildren & {
  isSelected?: boolean;
  onClick?: () => void;
};

export default function Tag({ children, isSelected, onClick }: TagProps) {
  return (
    <div
      onClick={onClick}
      className={` flex items-center justify-center text-[14px] sm:text-[16px] w-fit  px-[20px] py-[10px] rounded-[20px] cursor-pointer transition-colors whitespace-nowrap
        ${
          isSelected
            ? 'bg-primary-main text-white font-semibold'
            : 'border border-primary-placeholder text-primary-placeholder font-medium'
        }`}
    >
      {children}
    </div>
  );
}
