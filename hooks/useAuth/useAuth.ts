import { SignUpData, SignUpResponse } from '@/types/Auth';
import { useApi } from '../useApi';

export const useAuthApi = () => {
  const { fetchApi } = useApi();

  const signUp = async (
    userData: SignUpData,
    image?: File
  ): Promise<SignUpResponse> => {
    if (image) {
      const formData = new FormData();
      formData.append('image', image);

      Object.entries(userData).forEach(([key, value]) => {
        formData.append(key, value);
      });

      return await fetchApi('/user', {
        method: 'POST',
        body: formData,
      });
    } else {
      return await fetchApi('/user', {
        method: 'POST',
        body: JSON.stringify(userData),
      });
    }
  };

  return {
    signUp,
  };
};
