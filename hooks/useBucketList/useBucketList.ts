import {
  bucketListTagType,
  changeBucketListStatusReq,
  createBucketListReq,
} from '@/types/BucketList';
import { useApi } from '../useApi';

export const useBucketListApi = () => {
  const { fetchApi } = useApi();

  /** bucketlist status 변환 hook */
  const changeBucketListStatus = async (
    bid: number,
    data: changeBucketListStatusReq
  ) => {
    return await fetchApi(`/buckets/${bid}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  };
  /** bucketlist 전체 조회 Hook */
  const getAllBucketList = async () => {
    return await fetchApi('/buckets', {
      method: 'GET',
    });
  };

  /** bucketlist 상세 조회 hook */
  const getBucketListbyId = async (bid: number) => {
    return await fetchApi(`/buckets/${bid}`, {
      method: 'GET',
    });
  };

  /** bucketlist 생성 hook */
  const createBucketList = async (data: createBucketListReq) => {
    return await fetchApi('/buckets', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  };

  /** bucketlist 수정 hook */
  const editBucketListbyId = async (bid: number, data: createBucketListReq) => {
    return await fetchApi(`/buckets/${bid}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  };

  /** bucketlist 삭제 hook */
  const deleteBucketListbyId = async (bid: number) => {
    return await fetchApi(`/buckets/${bid}`, {
      method: 'DELETE',
    });
  };

  /** 추천 bucketlist 받기 hook */
  const getRecommendBucklist = async (tagType?: bucketListTagType) => {
    return await fetchApi(
      `/buckets/recommendation${tagType ? `?tagType=${tagType}` : ''}`,
      {
        method: 'GET',
      }
    );
  };

  return {
    changeBucketListStatus,
    getAllBucketList,
    getBucketListbyId,
    createBucketList,
    editBucketListbyId,
    deleteBucketListbyId,
    getRecommendBucklist,
  };
};
