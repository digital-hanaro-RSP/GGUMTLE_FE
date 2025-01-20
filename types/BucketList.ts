export type bucketListStatus = {
  status: 'DOING' | 'DONE' | 'HOLD';
};

export type getAllBucketListRes = {
  id: number;
  title: string;
  tagType: 'DO' | 'GO' | 'HAVE' | 'BE' | 'LEARN' | 'DEFAULT';
  dueDate: Date;
  howTo: 'MONEY' | 'EFFORT' | 'WILL';
  isDueSet: boolean;
  isAutoAllocate: boolean;
  allocateAmount?: number;
  cronCycle?: string;
  goalAmount: number;
  memo: string;
  status: 'DOING' | 'DONE' | 'HOLD';
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
  title: string;
  tagType: 'DO' | 'GO' | 'HAVE' | 'BE' | 'LEARN';
  isDueSet: boolean;
  dueDate: Date;
  howTo: 'MONEY' | 'EFFORT' | 'WILL';
  isAutoAllocate: boolean;
  allocateAmount?: number;
  cronCycle?: string;
  goalAmount: number;
  memo: string;
};

