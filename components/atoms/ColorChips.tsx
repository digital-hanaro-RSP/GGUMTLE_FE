import { PropsWithChildren } from 'react';
import { cn } from '@/lib/utils';

type ColorChipProps = {
  color: keyof typeof colorMap;
  className?: string;
};

const colorMap: Record<string, { bgColor: string; textColor: string }> = {
  default: { bgColor: '', textColor: '' },
  gray: { bgColor: 'bg-bucket-gray', textColor: '#7B8894' },
  do: { bgColor: 'bg-bucket-do', textColor: '#D89B00' },
  be: { bgColor: 'bg-bucket-be', textColor: '#72B16D' },
  have: { bgColor: 'bg-bucket-have', textColor: '#4DABF7' },
  go: { bgColor: 'bg-bucket-go', textColor: '#F06595' },
  learn: { bgColor: 'bg-bucket-learn', textColor: '#FF9100' },
};

export default function ColorChip({
  children,
  color,
  className,
}: PropsWithChildren<ColorChipProps>) {
  const { bgColor, textColor } = colorMap[color];
  return (
    <div
      className={cn(
        'items-center text-center rounded-3xl px-2 py-[2px] w-fit text-[11px] font-medium',
        bgColor,
        className
      )}
      style={{ color: textColor }}
    >
      <span>{children}</span>
    </div>
  );
}
