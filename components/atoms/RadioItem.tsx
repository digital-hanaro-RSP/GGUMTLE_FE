import { InputHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

/** Radio Input Props */
export interface RadioItemProps extends InputHTMLAttributes<HTMLInputElement> {
  contentDirection: 'vertical' | 'horizontal';
  shape: 'box' | 'circle';
}

/** Radio Input 아이템입니다.
 * default는 circle이고 box 선택시 텍스트를 감싸는 버튼형으로 변경됩니다.
 * contentDirection을 통해 수직, 수평 설정 가능
 * radioGroup을 통해 group을 구분지어주세요.
 * fieldset으로 item들을 묶어 사용하면 좋을거 같네요.
 */
export const RadioItem = ({
  contentDirection,
  className,
  shape = 'circle',
  id,
  name,
  value,
  children,
  ...props
}: RadioItemProps) => {
  return (
    <>
      <label
        htmlFor={id}
        className={cn(
          className,
          'flex custom-radio transition-all duration-500 ease-in-out p-2',
          contentDirection === 'vertical' && 'flex-col',
          contentDirection === 'horizontal' && 'flex-row',
          { ...props },
          shape === 'box' && 'box-radio'
        )}
      >
        <input
          type='radio'
          id={id}
          name={name}
          value={value}
          className='peer hidden'
        />

        {shape === 'circle' && (
          <>
            <span className='radio-circle transition-all duration-500 ease-in-out after:transition-all after:duration-500 after:ease-in-out'></span>
          </>
        )}
        {children}
      </label>
    </>
  );
};
