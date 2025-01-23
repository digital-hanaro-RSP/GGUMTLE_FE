import { CurrentPortfolio, GoalPortfolio } from './Portfolio';

/* eslint-disable @typescript-eslint/no-explicit-any */
export type UserBriefInfo = {
  name: string;
  profileImage: string;
  nickname: string;
};

export type Snapshot = {
  bucketLists: any[]; // bucketLists의 구체적 타입을 알 수 없으므로 any[]
  goalPortfolio: GoalPortfolio;
  currentPortfolio: CurrentPortfolio;
};

export type Post = {
  id: number;
  groupId: number;
  snapShot: Snapshot;
  imageUrls: string[];
  content: string;
  createdAt: string;
  updatedAt: string;
  postType: 'POST' | 'NEWS';
  likeCount: number;
  commentCount: number;
  userBriefInfo: UserBriefInfo;
  liked: boolean;
  mine: boolean;
};

// api 응답용
export type PostResponse = {
  id: number;
  groupId: number;
  snapShot: string;
  imageUrls: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  postType: 'POST' | 'NEWS';
  likeCount: number;
  commentCount: number;
  userBriefInfo: UserBriefInfo;
  liked: boolean;
  mine: boolean;
};

export type Comment = {
  id: number;
  postId: number;
  content: string;
  createdAt: string;
  updatedAt: string;
  liked: boolean;
  userBriefInfo: UserBriefInfo;
  likeCount: number;
  mine: boolean;
};

export type CommentResponse = {
  data: Comment[];
};

export type Group = {
  id: number;
  name: string;
  category: string;
  description: string;
  imageUrl: string;
  memberCount: number;
  createdAt: string;
  updatedAt: string;
};

export type Image = {
  name: string;
  size: number;
};
