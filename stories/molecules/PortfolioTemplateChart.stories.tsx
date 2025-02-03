import { PortfolioTemplateChart } from '@/components/molecules/PortfolioTemplateChart';
import { PortfolioTemplate } from '@/types/Portfolio';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof PortfolioTemplateChart> = {
  title: 'Molecules/PortfolioTemplateChart',
  component: PortfolioTemplateChart,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof PortfolioTemplateChart>;

const dummyTemplate: PortfolioTemplate = {
  id: 1,
  name: 'CONSERVATIVE',
  depositWithdrawalRatio: 0.2,
  savingTimeDepositRatio: 0.3,
  investmentRatio: 0.25,
  foreignCurrencyRatio: 0.1,
  pensionRatio: 0.1,
  etcRatio: 0.05,
};

export const Default: Story = {
  args: {
    template: dummyTemplate,
  },
};
