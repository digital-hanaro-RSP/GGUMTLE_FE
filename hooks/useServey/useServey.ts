import { useCallback } from 'react';
import { useApi } from '../useApi';

interface SurveyResponse {
  id: number;
  userId: string;
  answers: number[];
  createdAt: string;
  updatedAt: string;
}

interface SurveyRequest {
  investmentType:
    | 'CONSERVATIVE'
    | 'MODERATELY_CONSERVATIVE'
    | 'BALANCED'
    | 'MODERATELY_AGGRESSIVE'
    | 'AGGRESSIVE';
}

interface ApiResponse {
  code: number;
  error: null | string;
  message: string;
  data: SurveyResponse;
}

export const useSurveyApi = () => {
  const { fetchApi } = useApi();

  const submitSurvey = useCallback(
    async (surveyData: SurveyRequest): Promise<SurveyResponse> => {
      const response = (await fetchApi('/survey', {
        method: 'POST',
        body: JSON.stringify(surveyData),
      })) as ApiResponse;
      return response.data;
    },
    [fetchApi]
  );

  return {
    submitSurvey,
  };
};
