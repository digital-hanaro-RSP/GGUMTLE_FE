'use client';

import { MoreButton } from '@/components/atoms/Button';
import { Card } from '@/components/atoms/Card';
import { CurrentPortfolio, GoalPortfolio } from '@/types/Portfolio';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartOptions,
  Plugin,
} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { useState } from 'react';
import { PortfolioDetails } from './PortfolioDetails';

ChartJS.register(ArcElement, Tooltip, Legend);

interface DoughnutOptions extends ChartOptions<'doughnut'> {
  cutout?: string | number;
  centerText?: string;
}

interface PortfolioCardProps {
  currentPortfolio: CurrentPortfolio;
  goalPortfolio: GoalPortfolio;
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
    },
  },
  elements: {
    arc: {
      borderWidth: 0,
    },
  },
  centerText,
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
}: PortfolioCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedPortfolio, setSelectedPortfolio] = useState<
    'goal' | 'current'
  >('goal');
  const [hoveredSection, setHoveredSection] = useState<string | null>('입출금');

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

  return (
    <Card className='px-6 py-2'>
      <div className='text-xl font-semibold mb-6'>
        총 자산: {getTotalAssets().toLocaleString()}원
      </div>

      <div className='flex justify-between gap-4 mb-6'>
        <div
          className='w-1/2'
          onClick={() => handleChartClick('goal')}
          style={{ cursor: 'pointer' }}
        >
          <div className=''>
            <Doughnut
              data={goalChartData}
              options={chartOptions('목표')}
              plugins={[textCenter]}
            />
          </div>
        </div>
        <div
          className='w-1/2'
          onClick={() => handleChartClick('current')}
          style={{ cursor: 'pointer' }}
        >
          <div className=''>
            <Doughnut
              data={currentChartData}
              options={chartOptions('현재')}
              plugins={[textCenter]}
            />
          </div>
        </div>
      </div>

      <div className='flex flex-col items-center'>
        <MoreButton
          size='xs'
          direction={isExpanded ? 'up' : 'down'}
          onClick={handleToggleDetail}
          className='mb-2'
        />
        {isExpanded && (
          <div className='mt-2 w-full'>
            <p className='text-gray-700 font-semibold mb-2 text-center'>
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
          </div>
        )}
      </div>
    </Card>
  );
};
