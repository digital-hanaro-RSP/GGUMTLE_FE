import Image from 'next/image';
import {
  forwardRef,
  ForwardRefRenderFunction,
  useImperativeHandle,
} from 'react';

interface ShowSelectedImageProps {
  imageUrl: string;
  onRemove?: () => void;
}

export interface ShowSelectedImageRef {
  remove: () => void;
}

const ShowSelectedImage: ForwardRefRenderFunction<
  ShowSelectedImageRef,
  ShowSelectedImageProps
> = ({ imageUrl, onRemove }, ref) => {
  useImperativeHandle(ref, () => ({
    remove: () => {
      if (onRemove) {
        onRemove();
      }
    },
  }));

  return (
    <div className='relative w-[100px] h-[100px] sm:w-[120px] sm:h-[120px] md:w-[140px] md:h-[140px] lg:w-[160px] lg:h-[160px]'>
      <Image
        src={imageUrl}
        alt='Selected'
        width={100}
        height={100}
        className='object-cover rounded-[10px] w-full h-full'
        priority
        unoptimized
      />
      <button
        onClick={() => {
          if (onRemove) {
            onRemove();
          }
        }}
        className='absolute -top-2 -right-2 w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 lg:w-9 lg:h-9 bg-primary-main text-white rounded-full flex items-center justify-center hover:bg-primary-hover z-10 text-2xl leading-none pb-1'
      >
        -
      </button>
    </div>
  );
};

export default forwardRef(ShowSelectedImage);
