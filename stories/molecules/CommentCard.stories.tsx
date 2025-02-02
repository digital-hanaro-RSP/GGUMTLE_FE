import CommentCard from '@/components/molecules/CommentCard';
import type { Meta, StoryObj } from '@storybook/react';
import { SessionProvider } from 'next-auth/react';

// Mock session 데이터
const mockSession = {
  user: {
    id: 'John Doe',
    name: 'John Doe',
    jwt: 'johndoe@example.com',
    permission: 3,
  },
  expires: '9999-12-31T23:59:59.999Z',
};

const meta: Meta<typeof CommentCard> = {
  title: 'Molecules/CommentCard',
  component: CommentCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <SessionProvider session={mockSession}>
        <div className='w-[700px] relative flex flex-col gap-[20px]'>
          <Story />
        </div>
      </SessionProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    id: 1,
    content: '댓글 내용입니다.',
    createdAt: new Date().toISOString(),
    liked: false,
    userBriefInfo: {
      name: '홍길동',
      profileImageUrl: 'https://picsum.photos/36/36',
      nickname: '길동이',
    },
    likeCount: 5,
    mine: false,
  },
};

export const LikedComment: Story = {
  args: {
    ...Default.args,
    liked: true,
    likeCount: 10,
  },
};

export const MyComment: Story = {
  args: {
    ...Default.args,
    mine: true,
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
    userBriefInfo: {
      name: '프로필 없음',
      profileImageUrl: '',
      nickname: '무프로필',
    },
  },
};
