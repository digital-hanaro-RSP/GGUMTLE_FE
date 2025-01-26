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

interface DeleteResponse {
  code: number;
  message: string;
  data: null;
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

  const deleteUser = useCallback(async (): Promise<void> => {
    (await fetchApi('/user', {
      method: 'DELETE',
    })) as DeleteResponse;
  }, [fetchApi]);

  return {
    getUserInfo,
    updateUserInfo,
    deleteUser,
  };
};
