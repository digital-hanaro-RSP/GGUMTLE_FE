import { MoreButton, MoreButtonProps } from '@/components/atoms/Button';
import { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof MoreButton> = {
  title: 'Atoms/MoreButton',
  component: MoreButton,
  tags: ['autodocs'], // 자동 문서화를 활성화
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['xs', 'sm', 'md', 'lg'], // 크기 옵션
    },
    direction: {
      control: { type: 'select' },
      options: ['up', 'down', 'left', 'right'], // 방향 옵션
    },
  },
};

export default meta;

type Story = StoryObj<MoreButtonProps>;

export const Default: Story = {
  args: {
    size: 'xs',
    direction: 'down',
  },
};

export const SmallLeft: Story = {
  args: {
    size: 'sm',
    direction: 'left',
  },
};

export const MediumUp: Story = {
  args: {
    size: 'md',
    direction: 'up',
  },
};

export const LargeRight: Story = {
  args: {
    size: 'lg',
    direction: 'right',
  },
};
