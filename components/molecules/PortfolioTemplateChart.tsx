'use client';

import { PortfolioTemplate } from '@/types/Portfolio';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartOptions,
} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

interface DoughnutOptions extends ChartOptions<'doughnut'> {
  cutout?: string | number;
}

interface PortfolioTemplateChartProps {
  template: PortfolioTemplate | null;
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

const chartOptions: DoughnutOptions = {
  cutout: '50%',
  plugins: {
    legend: {
      position: 'bottom',
      labels: {
        padding: 20,
        usePointStyle: true,
      },
    },
    tooltip: {
      callbacks: {
        label: (context) => {
          const value = context.raw as number;
          return `${context.label}: ${value.toFixed(1)}%`;
        },
      },
    },
  },
  elements: {
    arc: {
      borderWidth: 0,
    },
  },
};

export const PortfolioTemplateChart = ({
  template,
}: PortfolioTemplateChartProps) => {
  if (!template) return null;

  const chartData = {
    labels: LABELS,
    datasets: [
      {
        data: [
          template.depositWithdrawalRatio * 100,
          template.savingTimeDepositRatio * 100,
          template.investmentRatio * 100,
          template.foreignCurrencyRatio * 100,
          template.pensionRatio * 100,
          template.etcRatio * 100,
        ],
        backgroundColor: Object.values(CHART_COLORS),
      },
    ],
  };

  return (
    <div className='w-full max-w-md mx-auto'>
      <Doughnut data={chartData} options={chartOptions} />
    </div>
  );
};
