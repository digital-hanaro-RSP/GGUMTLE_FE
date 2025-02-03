import { TermsModal, TermsModalProps } from '@/components/molecules/TermsModal';
import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

const meta: Meta<typeof TermsModal> = {
  title: 'Atoms/TermsModal',
  component: TermsModal,
  tags: ['autodocs'],
  decorators: (Story) => (
    <div style={{ height: '500px' }}>
      <Story />
    </div>
  ),
};

export default meta;
type Story = StoryObj<TermsModalProps>;

const TermsModalWrapper = (props: TermsModalProps) => {
  const [open, setOpen] = useState(props.isOpen);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div className='p-4'>
      <button
        onClick={handleOpen}
        className='mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600'
      >
        Open Modal
      </button>
      <TermsModal isOpen={open} onClose={handleClose}>
        <div className='p-6'>
          <h2 className='text-xl font-bold mb-2'>Terms and Conditions</h2>
          <p className='mb-4'>약관 및 조건에 대한 내용</p>
          <button
            onClick={handleClose}
            className='px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600'
          >
            Close Modal
          </button>
        </div>
      </TermsModal>
    </div>
  );
};

export const Default: Story = {
  args: {
    isOpen: false,
    onClose: () => {},
    children: <div>Placeholder content</div>,
  },
  render: (args) => <TermsModalWrapper {...args} />,
};
