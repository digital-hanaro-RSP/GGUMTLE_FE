import {
  DropCard,
  DropDownTrigger,
  DropCardItemList,
  DropCardItem,
} from '@/components/molecules/DropCard';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof DropCard> = {
  title: 'Molecules/DropCard', // Storybook에서 표시될 경로
  component: DropCard,
  tags: ['autodocs'], // 자동 문서화를 활성화
  argTypes: {
    className: {
      control: 'text',
      description: '추가적인 클래스 이름을 설정합니다.',
    }
  },
};

export default meta;

type Story = StoryObj<typeof DropCard>;

export const Down: Story = {
  render: () => (
    <DropCard className='w-64 h-screen relative'>
      <DropDownTrigger className='bg-blue-500 text-white px-4 py-2 rounded'>
        Open Menu
      </DropDownTrigger>
      <DropCardItemList direction='down' isBlur={true}>
        <DropCardItem className='bg-gray-100 px-4 py-2 hover:bg-gray-200'>
          Item 1
        </DropCardItem>
        <DropCardItem className='bg-gray-100 px-4 py-2 hover:bg-gray-200'>
          Item 2
        </DropCardItem>
        <DropCardItem className='bg-gray-100 px-4 py-2 hover:bg-gray-200'>
          Item 3
        </DropCardItem>
      </DropCardItemList>
    </DropCard>
  ),
};

export const Up: Story = {
  render: () => (
    <DropCard className='relative pt-52 w-64'>
      <DropDownTrigger className='bg-blue-500 text-white px-4 py-2 rounded'>
        Open Menu
      </DropDownTrigger>
      <DropCardItemList
        isBlur={true}
        direction='up'
        className='items-center gap-2 bottom-10'
      >
        <DropCardItem className='bg-gray-100 px-4 py-2 hover:bg-gray-200'>
          Item 1
        </DropCardItem>
        <DropCardItem className='bg-gray-100 px-4 py-2 hover:bg-gray-200'>
          Item 2
        </DropCardItem>
        <DropCardItem className='bg-gray-100 px-4 py-2 hover:bg-gray-200'>
          Item 3
        </DropCardItem>
      </DropCardItemList>
    </DropCard>
  ),
};
