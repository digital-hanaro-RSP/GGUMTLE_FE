'use client';

import { Button } from '@/components/atoms/Button';
import Header from '@/components/atoms/Header';
import { DefaultInputRef, ImageInputRef } from '@/components/atoms/Inputs';
import ShowSelectedImage from '@/components/atoms/ShowSelectedImage';
import Tag from '@/components/atoms/Tag';
import TextArea from '@/components/atoms/TextArea';
import { useCommunityApi } from '@/hooks/useCommunity/useCommunity';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { checkImageSize } from '@/lib/utils';

export default function CreateGroupPage() {
  const [name, setName] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [description, setDescription] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const router = useRouter();

  const { createGroup, uploadImages } = useCommunityApi();
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setDescription(e.target.value);
  };

  const categories = ['여행', '재테크', '노후', '교육', '취미']; // TRAVEL, HOBBY, INVESTMENT, AFTER_RETIREMENT, EDUCATION
  const categoryMap: { [key: string]: string } = {
    여행: 'TRAVEL',
    재테크: 'INVESTMENT',
    노후: 'AFTER_RETIREMENT',
    교육: 'EDUCATION',
    취미: 'HOBBY',
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!checkImageSize(file)) {
        return;
      }

      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
      setSelectedFile(file);
    }
  };

  const handleImageRemove = () => {
    setSelectedImage('');
    setSelectedFile(null);
  };

  const handleSubmit = async () => {
    try {
      if (!selectedFile) return;

      const encodedUrls = await uploadImages([selectedFile]);

      await createGroup(
        name,
        categoryMap[selectedCategory],
        description,
        encodedUrls[0]
      );

      router.push('/community/main/mygroup');
    } catch (error) {
      console.error('그룹 생성 실패:', error);
    }
  };

  return (
    <div className='flex flex-col gap-[20px] w-full'>
      <Header text='꿈모임 만들기' showActionButton={false} />
      <div className='flex flex-col gap-[20px] w-full px-[20px]'>
        <div className='flex flex-col gap-[7px]'>
          <p className='text-[18px] font-bold'>
            생성할 꿈모임의 이름을 입력해주세요.
          </p>
          <DefaultInputRef
            placeHolder='꿈모임 이름을 입력해주세요.'
            value={name}
            onChange={handleNameChange}
          />
        </div>

        <div className='flex flex-col gap-[7px] w-full'>
          <p className='text-[18px] font-bold'>
            꿈모임의 카테고리를 설정해주세요.
          </p>
          <div className='flex gap-[10px] flex-wrap'>
            {selectedCategory && (
              <Tag
                onClick={() => handleCategoryChange(selectedCategory)}
                isSelected={true}
              >
                {selectedCategory}
              </Tag>
            )}
            {categories
              .filter((category) => category !== selectedCategory)
              .map((category) => (
                <Tag
                  key={category}
                  onClick={() => handleCategoryChange(category)}
                  isSelected={false}
                >
                  {category}
                </Tag>
              ))}
          </div>
        </div>

        <div className='flex flex-col gap-[7px]'>
          <p className='text-[18px] font-bold'>
            꿈모임 대표 사진을 선택해주세요
          </p>
          {selectedImage ? (
            <ShowSelectedImage
              imageUrl={selectedImage}
              onRemove={handleImageRemove}
            />
          ) : (
            <ImageInputRef onChange={handleImageSelect} />
          )}
        </div>

        <div>
          <p>꿈모임 설명을 입력해주세요.</p>
          <TextArea
            type='dream'
            value={description}
            onChange={handleDescriptionChange}
          />
        </div>

        <Button
          className='w-full'
          isDisabled={
            name === '' ||
            selectedImage === '' ||
            description === '' ||
            selectedCategory === ''
          }
          onClick={handleSubmit}
        >
          완료
        </Button>
      </div>
    </div>
  );
}
