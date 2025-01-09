import ShowSelectedImage from '@/components/atoms/ShowSelectedImage';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof ShowSelectedImage> = {
  title: 'Components/ShowSelectedImage',
  component: ShowSelectedImage,
  parameters: {
    layout: 'centered',
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
};

export default meta;
type Story = StoryObj<typeof ShowSelectedImage>;

// 기본 스토리
export const Default: Story = {
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
