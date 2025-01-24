'use client';

import { PortfolioCard } from '@/components/molecules/PortfolioCard';
import ProductCard from '@/components/molecules/ProductCard';
import { useAdsApi } from '@/hooks/useAds/useAds';
import { usePortfolioApi } from '@/hooks/usePortfolio/usePortfolio';
import { AdsResponse } from '@/types/Ads';
import { PortfolioResponse } from '@/types/Portfolio';
import { InvestmentTypeResponse, InvestmentType } from '@/types/Portfolio';
import Image from 'next/image';
import { useEffect, useState } from 'react';

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
  const [adsData, setAdsData] = useState<AdsResponse | null>(null);
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

  return (
    <div className='max-w-screen-md mx-auto'>
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
        <div className='flex justify-center items-center min-h-screen'>
          로딩 중...
        </div>
      ) : (
        <div className=''>
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
            {portfolioData && (
              <div className='mt-4'>
                <PortfolioCard
                  currentPortfolio={portfolioData.currentPortfolio}
                  goalPortfolio={portfolioData.goalPortfolio}
                />
              </div>
            )}
          </section>

          {/* 상품 추천 섹션 */}
          {adsData?.data && (
            <section className='bg-[#FBFBFB] p-6 shadow-[0px_2px_8px_0px_rgba(136,137,157,0.30)]'>
              <h2 className='text-lg font-bold mb-2'>
                나에게 맞는 금융상품을 추천해드려요
              </h2>
              <p className='text-gray-600 text-md mb-3'>
                꿈을 이루는데 도움될 금융상품입니다
              </p>
              <div className='space-y-4'>
                <ProductCard
                  key={adsData.data.id}
                  productType={adsData.data.productType}
                  productName={adsData.data.productName}
                  riskRating={adsData.data.riskRating}
                  yield={adsData.data.yield}
                  bannerImageUrl={null}
                  link={adsData.data.link}
                />
              </div>
            </section>
          )}
        </div>
      )}
    </div>
  );
}
