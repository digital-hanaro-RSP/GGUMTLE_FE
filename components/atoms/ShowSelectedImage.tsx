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
    <div className='relative w-[100px] h-[100px]'>
      <Image
        src={imageUrl}
        alt='Selected'
        width={100}
        height={100}
        className='object-cover rounded-[10px]'
        style={{ width: '100%', height: '100%' }}
      />
      <button
        onClick={() => {
          if (onRemove) {
            onRemove();
          }
        }}
        className='absolute -top-2 -right-2 w-6 h-6 bg-primary-main text-white rounded-full flex items-center justify-center hover:bg-primary-hover z-10 text-2xl leading-none pb-1'
      >
        -
      </button>
    </div>
  );
};

export default forwardRef(ShowSelectedImage);
