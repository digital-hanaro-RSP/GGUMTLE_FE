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
  responsive: true,
  maintainAspectRatio: true,
  aspectRatio: 1.5, // 비율 조정으로 더 작은 크기로 렌더링
  plugins: {
    legend: {
      position: 'bottom',
      labels: {
        padding: 15, // 패딩 감소
        usePointStyle: true,
        boxWidth: 8, // 범례 크기 축소
        font: {
          size: 11, // 폰트 크기 축소
        },
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
    <div className='w-full h-full flex flex-col items-center justify-center max-h-[350px]'>
      <div
        className='flex items-center justify-center w-full h-full max-w-2xl relative' // max-w-md에서 max-w-2xl로 변경
        style={{
          minHeight: '250px',
          maxHeight: '290px',
          width: '100%', // 너비 비율 추가
          margin: '0 auto', // 중앙 정렬
        }}
      >
        <Doughnut data={chartData} options={chartOptions} />
      </div>
    </div>
  );
};
