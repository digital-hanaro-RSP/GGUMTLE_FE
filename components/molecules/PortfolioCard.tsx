'use client';

import { MoreButton } from '@/components/atoms/Button';
import { Card } from '@/components/atoms/Card';
import { usePortfolioApi } from '@/hooks/usePortfolio/usePortfolio';
import {
  CurrentPortfolio,
  GoalPortfolio,
  InvestmentType,
  PortfolioTemplate,
} from '@/types/Portfolio';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartOptions,
  Plugin,
} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { BsPencilSquare } from 'react-icons/bs';
import { useState } from 'react';
import { PortfolioDetails } from './PortfolioDetails';
import { PortfolioModal } from './PortfolioModal';

ChartJS.register(ArcElement, Tooltip, Legend);

interface DoughnutOptions extends ChartOptions<'doughnut'> {
  cutout?: string | number;
  centerText?: string;
}

interface PortfolioCardProps {
  currentPortfolio: CurrentPortfolio;
  goalPortfolio: GoalPortfolio;
  onPortfolioUpdate: () => Promise<void>;
}

interface ChartData {
  labels: string[];
  datasets: {
    data: number[];
    backgroundColor: string[];
  }[];
}

const CHART_COLORS = {
  depositWithdrawal: '#7D79FF',
  savingTimeDeposit: '#3DC2C4',
  investment: '#5395FF',
  foreignCurrency: '#F16D8B',
  pension: '#DBB18C',
  etc: '#CACDED',
};

const LABELS = ['입출금', '예적금', '투자', '외화', '연금', '기타'];

const chartOptions = (centerText: string): DoughnutOptions => ({
  cutout: '50%',
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      enabled: true,
      callbacks: {
        label: (context) => {
          const value = context.raw as number;
          return `${context.label}: ${value.toLocaleString()}${
            context.dataset.label === '목표' ? '%' : '원'
          }`;
        },
      },
    },
  },
  elements: {
    arc: {
      borderWidth: 0,
      hoverOffset: 8,
    },
  },
  centerText,
  hover: {
    mode: 'nearest',
    intersect: true,
  },
  animation: {
    duration: 500,
  },
});

const textCenter: Plugin<'doughnut'> = {
  id: 'textCenter',
  beforeDraw(chart: ChartJS<'doughnut'>) {
    const ctx = chart.canvas.getContext('2d')!;
    const { chartArea } = chart;
    const text = (chart.options as DoughnutOptions).centerText || '';

    ctx.save();
    ctx.font = 'bold 16px sans-serif';
    ctx.fillStyle = '#000';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    const centerX = (chartArea.left + chartArea.right) / 2;
    const centerY = (chartArea.top + chartArea.bottom) / 2;

    ctx.fillText(text, centerX, centerY);
    ctx.restore();
  },
};

const getBackgroundColors = (
  colors: string[],
  labels: string[],
  hoveredSection: string | null,
  isExpanded: boolean
): string[] => {
  if (!isExpanded) {
    return colors;
  }

  return colors.map(
    (color, index) =>
      hoveredSection === labels[index]
        ? color // 선택된 항목은 원래 색상
        : '#E5E7EB' // 선택되지 않은 항목은 옅은 회색
  );
};

