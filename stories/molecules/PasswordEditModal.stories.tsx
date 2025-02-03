import {
  PasswordEditModal,
  PasswordEditModalProps,
} from '@/components/molecules/PasswordEditModal';
import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

const meta: Meta<typeof PasswordEditModal> = {
  title: 'Molecules/PasswordEditModal',
  component: PasswordEditModal,
  tags: ['autodocs'],
  decorators: (Story) => (
    <div style={{ height: '500px' }}>
      <Story />
    </div>
  ),
};

export default meta;
type Story = StoryObj<PasswordEditModalProps>;

// 이벤트 발생 시 콘솔에 로그를 출력
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const logAction = (name: string) => (value?: any) =>
  console.log(`${name}:`, value);

const ModalWrapper = (args: PasswordEditModalProps) => {
  const [isVisible, setIsVisible] = useState(true);

  const handleClose = () => {
    setIsVisible(false);
    args.onClose();
  };

  if (!isVisible) {
    return (
      <div style={{ padding: '1rem', textAlign: 'center' }}>
        <p>모달이 닫혔습니다</p>
        <button
          onClick={() => setIsVisible(true)}
          style={{
            marginTop: '1rem',
            padding: '0.5rem 1rem',
            borderRadius: '4px',
            border: '1px solid #ccc',
            cursor: 'pointer',
          }}
        >
          모달 열기
        </button>
      </div>
    );
  }

  return <PasswordEditModal {...args} onClose={handleClose} />;
};

export const Default: Story = {
  args: {
    onSubmit: logAction('onSubmit'),
    onClose: logAction('onClose'),
  },
  render: (args) => <ModalWrapper {...args} />,
};
