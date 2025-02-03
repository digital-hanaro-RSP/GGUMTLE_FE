import { LoadingBar } from '@/components/atoms/LoadingBar';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof LoadingBar> = {
  title: 'Atoms/LoadingBar',
  component: LoadingBar,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof LoadingBar>;

export const Default: Story = {
  args: {},
  render: () => <LoadingBar />,
};