export const PortfolioCard = ({
  currentPortfolio,
  goalPortfolio,
  onPortfolioUpdate,
}: PortfolioCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  // selectedPortfolio를 상수로 변경하여 항상 'goal'로 고정
  const [selectedPortfolio, setSelectedPortfolio] = useState<
    'goal' | 'current'
  >('goal');
  const [hoveredSection, setHoveredSection] = useState<string | null>('입출금');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [templates, setTemplates] = useState<PortfolioTemplate[] | null>(null);
  const { getPortfolioTemplates, setManualPortfolio } = usePortfolioApi();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleToggleDetail = () => {
    setIsExpanded((prev) => {
      if (!prev) {
        setHoveredSection('입출금');
      } else {
        setHoveredSection(null);
      }
      return !prev;
    });
  };

  const handleChartClick = (type: 'goal' | 'current') => {
    setSelectedPortfolio(type);
    if (!isExpanded) {
      setIsExpanded(true);
    }
  };

  const handleModalOpen = async () => {
    try {
      setIsLoading(true);
      const templatesData = await getPortfolioTemplates();
      setTemplates(templatesData.templates);
      setIsModalOpen(true);
    } catch (err) {
      setError('템플릿을 불러오는데 실패했습니다.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleConfirm = async (type: InvestmentType) => {
    try {
      setIsLoading(true);
      setError(null);
      await setManualPortfolio(type);
      await onPortfolioUpdate();
      handleModalClose();
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : '포트폴리오 설정에 실패했습니다.';
      alert(errorMessage);
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const getTotalAssets = () => {
    const {
      depositWithdrawal,
      savingTimeDeposit,
      investment,
      foreignCurrency,
      pension,
      etc,
    } = currentPortfolio;
    return (
      depositWithdrawal +
      savingTimeDeposit +
      investment +
      foreignCurrency +
      pension +
      etc
    );
  };

  if (!currentPortfolio || !goalPortfolio) {
    return <Card className='p-6'>Loading...</Card>;
  }

  const currentChartData: ChartData = {
    labels: LABELS,
    datasets: [
      {
        data: [
          currentPortfolio.depositWithdrawal,
          currentPortfolio.savingTimeDeposit,
          currentPortfolio.investment,
          currentPortfolio.foreignCurrency,
          currentPortfolio.pension,
          currentPortfolio.etc,
        ],
        backgroundColor: getBackgroundColors(
          Object.values(CHART_COLORS),
          LABELS,
          hoveredSection,
          isExpanded
        ),
      },
    ],
  };

  const goalChartData: ChartData = {
    labels: LABELS,
    datasets: [
      {
        data: [
          goalPortfolio.depositWithdrawalRatio * 100,
          goalPortfolio.savingTimeDepositRatio * 100,
          goalPortfolio.investmentRatio * 100,
          goalPortfolio.foreignCurrencyRatio * 100,
          goalPortfolio.pensionRatio * 100,
          goalPortfolio.etcRatio * 100,
        ],
        backgroundColor: getBackgroundColors(
          Object.values(CHART_COLORS),
          LABELS,
          hoveredSection,
          isExpanded
        ),
      },
    ],
  };

  // const LoadingSpinner = () => (
  //   <div className='flex flex-col items-center justify-center h-[calc(100vh-4rem)] gap-4'>
  //     <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-primary-main'></div>
  //     <p className='text-gray-600'>데이터를 불러오는 중입니다...</p>
  //   </div>
  // );

  return (
    <Card className='px-6 py-2'>
      <div className='text-xl font-semibold mb-6'>
        총 자산: {getTotalAssets().toLocaleString()}원
      </div>
      <div className='flex justify-between gap-4 mb-6'>
        <div
          className={`w-1/2 flex items-center justify-center ${selectedPortfolio === 'goal' ? '' : ''}`}
          onClick={() => handleChartClick('goal')}
          style={{ cursor: 'pointer' }}
        >
          <Doughnut
            data={goalChartData}
            options={chartOptions('목표')}
            plugins={[textCenter]}
          />
        </div>
        <div
          className={`w-1/2 flex items-center justify-center ${selectedPortfolio === 'current' ? '' : ''}`}
          onClick={() => handleChartClick('current')}
          style={{ cursor: 'pointer' }}
        >
          <Doughnut
            data={currentChartData}
            options={chartOptions('현재')}
            plugins={[textCenter]}
          />
        </div>
      </div>
      <div className='flex flex-col items-center relative'>
        <MoreButton
          size='xs'
          direction={isExpanded ? 'up' : 'down'}
          onClick={handleToggleDetail}
          className='mb-2'
        />
        {isExpanded && (
          <div className='mt-2 w-full'>
            <p className='text-gray-700 font-semibold w-full text-center mb-2'>
              {selectedPortfolio === 'goal'
                ? '목표 포트폴리오'
                : '현재 포트폴리오'}
            </p>
            <PortfolioDetails
              portfolio={
                selectedPortfolio === 'goal' ? goalPortfolio : currentPortfolio
              }
              isGoal={selectedPortfolio === 'goal'}
              onHover={setHoveredSection}
            />
            <div className='flex justify-center mt-4'>
              <button
                onClick={handleModalOpen}
                className='flex items-center gap-2 text-sm text-primary-main hover:text-primary-dark transition-colors focus:outline-none'
                aria-label='목표 포트폴리오 수정'
              >
                <BsPencilSquare className='w-4 h-4' />
                <span>목표 포트폴리오 수정하기</span>
              </button>
            </div>
          </div>
        )}
      </div>
      <PortfolioModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        templates={templates}
        onConfirm={handleConfirm}
        isLoading={isLoading}
        error={error}
        setError={setError} // 추가
      />
    </Card>
  );
};
