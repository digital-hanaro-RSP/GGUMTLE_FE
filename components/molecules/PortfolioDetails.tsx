// components/molecules/PortfolioDetails.tsx
import { CurrentPortfolio, GoalPortfolio } from '@/types/Portfolio';

const CHART_COLORS = {
  depositWithdrawal: '#FF6384',
  savingTimeDeposit: '#36A2EB',
  investment: '#FFCE56',
  foreignCurrency: '#4BC0C0',
  pension: '#9966FF',
  etc: '#FF9F40',
};

// 타입 가드 함수 추가
const isCurrentPortfolio = (
  portfolio: CurrentPortfolio | GoalPortfolio
): portfolio is CurrentPortfolio => {
  return 'depositWithdrawal' in portfolio;
};

export const PortfolioDetails = ({
  portfolio,
  isGoal,
}: {
  portfolio: CurrentPortfolio | GoalPortfolio;
  isGoal: boolean;
}) => {
  const generateDetails = () => {
    const total = isGoal
      ? 100
      : isCurrentPortfolio(portfolio)
        ? portfolio.depositWithdrawal +
          portfolio.savingTimeDeposit +
          portfolio.investment +
          portfolio.foreignCurrency +
          portfolio.pension +
          portfolio.etc
        : 0;

    const details = [
      {
        name: '입출금',
        color: CHART_COLORS.depositWithdrawal,
        percentage: isGoal
          ? (portfolio as GoalPortfolio).depositWithdrawalRatio * 100
          : isCurrentPortfolio(portfolio)
            ? (portfolio.depositWithdrawal / total) * 100
            : 0,
      },
      {
        name: '예적금',
        color: CHART_COLORS.savingTimeDeposit,
        percentage: isGoal
          ? (portfolio as GoalPortfolio).savingTimeDepositRatio * 100
          : isCurrentPortfolio(portfolio)
            ? (portfolio.savingTimeDeposit / total) * 100
            : 0,
      },
      {
        name: '투자',
        color: CHART_COLORS.investment,
        percentage: isGoal
          ? (portfolio as GoalPortfolio).investmentRatio * 100
          : isCurrentPortfolio(portfolio)
            ? (portfolio.investment / total) * 100
            : 0,
      },
      {
        name: '외화',
        color: CHART_COLORS.foreignCurrency,
        percentage: isGoal
          ? (portfolio as GoalPortfolio).foreignCurrencyRatio * 100
          : isCurrentPortfolio(portfolio)
            ? (portfolio.foreignCurrency / total) * 100
            : 0,
      },
      {
        name: '연금',
        color: CHART_COLORS.pension,
        percentage: isGoal
          ? (portfolio as GoalPortfolio).pensionRatio * 100
          : isCurrentPortfolio(portfolio)
            ? (portfolio.pension / total) * 100
            : 0,
      },
      {
        name: '기타',
        color: CHART_COLORS.etc,
        percentage: isGoal
          ? (portfolio as GoalPortfolio).etcRatio * 100
          : isCurrentPortfolio(portfolio)
            ? (portfolio.etc / total) * 100
            : 0,
      },
    ];

    return details;
  };

  return (
    <div className='grid grid-cols-2 gap-4 mt-4'>
      {generateDetails().map((item, index) => (
        <div key={index} className='flex items-center gap-2'>
          <div
            className='w-4 h-4 rounded-full'
            style={{ backgroundColor: item.color }}
          />
          <span>
            {item.name}: {item.percentage.toFixed(1)}%
          </span>
        </div>
      ))}
    </div>
  );
};
