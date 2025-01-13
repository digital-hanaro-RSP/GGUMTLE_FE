import AccountCard from '@/components/molecules/AccountCard';
import type { Meta, StoryObj } from '@storybook/react';

// Define metadata for the component
const meta: Meta<typeof AccountCard> = {
  title: 'Molecules/AccountCard',
  component: AccountCard,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;

type Story = StoryObj<typeof AccountCard>;

// Default story for the AccountCard
export const Default: Story = {
  args: {
    title: '내 꿈 계좌',
    balance: '5000000',
  },
};
