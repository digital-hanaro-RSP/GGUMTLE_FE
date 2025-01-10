import Image from 'next/image';
import { forwardRef, ForwardRefRenderFunction } from 'react';

interface UserProfileProps {
  imageUrl: string;
  alt?: string;
}

const UserProfile: ForwardRefRenderFunction<
  HTMLDivElement,
  UserProfileProps
> = ({ imageUrl, alt = 'User profile' }, ref) => {
  return (
    <div ref={ref} className='relative w-[36px] h-[36px]'>
      <Image
        src={imageUrl}
        alt={alt}
        width={36}
        height={36}
        className='rounded-full object-cover'
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );
};

export default forwardRef(UserProfile);
