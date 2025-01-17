import { BucketListCard } from '@/components/molecules/BucketListCard';
import { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof BucketListCard> = {
  title: 'Molecules/BucketListCard', // Storybook에서 표시될 경로
  component: BucketListCard,
  tags: ['autodocs'], // 자동 문서화를 활성화
  argTypes: {
    type: {
      control: { type: 'select' },
      options: ['effort', 'money'], // 선택 가능한 옵션
    },
    how: {
      control: { type: 'select' },
      options: ['have', 'do', 'be', 'go', 'learn'], // 선택 가능한 옵션
    },
    dataPercent: {
      control: { type: 'number' },
    },
    balance: {
      control: { type: 'number' },
    },
  },
};

export default meta;

// 기본 스토리 객체
type Story = StoryObj<typeof BucketListCard>;

// Default 스토리
export const Default: Story = {
  args: {
    type: 'effort',
    dataPercent: 50,
    title: '운동하기',
    how: 'do',
  },
};

// MoneyGoal 스토리
export const MoneyGoal: Story = {
  args: {
    type: 'money',
    dataPercent: 75,
    title: '여행 자금 모으기',
    how: 'have',
    balance: 1500000,
  },
};

// Goal 완성
export const CompleteGoal: Story = {
  args: {
    type: 'money',
    dataPercent: 100,
    title: '스카이다이빙 배우기',
    how: 'learn',
    balance: 2500000,
  },
};
