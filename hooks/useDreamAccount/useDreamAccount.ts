import { accountInfoRes, transferReq } from '@/types/Account';
import { useApi } from '../useApi';

export const useDreamAccountApi = () => {
  const { fetchApi } = useApi();
  /** 꿈 계좌 정보 불러오는 hook */
  const getAccountInfo = async (): Promise<accountInfoRes> => {
    const res = await fetchApi('/dreamAccount', {
      method: 'GET',
    });
    return res.data;
  };
  /** 꿈통장으로 돈 가져오기 */
  const receiveMoneyToDreamAccount = async (
    data: transferReq,
    dreamAccId?: number
  ): Promise<void> => {
    return await fetchApi(`/dreamAccount/${dreamAccId}/amounts`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  };

  /** 꿈통장에서 돈 보내기 */
  const sendMoneyFromDreamAccount = async (
    data: transferReq,
    dreamAccId?: number
  ): Promise<void> => {
    return await fetchApi(`/dreamAccount/${dreamAccId}/amounts`, {
      method: 'DELETE',
      body: JSON.stringify(data),
    });
  };

  /** 꿈통장에서 버킷리스트로 채우기 */
  const fillUpMoneyFromDreamAccount = async (
    data: transferReq,
    dreamAccId?: number,
    bucketId?: number
  ): Promise<void> => {
    return await fetchApi(
      `/dreamAccount/${dreamAccId}/buckets/${bucketId}/distributions`,
      {
        method: 'POST',
        body: JSON.stringify(data),
      }
    );
  };

  /** 꿈통장으로 버킷리스트 돈 꺼내기 */
  const bringOutMoneyToDreamAccount = async (
    data: transferReq,
    dreamAccId?: number,
    bucketId?: number
  ): Promise<void> => {
    return await fetchApi(
      `/dreamAccount/${dreamAccId}/buckets/${bucketId}/distributions`,
      {
        method: 'DELETE',
        body: JSON.stringify(data),
      }
    );
  };

  return {
    getAccountInfo,
    receiveMoneyToDreamAccount,
    sendMoneyFromDreamAccount,
    fillUpMoneyFromDreamAccount,
    bringOutMoneyToDreamAccount,
  };
};
