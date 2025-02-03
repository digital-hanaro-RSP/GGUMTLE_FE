import {
  PortfolioModal,
  PortfolioModalProps,
} from '@/components/molecules/PortfolioModal';
import { InvestmentType, PortfolioTemplate } from '@/types/Portfolio';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof PortfolioModal> = {
  title: 'Molecules/PortfolioModal',
  component: PortfolioModal,
  tags: ['autodocs'],
  decorators: (Story) => (
    <div style={{ height: '700px' }}>
      <Story />
    </div>
  ),
};

export default meta;
type Story = StoryObj<PortfolioModalProps>;

const dummyTemplates: PortfolioTemplate[] = [
  { name: 'CONSERVATIVE' } as PortfolioTemplate,
  { name: 'MODERATELY_CONSERVATIVE' } as PortfolioTemplate,
  { name: 'BALANCED' } as PortfolioTemplate,
  { name: 'MODERATELY_AGGRESSIVE' } as PortfolioTemplate,
  { name: 'AGGRESSIVE' } as PortfolioTemplate,
];

const dummyOnClose = () => console.log('Modal closed');
const dummyOnConfirm = (type: InvestmentType) =>
  console.log('Confirmed with type:', type);
const dummySetError = (error: string | null) =>
  console.log('Set error:', error);

export const Default: Story = {
  args: {
    isOpen: true,
    onClose: dummyOnClose,
    onConfirm: dummyOnConfirm,
    templates: dummyTemplates,
    isLoading: false,
    error: null,
    setError: dummySetError,
    currentInvestmentType: 'CONSERVATIVE',
  },
};

export const Loading: Story = {
  args: {
    isOpen: true,
    onClose: dummyOnClose,
    onConfirm: dummyOnConfirm,
    templates: dummyTemplates,
    isLoading: true,
    error: null,
    setError: dummySetError,
    currentInvestmentType: 'CONSERVATIVE',
  },
};

export const WithError: Story = {
  args: {
    isOpen: true,
    onClose: dummyOnClose,
    onConfirm: dummyOnConfirm,
    templates: dummyTemplates,
    isLoading: false,
    error: '포트폴리오 템플릿 로드에 실패하였습니다.',
    setError: dummySetError,
    currentInvestmentType: 'CONSERVATIVE',
  },
};
