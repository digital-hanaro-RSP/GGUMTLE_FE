/* eslint-disable @typescript-eslint/no-explicit-any */
export type Author = {
  name: string;
  profileImage: string;
};

export type Snapshot = {
  bucketLists: any[]; // bucketLists의 구체적 타입을 알 수 없으므로 any[]
  portfolioLists: any[]; // portfolioLists의 구체적 타입을 알 수 없으므로 any[]
};

export type Post = {
  id: number;
  userId: string;
  groupId: string;
  snapshot: Snapshot;
  imageUrls: any; // imageUrls의 구조가 명확하지 않으므로 any
  content: string;
  createdAt: string;
  updatedAt: string;
  postType: string; // 고정된 문자열("post")로 보이나, 다른 값도 있을 수 있으므로 string
  likeCount: number;
  commentCount: number;
  author: Author;
  isLiked: boolean;
};

// api 응답용
export type PostResponse = {
  data: Post[];
};

export type Comment = {
  id: number;
  postId: number;
  userId: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  isLiked: boolean;
  author: Author;
  likeCount: number;
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
};
