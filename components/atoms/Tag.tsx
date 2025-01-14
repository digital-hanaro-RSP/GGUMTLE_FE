import { PropsWithChildren } from 'react';

interface TagProps extends PropsWithChildren {
  isSelected?: boolean;
}

export default function Tag({ children, isSelected }: TagProps) {
  return isSelected ? (
    <div className='text-[11px] p-[5px] rounded-[10px] bg-primary-main text-white'>
      {children}
    </div>
  ) : (
    <div className='text-[11px] font-medium border border-primary-main rounded-[10px] p-[5px]'>
      {children}
    </div>
  );
}
