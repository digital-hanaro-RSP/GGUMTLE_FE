import { ImageInputRef } from '@/components/atoms/Inputs';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof ImageInputRef> = {
  title: 'Atoms/Input/ImageInput',
  component: ImageInputRef,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div
        style={{
          padding: '20px',
          backgroundColor: '#ffffff',
          width: '300px',
          height: '300px',
        }}
      >
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    width: 100,
    height: 100,
    onChange: (e) => {
      console.log('이미지가 변경되었습니다:', e.target.files?.[0]);
    },
  },
};

export const CustomClass: Story = {
  args: {
    width: 200,
    height: 300,
    className: 'bg-gray-100',
    onChange: (e) => {
      console.log('이미지가 변경되었습니다:', e.target.files?.[0]);
    },
  },
};
