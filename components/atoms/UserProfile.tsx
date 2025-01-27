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
    <div
      ref={ref}
      className='relative w-[36px] h-[36px] sm:w-[42px] sm:h-[42px] md:w-[48px] md:h-[48px] lg:w-[54px] lg:h-[54px]'
    >
      <Image
        src={imageUrl}
        alt={alt}
        width={36}
        height={36}
        className='rounded-full object-cover w-full h-full'
      />
    </div>
  );
};

export default forwardRef(UserProfile);
