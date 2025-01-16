'use client';

import { IoSearch } from 'react-icons/io5';
import { TiDelete } from 'react-icons/ti';
import Image from 'next/image';
import {
  ChangeEvent,
  ForwardedRef,
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { cn } from '@/lib/utils';

type baseInputTypeProps = {
  placeHolder?: string;
  className?: string;
  // type?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

/** ------------------------------------------ */

type DefaultInputProps = baseInputTypeProps & {
  name?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  required?: boolean;
  error?: string;
};

function DefaultInput(
  {
    name,
    type,
    onChange,
    className,
    // value,
    placeHolder,
    required,
    error,
    ...props
  }: DefaultInputProps,
  forwardedRef: ForwardedRef<HTMLInputElement>
) {
  const [isTouched, setIsTouched] = useState(false);
  const ref = useRef<HTMLInputElement>(null);
  useImperativeHandle(forwardedRef, () => ref.current as HTMLInputElement);

  /** 입력 초기화 버튼 핸들러 */
  const handleClear = () => {
    if (ref.current) {
      ref.current.value = '';
    }
    // 부모 컴포넌트에 변경 사항 알리기
    if (onChange) {
      const event = {
        target: { value: '', name: name },
      } as React.ChangeEvent<HTMLInputElement>;
      onChange(event);
    }
  };

  /** 사용자 입력 감지 핸들러 */
  const handleBlur = () => {
    setIsTouched(true);
  };

  return (
    <>
      <div className='input-box'>
        <input
          // value={inputValue}
          name={name}
          type={type}
          className={cn(
            { className },
            'peer border border-placeholderGray px-4 rounded-xl h-11 focus:border-hanaPrimary focus:text-hanaPrimary',
            isTouched && 'invalid:border-errorRed invalid:text-errorRed '
          )}
          placeholder={placeHolder}
          onChange={onChange}
          onBlur={handleBlur}
          required={required}
          ref={ref}
          {...props}
        />
        {ref?.current?.value && (
          <div className='absolute h-11 w-fit right-0 flex'>
            <a
              onClick={handleClear}
              className='absolute right-4 top-1/2 transform -translate-y-1/2 focus:outline-none cursor-pointer'
            >
              <TiDelete size={20} />
            </a>
          </div>
        )}
        {isTouched && (
          <span className='peer-invalid:block hidden text-primary-error'>
            <small>{error}</small>
          </span>
        )}
      </div>
    </>
  );
}
const DefaultInputRef = forwardRef(DefaultInput);

/** ------------------------------------------ */
type MoneyInputProps = {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: () => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  placeHolder?: string;
  disable?: boolean;
};

const MoneyInputRef = forwardRef<HTMLInputElement, MoneyInputProps>(
  ({ onChange, onFocus, onBlur, placeHolder, disable }, ref) => {
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      const inputValue = e.target.value.replace(/[^\d]/g, '');
      const numericValue = parseInt(inputValue, 10);

      if (!isNaN(numericValue) && numericValue <= Number.MAX_SAFE_INTEGER) {
        const formattedValue = new Intl.NumberFormat('ko-KR').format(
          numericValue
        );
        if (ref && 'current' in ref && ref.current) {
          ref.current.value = formattedValue;
        }
      } else {
        if (ref && 'current' in ref && ref.current) {
          ref.current.value = ref.current.value.slice(0, -1);
        }
      }
      onChange(e);
    };

    return (
      <div className='flex items-center w-full text-2xl text-primary-main border rounded-[10px] bg-white overflow-hidden px-[20px]'>
        <input
          disabled={disable}
          type='text'
          ref={ref}
          onChange={handleChange}
          onFocus={onFocus}
          onBlur={onBlur}
          placeholder={placeHolder}
          max={Number.MAX_VALUE}
          className='flex w-full text-2xl font-semibold py-1 border-none text-right placeholder:text-primary-placeholder focus:outline-none'
        />
        <span className='ml-1'>원</span>
      </div>
    );
  }
);

MoneyInputRef.displayName = 'MoneyInputRef';

/** ------------------------------------------ */
type SearchInputProps = baseInputTypeProps & {
  name?: string;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  value?: string;
};

/**onSubmit에 따라 검색을 진행합니다. */
function SearchInput(
  { name, placeHolder, className, onSubmit, ...props }: SearchInputProps,
  ref: ForwardedRef<HTMLInputElement>
) {
  const SearchHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(e);
    console.log('button click');
  };

  return (
    <>
      <form onSubmit={SearchHandler} className='input-box'>
        <input
          className={cn(
            'border border-hanaPrimary px-4 rounded-xl h-11 text-hanaPrimary bg-white bg-opacity-30 backdrop-blur-3xl ',

            className
          )}
          name={name}
          placeholder={placeHolder}
          ref={ref}
          {...props}
        />
        <div className='absolute h-11 w-fit right-0 flex z-100'>
          <button
            type='submit'
            className='absolute right-4 top-1/2 transform -translate-y-1/2 focus:outline-none cursor-pointer'
          >
            <IoSearch size={20} />
          </button>
        </div>
      </form>
    </>
  );
}
const SearchInpuRef = forwardRef(SearchInput);

/** ------------------------------------------ */
type ImageInputProps = {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  imageUrl?: string;
  width?: number;
  height?: number;
  className?: string;
};

function ImageInput(
  { onChange, width = 100, height = 100, className }: ImageInputProps,
  ref: ForwardedRef<HTMLInputElement>
) {
  return (
    <label
      className={cn(
        `w-[${width}px] h-[${height}px]`,
        'flex flex-col items-center justify-center border-2 border-dashed border-primary-placeholder rounded-[10px] cursor-pointer md:w-[140px] md:h-[140px]',
        className
      )}
    >
      <input
        type='file'
        accept='image/*'
        onChange={onChange}
        className='hidden'
        ref={ref}
      />
      <Image
        src={'/image/icons/Image.png'}
        alt='image'
        width={60}
        height={60}
      />
      <p className='text-[14px] font-medium text-primary-placeholder'>
        이미지 추가
      </p>
    </label>
  );
}

const ImageInputRef = forwardRef(ImageInput);
ImageInputRef.displayName = 'ImageInputRef';

export { DefaultInputRef, MoneyInputRef, SearchInpuRef, ImageInputRef };
