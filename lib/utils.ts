import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatNumberWithCommas = (inputValue: string): string => {
  if (!inputValue) return '';
  const numericValue = inputValue.replace(/[^0-9]/g, '');
  const parsedValue = numericValue ? parseInt(numericValue, 10) : 0;
  return new Intl.NumberFormat('ko-KR').format(parsedValue);
};
