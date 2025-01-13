import type { Meta, StoryObj } from '@storybook/react';
import { BankInfoCard } from '@/components/molecules/BankInfoCard';

// Define metadata for the component
const meta: Meta<typeof BankInfoCard> = {
  title: 'Molecules/BankInfoCard',
  component: BankInfoCard,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;

type Story = StoryObj<typeof BankInfoCard>;

// Default story for a "to" type card with balance
export const ToAccountWithBalance: Story = {
  args: {
    type: 'to',
    title: '하나은행 계좌',
    isConnectedAccount: false,
    balance: 1234567,
  },
};

// Story for a "from" type card with no balance (connected account)
export const FromAccountConnected: Story = {
  args: {
    type: 'from',
    title: '우리은행 계좌',
    isConnectedAccount: true,
    balance: undefined, // Balance will not be shown
  },
};

// Story for a "to" type card with no connected account and zero balance
export const ToAccountNoBalance: Story = {
  args: {
    type: 'to',
    title: '국민은행 계좌',
    isConnectedAccount: false,
    balance: 0,
  },
};
