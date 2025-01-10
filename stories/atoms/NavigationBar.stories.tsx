import Navigation from '@/components/atoms/NavigationBar';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Atoms/NavigationBar',
  component: Navigation,
  parameters: {
    layout: 'fullscreen',
    viewport: {
      defaultViewport: 'mobile1',
    },
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
      <div className='relative min-h-screen max-w-screen-md mx-auto'>
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
