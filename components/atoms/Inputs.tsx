import { TiDelete } from 'react-icons/ti';
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
          <span className='peer-invalid:block hidden text-errorRed'>
            <small>{error}</small>
          </span>
        )}
      </div>
    </>
  );
}
const DefaultInputRef = forwardRef(DefaultInput);

export { DefaultInputRef };
