import { Group } from '@/types/Community';
import { IoPeople } from 'react-icons/io5';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Card } from '../atoms/Card';

// 필요한 요소
// 그룹 이미지
// 그룹 이름
// 그룹 설명
// 그룹 인원
// 그룹 카테고리

export default function GroupCard({
  id,
  name,
  category,
  description,
  imageUrl,
  memberCount,
}: Group) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/community/group/${id}`);
  };

  return (
    <Card onClick={handleClick}>
      <div className='flex gap-[20px] height-[80px] items-center'>
        <div className='w-[80px] h-[80px] rounded-[10px] overflow-hidden'>
          <Image
            src={`${imageUrl}`}
            alt='group image'
            width={80}
            height={80}
            className='object-cover'
          />
        </div>

        <div className='flex flex-col gap-[7px]'>
          <p className='font-bold text-[16px]'>{name}</p>
          <p className='text-[14px]'>{description}</p>
          <div className='flex gap-[7px] items-center text-[#B9B9B9]'>
            <IoPeople width={14} height={14} />
            <span className='text-[12px]'>{memberCount} 명</span>
            <span>·</span>
            <span className='text-[12px]'>{category}</span>
          </div>
        </div>
      </div>
    </Card>
  );
}