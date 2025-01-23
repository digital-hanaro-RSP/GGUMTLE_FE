import { AdsResponse } from '@/types/Ads';
import { useCallback, useMemo } from 'react';
import { useApi } from '../useApi';

export const useAdsApi = () => {
  const { fetchApi } = useApi();

  // fetchApi를 메모이제이션
  const memoizedFetchApi = useMemo(() => fetchApi, [fetchApi]);

  const getAds = useCallback(async (): Promise<AdsResponse> => {
    const response = await memoizedFetchApi('/ads/main', {
      method: 'GET',
    });
    return response;
  }, [memoizedFetchApi]);

  return {
    getAds,
  };
};
