'use client';

import { usePortfolioApi } from '@/hooks/usePortfolio/usePortfolio';
import {
  getPortfolioRecommendationResponse,
  InvestmentType,
  PortfolioTemplate,
} from '@/types/Portfolio';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Button } from '../atoms/Button';
import { PortfolioTemplateChart } from './PortfolioTemplateChart';

const investmentTypeConfig = {
  CONSERVATIVE: {
    text: '안정형',
    color: '#008715',
    description: '원금 보존을\n최우선으로 하는 투자 성향',
  },
  MODERATELY_CONSERVATIVE: {
    text: '안정추구형',
    color: '#61A300',
    description:
      '원금 보존을 추구하면서\n일정 수준의 수익을 기대하는 투자 성향',
  },
  BALANCED: {
    text: '위험중립형',
    color: '#BD8D00',
    description: '위험과 수익의 균형을\n추구하는 투자 성향',
  },
  MODERATELY_AGGRESSIVE: {
    text: '적극투자형',
    color: '#E57A00',
    description: '높은 수익을 추구하며\n일정 수준의 위험을 감수하는 투자 성향',
  },
  AGGRESSIVE: {
    text: '공격투자형',
    color: '#FF0000',
    description: '최대한의 수익을 추구하며\n높은 위험을 감수하는 투자 성향',
  },
};
const investmentTypes = Object.keys(investmentTypeConfig) as InvestmentType[];

interface recommendModal extends getPortfolioRecommendationResponse {
  setIsModalOpen: (open: boolean) => void;
}

export const PortfolioRecommendModal = ({
  recommended,
  investmentType,
  estimatedInvestRatio,
  setIsModalOpen,
}: recommendModal) => {
  console.log('🚀 ~ estimatedInvestRatio:', estimatedInvestRatio);
  const [recommendTypeIndex, setRecommendTypeIndex] = useState(0);
  const [selectedType, setSelectedType] = useState<InvestmentType>();
  const [selectedTemplate, setSelectedTemplate] =
    useState<PortfolioTemplate | null>(null);
  const { getPortfolioTemplates, setManualPortfolio } = usePortfolioApi();
  const router = useRouter();

  useEffect(() => {
    const initialIndex = investmentTypes.findIndex(
      (type) => type === investmentType
    );
    setRecommendTypeIndex(initialIndex !== -1 ? initialIndex : 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setSelectedType(investmentTypes[recommendTypeIndex]);
  }, [recommendTypeIndex]);

  useEffect(() => {
    const getTemplate = async () => {
      await getPortfolioTemplates().then((res) => {
        const template = res.templates.find((t) => t.name === selectedType);
        setSelectedTemplate(template || null);
      });
    };
    getTemplate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedType]);

  const handleChangeClick = () => {
    const changeGoalPortfolio = async () => {
      await setManualPortfolio(investmentType)
        .then(() => {
          alert('정상적으로 변경되었습니다.');
          router.push('/');
        })
        .catch((err) => {
          alert(err);
        });
    };
    changeGoalPortfolio();
  };

  return (
    <>
      {recommended && selectedType && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[1000] p-4'>
          <div className='bg-white rounded-lg p-6 w-[90%] max-w-2xl max-h-[90vh] flex flex-col mb-16 md:mb-0 overflow-y-auto'>
            <h2 className='text-xl font-bold mb-6'>
              추천 포트폴리오로 변경하시겠어요?
            </h2>
            <div className='flex-1 flex flex-col justify-between items-center min-h-0 max-h-[60vh]'>
              <span
                className='font-medium text-lg'
                style={{ color: investmentTypeConfig[selectedType].color }}
              >
                {investmentTypeConfig[selectedType].text}
              </span>
              {/* Chart section */}
              <div className='flex-1 flex items-center justify-center overflow-hidden h-[350px]'>
                {' '}
                {/* 높이 감소 */}
                <div className='w-full h-full max-h-[350px]'>
                  {' '}
                  {/* 최대 높이 조정 */}
                  <PortfolioTemplateChart template={selectedTemplate} />
                </div>
              </div>
              <div className='flex justify-between gap-4 mt-6'>
                <Button
                  onClick={() => setIsModalOpen(false)}
                  size='sm'
                  className='bg-gray-100 text-gray-600 hover:bg-gray-200'
                >
                  취소
                </Button>
                <Button onClick={handleChangeClick} size='sm'>
                  변경하기
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
