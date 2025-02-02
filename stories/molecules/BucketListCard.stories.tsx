import { BucketListCard } from '@/components/molecules/BucketListCard';
import { Meta, StoryObj } from '@storybook/react';
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

const meta: Meta<typeof BucketListCard> = {
  title: 'Molecules/BucketListCard', // Storybook에서 표시될 경로
  component: BucketListCard,
  tags: ['autodocs'], // 자동 문서화를 활성화
  decorators: [
    (Story) => (
      <SessionProvider session={mockSession}>
        <Story />
      </SessionProvider>
    ),
  ],
  argTypes: {
    howTo: {
      control: { type: 'select' },
      options: ['EFFORT', 'MONEY'], // 선택 가능한 옵션
      description: '목표 달성 방법 (노력 또는 금전)',
    },
    tagType: {
      control: { type: 'select' },
      options: ['HAVE', 'DO', 'BE', 'GO', 'LEARN'], // 선택 가능한 옵션
      description: '목표의 유형 (소유, 행동, 상태, 이동, 학습)',
    },
    dataPercent: {
      control: { type: 'number' },
      description: '목표 달성 퍼센트 (0~100)',
    },
    safeBox: {
      control: { type: 'number' },
      description: '금전 목표일 경우 필요한 금액',
    },
    title: {
      control: { type: 'text' },
      description: '목표 제목',
    },
  },
};

export default meta;

// 기본 스토리 객체 타입 정의
type Story = StoryObj<typeof BucketListCard>;

// Default 스토리
export const Default: Story = {
  args: {
    howTo: 'EFFORT',
    dataPercent: 50,
    title: '운동하기',
    tagType: 'DO',
  },
};

// MoneyGoal 스토리
export const MoneyGoal: Story = {
  args: {
    howTo: 'MONEY',
    dataPercent: 75,
    title: '여행 자금 모으기',
    tagType: 'HAVE',
    safeBox: 1500000,
  },
};

// CompleteGoal 스토리
export const CompleteGoal: Story = {
  args: {
    howTo: 'MONEY',
    dataPercent: 100,
    title: '스카이다이빙 배우기',
    tagType: 'LEARN',
    safeBox: 2500000,
  },
};
