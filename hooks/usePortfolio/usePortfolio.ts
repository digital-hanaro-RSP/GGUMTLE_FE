import {
  PortfolioResponse,
  InvestmentTypeResponse,
  PortfolioTemplatesResponse,
  ManualPortfolioResponse,
  getPortfolioRecommendationResponse,
} from '@/types/Portfolio';
import { useCallback } from 'react';
import { useApi } from '../useApi';

interface ApiResponse<T> {
  code: number;
  error: null | string;
  message: string;
  data: T;
}

export const usePortfolioApi = () => {
  const { fetchApi } = useApi();

  const getPortfolio = useCallback(async (): Promise<PortfolioResponse> => {
    const response = (await fetchApi('/portfolio', {
      method: 'GET',
    })) as ApiResponse<PortfolioResponse>;
    return response.data;
  }, [fetchApi]);

  const getInvestmentType =
    useCallback(async (): Promise<InvestmentTypeResponse> => {
      const response = (await fetchApi('/portfolio/investmentType', {
        method: 'GET',
      })) as ApiResponse<InvestmentTypeResponse>;

      if (response.code === 404) {
        throw new Error('포트폴리오를 찾을 수 없습니다.');
      }

      if (response.code === 500) {
        throw new Error('서버 오류가 발생했습니다.');
      }

      return response.data;
    }, [fetchApi]);

  const getPortfolioTemplates =
    useCallback(async (): Promise<PortfolioTemplatesResponse> => {
      const response = (await fetchApi('/portfolio/templates', {
        method: 'GET',
      })) as ApiResponse<PortfolioTemplatesResponse>;

      if (response.code !== 200) {
        throw new Error('템플릿을 가져오는 데 실패했습니다.');
      }

      return response.data;
    }, [fetchApi]);

  const setManualPortfolio = useCallback(
    async (
      customizedInvestmentType: string
    ): Promise<ManualPortfolioResponse> => {
      const response = (await fetchApi('/portfolio/recommendation', {
        method: 'PATCH',
        body: JSON.stringify({ customizedInvestmentType }),
      })) as ApiResponse<ManualPortfolioResponse>;

      if (response.code !== 200) {
        throw new Error('포트폴리오 설정에 실패했습니다.');
      }

      return response.data;
    },
    [fetchApi]
  );

  const getPortfolioRecommendation =
    useCallback(async (): Promise<getPortfolioRecommendationResponse> => {
      const response = (await fetchApi('/portfolio/recommendation', {
        method: 'GET',
      })) as ApiResponse<getPortfolioRecommendationResponse>;

      return response.data;
    }, [fetchApi]);

  return {
    getPortfolio,
    getInvestmentType,
    getPortfolioTemplates,
    setManualPortfolio,
    getPortfolioRecommendation,
  };
};
