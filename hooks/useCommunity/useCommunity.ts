import { useApi } from '@/hooks/useApi';
import { PostResponse } from '@/types/Community';

export const useCommunityApi = () => {
  const { fetchApi } = useApi();

  const getPosts = async (groupId: number): Promise<PostResponse> => {
    const response = await fetchApi(`/community/group/${groupId}/post`);
    return response;
  };

  return { getPosts };
};
