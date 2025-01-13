import CommentCard from '@/components/molecules/CommentCard';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof CommentCard> = {
  title: 'Molecules/CommentCard',
  component: CommentCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className='w-[700px]  relative flex flex-col gap-[20px]'>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    postId: 1,
    id: 1,
    userId: 'user123',
    content: '댓글 내용입니다.',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    isLiked: false,
    author: {
      name: '홍길동',
      profileImage: 'https://picsum.photos/36/36',
    },
    likeCount: 5,
  },
};

export const LikedComment: Story = {
  args: {
    ...Default.args,
    isLiked: true,
    likeCount: 10,
  },
};

export const LongContent: Story = {
  args: {
    ...Default.args,
    content:
      '이것은 매우 긴 댓글 내용입니다. 여러 줄에 걸쳐 표시될 수 있는 긴 텍스트를 테스트하기 위한 예시입니다.',
  },
};

export const NoProfileImage: Story = {
  args: {
    ...Default.args,
    author: {
      name: '프로필 없음',
      profileImage: '',
    },
  },
};
