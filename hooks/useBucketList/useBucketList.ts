import { completeBucketList } from '@/types/BucketList';
import { useApi } from '../useApi';

export const useBucketListApi = () => {
  const { fetchApi } = useApi();
  /** 버킷리스트 완료하는 hook 추후 status 변경 hook으로 바뀔 예정 */
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
