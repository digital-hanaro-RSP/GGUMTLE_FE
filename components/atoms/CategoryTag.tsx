import Image from 'next/image';
import { PropsWithChildren } from 'react';

type TagProps = PropsWithChildren & {
  content: string;
  isSelected?: boolean;
  onClick?: () => void;
  isContentShow?: boolean;
};

export default function CategoryTag({
  content,
  isSelected,
  onClick,
  isContentShow = true,
}: TagProps) {
  const getIconPath = () => {
    switch (content) {
      case '전체':
        return '/image/icons/Whole2.png';
      case '여행':
        return '/image/icons/Airplane.png';
      case '재테크':
        return '/image/icons/Up.png';
      case '노후':
        return '/image/icons/Retire.png';
      case '교육':
        return '/image/icons/Educate.png';
      case '취미':
        return '/image/icons/Car.png';
      default:
        return '/image/icons/Whole.png';
    }
  };

  return (
    <div
      className={`flex flex-col items-center gap-[4px] justify-center font-semibold cursor-pointer transition-colors duration-300 h-[90px] ${
        isSelected ? 'text-primary-main text-[18px]' : 'text-black'
      }`}
      onClick={onClick}
    >
      <div
        className={`w-[50px] h-[50px] p-[10px] rounded-[18px]  flex items-center justify-center transition-all duration-300 ${
          isSelected ? 'bg-primary-main/70 w-[60px] h-[60px]' : 'bg-[#ededed]'
        }`}
      >
        <Image
          src={getIconPath()}
          alt={content}
          width={isSelected ? 50 : 40}
          height={isSelected ? 50 : 40}
        />
      </div>
      {isContentShow && <p>{content}</p>}
    </div>
  );
}
