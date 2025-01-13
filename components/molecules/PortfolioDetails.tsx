import { CurrentPortfolio, GoalPortfolio } from '@/types/Portfolio';
import { useState } from 'react';

const CHART_COLORS = {
  depositWithdrawal: '#7D79FF',
  savingTimeDeposit: '#3DC2C4',
  investment: '#5395FF',
  foreignCurrency: '#F16D8B',
  pension: '#DBB18C',
  etc: '#CACDED',
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
  onHover,
}: {
  portfolio: CurrentPortfolio | GoalPortfolio;
  isGoal: boolean;
  onHover: (section: string | null) => void;
}) => {
  const [selectedSection, setSelectedSection] = useState<string | null>(null);

  const handleClick = (name: string) => {
    if (selectedSection === name) {
      setSelectedSection(null);
      onHover(null);
    } else {
      setSelectedSection(name);
      onHover(name);
    }
  };

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
        alignRight: true,
      },
      {
        name: '예적금',
        color: CHART_COLORS.savingTimeDeposit,
        percentage: isGoal
          ? (portfolio as GoalPortfolio).savingTimeDepositRatio * 100
          : isCurrentPortfolio(portfolio)
            ? (portfolio.savingTimeDeposit / total) * 100
            : 0,
        alignRight: false,
      },
      {
        name: '투자',
        color: CHART_COLORS.investment,
        percentage: isGoal
          ? (portfolio as GoalPortfolio).investmentRatio * 100
          : isCurrentPortfolio(portfolio)
            ? (portfolio.investment / total) * 100
            : 0,
        alignRight: true,
      },
      {
        name: '외화',
        color: CHART_COLORS.foreignCurrency,
        percentage: isGoal
          ? (portfolio as GoalPortfolio).foreignCurrencyRatio * 100
          : isCurrentPortfolio(portfolio)
            ? (portfolio.foreignCurrency / total) * 100
            : 0,
        alignRight: false,
      },
      {
        name: '연금',
        color: CHART_COLORS.pension,
        percentage: isGoal
          ? (portfolio as GoalPortfolio).pensionRatio * 100
          : isCurrentPortfolio(portfolio)
            ? (portfolio.pension / total) * 100
            : 0,
        alignRight: true,
      },
      {
        name: '기타',
        color: CHART_COLORS.etc,
        percentage: isGoal
          ? (portfolio as GoalPortfolio).etcRatio * 100
          : isCurrentPortfolio(portfolio)
            ? (portfolio.etc / total) * 100
            : 0,
        alignRight: false,
      },
    ];

    return details;
  };

  return (
    <div className='grid grid-cols-2 gap-4 mt-4'>
      {generateDetails().map((item, index) => (
        <div
          key={index}
          className={`flex items-center ${item.alignRight ? 'justify-end' : ''}`}
          onClick={() => handleClick(item.name)}
          style={{ cursor: 'pointer' }}
        >
          <div className='flex items-center gap-2 w-[120px]'>
            <div
              className={`w-4 h-4 rounded-full ${
                selectedSection === item.name ? 'ring-2 ring-slate-300' : ''
              }`}
              style={{ backgroundColor: item.color }}
            />
            <span
              className={`text-slate-400 min-w-[100px] inline-block ${
                selectedSection === item.name ? 'font-bold' : ''
              }`}
            >
              {item.name} {item.percentage.toFixed(1)}%
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};
