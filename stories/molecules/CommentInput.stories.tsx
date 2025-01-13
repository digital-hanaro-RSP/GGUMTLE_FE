import type { Meta, StoryObj } from '@storybook/react';
import CommentInput from '../../components/molecules/CommentInput';

const meta: Meta<typeof CommentInput> = {
  title: 'Molecules/CommentInput',
  component: CommentInput,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className='w-[700px] h-[500px] relative flex flex-col gap-[20px]'>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

// 모바일 환경을 시뮬레이션하기 위한 데코레이터 추가
export const Mobile: Story = {
  args: {},
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
    layout: 'fullscreen',
  },
};
