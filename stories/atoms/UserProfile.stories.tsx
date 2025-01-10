import UserProfile from '@/components/atoms/UserProfile';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof UserProfile> = {
  title: 'Atoms/UserProfile',
  component: UserProfile,
  parameters: {
    layout: 'centered',
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
  tags: ['autodocs'],
  argTypes: {
    imageUrl: {
      control: 'text',
      description: '프로필 이미지 URL',
    },
    alt: {
      control: 'text',
      description: '이미지 대체 텍스트',
    },
  },
  decorators: [
    (Story) => (
      <div style={{ margin: '1em' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof UserProfile>;

// 기본 스토리
export const Default: Story = {
  args: {
    imageUrl: 'https://picsum.photos/36/36',
    alt: 'User profile',
  },
};

// 모바일 뷰
export const MobileView: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
  args: {
    imageUrl: 'https://picsum.photos/36/36',
    alt: 'Mobile view',
  },
};

// 태블릿 뷰
export const TabletView: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'tablet',
    },
  },
  args: {
    imageUrl: 'https://picsum.photos/36/36',
    alt: 'Tablet view',
  },
};

// 데스크톱 뷰
export const DesktopView: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'desktop',
    },
  },
  args: {
    imageUrl: 'https://picsum.photos/36/36',
    alt: 'Desktop view',
  },
};

// 에러 상태 스토리
export const ErrorState: Story = {
  args: {
    imageUrl: 'invalid-url.jpg',
    alt: 'Invalid image',
  },
};
