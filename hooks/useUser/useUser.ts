import { useCallback } from 'react';
import { useApi } from '../useApi';

interface UserResponse {
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

interface UpdateUserRequest {
  password?: string;
  profileImageUrl?: string;
  nickname?: string;
}

interface ApiResponse {
  code: number;
  message: string;
  data: UserResponse;
}

export const useUserApi = () => {
  const { fetchApi } = useApi();

  const getUserInfo = useCallback(async (): Promise<UserResponse> => {
    const response = (await fetchApi('/user', {
      method: 'GET',
    })) as ApiResponse;
    return response.data;
  }, [fetchApi]);

  const updateUserInfo = useCallback(
    async (data: UpdateUserRequest): Promise<UserResponse> => {
      const response = (await fetchApi('/user', {
        method: 'PATCH',
        body: JSON.stringify(data),
      })) as ApiResponse;
      return response.data;
    },
    [fetchApi]
  );

  return {
    getUserInfo,
    updateUserInfo,
  };
};
