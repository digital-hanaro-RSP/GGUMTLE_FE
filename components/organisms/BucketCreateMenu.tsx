import useCreateBucketStore from '@/contexts/useCreateBucketStore';
import { IoIosArrowDown } from 'react-icons/io';
import { useRef } from 'react';
import { cn } from '@/lib/utils';
import { DefaultInputRef } from '../atoms/Inputs';
import {
  DropCard,
  DropCardItem,
  DropCardItemList,
  DropDownTrigger,
} from '../molecules/DropCard';

export const CreateBucketTitle = () => {
  const { tagType, setTagType, setTitle } = useCreateBucketStore();
  const bucketTitleRef = useRef<HTMLInputElement>(null);
  const categories = new Map([
    ['Default', '버킷리스트 타입을 선택해주세요.'],
    ['want', '해보고 싶다'],
    ['become', '되고 싶다'],
    ['have', '갖고 싶다'],
    ['visit', '가보고 싶다'],
    ['learn', '배우고 싶다'],
  ]);
  const bgColor = (type: string) => {
    switch (type) {
      case 'want':
        return '#FFF89F';
      case 'become':
        return '#CDF5D8';
      case 'have':
        return '#CDF7F7';
      case 'visit':
        return '#F5CFF6';
      case 'learn':
        return '#F3D0CE';
      default:
        return '#FFF';
    }
  };
  const onTitleChange = () => {
    setTitle(bucketTitleRef.current?.value ?? '');
  };
  return (
    <div className='flex flex-col gap-2'>
      <h1 className='text-xl font-bold'>버킷리스트가 무엇인가요?</h1>
      <DefaultInputRef
        placeHolder='버킷리스트를 입력해주세요.'
        ref={bucketTitleRef}
        required
        onChange={onTitleChange}
      />
      <DropCard className='flex flex-col justify-center relative'>
        <DropDownTrigger>
          <div
            className={cn(
              'bg-white text-[#9CA3AF] btn-lg py-3 px-4 font-normal text-left rounded-xl text-[16px] w-full border flex flex-row justify-between items-center'
            )}
          >
            <p>{categories.get(tagType)}</p>
            <IoIosArrowDown className={cn('-rotate-90')} />
            <div
              className={cn(
                'border px-3 absolute right-10 rounded-md top-2 h-2/3'
              )}
              style={{ backgroundColor: bgColor(tagType) }}
            ></div>
          </div>
        </DropDownTrigger>
        <DropCardItemList
          isBlur={true}
          direction='down'
          className='items-center gap-2 top-[52px]'
        >
          {Array.from(categories)
            .filter(([key]) => key !== 'default')
            .map(([key, value]) => (
              <DropCardItem key={key} onClick={() => setTagType(key)}>
                <div
                  className={cn(
                    'bg-white text-black btn-lg py-3 px-4 text-left rounded-xl text-[15px] w-full relative'
                  )}
                >
                  {value}
                  <div
                    className={cn(
                      'border px-3 absolute right-10 rounded-md top-2 h-2/3'
                    )}
                    style={{ backgroundColor: bgColor(key) }}
                  ></div>
                </div>
              </DropCardItem>
            ))}
        </DropCardItemList>
      </DropCard>
    </div>
  );
};
