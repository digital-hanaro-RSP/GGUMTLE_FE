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
    color: 'DO',
    children: '하고 싶어요',
  },
};

export const Be: Story = {
  args: {
    color: 'BE',
    children: '되고 싶어요',
  },
};

export const Have: Story = {
  args: {
    color: 'HAVE',
    children: '갖고 싶어요',
  },
};

export const Go: Story = {
  args: {
    color: 'GO',
    children: '가보고 싶어요',
  },
};

export const Learn: Story = {
  args: {
    color: 'LEARN',
    children: '배우고 싶어요',
  },
};
