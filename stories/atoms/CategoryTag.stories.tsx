import CategoryTag from '@/components/atoms/CategoryTag';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Atoms/CategoryTag',
  component: CategoryTag,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof CategoryTag>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    content: '전체',
    isSelected: false,
    isContentShow: true,
  },
};

export const Selected: Story = {
  args: {
    content: '여행',
    isSelected: true,
    isContentShow: true,
  },
};

export const WithoutContent: Story = {
  args: {
    content: '재테크',
    isSelected: false,
    isContentShow: false,
  },
};

// 모든 카테고리 변형을 보여주는 스토리
export const AllCategories: Story = {
  render: () => (
    <div className='flex gap-4'>
      {['전체', '여행', '재테크', '노후', '교육', '취미'].map((category) => (
        <CategoryTag key={category} content={category} isContentShow={true} />
      ))}
    </div>
  ),
  args: {
    content: '재테크',
    isSelected: false,
    isContentShow: false,
  },
};
