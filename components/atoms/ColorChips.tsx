import { PropsWithChildren } from 'react';

type ColorChipProps = {
  color: keyof typeof colorMap;
};

const colorMap: Record<string, { bgColor: string; textColor: string }> = {
  gray: { bgColor: 'bg-bucket-gray', textColor: '#7B8894' },
  want: { bgColor: 'bg-bucket-want', textColor: '#D89B00' },
  become: { bgColor: 'bg-bucket-become', textColor: '#72B16D' },
  have: { bgColor: 'bg-bucket-have', textColor: '#4DABF7' },
  visit: { bgColor: 'bg-bucket-visit', textColor: '#F06595' },
  learn: { bgColor: 'bg-bucket-learn', textColor: '#FF9100' },
};

export default function ColorChip({
  children,
  color,
}: PropsWithChildren<ColorChipProps>) {
  const { bgColor, textColor } = colorMap[color];
  return (
    <div
      className={`items-center text-center rounded-3xl px-2 py-[2px] w-fit text-[11px] font-medium ${bgColor}`}
      style={{ color: textColor }}
    >
      <span>{children}</span>
    </div>
  );
}
