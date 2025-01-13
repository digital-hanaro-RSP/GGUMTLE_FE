import { RadioItem } from '@/components/atoms/RadioItem';
import { SurveyCard } from '@/components/molecules/SurveyCard';
import { Meta, StoryObj } from '@storybook/react';

// RadioItem 컴포넌트 임포트

const meta: Meta<typeof SurveyCard> = {
  title: 'Molecules/SurveyCard',
  component: SurveyCard,
  argTypes: {
    sid: {
      description: '설문 카드의 고유 ID',
      control: { type: 'number' },
      defaultValue: 1,
    },
    question: {
      description: '질문 내용',
      control: { type: 'text' },
      defaultValue: '사용자의 연령대를 선택해주세요.',
    },
    direction: {
      description: '라디오 버튼 배치 방향',
      control: { type: 'radio' },
      options: ['horizontal', 'vertical'],
      defaultValue: 'horizontal',
    },
  },
};

export default meta;
type Story = StoryObj<typeof SurveyCard>;

export const Default: Story = {
  args: {
    sid: 1,
    question: (
      <>
        사용자의 <b className='text-primary-main'>연령대</b>를 선택해주세요.
      </>
    ),
    direction: 'horizontal',
    children: (
      <>
        <RadioItem
          contentDirection='vertical'
          shape='circle'
          id='op1'
          name='q1'
          value={2.5}
        >
          19세 이하
        </RadioItem>
        <RadioItem
          contentDirection='vertical'
          shape='circle'
          id='op2'
          name='q1'
          value={2.5}
        >
          20대
        </RadioItem>
        <RadioItem
          contentDirection='vertical'
          shape='circle'
          id='op3'
          name='q1'
          value={2}
        >
          30대
        </RadioItem>
        <RadioItem
          contentDirection='vertical'
          shape='circle'
          id='op4'
          name='q1'
          value={1.5}
        >
          40대
        </RadioItem>
        <RadioItem
          contentDirection='vertical'
          shape='circle'
          id='op5'
          name='q1'
          value={1}
        >
          50대
        </RadioItem>
        <RadioItem
          contentDirection='vertical'
          shape='circle'
          id='op6'
          name='q1'
          value={0.5}
        >
          60대 이상
        </RadioItem>
      </>
    ),
  },
};

export const VerticalLayout: Story = {
  args: {
    ...Default.args,
    direction: 'vertical', // 세로 방향으로 변경
  },
};
