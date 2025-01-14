import { PortfolioCard } from '@/components/molecules/PortfolioCard';
import type { Meta, StoryObj } from '@storybook/react';

const mockCurrentPortfolio = {
  id: 1,
  userId: 'user123',
  depositWithdrawal: 1000000,
  savingTimeDeposit: 5000000,
  investment: 3000000,
  foreignCurrency: 2000000,
  pension: 4000000,
  etc: 500000,
};

const mockGoalPortfolio = {
  id: 1,
  userId: 'user123',
  depositWithdrawalRatio: 0.1,
  savingTimeDepositRatio: 0.3,
  investmentRatio: 0.2,
  foreignCurrencyRatio: 0.15,
  pensionRatio: 0.2,
  etcRatio: 0.05,
  templateId: 1,
  createdAt: '2024-01-01T00:00:00Z',
  updatedAt: '2024-01-01T00:00:00Z',
};

const meta = {
  title: 'Molecules/PortfolioCard',
  component: PortfolioCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    currentPortfolio: {
      description: '현재 포트폴리오 데이터',
    },
    goalPortfolio: {
      description: '목표 포트폴리오 데이터',
    },
  },
} satisfies Meta<typeof PortfolioCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    currentPortfolio: mockCurrentPortfolio,
    goalPortfolio: mockGoalPortfolio,
  },
};

export const EmptyPortfolio: Story = {
  args: {
    currentPortfolio: {
      ...mockCurrentPortfolio,
      depositWithdrawal: 0,
      savingTimeDeposit: 0,
      investment: 0,
      foreignCurrency: 0,
      pension: 0,
      etc: 0,
    },
    goalPortfolio: mockGoalPortfolio,
  },
};

export const HighInvestment: Story = {
  args: {
    currentPortfolio: {
      ...mockCurrentPortfolio,
      investment: 10000000,
    },
    goalPortfolio: {
      ...mockGoalPortfolio,
      investmentRatio: 0.5,
    },
  },
};

export const HighSavings: Story = {
  args: {
    currentPortfolio: {
      ...mockCurrentPortfolio,
      savingTimeDeposit: 8000000,
    },
    goalPortfolio: {
      ...mockGoalPortfolio,
      savingTimeDepositRatio: 0.4,
    },
  },
};
