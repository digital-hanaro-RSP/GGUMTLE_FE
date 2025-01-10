import ShowSelectedImage from '@/components/atoms/ShowSelectedImage';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof ShowSelectedImage> = {
  title: 'Atoms/ShowSelectedImage',
  component: ShowSelectedImage,
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
      description: '표시할 이미지 URL',
    },
    onRemove: {
      action: 'removed',
      description: '이미지 제거 시 호출되는 콜백 함수',
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
type Story = StoryObj<typeof ShowSelectedImage>;

// 기본 스토리
export const Default: Story = {
  args: {
    imageUrl: 'https://picsum.photos/100/100',
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
    imageUrl: 'https://picsum.photos/100/100',
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
    imageUrl: 'https://picsum.photos/100/100',
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
    imageUrl: 'https://picsum.photos/100/100',
  },
};

// 에러 상태 스토리
export const ErrorState: Story = {
  args: {
    imageUrl: 'invalid-url.jpg',
  },
};
