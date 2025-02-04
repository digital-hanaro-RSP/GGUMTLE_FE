import LoadingDot from '@/components/atoms/LoadingDot';
import { Meta, StoryObj } from '@storybook/react';

const meta: Meta = {
  title: 'Atoms/LoadingDot',
  component: LoadingDot,
  tags: ['autodocs'],
  decorators: (Story) => (
    <div style={{ height: '100vh' }}>
      <Story />
    </div>
  ),
};

export default meta;

type Story = StoryObj<typeof LoadingDot>;
export const Default: Story = {};
