import { useApi } from '@/hooks/useApi';
import { CommentResponse, PostResponse } from '@/types/Community';

export const useCommunityApi = () => {
  const { fetchApi } = useApi();

  const getPosts = async (groupId: number): Promise<PostResponse> => {
    const response = await fetchApi(`/community/group/${groupId}/post`);
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

  return { getPosts, getComments };
};
