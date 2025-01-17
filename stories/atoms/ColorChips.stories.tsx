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

export const Do: Story = {
  args: {
    color: 'do',
    children: '하고 싶어요',
  },
};

export const Be: Story = {
  args: {
    color: 'be',
    children: '되고 싶어요',
  },
};

export const Have: Story = {
  args: {
    color: 'have',
    children: '갖고 싶어요',
  },
};

export const Go: Story = {
  args: {
    color: 'go',
    children: '가보고 싶어요',
  },
};

export const Learn: Story = {
  args: {
    color: 'learn',
    children: '배우고 싶어요',
  },
};
