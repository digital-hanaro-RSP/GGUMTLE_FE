import { FaCheck } from 'react-icons/fa6';

// AgreementItem.tsx
export interface AgreementItemProps {
  title: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  subItems?: string[];
}

export const AgreementItem = ({
  title,
  checked,
  onChange,
  subItems,
}: AgreementItemProps) => {
  return (
    <div className='flex flex-col gap-2'>
      <div className='flex items-center gap-3'>
        <div onClick={() => onChange(!checked)} className='cursor-pointer'>
          <FaCheck
            className={`text-lg ${checked ? 'text-primary-main' : 'text-gray-300'}`}
          />
        </div>
        <span className='text-[#5B5B5B]'>{title}</span>
      </div>
      {subItems && subItems.length > 0 && (
        <div className='ml-8'>
          {subItems.map((item, index) => (
            <div key={index} className='text-xs text-[#B9B9B9] ml-2'>
              ⦁ {item}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
