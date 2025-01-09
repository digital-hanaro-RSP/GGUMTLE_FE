'use client';

import ShowSelectedImage, {
  ShowSelectedImageRef,
} from '@/components/atoms/ShowSelectedImage';
import { useRef, useState } from 'react';

export default function MainPage() {
  const imageRef = useRef<ShowSelectedImageRef>(null);
  const [showImage, setShowImage] = useState(true);

  const handleRemove = () => {
    setShowImage(false);
  };

  return (
    <div className='p-4'>
      <h1 className='text-2xl font-bold text-primary-main'>메인 페이지</h1>
      {showImage && (
        <div className='mt-4'>
          <ShowSelectedImage
            ref={imageRef}
            imageUrl='/image/test.jpg'
            onRemove={handleRemove}
          />
        </div>
      )}
    </div>
  );
}
