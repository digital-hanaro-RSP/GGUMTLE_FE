import Image from 'next/image';
import { Card } from '../atoms/Card';

export type SupportCardProps = {
  src: string;
  title: string;
  desc1?: string;
  desc2?: string;
  desc3?: string;
  url?: string;
};

export const SupportCard = ({
  src,
  title,
  desc1,
  desc2,
  desc3,
  url,
}: SupportCardProps) => {
  return (
    <a href={`${url}`} className='w-32 flex flex-col items-center'>
      <Card className='w-[140px] h-[120px] flex justify-center items-center'>
        <Image
          src={src}
          alt='지원이미지'
          width={100}
          height={100}
          className='rounded-md'
        />
      </Card>
      <div className=''>
        <p className='text-lg font-semibold break-keep mb-[2px] text-center h-14 overflow-y-hidden'>
          {title}
        </p>
        <p className='text-gray-500 w-full text-center text-xs'>{desc1}</p>
        <p className='text-gray-500 w-full text-center text-xs'>{desc2}</p>
        <p className='text-gray-500 w-full text-right text-xs'>{desc3}</p>
      </div>
    </a>
  );
};
