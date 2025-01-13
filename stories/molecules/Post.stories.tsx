import Post from '@/components/molecules/Post';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Post> = {
  title: 'Molecules/Post',
  component: Post,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className='w-[375px]'>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Post>;

// 기본 게시물 데이터
const basePost = {
  groupId: 1,
  id: 1,
  author: {
    name: '김철수',
    profileImage: 'https://picsum.photos/36/36',
  },
  content:
    '안녕하세요! 오늘은 정말 좋은 날씨네요.\n여러분은 어떻게 지내시나요?',
  createdAt: new Date().toISOString(),
  likeCount: 5,
  commentCount: 3,
  isLiked: false,
  imageUrls: [],
  snapshot: {
    bucketLists: [],
    portfolioLists: [],
  },
};

// 기본 게시물
export const Default: Story = {
  args: {
    ...basePost,
  },
};

// 긴 텍스트가 있는 게시물
export const LongText: Story = {
  args: {
    ...basePost,
    content: '안녕하세요!\n'.repeat(20),
  },
};

// 이미지가 있는 게시물
export const WithImage: Story = {
  args: {
    ...basePost,
    imageUrls: [
      'https://picsum.photos/400/300',
      'https://picsum.photos/400/300',
    ],
  },
};

// 좋아요가 눌린 게시물
export const Liked: Story = {
  args: {
    ...basePost,
    isLiked: true,
    likeCount: 6,
  },
};
