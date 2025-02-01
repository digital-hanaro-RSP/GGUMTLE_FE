'use client';

import LoadingDot from '@/components/atoms/LoadingDot';
import { PortfolioCard } from '@/components/molecules/PortfolioCard';
import ProductCard from '@/components/molecules/ProductCard';
import { useAdsApi } from '@/hooks/useAds/useAds';
import { usePortfolioApi } from '@/hooks/usePortfolio/usePortfolio';
import { AdsResponse } from '@/types/Ads';
import { PortfolioResponse } from '@/types/Portfolio';
import { InvestmentTypeResponse, InvestmentType } from '@/types/Portfolio';
import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';

const investmentTypeConfig = {
  CONSERVATIVE: {
    text: '안정형',
    color: '#008715',
  },
  MODERATELY_CONSERVATIVE: {
    text: '안정추구형',
    color: '#61A300',
  },
  BALANCED: {
    text: '위험중립형',
    color: '#BD8D00',
  },
  MODERATELY_AGGRESSIVE: {
    text: '적극투자형',
    color: '#E57A00',
  },
  AGGRESSIVE: {
    text: '공격투자형',
    color: '#FF0000',
  },
};

const getInvestmentTypeKorean = (type: InvestmentType): string => {
  return investmentTypeConfig[type].text;
};

const getInvestmentTypeColor = (type: InvestmentType): string => {
  return investmentTypeConfig[type].color;
};

export default function MainPage() {
  const [portfolioData, setPortfolioData] = useState<PortfolioResponse | null>(
    null
  );
  const [investmentData, setInvestmentData] =
    useState<InvestmentTypeResponse | null>(null);
  const [adsData, setAdsData] = useState<AdsResponse['data'] | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const { getPortfolio, getInvestmentType } = usePortfolioApi();
  const { getAds } = useAdsApi();

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        const [portfolioResult, investmentResult, adsResult] =
          await Promise.all([getPortfolio(), getInvestmentType(), getAds()]);

        if (isMounted) {
          setPortfolioData(portfolioResult);
          setInvestmentData(investmentResult);
          setAdsData(adsResult);
          setIsLoading(false);
        }
      } catch (error) {
        console.error('데이터 로딩 실패:', error);
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    if (isLoading) {
      fetchData();
    }

    return () => {
      isMounted = false;
    };
  }, [getPortfolio, getInvestmentType, getAds, isLoading]);

  const refreshPortfolioData = useCallback(async () => {
    try {
      const portfolioResult = await getPortfolio();
      setPortfolioData(portfolioResult);
    } catch (error) {
      console.error('포트폴리오 데이터 로딩 실패:', error);
    }
  }, [getPortfolio]);

  const handlePortfolioUpdate = useCallback(async () => {
    try {
      await refreshPortfolioData();
      // 투자성향 데이터도 새로고침
      const investmentResult = await getInvestmentType();
      setInvestmentData(investmentResult);
      alert('포트폴리오가 성공적으로 업데이트되었습니다.');
    } catch (error) {
      console.error('포트폴리오 데이터 로딩 실패:', error);
      alert('포트폴리오 업데이트에 실패했습니다.');
    }
  }, [refreshPortfolioData, getInvestmentType]);

  return (
    <div className='max-w-screen-md mx-auto min-h-screen'>
      <div className='flex items-center justify-between p-4'>
        <h1 className='font-cookie text-lg animate-gradient bg-gradient-to-r from-primary-main via-[#92BEA9] to-primary-main bg-[length:200%_auto] bg-clip-text text-transparent'>
          꿈에 틀을 잡다, 꿈틀
        </h1>
        <Image
          src='/image/logo/logo.png'
          alt='꿈틀 로고'
          className='h-6 w-auto ml-2'
          width={50}
          height={50}
        />
      </div>

      {isLoading ? (
        <LoadingDot />
      ) : (
        <div className='px-4 pb-4'>
          {/* 포트폴리오 섹션 */}
          <section className='bg-[#FBFBFB] p-6 shadow-[0px_2px_8px_0px_rgba(136,137,157,0.30)]'>
            <h2 className='text-lg font-bold mb-2'>
              나의 포트폴리오를 확인해보세요
            </h2>
            {investmentData && (
              <h2 className='text-md mb-4'>
                {investmentData.userName}님의 투자성향은{' '}
                <span
                  style={{
                    color: getInvestmentTypeColor(
                      investmentData.investmentType
                    ),
                  }}
                >
                  {getInvestmentTypeKorean(investmentData.investmentType)}
                </span>
                입니다
              </h2>
            )}
            {portfolioData && investmentData && (
              <PortfolioCard
                currentPortfolio={portfolioData.currentPortfolio}
                goalPortfolio={portfolioData.goalPortfolio}
                onPortfolioUpdate={handlePortfolioUpdate}
                investmentType={investmentData.investmentType}
              />
            )}
          </section>

          {/* 상품 추천 섹션 */}
          {adsData?.mainAds && (
            <section className='bg-[#FBFBFB] p-6 shadow-[0px_2px_8px_0px_rgba(136,137,157,0.30)]'>
              <h2 className='text-lg font-bold mb-2'>
                나에게 맞는 금융상품을 추천해드려요
              </h2>
              <p className='text-gray-600 text-md mb-3'>
                꿈을 이루는데 도움될 금융상품입니다
              </p>

              {/* 개별 props 제거 */}
              <ProductCard adsData={adsData} />
            </section>
          )}
        </div>
      )}
    </div>
  );
}
