import UserProfile from '@/components/atoms/UserProfile';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof UserProfile> = {
  title: 'Atoms/UserProfile',
  component: UserProfile,
  parameters: {
    layout: 'centered',
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

// 다른 이미지 URL을 사용하는 스토리
export const CustomImage: Story = {
  args: {
    imageUrl: 'https://picsum.photos/id/237/36/36',
    alt: 'Custom profile image',
  },
};

// 에러 상태 스토리
export const ErrorState: Story = {
  args: {
    imageUrl: 'invalid-url.jpg',
    alt: 'Invalid image',
  },
};
