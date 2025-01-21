import { useApi } from '@/hooks/useApi';
import { CommentResponse, Group, Post, PostResponse } from '@/types/Community';

export const useCommunityApi = () => {
  const { fetchApi } = useApi();

  // offset으로 수정해야할듯
  const getPosts = async (groupId: number, page?: number): Promise<Post[]> => {
    const response = await fetchApi(
      `/community/group/${groupId}/post${page ? '?page=' + page : ''}`
    );
    return response.data;
  };

  const getPost = async (groupId: number, postId: number): Promise<Post> => {
    const response = await fetchApi(
      `/community/group/${groupId}/post/${postId}`
    );

    return response.data;
  };

  const deletePost = async (groupId: number, postId: number): Promise<void> => {
    const options: RequestInit = {
      method: 'DELETE',
    };
    await fetchApi(`/community/group/${groupId}/post/${postId}`, options);
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
  const createGroup = async (
    name: string,
    category: string,
    description: string,
    imageUrl: string
  ): Promise<Group> => {
    const options: RequestInit = {
      method: 'POST',
      body: JSON.stringify({
        name,
        category,
        description,
        imageUrl,
      }),
    };
    const response = await fetchApi(`/community/group`, options);
    return response;
  };

  const getGroups = async (
    limit: number,
    offset: number,
    category: string,
    search: string
  ): Promise<Group[]> => {
    const response = await fetchApi(
      `/community/group?${category !== '' ? `category=${category}&` : ''}${search !== '' ? `search=${search}&` : ''}${`limit=${limit}&`}${`offset=${offset}`}`
    );

    return response.data.content;
  };

  const getMyGroups = async (
    limit: number,
    offset: number,
    category: string,
    search: string
  ): Promise<Group[]> => {
    const response = await fetchApi(
      `/community/group/my-group?${category !== '' ? `category=${category}&` : ''}${search !== '' ? `search=${search}&` : ''}${`limit=${limit}&`}${`offset=${offset}`}`
    );
    return response.data.content;
  };

  const joinGroup = async (groupId: number) => {
    const options: RequestInit = {
      method: 'POST',
      body: JSON.stringify({
        groupId,
      }),
    };
    const response = await fetchApi(
      `/community/group/${groupId}/member`,
      options
    );
    return response;
  };

  const leaveGroup = async (groupId: number) => {
    const options: RequestInit = {
      method: 'DELETE',
    };
    const response = await fetchApi(
      `/community/group/${groupId}/member`,
      options
    );
    return response;
  };

  const createPost = async (
    groupId: number,
    imageUrls: string,
    content: string,
    snapShot: string
  ) => {
    const options: RequestInit = {
      method: 'POST',
      body: JSON.stringify({
        imageUrls,
        content,
        snapShot,
      }),
    };
    const response = await fetchApi(
      `/community/group/${groupId}/post`,
      options
    );
    return response;
  };

  const isMember = async (groupId: number): Promise<boolean> => {
    const response = await fetchApi(
      `/community/groupMember/${groupId}/membership`
    );
    return response.data;
  };

  return {
    getPosts,
    getPost,
    deletePost,
    getComments,
    plusLike,
    minusLike,
    plusCommentLike,
    minusCommentLike,
    getPopularPosts,
    createGroup,
    getGroups,
    getMyGroups,
    joinGroup,
    leaveGroup,
    createPost,
    isMember,
  };
};
