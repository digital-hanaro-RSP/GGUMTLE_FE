import { useApi } from '@/hooks/useApi';
import { CommentResponse, PostResponse } from '@/types/Community';

export const useCommunityApi = () => {
  const { fetchApi } = useApi();

  const getPosts = async (
    groupId: number,
    category: string
  ): Promise<PostResponse> => {
    const response = await fetchApi(
      `/community/group/${groupId}/post?category=${category}`
    );
    return response;
  };

  const getPopularPosts = async (category: string): Promise<PostResponse> => {
    const response = await fetchApi(`/community/popular?category=${category}`);
    return response;
  };

  const getComments = async (
    postId: number,
    groupId: number
  ): Promise<CommentResponse> => {
    const response = await fetchApi(
      `/community/group/${groupId}/post/${postId}/comment`
    );
    return response;
  };

  // 리턴 타입으로 200만 받음
  const plusLike = async (groupId: number, postId: number): Promise<void> => {
    const options: RequestInit = {
      method: 'POST',
    };
    await fetchApi(`/community/group/${groupId}/post/${postId}/like`, options);
  };

  // 리턴 타입으로 200만 받음
  const minusLike = async (groupId: number, postId: number): Promise<void> => {
    const options: RequestInit = {
      method: 'DELETE',
    };
    await fetchApi(
      `/community/group/${groupId}/post/${postId}/dislike`,
      options
    );
  };

  // 리턴 타입으로 200만 받음
  const plusCommentLike = async (
    groupId: number,
    postId: number,
    commentId: number
  ): Promise<void> => {
    const options: RequestInit = {
      method: 'POST',
    };
    await fetchApi(
      `/community/group/${groupId}/post/${postId}/comment/${commentId}/like`,
      options
    );
  };

  // 리턴 타입으로 200만 받음
  const minusCommentLike = async (
    groupId: number,
    postId: number,
    commentId: number
  ): Promise<void> => {
    const options: RequestInit = {
      method: 'DELETE',
    };
    await fetchApi(
      `/community/group/${groupId}/post/${postId}/comment/${commentId}/dislike`,
      options
    );
  };

  return {
    getPosts,
    getComments,
    plusLike,
    minusLike,
    plusCommentLike,
    minusCommentLike,
    getPopularPosts,
  };
};
