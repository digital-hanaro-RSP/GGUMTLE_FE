import Post from '@/components/molecules/Post';
import { Post as PostType } from '@/types/Community';
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
const basePost: PostType & { isDetailPage?: boolean; onDelete?: () => void } = {
  id: 1,
  groupId: 1,
  imageUrls: [],
  content:
    '안녕하세요! 오늘은 정말 좋은 날씨네요.\n여러분은 어떻게 지내시나요?',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  postType: 'POST' as const,
  likeCount: 5,
  commentCount: 3,
  userBriefInfo: {
    name: '김철수',
    profileImageUrl: 'https://picsum.photos/36/36',
    nickname: '김철수',
  },
  liked: false,
  mine: false,
  snapShot: {
    bucketLists: [],
    currentPortfolio: {
      id: 1,
      userId: 'user123',
      depositWithdrawal: 1000000,
      savingTimeDeposit: 5000000,
      investment: 3000000,
      foreignCurrency: 2000000,
      pension: 4000000,
      etc: 500000,
    },
    goalPortfolio: {
      id: 1,
      userId: 'user123',
      depositWithdrawalRatio: 0.1,
      savingTimeDepositRatio: 0.3,
      investmentRatio: 0.2,
      foreignCurrencyRatio: 0.15,
      pensionRatio: 0.2,
      etcRatio: 0.05,
      templateId: 1,
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-01T00:00:00Z',
    },
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
    liked: true,
    likeCount: 6,
  },
};

// 내가 작성한 게시물
export const MyPost: Story = {
  args: {
    ...basePost,
    mine: true,
  },
};

// 포트폴리오 스냅샷이 있는 게시물
export const WithPortfolioSnapshot: Story = {
  args: {
    ...basePost,
    snapShot: {
      bucketLists: [],
      currentPortfolio: {
        id: 1,
        userId: 'user123',
        depositWithdrawal: 3000000,
        savingTimeDeposit: 4000000,
        investment: 5000000,
        foreignCurrency: 1000000,
        pension: 2000000,
        etc: 1000000,
      },
      goalPortfolio: {
        id: 1,
        userId: 'user123',
        depositWithdrawalRatio: 0.2,
        savingTimeDepositRatio: 0.2,
        investmentRatio: 0.3,
        foreignCurrencyRatio: 0.1,
        pensionRatio: 0.15,
        etcRatio: 0.05,
        templateId: 1,
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-01T00:00:00Z',
      },
    },
  },
};

// 상세 페이지용 게시물
export const DetailPage: Story = {
  args: {
    ...basePost,
    isDetailPage: true,
    content: '안녕하세요!\n'.repeat(20),
  },
};
