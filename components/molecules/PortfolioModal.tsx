'use client';

import { InvestmentType, PortfolioTemplate } from '@/types/Portfolio';
import { useEffect, useRef, useState } from 'react';
import { PortfolioTemplateChart } from './PortfolioTemplateChart';

interface PortfolioModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (type: InvestmentType) => void;
  templates: PortfolioTemplate[] | null;
  isLoading: boolean;
  error: string | null;
  setError: (error: string | null) => void;
}

const investmentTypeConfig = {
  CONSERVATIVE: {
    text: '안정형',
    color: '#008715',
    description: '원금 보존을 최우선으로 하는 투자 성향',
  },
  MODERATELY_CONSERVATIVE: {
    text: '안정추구형',
    color: '#61A300',
    description: '원금 보존을 추구하면서 일정 수준의 수익을 기대하는 투자 성향',
  },
  BALANCED: {
    text: '위험중립형',
    color: '#BD8D00',
    description: '위험과 수익의 균형을 추구하는 투자 성향',
  },
  MODERATELY_AGGRESSIVE: {
    text: '적극투자형',
    color: '#E57A00',
    description: '높은 수익을 추구하며 일정 수준의 위험을 감수하는 투자 성향',
  },
  AGGRESSIVE: {
    text: '공격투자형',
    color: '#FF0000',
    description: '최대한의 수익을 추구하며 높은 위험을 감수하는 투자 성향',
  },
};

export const PortfolioModal = ({
  isOpen,
  onClose,
  onConfirm,
  templates,
  isLoading,
  error,
  setError,
}: PortfolioModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [selectedType, setSelectedType] = useState<InvestmentType | null>(null);
  const [hoveredType, setHoveredType] = useState<InvestmentType | null>(null);
  const [selectedTemplate, setSelectedTemplate] =
    useState<PortfolioTemplate | null>(null);

  useEffect(() => {
    if (isOpen) {
      setSelectedType(null);
      setHoveredType(null);
      setSelectedTemplate(null);
      setError(null);
    }
  }, [isOpen, setError]);

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

  const handleTypeSelect = (type: InvestmentType) => {
    setSelectedType(type);
  };

  const handleConfirm = () => {
    if (selectedType) {
      onConfirm(selectedType);
    }
  };

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
      <div
        ref={modalRef}
        className='bg-white rounded-lg p-6 w-[90%] max-w-2xl max-h-[90vh] overflow-y-auto'
      >
        <h2 className='text-xl font-bold mb-6'>목표 포트폴리오 설정</h2>

        {error && (
          <div className='mb-4 p-4 bg-red-50 text-red-600 rounded-lg'>
            {error}
          </div>
        )}

        {isLoading ? (
          <div className='flex justify-center items-center h-64'>
            <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-primary-main'></div>
          </div>
        ) : (
          <>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              <div className='space-y-4'>
                {(Object.keys(investmentTypeConfig) as InvestmentType[]).map(
                  (type) => (
                    <button
                      key={type}
                      onClick={() => handleTypeSelect(type)}
                      onMouseEnter={() => setHoveredType(type)}
                      onMouseLeave={() => setHoveredType(null)}
                      className={`w-full p-4 rounded-lg border transition-all duration-200 flex items-center justify-between
                ${
                  selectedType === type
                    ? 'border-2 bg-gray-50'
                    : 'border hover:border-primary-main'
                }`}
                      style={{
                        borderColor:
                          selectedType === type
                            ? investmentTypeConfig[type].color
                            : undefined,
                      }}
                    >
                      <div className='flex flex-col items-start'>
                        <span className='font-medium text-lg'>
                          {investmentTypeConfig[type].text}
                        </span>
                        {(hoveredType === type || selectedType === type) && (
                          <span className='text-sm text-gray-500 mt-1'>
                            {investmentTypeConfig[type].description}
                          </span>
                        )}
                      </div>
                      <span
                        className='w-3 h-3 rounded-full flex-shrink-0'
                        style={{
                          backgroundColor: investmentTypeConfig[type].color,
                        }}
                      />
                    </button>
                  )
                )}
              </div>
              <div className='flex items-center justify-center'>
                <PortfolioTemplateChart template={selectedTemplate} />
              </div>
            </div>
            <div className='flex justify-end gap-4 mt-6'>
              <button
                onClick={onClose}
                className='px-6 py-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors'
              >
                취소
              </button>
              <button
                onClick={handleConfirm}
                disabled={!selectedType}
                className={`px-6 py-2 rounded-lg text-white transition-colors
              ${
                selectedType
                  ? 'bg-primary-main hover:bg-primary-dark'
                  : 'bg-gray-300 cursor-not-allowed'
              }`}
              >
                확인
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
