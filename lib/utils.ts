import {
  bucketListHowTo,
  bucketListStatus,
  changeBucketListStatusReq,
} from '@/types/BucketList';
import { PostResponse } from '@/types/Community';
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

export const parseIntWithoutCommas = (inputValue: string) => {
  const numericValue = inputValue.replace(/[^0-9]/g, '');
  const parsedValue = numericValue ? parseInt(numericValue, 10) : 0;
  return parsedValue;
};

export const parsePostData = (post: PostResponse) => {
  console.log('🚀 ~ parsePostData ~ post:', post);
  const parsedSnapShot =
    typeof post.snapShot === 'string'
      ? JSON.parse(post.snapShot)
      : (post.snapShot ?? null);

  const parsedImageUrls =
    typeof post.imageUrls === 'string'
      ? JSON.parse(post.imageUrls)
      : (post.imageUrls ?? null); //이 코드가 맞는지 모르겠는데 사진이 없는 post에서 JSON.parse에서 오류가 나타남.

  return {
    ...post,
    snapShot: parsedSnapShot,
    imageUrls: parsedImageUrls ?? [],
  };
};

export const encodeImageUrl = (imageInfo: { name: string; size: number }) => {
  const fileName = imageInfo.name;
  const fileNameWithoutExt = fileName.substring(0, fileName.lastIndexOf('.'));
  const fileExt = fileName.substring(fileName.lastIndexOf('.'));
  const encodedFileName = encodeURIComponent(fileNameWithoutExt);

  return `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}${encodedFileName}${fileExt}`;
};

export const checkImageSize = (
  newFile: File,
  existingFiles: File[] = []
): boolean => {
  const MAX_TOTAL_SIZE = 10 * 1024 * 1024; // 10MB
  const totalSizeSoFar = existingFiles.reduce((acc, cur) => acc + cur.size, 0);
  const newFileSize = newFile.size;

  if (totalSizeSoFar + newFileSize > MAX_TOTAL_SIZE) {
    alert('이미지는 10MB 이하로 업로드해 주세요.');
    return false;
  }
  return true;
};

export const calculatePercent = (
  howTo: 'EFFORT' | 'WILL' | 'MONEY' | undefined,
  goalAmount?: number,
  currentAmount?: number,
  goalDate?: Date,
  createdAt?: Date
): number => {
  console.log('🚀 ~ howTo:', howTo);
  if (
    howTo === 'MONEY' &&
    goalAmount !== undefined &&
    currentAmount !== undefined
  ) {
    return Math.min((100 * currentAmount) / goalAmount, 100);
  } else if (createdAt) {
    const now = new Date().getTime();
    const start = createdAt.getTime();
    const goal = goalDate?.getTime() ?? 0;

    const elapsed = Math.max(now - start, 0);
    const totalDuration = goal - start;
    return Math.min(Math.max((100 * elapsed) / totalDuration, 0), 100);
  }
  throw new Error(
    "Invalid parameters or missing 'createdAt' for non-MONEY types."
  );
};

export const dDayCalculator = (targetDate: Date | undefined): string => {
  const today: Date = new Date();
  if (targetDate) {
    const diffInMilliseconds: number = targetDate.getTime() - today.getTime();
    const diffInDays: number = Math.ceil(
      diffInMilliseconds / (1000 * 60 * 60 * 24)
    );
    return diffInDays > 0
      ? `-${diffInDays}`
      : diffInDays < 0
        ? `+${diffInDays}`
        : '-Day';
  }
  return '언젠가';
};

export const changeStatus = async (
  e:
    | React.MouseEvent<HTMLDivElement, MouseEvent>
    | React.MouseEvent<HTMLButtonElement, MouseEvent>,
  bid: number,
  Newstatus: bucketListStatus,
  howTo: bucketListHowTo,
  title: string,
  changeBucketListStatus: (
    bid: number,
    formData: changeBucketListStatusReq
  ) => Promise<void>
) => {
  e.stopPropagation();
  const formData: changeBucketListStatusReq = {
    status: Newstatus,
  };
  await changeBucketListStatus(bid, formData)
    .then(() => {
      if (Newstatus === 'DONE')
        window.location.href = `/bucket-list/complete?howto=${howTo}&title=${title}`;
      else {
        window.location.reload();
      }
    })
    .catch((err) => {
      alert(err);
    });
};
