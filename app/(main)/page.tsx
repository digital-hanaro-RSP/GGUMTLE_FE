'use client';

import { PortfolioCard } from '@/components/molecules/PortfolioCard';
import { usePortfolioApi } from '@/hooks/usePortfolio/usePortfolio';
import { PortfolioResponse } from '@/types/Portfolio';
import { useEffect, useState } from 'react';

export default function MainPage() {
  const [portfolioData, setPortfolioData] = useState<PortfolioResponse | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);
  const { getPortfolio } = usePortfolioApi();

  useEffect(() => {
    let isMounted = true;

    const fetchPortfolio = async () => {
      try {
        const data = await getPortfolio();
        if (isMounted) {
          setPortfolioData(data);
          setIsLoading(false);
        }
      } catch (error) {
        console.error('포트폴리오 데이터 로딩 실패:', error);
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    if (isLoading) {
      fetchPortfolio();
    }

    return () => {
      isMounted = false;
    };
  }, [getPortfolio, isLoading]);

  return (
    <div className='px-4 py-2'>
      <h1 className='font-cookie flex text-start justify-start text-lg text-primary-main mb-2'>
        꿈에 틀을 잡다, 꿈틀
      </h1>
      {portfolioData ? (
        <PortfolioCard
          currentPortfolio={portfolioData.currentPortfolio}
          goalPortfolio={portfolioData.goalPortfolio}
        />
      ) : (
        <div>로딩 중...</div>
      )}
    </div>
  );
}
