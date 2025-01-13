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

ChartJS.register(ArcElement, Tooltip, Legend);

interface DoughnutOptions extends ChartOptions<'doughnut'> {
  cutout?: string | number;
  centerText?: string;
}

interface PortfolioCardProps {
  currentPortfolio: CurrentPortfolio;
  goalPortfolio: GoalPortfolio;
}

const CHART_COLORS = {
  depositWithdrawal: '#FF6384',
  savingTimeDeposit: '#36A2EB',
  investment: '#FFCE56',
  foreignCurrency: '#4BC0C0',
  pension: '#9966FF',
  etc: '#FF9F40',
};

const chartOptions = (centerText: string): DoughnutOptions => ({
  cutout: '60%',
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

export const PortfolioCard = ({
  currentPortfolio,
  goalPortfolio,
}: PortfolioCardProps) => {
  // "상세항목" 표시 여부를 결정하는 state
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggleDetail = () => {
    setIsExpanded((prev) => !prev);
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

  const currentChartData = {
    labels: ['입출금', '예적금', '투자', '외화', '연금', '기타'],
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
        backgroundColor: Object.values(CHART_COLORS),
      },
    ],
  };

  const goalChartData = {
    labels: ['입출금', '예적금', '투자', '외화', '연금', '기타'],
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
        backgroundColor: Object.values(CHART_COLORS),
      },
    ],
  };

  return (
    <Card className='p-6'>
      <div className='text-2xl font-bold mb-6'>
        총 자산: {getTotalAssets().toLocaleString()}원
      </div>

      <div className='flex justify-between gap-4 mb-6'>
        <div className='w-1/2'>
          <div className='h-64'>
            <Doughnut
              data={goalChartData}
              options={chartOptions('목표')}
              plugins={[textCenter]}
            />
          </div>
        </div>
        <div className='w-1/2'>
          <div className='h-64'>
            <Doughnut
              data={currentChartData}
              options={chartOptions('현재')}
              plugins={[textCenter]}
            />
          </div>
        </div>
      </div>

      {/* morebutton과 상세 항목 */}
      <div className='flex flex-col items-center'>
        <MoreButton
          size='xs'
          direction={isExpanded ? 'up' : 'down'}
          onClick={handleToggleDetail}
          className='mb-2'
        />
        {/* isExpanded 상태에 따라 "상세항목" 표시 */}
        {isExpanded && (
          <div className='mt-2 text-gray-700'>
            <p>상세항목</p>
          </div>
        )}
      </div>
    </Card>
  );
};
