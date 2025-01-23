import { PortfolioResponse } from '@/types/Portfolio';
import { useCallback } from 'react';
import { useApi } from '../useApi';

interface ApiResponse {
  code: number;
  error: null | string;
  message: string;
  data: PortfolioResponse;
}

export const usePortfolioApi = () => {
  const { fetchApi } = useApi();

  const getPortfolio = useCallback(async (): Promise<PortfolioResponse> => {
    const response = (await fetchApi('/portfolio', {
      method: 'GET',
    })) as ApiResponse;
    return response.data;
  }, [fetchApi]); // fetchApi를 의존성 배열에 포함

  return { getPortfolio };
};
