import TextArea from '@/components/atoms/TextArea';
import { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof TextArea> = {
  title: 'Atoms/TextArea',
  component: TextArea,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['post', 'dream', 'memo', 'comment'],
    },
    value: { control: 'text' },
    onChange: { action: 'changed' },
  },
};

export default meta;

type Story = StoryObj<typeof TextArea>;

export const Default: Story = {
  args: {
    type: 'post',
    value: '',
  },
};

export const Post: Story = {
  args: {
    type: 'post',
    value: '게시물 내용을 여기에 작성합니다.',
  },
};

export const Dream: Story = {
  args: {
    type: 'dream',
    value: '꿈모임에 대한 설명을 여기에 작성합니다.',
  },
};

export const Memo: Story = {
  args: {
    type: 'memo',
    value:
      '• 버킷리스트로 만든 계기: 새로운 도전을 위해\n• 달성 방법: 매일 조금씩 노력하기\n• 보류 이유: 현재 다른 우선순위가 있어서',
  },
};

export const Comment: Story = {
  args: {
    type: 'comment',
    value: '이 게시물에 대한 의견을 남깁니다.',
  },
};

export const EmptyStates: Story = {
  render: () => (
    <div className='space-y-4'>
      <TextArea type='post' value='' onChange={() => {}} />
      <TextArea type='dream' value='' onChange={() => {}} />
      <TextArea type='memo' value='' onChange={() => {}} />
      <TextArea type='comment' value='' onChange={() => {}} />
    </div>
  ),
};
