import { AdsResponse } from '@/types/Ads';
import { useCallback, useMemo } from 'react';
import { useApi } from '../useApi';

export const useAdsApi = () => {
  const { fetchApi } = useApi();

  const memoizedFetchApi = useMemo(() => fetchApi, [fetchApi]);

  const getAds = useCallback(async () => {
    // 제네릭 제거
    const response = await memoizedFetchApi('/ads/main', { method: 'GET' });
    return response.data as AdsResponse['data']; // 타입 단언 사용
  }, [memoizedFetchApi]);

  return {
    getAds,
  };
};
