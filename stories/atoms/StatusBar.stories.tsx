import { StatusBar, StatusBarProps } from '@/components/atoms/StatusBar';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof StatusBar> = {
  title: 'Atoms/StatusBar',
  component: StatusBar,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<StatusBarProps>;

export const Default: Story = {
  args: {
    current: 50,
    total: 100,
  },
  render: (args) => <StatusBar {...args} />,
};

export const Empty: Story = {
  args: {
    current: 0,
    total: 100,
  },
  render: (args) => <StatusBar {...args} />,
};

export const Full: Story = {
  args: {
    current: 100,
    total: 100,
  },
  render: (args) => <StatusBar {...args} />,
};
