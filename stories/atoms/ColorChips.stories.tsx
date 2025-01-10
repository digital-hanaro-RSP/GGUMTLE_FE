import ColorChip from '@/components/atoms/ColorChips';
import { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof ColorChip> = {
  title: 'Atoms/ColorChip',
  component: ColorChip,
};

export default meta;

type Story = StoryObj<typeof ColorChip>;

export const Gray: Story = {
  args: {
    color: 'gray',
    children: '기본',
  },
};

export const Want: Story = {
  args: {
    color: 'want',
    children: '하고 싶어요',
  },
};

export const Become: Story = {
  args: {
    color: 'become',
    children: '되고 싶어요',
  },
};

export const Have: Story = {
  args: {
    color: 'have',
    children: '갖고 싶어요',
  },
};

export const Visit: Story = {
  args: {
    color: 'visit',
    children: '가보고 싶어요',
  },
};

export const Learn: Story = {
  args: {
    color: 'learn',
    children: '배우고 싶어요',
  },
};
