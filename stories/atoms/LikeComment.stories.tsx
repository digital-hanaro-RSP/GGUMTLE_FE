import LikeComment from '@/components/atoms/LikeComment';
import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

const meta = {
  title: 'Atoms/LikeComment',
  component: LikeComment,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    initialIsLiked: {
      control: 'boolean',
      description: '좋아요 초기 상태',
    },
    likeCount: {
      control: 'number',
      description: '좋아요 개수',
    },
    commentCount: {
      control: 'number',
      description: '댓글 개수',
    },
    onLikeChange: {
      description: '좋아요 상태 변경 시 호출되는 함수',
    },
  },
} satisfies Meta<typeof LikeComment>;

export default meta;

type LikeCommentWrapperProps = {
  initialLikeCount: number;
  initialIsLiked: boolean;
  commentCount: number;
};

const LikeCommentWithState = ({
  initialLikeCount,
  initialIsLiked,
  commentCount,
}: LikeCommentWrapperProps) => {
  const [likeCount, setLikeCount] = useState<number>(initialLikeCount);
  const [isLiked, setIsLiked] = useState<boolean>(initialIsLiked);

  const handleLikeChange = (newLikeState: boolean) => {
    setIsLiked(newLikeState);
    setLikeCount((prev: number) => (newLikeState ? prev + 1 : prev - 1));
    console.log('좋아요 상태:', newLikeState);
  };

  return (
    <LikeComment
      initialIsLiked={isLiked}
      likeCount={likeCount}
      commentCount={commentCount}
      onLikeChange={handleLikeChange}
    />
  );
};

type Story = StoryObj<typeof LikeComment>;

export const Default: Story = {
  render: () => (
    <LikeCommentWithState
      initialIsLiked={false}
      initialLikeCount={4}
      commentCount={4}
    />
  ),
};

export const Liked: Story = {
  render: () => (
    <LikeCommentWithState
      initialIsLiked={true}
      initialLikeCount={5}
      commentCount={3}
    />
  ),
};

export const ManyInteractions: Story = {
  render: () => (
    <LikeCommentWithState
      initialIsLiked={false}
      initialLikeCount={999}
      commentCount={888}
    />
  ),
};
