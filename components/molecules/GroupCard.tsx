import { Group } from '@/types/Community';
import { IoIosArrowDown } from 'react-icons/io';
import { IoPeople } from 'react-icons/io5';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { convertCodeToCategory } from '@/lib/utils';
// import { useRouter } from 'next/navigation';
import { Card } from '../atoms/Card';

// 필요한 요소
// 그룹 이미지
// 그룹 이름
// 그룹 설명
// 그룹 인원
// 그룹 카테고리

type GroupCardProps = Group & {
  onClick?: () => void;
  rightIcon?: boolean;
  className?: string;
  ref?: React.Ref<HTMLDivElement>;
};

export default function GroupCard({
  ref,
  name,
  category,
  description,
  imageUrl,
  memberCount,
  onClick,
  rightIcon = true,
  className = '',
}: GroupCardProps) {
  // const router = useRouter();

  const handleClick = () => {
    onClick?.();
    // router.push(`/community/group/${id}`);
  };

  return (
    <Card onClick={handleClick} className={cn(className)} ref={ref}>
      <div className='flex gap-[20px] height-[80px] items-center justify-between'>
        <div className='flex gap-[20px] items-center'>
          <div className='min-w-[80px] min-h-[80px] relative rounded-[10px] overflow-hidden'>
            <Image
              src={`${imageUrl}`}
              alt='group image'
              fill
              className='object-cover'
            />
          </div>

          <div className='flex flex-col gap-[7px]'>
            <p className='font-bold text-[16px]'>{name}</p>
            <p className='text-[14px] break-all'>{description}</p>
            <div className='flex gap-[7px] items-center text-[#B9B9B9]'>
              <IoPeople width={14} height={14} />
              <span className='text-[12px]'>{memberCount} 명</span>
              <span>·</span>
              <span className='text-[12px]'>
                {convertCodeToCategory(category)}
              </span>
            </div>
          </div>
        </div>
        {rightIcon && (
          <IoIosArrowDown
            width={20}
            height={20}
            className='-rotate-90 text-primary-placeholder min-w-5 min-h-5'
          />
        )}
      </div>
    </Card>
  );
}
