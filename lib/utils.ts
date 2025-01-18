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
export const getRelativeTimeString = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInMilliseconds = now.getTime() - date.getTime();
  const diffInMinutes = Math.floor(diffInMilliseconds / (1000 * 60));
  const diffInHours = Math.floor(diffInMilliseconds / (1000 * 60 * 60));
  const diffInDays = Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24));

  if (diffInMinutes < 60) {
    return `${diffInMinutes}분 전`;
  } else if (diffInHours < 24) {
    return `${diffInHours}시간 전`;
  } else if (diffInDays < 7) {
    return `${diffInDays}일 전`;
  } else {
    // 7일 이상이면 년-월-일 형식으로 표시
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }
};

export const convertCategoryToCode = (category: string): string => {
  const categoryMap: { [key: string]: string } = {
    여행: 'TRAVEL',
    재테크: 'INVESTMENT',
    노후: 'AFTER_RETIREMENT',
    교육: 'EDUCATION',
    취미: 'HOBBY',
  };

  if (category === '전체') return '';
  return categoryMap[category] || '';
};

export const convertCodeToCategory = (code: string): string => {
  const reverseCategoryMap: { [key: string]: string } = {
    TRAVEL: '여행',
    INVESTMENT: '재테크',
    AFTER_RETIREMENT: '노후',
    EDUCATION: '교육',
    HOBBY: '취미',
  };

  if (!code) return '전체';
  return reverseCategoryMap[code] || '전체';
};
