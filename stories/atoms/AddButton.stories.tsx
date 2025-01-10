import { PlusButton, PlusButtonProps } from '@/components/atoms/Button';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<PlusButtonProps> = {
  title: 'Atoms/PlusButton',
  component: PlusButton,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg'],
    },
    className: {
      control: false,
    },
  },
};

export default meta;
type Story = StoryObj<PlusButtonProps>;

export const Default: Story = {
  args: {
    size: 'xs',
  },
};

export const Small: Story = {
  args: {
    size: 'sm',
  },
};

export const Medium: Story = {
  args: {
    size: 'md',
  },
};

export const Large: Story = {
  args: {
    size: 'lg',
  },
};
