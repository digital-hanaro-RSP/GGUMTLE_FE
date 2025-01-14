import { ProgressBar } from '@/components/molecules/ProgressBar';
import type { Meta, StoryObj } from '@storybook/react';

// Storybook 메타데이터 설정
const meta: Meta<typeof ProgressBar> = {
  title: 'Molecules/ProgressBar', // Storybook에서 컴포넌트가 표시될 경로
  component: ProgressBar,
  argTypes: {
    dataPercent: {
      control: { type: 'range', min: 0, max: 100 }, // 슬라이더로 데이터 조정 가능
      description: 'Progress bar의 진행률 (0~100)',
    },
  },
};

export default meta;

// 기본 스토리 설정
type Story = StoryObj<typeof ProgressBar>;

export const Default: Story = {
  args: {
    dataPercent: 50, // 기본 진행률
  },
};

export const FullProgress: Story = {
  args: {
    dataPercent: 100, // 진행률 100%
  },
};

export const NoProgress: Story = {
  args: {
    dataPercent: 0, // 진행률 0%
  },
};
