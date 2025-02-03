import { PortfolioRecommendModal } from '@/components/molecules/PortfolioRecommendModal';
import {
  InvestmentType,
  getPortfolioRecommendationResponse,
} from '@/types/Portfolio';
import type { Meta, StoryObj } from '@storybook/react';
import { SessionProvider } from 'next-auth/react';

// Mock session 데이터
const mockSession = {
  user: {
    id: 'John Doe',
    name: 'John Doe',
    jwt: 'johndoe@example.com',
    permission: 3,
  },
  expires: '9999-12-31T23:59:59.999Z',
};

const dummyRecommendation: getPortfolioRecommendationResponse = {
  recommended: true,
  investmentType: 'BALANCED' as InvestmentType,
  estimatedInvestRatio: 0.7,
};

const meta: Meta<typeof PortfolioRecommendModal> = {
  title: 'Molecules/PortfolioRecommendModal',
  component: PortfolioRecommendModal,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <SessionProvider session={mockSession}>
        <div className='h-[700px] relative flex flex-col gap-[20px]'>
          <Story />
        </div>
      </SessionProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof PortfolioRecommendModal>;

export const Default: Story = {
  args: {
    recommended: dummyRecommendation.recommended,
    investmentType: dummyRecommendation.investmentType,
    estimatedInvestRatio: dummyRecommendation.estimatedInvestRatio,
    setIsModalOpen: (open: boolean) => console.log('setIsModalOpen:', open),
  },
};
