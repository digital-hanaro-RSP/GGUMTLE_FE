import { AddNewCard } from '@/components/molecules/AddNewCard';
import type { Meta, StoryObj } from '@storybook/react';

// Define metadata for the component
const meta: Meta<typeof AddNewCard> = {
  title: 'Molecules/AddNewCard',
  component: AddNewCard,
  tags: ['autodocs'],
  parameters: {
    layouts: 'fullscreen',
  },
};

export default meta;

type Story = StoryObj<typeof AddNewCard>;

// Default story for "createBucket" usage with large size
export const CreateBucketLarge: Story = {
  args: {
    usage: 'createBucket',
    size: 'lg',
    className: '',
  },
};

// Story for "createBucket" usage with medium size
export const CreateBucketMedium: Story = {
  args: {
    usage: 'createBucket',
    size: 'md',
    className: '',
  },
};

// Story for "recommendBucket" usage
export const RecommendBucket: Story = {
  args: {
    usage: 'recommendBucket',
    size: 'lg',
    className: '',
  },
};

// Story for "newGroup" usage
export const NewGroupLarge: Story = {
  args: {
    usage: 'newGroup',
    size: 'lg',
    className: '',
  },
};

export const NewGroupMedium: Story = {
  args: {
    usage: 'newGroup',
    size: 'md',
    className: '',
  },
};

// Story for "newPost" usage
export const NewPostLarge: Story = {
  args: {
    usage: 'newPost',
    size: 'lg',
    className: '',
  },
};

export const NewPostMedium: Story = {
  args: {
    usage: 'newPost',
    size: 'md',
    className: '',
  },
};
