export type bucketListStatus = 'DOING' | 'DONE' | 'HOLD';
export type bucketListTagType = 'DO' | 'GO' | 'HAVE' | 'BE' | 'LEARN';
export type bucketListHowTo = 'MONEY' | 'EFFORT' | 'WILL';

export type RecommendationType = {
  id: number;
  title: string;
  followers: number;
};

export type RecommendBucketListType = {
  tagType: bucketListTagType | undefined;
  recommendations: RecommendationType[];
};

export type getAllBucketListRes = {
  id: number;
  title: string;
  tagType: bucketListTagType;
  dueDate: Date;
  howTo: bucketListHowTo;
  isDueSet: boolean;
  isAutoAllocate: boolean;
  allocateAmount?: number;
  cronCycle?: string;
  goalAmount: number;
  memo: string;
  status: bucketListStatus;
  isRecommended: boolean;
  originId?: number;
  safeBox?: number;
  followers?: number;
  userId: string;
  dreamAccountId: number;
  recommendations: boolean | null;
  createdAt: Date;
};

export type getBucketListbyIdRes = {
  id: number;
  title: string;
  tagType: bucketListTagType;
  dueDate: Date;
  howTo: bucketListHowTo;
  isDueSet: boolean;
  isAutoAllocate: boolean;
  allocateAmount?: number;
  cronCycle?: string;
  goalAmount: number;
  memo: string;
  status: bucketListStatus;
  isRecommended: boolean;
  originId?: number;
  safeBox?: number;
  followers?: number;
  userId: string;
  dreamAccountId: number;
  recommendations: boolean | null;
  createdAt: Date;
};

export type createBucketListReq = {
  title?: string;
  tagType?: bucketListTagType;
  isDueSet?: boolean;
  dueDate?: string;
  howTo?: bucketListHowTo;
  isAutoAllocate?: boolean;
  allocateAmount?: number;
  cronCycle?: string;
  goalAmount?: number;
  memo?: string;
  status?: bucketListStatus;
  isRecommended?: boolean;
  originId?: number;
  followers?: number;
  safeBox?: number;
};

export type changeBucketListStatusReq = {
  status: bucketListStatus;
};
