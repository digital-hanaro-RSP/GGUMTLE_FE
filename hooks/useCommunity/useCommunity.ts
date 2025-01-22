import { useApi } from '@/hooks/useApi';
import {
  CommentResponse,
  Group,
  Image,
  Post,
  PostResponse,
} from '@/types/Community';
import { encodeImageUrl } from '@/lib/utils';

export const useCommunityApi = () => {
  const { fetchApi } = useApi();

  // offset으로 수정해야할듯
  const getPosts = async (
    groupId: number,
    offset: number,
    limit: number
  ): Promise<Post[]> => {
    const response = await fetchApi(
      `/community/group/${groupId}/post?offset=${offset}&limit=${limit}`
    );
    return response.data.content;
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

  const imageUpload = async (images: Image[]): Promise<string[]> => {
    const options: RequestInit = {
      method: 'POST',
      body: JSON.stringify({
        images,
      }),
    };
    const response = await fetchApi(`/imageUpload/multiple`, options);

    return response.data;
  };

  const imageUploadAws = async (url: string, file: File): Promise<void> => {
    const options: RequestInit = {
      method: 'PUT',
      body: file,
      headers: {
        'Content-Type': 'application/octet-stream',
      },
    };

    await fetch(url, options);
  };

  const uploadImages = async (files: File[]): Promise<string[]> => {
    try {
      const imageInfoArray = files.map((file) => ({
        name: file.name,
        size: file.size,
      }));

      const presignedUrls = await imageUpload(imageInfoArray);

      for (let i = 0; i < files.length; i++) {
        try {
          await imageUploadAws(presignedUrls[i], files[i]);
        } catch (error) {
          console.error(`${i + 1}번째 이미지 업로드 실패:`, error);
          throw new Error(`이미지 업로드 중 오류가 발생했습니다`);
        }
      }

      const encodedUrls = imageInfoArray.map((imageInfo) =>
        encodeImageUrl(imageInfo)
      );

      return encodedUrls;
    } catch (error) {
      console.error('이미지 업로드 실패:', error);
      throw error;
    }
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
    imageUpload,
    imageUploadAws,
    uploadImages,
  };
};
