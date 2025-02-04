import { useApi } from '@/hooks/useApi';
import { GroupAd } from '@/types/Ads';
import {
  Comment,
  Group,
  Image,
  IsMember,
  PostResponse,
} from '@/types/Community';
import { encodeImageUrl } from '@/lib/utils';

export const useCommunityApi = () => {
  const { fetchApi } = useApi();

  const getPosts = async (
    groupId: number,
    offset: number,
    limit: number
  ): Promise<PostResponse[]> => {
    const response = await fetchApi(
      `/community/group/${groupId}/post?offset=${offset}&limit=${limit}`
    );
    return response.data.content;
  };

  const getPost = async (
    groupId: number,
    postId: number
  ): Promise<PostResponse> => {
    const response = await fetchApi(
      `/community/group/${groupId}/post/${postId}`
    );

    return response.data;
  };

  const editPost = async (
    groupId: number,
    postId: number,
    imageUrls: string,
    content: string,
    snapShot: string
  ): Promise<void> => {
    const options: RequestInit = {
      method: 'PATCH',
      body: JSON.stringify({
        imageUrls,
        content,
        snapShot,
      }),
    };

    await fetchApi(`/community/group/${groupId}/post/${postId}`, options);
  };

  const deletePost = async (groupId: number, postId: number): Promise<void> => {
    const options: RequestInit = {
      method: 'DELETE',
    };
    await fetchApi(`/community/group/${groupId}/post/${postId}`, options);
  };

  const getPopularPosts = async (
    limit: number,
    offset: number,
    category: string,
    search: string
  ): Promise<PostResponse[]> => {
    const response = await fetchApi(
      `/community/post/popular?${category !== '' ? `category=${category}&` : ''}${search !== '' ? `search=${search}&` : ''}offset=${offset}&limit=${limit}`
    );
    return response.data.content;
  };

  const getComments = async (
    limit: number,
    offset: number,
    postId: number
  ): Promise<Comment[]> => {
    const response = await fetchApi(
      `/community/post/${postId}/comments?offset=${offset}&limit=${limit}`
    );
    return response.data.content;
  };

  const createComment = async (
    postId: number,
    content: string
  ): Promise<void> => {
    const options: RequestInit = {
      method: 'POST',
      body: JSON.stringify({
        content,
      }),
    };
    await fetchApi(`/community/post/${postId}/comment`, options);
  };

  const delelteComment = async (commentId: number): Promise<void> => {
    const options: RequestInit = {
      method: 'DELETE',
    };

    await fetchApi(`/community/comment/${commentId}`, options);
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
  const plusCommentLike = async (commentId: number): Promise<void> => {
    const options: RequestInit = {
      method: 'POST',
    };
    await fetchApi(`/community/comment/${commentId}/like`, options);
  };

  // 리턴 타입으로 200만 받음
  const minusCommentLike = async (commentId: number): Promise<void> => {
    const options: RequestInit = {
      method: 'DELETE',
    };
    await fetchApi(`/community/comment/${commentId}/dislike`, options);
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

  const isMember = async (groupId: number): Promise<IsMember> => {
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

  const getAdvertisement = async (groupId: number): Promise<GroupAd> => {
    const res = await fetchApi(`/community/group/${groupId}/advertisement`);
    return res.data;
  };

  return {
    getPosts,
    getPost,
    editPost,
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
    createComment,
    delelteComment,
    getAdvertisement,
  };
};
