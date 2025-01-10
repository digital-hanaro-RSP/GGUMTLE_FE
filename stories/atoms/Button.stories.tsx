// Button.stories.tsx
import { Meta, StoryObj } from "@storybook/react";
import { Button } from '@/components/atoms/Button'


// Meta 객체: 컴포넌트와 관련된 메타데이터 정의
const meta: Meta<typeof Button> = {
  title: 'Atoms/Button/Button', // Storybook에서 표시될 경로
  component: Button, // 대상 컴포넌트
  tags: ['autodocs'], // 자동 문서화를 위한 태그
  argTypes: {
    size: { control: 'radio', options: ['sm', 'md', 'lg'] }, // size prop에 대한 컨트롤러 정의
    isDisabled: { control: 'boolean' }, // isDisabled prop에 대한 컨트롤러 정의
  },
};

export default meta;

// StoryObj 타입을 사용한 스토리 정의
type Story = StoryObj<typeof Button>;

// 기본 버튼 스토리
export const Default: Story = {
  args: {
    children: 'Default Button',
    size: 'md',
    isDisabled: false,
  },
};

// 비활성화된 버튼 스토리
export const Disabled: Story = {
  args: {
    children: 'Disabled Button',
    size: 'md',
    isDisabled: true,
  },
};

// 작은 크기의 버튼 스토리
export const Small: Story = {
  args: {
    children: 'Small Button',
    size: 'sm',
  },
};

// 큰 크기의 버튼 스토리
export const Large: Story = {
  args: {
    children: 'Large Button',
    size: 'lg',
  },
};