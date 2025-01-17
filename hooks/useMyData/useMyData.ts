import { useCallback } from 'react';
import { useApi } from '../useApi';

interface MyDataPermissionResponse {
  id: string;
  tel: string;
  name: string;
  permission: number;
  birthDate: string;
  gender: string;
  role: string;
  profileImageUrl: string | null;
  nickname: string;
}

export const useMyDataApi = () => {
  const { fetchApi } = useApi();

  const updatePermission =
    useCallback(async (): Promise<MyDataPermissionResponse> => {
      const response = await fetchApi('/mydata/permission', {
        method: 'PATCH',
      });
      return response.data;
    }, [fetchApi]);

  return {
    updatePermission,
  };
};
