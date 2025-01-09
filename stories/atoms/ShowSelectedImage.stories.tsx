// ShowSelectedImage.stories.tsx
import ShowSelectedImage, {
  ShowSelectedImageRef,
} from '@/components/atoms/ShowSelectedImage';
import type { Meta, StoryObj } from '@storybook/react';
import { useRef } from 'react';

const meta: Meta<typeof ShowSelectedImage> = {
  title: 'Components/ShowSelectedImage',
  component: ShowSelectedImage,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    imageUrl: {
      control: 'text',
      description: '표시할 이미지 URL',
    },
    onRemove: {
      action: 'removed',
      description: '이미지 제거 시 호출되는 콜백 함수',
    },
  },
};

export default meta;
type Story = StoryObj<typeof ShowSelectedImage>;

export const Default: Story = {
  args: {
    imageUrl: 'https://picsum.photos/100/100',
  },
};

export const WithRemoveCallback: Story = {
  args: {
    ...Default.args,
    onRemove: () => console.log('Image removed'),
  },
};

// ref를 테스트하기 위한 래퍼 컴포넌트
const ShowSelectedImageWithRef = () => {
  const imageRef = useRef<ShowSelectedImageRef>(null);

  return (
    <div>
      <ShowSelectedImage
        ref={imageRef}
        imageUrl='https://picsum.photos/100/100'
        onRemove={() => console.log('Removed via callback')}
      />
      <button
        onClick={() => imageRef.current?.remove()}
        className='mt-4 px-4 py-2 bg-primary-main text-white rounded'
      >
        Remove via Ref
      </button>
    </div>
  );
};

export const WithRef: Story = {
  args: {
    imageUrl: '',
  },

  render: () => <ShowSelectedImageWithRef />,
};

export const ErrorState: Story = {
  args: {
    imageUrl: 'invalid-url.jpg',
  },
};

// 이미지 로딩 상태를 시뮬레이션하는 스토리
export const LoadingState: Story = {
  args: {
    imageUrl: 'https://picsum.photos/100/100?delay=2000',
  },
};
