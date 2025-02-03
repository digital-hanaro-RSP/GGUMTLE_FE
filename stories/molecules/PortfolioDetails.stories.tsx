import { PortfolioDetails } from '@/components/molecules/PortfolioDetails';
import { CurrentPortfolio, GoalPortfolio } from '@/types/Portfolio';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof PortfolioDetails> = {
  title: 'Molecules/PortfolioDetails',
  component: PortfolioDetails,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof PortfolioDetails>;

const currentPortfolioSample: CurrentPortfolio = {
  id: 1,
  userId: 'user-123',
  depositWithdrawal: 2000,
  savingTimeDeposit: 3000,
  investment: 4000,
  foreignCurrency: 1000,
  pension: 5000,
  etc: 2000,
};

const goalPortfolioSample: GoalPortfolio = {
  id: 2,
  userId: 'user-123',
  templateId: 1,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  depositWithdrawalRatio: 0.25,
  savingTimeDepositRatio: 0.2,
  investmentRatio: 0.15,
  foreignCurrencyRatio: 0.1,
  pensionRatio: 0.2,
  etcRatio: 0.1,
};

export const CurrentPortfolioStory: Story = {
  args: {
    portfolio: currentPortfolioSample,
    isGoal: false,
    onHover: (section: string | null) => console.log('Hovered:', section),
  },
};

export const GoalPortfolioStory: Story = {
  args: {
    portfolio: goalPortfolioSample,
    isGoal: true,
    onHover: (section: string | null) => console.log('Hovered:', section),
  },
};
