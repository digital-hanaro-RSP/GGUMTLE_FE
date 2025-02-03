'use client';

import { InvestmentType, PortfolioTemplate } from '@/types/Portfolio';
import { useEffect, useRef, useState } from 'react';
import { Button, MoreButton } from '../atoms/Button';
import { PortfolioTemplateChart } from './PortfolioTemplateChart';

export interface PortfolioModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (type: InvestmentType) => void;
  templates: PortfolioTemplate[] | null;
  isLoading: boolean;
  error: string | null;
  setError: (error: string | null) => void;
  // 새로운 prop 추가
  currentInvestmentType: InvestmentType | null;
}

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

export const PortfolioModal = ({
  isOpen,
  onClose,
  onConfirm,
  templates,
  isLoading,
  error,
  setError,
  currentInvestmentType,
}: PortfolioModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [currentTypeIndex, setCurrentTypeIndex] = useState(0);
  const [selectedTemplate, setSelectedTemplate] =
    useState<PortfolioTemplate | null>(null);

  const selectedType = investmentTypes[currentTypeIndex];

  useEffect(() => {
    if (isOpen && currentInvestmentType) {
      // 현재 투자성향에 해당하는 인덱스 찾기
      const initialIndex = investmentTypes.findIndex(
        (type) => type === currentInvestmentType
      );
      setCurrentTypeIndex(initialIndex !== -1 ? initialIndex : 0);
      setSelectedTemplate(null);
      setError(null);
    }
  }, [isOpen, currentInvestmentType, setError]);

  useEffect(() => {
    if (selectedType && templates) {
      const template = templates.find((t) => t.name === selectedType);
      setSelectedTemplate(template || null);
    } else {
      setSelectedTemplate(null);
    }
  }, [selectedType, templates]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handlePrevType = () => {
    setCurrentTypeIndex((prev) =>
      prev === 0 ? investmentTypes.length - 1 : prev - 1
    );
  };

  const handleNextType = () => {
    setCurrentTypeIndex((prev) =>
      prev === investmentTypes.length - 1 ? 0 : prev + 1
    );
  };

  const handleConfirm = () => {
    if (selectedType) {
      onConfirm(selectedType);
    }
  };

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4'>
      <div
        ref={modalRef}
        className='bg-white rounded-lg p-6 w-[90%] max-w-2xl max-h-[90vh] flex flex-col mb-16 md:mb-0 overflow-y-auto'
      >
        <h2 className='text-xl font-bold mb-6'>목표 포트폴리오 설정</h2>

        {error && (
          <div className='mb-4 p-4 bg-red-50 text-red-600 rounded-lg'>
            {error}
          </div>
        )}

        {isLoading ? (
          <div className='flex-1 flex justify-center items-center'>
            <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-primary-main'></div>
          </div>
        ) : (
          <>
            <div className='flex-1 flex flex-col justify-between min-h-0 max-h-[60vh]'>
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

              {/* Control section */}
              <div className='flex items-center justify-between px-2 mt-4'>
                <MoreButton
                  onClick={handlePrevType}
                  direction='left'
                  size='xs'
                  className='hover:bg-gray-100 rounded-full'
                />

                <div className='flex flex-col items-center'>
                  <span
                    className='font-medium text-lg'
                    style={{ color: investmentTypeConfig[selectedType].color }}
                  >
                    {investmentTypeConfig[selectedType].text}
                  </span>
                  <span className='text-xs text-gray-500 mt-1 text-center whitespace-pre-line'>
                    {investmentTypeConfig[selectedType].description}
                  </span>
                </div>

                <MoreButton
                  onClick={handleNextType}
                  direction='right'
                  size='xs'
                  className='hover:bg-gray-100 rounded-full'
                />
              </div>
            </div>

            <div className='flex justify-between gap-4 mt-6'>
              <Button
                onClick={onClose}
                size='sm'
                className='bg-gray-100 text-gray-600 hover:bg-gray-200'
              >
                취소
              </Button>
              <Button onClick={handleConfirm} size='sm'>
                확인
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
