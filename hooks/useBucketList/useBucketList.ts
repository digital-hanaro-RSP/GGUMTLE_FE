import {
  bucketListTagType,
  changeBucketListStatusReq,
  createBucketListReq,
  getAllBucketListRes,
  getBucketListbyIdRes,
  RecommendBucketListType,
  shareBucketlistCompleteReq,
} from '@/types/BucketList';
import { useApi } from '../useApi';

export const useBucketListApi = () => {
  const { fetchApi } = useApi();

  /** bucketlist status 변환 hook */
  const changeBucketListStatus = async (
    bid: number,
    data: changeBucketListStatusReq
  ): Promise<void> => {
    return await fetchApi(`/buckets/${bid}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  };
  /** bucketlist 전체 조회 Hook */
  const getAllBucketList = async (): Promise<getAllBucketListRes[]> => {
    const res = await fetchApi('/buckets', {
      method: 'GET',
    });
    return res.data;
  };

  /** bucketlist 상세 조회 hook */
  const getBucketListbyId = async (
    bid: number
  ): Promise<getBucketListbyIdRes> => {
    const res = await fetchApi(`/buckets/${bid}`, {
      method: 'GET',
    });
    return res.data;
  };

  /** bucketlist 생성 hook */
  const createBucketList = async (data: createBucketListReq): Promise<void> => {
    return await fetchApi('/buckets', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  };

  /** bucketlist 수정 hook */
  const editBucketListbyId = async (
    bid: number,
    data: createBucketListReq
  ): Promise<void> => {
    return await fetchApi(`/buckets/${bid}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  };

  /** bucketlist 삭제 hook */
  const deleteBucketListbyId = async (bid: number): Promise<void> => {
    return await fetchApi(`/buckets/${bid}`, {
      method: 'DELETE',
    });
  };

  /** 추천 bucketlist 받기 hook */
  const getRecommendBucklist = async (
    tagType?: bucketListTagType
  ): Promise<RecommendBucketListType[]> => {
    const res = await fetchApi(
      `/buckets/recommendation${tagType ? `?tagType=${tagType}` : ''}`,
      {
        method: 'GET',
      }
    );
    return res.data;
  };

  /** bucketlist 완료 공유 */
  const shareBucketlistComplete = async (
    gid: number,
    data: shareBucketlistCompleteReq
  ) => {
    return await fetchApi(`/community/group/${gid}/post/share`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  };

  return {
    changeBucketListStatus,
    getAllBucketList,
    getBucketListbyId,
    createBucketList,
    editBucketListbyId,
    deleteBucketListbyId,
    getRecommendBucklist,
    shareBucketlistComplete,
  };
};
