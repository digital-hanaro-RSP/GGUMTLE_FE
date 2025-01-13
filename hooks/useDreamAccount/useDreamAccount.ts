import { useApi } from "../useApi";

export const useDreamAccountApi = () => {
  const { fetchApi } = useApi();
	/** 꿈 계좌 정보 불러오는 hook */
	const getAccountInfo = async() =>{
		return await fetchApi('/getAccountInfo',{
			method: 'GET',
		})
	}

	return {
		getAccountInfo
	}
};
