import { RadioItem, RadioItemProps } from '@/components/atoms/RadioItem';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<RadioItemProps> = {
  title: 'Atoms/RadioItem', // Storybook에서 표시될 경로
  component: RadioItem,
  tags: ['autodocs'], // 자동 문서화를 활성화
  argTypes: {
    contentDirection: {
      control: 'select', // select로 방향 선택 가능
      options: ['vertical', 'horizontal'],
    },
    shape: {
      control: 'select', // select로 모양 선택 가능
      options: ['box', 'circle'],
    },
    className: {
      control: 'text',
    },
  },
};

export default meta;
type Story = StoryObj<RadioItemProps>;

export const Default: Story = {
  args: {
    id: 'radio1',
    name: 'group1',
    value: 'value1',
    contentDirection: 'horizontal',
    shape: 'circle',
    children: 'Option 1',
  },
};

export const HorizontalCircle: Story = {
  args: {
    id: 'radio2',
    name: 'group1',
    value: 'value2',
    contentDirection: 'horizontal',
    shape: 'circle',
    children: 'Horizontal Circle',
  },
};

export const VerticalBox: Story = {
  args: {
    id: 'radio3',
    name: 'group2',
    value: 'value3',
    contentDirection: 'vertical',
    shape: 'box',
    children: 'Vertical Box',
  },
};
