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
  TooltipItem,
} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { BsPencilSquare } from 'react-icons/bs';
import Swal from 'sweetalert2';
import { useState } from 'react';
import { PortfolioDetails } from './PortfolioDetails';
import { PortfolioModal } from './PortfolioModal';

ChartJS.register(ArcElement, Tooltip, Legend);

type CustomDoughnutOptions = ChartOptions<'doughnut'> & {
  centerText?: string;
  isSelected?: boolean;
  isExpanded?: boolean;
  isCommunity?: boolean;
};

interface PortfolioCardProps {
  currentPortfolio: CurrentPortfolio;
  goalPortfolio: GoalPortfolio;
  onPortfolioUpdate?: () => Promise<void>; // optional로 변경
  investmentType?: InvestmentType; // optional로 변경
  isMain?: boolean;
}

interface CustomChartData {
  labels: string[];
  datasets: {
    label?: string; // 옵셔널 속성 추가
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

const chartOptions = (
  centerText: string,
  isSelected: boolean,
  isExpanded: boolean,
  isCommunity: boolean
): CustomDoughnutOptions => ({
  cutout: '50%',
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      enabled: true,
      callbacks: {
        label: (context: TooltipItem<'doughnut'>) => {
          const value = context.raw as number;
          if (isCommunity) {
            return `${context.label}: ${(value * 100).toFixed(1)}%`;
          }
          return context.dataset.label === '목표'
            ? `${context.label}: ${(value * 100).toFixed(1)}%`
            : `${context.label}: ${value.toLocaleString()}원`;
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
  isSelected,
  isExpanded,
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
    const options = chart.options as CustomDoughnutOptions;
    const text = options.centerText || '';
    // isExpanded 상태를 확인하여 isSelected 값을 결정
    const isSelected = options.isExpanded ? options.isSelected : false;

    ctx.save();
    ctx.font = isSelected ? 'bold 18px sans-serif' : 'bold 16px sans-serif';
    ctx.fillStyle = isSelected ? '#069894' : '#5B5B5B';
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
  investmentType,
  isMain = true,
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
      if (onPortfolioUpdate) {
        await onPortfolioUpdate();
      }
      handleModalClose();
      window.location.reload();
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : '포트폴리오 설정에 실패했습니다.';
      Swal.fire({
        title: 'Oops!',
        text: errorMessage,
        icon: 'error',
        confirmButtonText: '네',
      });
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

  const currentChartData: CustomChartData = {
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

  const goalChartData: CustomChartData = {
    labels: LABELS,
    datasets: [
      {
        label: '목표',
        data: [
          goalPortfolio.depositWithdrawalRatio,
          goalPortfolio.savingTimeDepositRatio,
          goalPortfolio.investmentRatio,
          goalPortfolio.foreignCurrencyRatio,
          goalPortfolio.pensionRatio,
          goalPortfolio.etcRatio,
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

  return (
    <Card className='px-6 py-2'>
      {isMain && (
        <div className='text-xl font-semibold mb-6'>
          총 자산: {getTotalAssets().toLocaleString()}원
        </div>
      )}

      <div className='flex justify-between gap-4 mb-6'>
        <div
          className={`w-1/2 flex items-center justify-center ${
            selectedPortfolio === 'goal' && isExpanded ? 'scale-105' : ''
          }`}
          onClick={() => handleChartClick('goal')}
          style={{ cursor: 'pointer', transition: 'transform 0.3s ease' }}
        >
          <Doughnut
            data={goalChartData}
            options={chartOptions(
              '목표',
              selectedPortfolio === 'goal',
              isExpanded,
              !isMain
            )}
            plugins={[textCenter]}
          />
        </div>
        <div
          className={`w-1/2 flex items-center justify-center ${
            selectedPortfolio === 'current' && isExpanded ? 'scale-105' : ''
          }`}
          onClick={() => handleChartClick('current')}
          style={{ cursor: 'pointer', transition: 'transform 0.3s ease' }}
        >
          <Doughnut
            data={currentChartData}
            options={chartOptions(
              '현재',
              selectedPortfolio === 'current',
              isExpanded,
              !isMain
            )}
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
            {isMain && (
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
            )}
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
        setError={setError}
        currentInvestmentType={investmentType || null}
      />
    </Card>
  );
};
