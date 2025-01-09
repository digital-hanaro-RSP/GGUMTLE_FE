import { ImgButton } from '@/components/atoms/Button';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof ImgButton> = {
  title: 'Atoms/ImgButton',
  component: ImgButton,
};

export default meta;

type Story = StoryObj<typeof ImgButton>;

export const DefaultImageButton: Story = {
  args: {
    src: 'https://picsum.photos/100/100',
    size: 'md',
  },
};

export const SmallImageButton: Story = {
  args: {
    src: 'https://picsum.photos/100/100',
    size: 'sm',
  },
};

export const LargeImageButtonWithText: Story = {
  args: {
    src: 'https://picsum.photos/100/100',
    size: 'lg',
  },
};
