import { completeBucketList } from '@/types/BucketList';
import { useApi } from '../useApi';

export const useBucketListApi = () => {
  const { fetchApi } = useApi();
  const completeBucketList = async (bid: number, data: completeBucketList) => {
    return await fetchApi(`/bucketlist/${bid}/complete`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  };

  return {
    completeBucketList,
  };
};
