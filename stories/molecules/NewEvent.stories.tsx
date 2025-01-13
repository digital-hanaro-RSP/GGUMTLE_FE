import NewEvent from '@/components/molecules/NewEvent';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof NewEvent> = {
  title: 'Molecules/NewEvent',
  component: NewEvent,
  parameters: {
    layout: 'centered',
  },
};

export default meta;

type Story = StoryObj<typeof NewEvent>;

export const Default: Story = {
  args: {
    content: '세계 일주하기',
    author: {
      name: '조민석',
      profileImage: 'https://picsum.photos/36/36',
    },
  },
};

export const LongContent: Story = {
  args: {
    content: '히말라야 산맥 등반하고 정상에서 일출 보기',
    author: {
      name: '조민석',
      profileImage: 'https://picsum.photos/36/36',
    },
  },
};
