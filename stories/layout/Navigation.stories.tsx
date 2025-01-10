import Navigation from '@/components/atoms/NavigationBar';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Layout/Navigation',
  component: Navigation,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  args: {
    currentPath: '/',
  },
  argTypes: {
    currentPath: {
      control: 'select',
      options: ['/', '/bucket-list', '/community', '/support', '/mypage'],
      description: '현재 활성화된 경로',
      table: {
        defaultValue: { summary: '/' },
      },
    },
  },
  decorators: [
    (Story) => (
      <div className='relative min-h-screen'>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Navigation>;

export default meta;
type Story = StoryObj<typeof Navigation>;

export const Default: Story = {};

export const WithCustomPath: Story = {
  args: {
    currentPath: '/bucket-list',
  },
};
