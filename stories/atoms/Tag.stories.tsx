import Tag from '@/components/atoms/Tag';
import { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Tag> = {
  title: 'Atoms/Tag',
  component: Tag,
  decorators: [
    (Story) => (
      <div style={{ padding: '20px', backgroundColor: '#ffffff' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof Tag>;

export const Default: Story = {
  args: {
    children: '태그',
    isSelected: false,
  },
};

export const Selected: Story = {
  args: {
    children: '선택된 태그',
    isSelected: true,
  },
};

export const LongText: Story = {
  args: {
    children: '긴 텍스트가 있는 태그입니다',
    isSelected: false,
  },
};

export const MultipleTagsExample: Story = {
  render: () => (
    <div className='flex gap-2 flex-wrap'>
      <Tag>운동</Tag>
      <Tag isSelected>공부</Tag>
      <Tag>취미</Tag>
      <Tag>자기계발</Tag>
      <Tag isSelected>독서</Tag>
    </div>
  ),
};
