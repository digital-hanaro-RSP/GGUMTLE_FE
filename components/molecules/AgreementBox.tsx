import { useEffect, useState } from 'react';
import { AgreementItem } from '../atoms/AgreementItem';
import CheckBox from '../atoms/CheckBox';

export interface AgreementBoxProps {
  title?: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  isOpen: boolean;
}

export const AgreementBox = ({
  title = '전체 동의',
  checked,
  onChange,
  isOpen,
}: AgreementBoxProps) => {
  const [agreements, setAgreements] = useState({
    service: false,
    privacy: false,
    credit: false,
  });

  useEffect(() => {
    if (!isOpen) {
      setAgreements({
        service: false,
        privacy: false,
        credit: false,
      });
      onChange(false);
    }
  }, [isOpen, onChange]);

  const handleAllCheck = (isChecked: boolean) => {
    setAgreements({
      service: isChecked,
      privacy: isChecked,
      credit: isChecked,
    });
    onChange(isChecked);
  };

  const checkAllAgreements = (newAgreements: typeof agreements) => {
    const allChecked = Object.values(newAgreements).every((value) => value);
    onChange(allChecked);
  };

  const handleItemCheck = (key: keyof typeof agreements, checked: boolean) => {
    const newAgreements = {
      ...agreements,
      [key]: checked,
    };
    setAgreements(newAgreements);
    checkAllAgreements(newAgreements);
  };

  return (
    <div className='rounded-lg border border-[#B9B9B9]'>
      <div className='p-4 border-b border-[#B9B9B9] flex items-center gap-5 text-[#5B5B5B]'>
        <CheckBox checked={checked} onChange={handleAllCheck} />
        {title}
      </div>
      <div className='p-4 flex flex-col gap-4'>
        <AgreementItem
          title='하나 합 서비스 이용 동의'
          checked={agreements.service}
          onChange={(checked) => handleItemCheck('service', checked)}
        />
        <AgreementItem
          title='개인(신용) 정보수집ㆍ이용 동의서'
          checked={agreements.privacy}
          onChange={(checked) => handleItemCheck('privacy', checked)}
        />
        <AgreementItem
          title='신용관리 이용 동의'
          checked={agreements.credit}
          onChange={(checked) => handleItemCheck('credit', checked)}
          subItems={[
            '개인(신용) 정보 수집 이용ㆍ제공 동의서',
            'KCB 신용관리 서비스 약관',
          ]}
        />
      </div>
    </div>
  );
};
