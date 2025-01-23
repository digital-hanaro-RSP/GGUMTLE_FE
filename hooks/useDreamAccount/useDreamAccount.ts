import { transferReq } from '@/types/Account';
import { useApi } from '../useApi';

export const useDreamAccountApi = () => {
  const { fetchApi } = useApi();
  /** 꿈 계좌 정보 불러오는 hook */
  const getAccountInfo = async () => {
    return await fetchApi('/dreamAccount', {
      method: 'GET',
    });
  };
  /** 꿈통장으로 돈 가져오기 */
  const receiveMoneyToDreamAccount = async (
    dreamAccId: number,
    data: transferReq
  ) => {
    return await fetchApi(`/dream-account/add/${dreamAccId}`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  };

  /** 꿈통장에서 돈 보내기 */
  const sendMoneyFromDreamAccount = async (data: transferReq) => {
    return await fetchApi('/dream-account/withdraw', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  };

  /** 꿈통장에서 버킷리스트로 채우기 */
  const fillUpMoneyFromDreamAccount = async (data: transferReq) => {
    return await fetchApi('/dream-account/fill-bucket', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  };

  /** 꿈통장에서 버킷시르트 돈 꺼내기 */
  const bringOutMoneyToDreamAccount = async (data: transferReq) => {
    return await fetchApi('/dream-account/empty-bucket', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  };

  return {
    getAccountInfo,
    receiveMoneyToDreamAccount,
    sendMoneyFromDreamAccount,
    fillUpMoneyFromDreamAccount,
    bringOutMoneyToDreamAccount,
  };
};
