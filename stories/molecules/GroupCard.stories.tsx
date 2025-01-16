import GroupCard from '@/components/molecules/GroupCard';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof GroupCard> = {
  title: 'Molecules/GroupCard',
  component: GroupCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof GroupCard>;

export const Default: Story = {
  args: {
    id: 1,
    name: '독서 모임',
    category: '독서',
    description: '함께 책을 읽고 이야기를 나누는 모임입니다.',
    imageUrl: 'https://picsum.photos/200',
    memberCount: 42,
    rightIcon: true,
    onClick: () => console.log('clicked'),
  },
};

export const WithoutRightIcon: Story = {
  args: {
    id: 4,
    name: '운동 모임',
    category: '운동',
    description: '함께 운동하는 모임입니다.',
    imageUrl: 'https://picsum.photos/200',
    memberCount: 25,
    rightIcon: false,
  },
};

export const LongDescription: Story = {
  args: {
    id: 2,
    name: '코딩 스터디',
    category: '프로그래밍',
    description:
      '이것은 매우 긴 설명입니다. 설명이 길어질 경우 어떻게 보이는지 테스트하기 위한 예시입니다.',
    imageUrl: 'https://picsum.photos/200',
    memberCount: 156,
  },
};

export const NoMembers: Story = {
  args: {
    id: 3,
    name: '신규 모임',
    category: '취미',
    description: '새로 시작하는 취미 모임입니다.',
    imageUrl: 'https://picsum.photos/200',
    memberCount: 0,
  },
};
