import { BucketListCard } from '@/components/molecules/BucketListCard';
import { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof BucketListCard> = {
  title: 'Molecules/BucketListCard', // Storybook에서 표시될 경로
  component: BucketListCard,
  tags: ['autodocs'], // 자동 문서화를 활성화
  argTypes: {
    howTo: {
      control: { type: 'select' },
      options: ['EFFORT', 'MONEY'], // 선택 가능한 옵션
    },
    tagType: {
      control: { type: 'select' },
      options: ['HAVE', 'DO', 'BE', 'GO', 'LEARN'], // 선택 가능한 옵션
    },
    dataPercent: {
      control: { type: 'number' },
    },
    safeBox: {
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
    howTo: 'EFFORT',
    dataPercent: 50,
    title: '운동하기',
    tagType: 'DO',
  },
};

// MoneyGoal 스토리
export const MoneyGoal: Story = {
  args: {
    howTo: 'MONEY',
    dataPercent: 75,
    title: '여행 자금 모으기',
    tagType: 'HAVE',
    safeBox: 1500000,
  },
};

// Goal 완성
export const CompleteGoal: Story = {
  args: {
    howTo: 'MONEY',
    dataPercent: 100,
    title: '스카이다이빙 배우기',
    tagType: 'LEARN',
    safeBox: 2500000,
  },
};
