import ProductCard from '@/components/molecules/ProductCard';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof ProductCard> = {
  title: 'Molecules/ProductCard',
  component: ProductCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ProductCard>;

export const SavingTimeDeposit: Story = {
  args: {
    productType: 'savingTimeDeposit',
    productName: 'OSB저축은행 정기예금 1년 DB',
    riskRating: '매우낮은위험',
    yield: '3.60%',
    bannerImageUrl: null,
    link: 'https://example.com/ads/savingtimedeposit',
  },
};

export const Investment: Story = {
  args: {
    productType: 'investment',
    productName: '미래에셋TIGER200중공업증권상장지수투자신탁(주식)',
    riskRating: '매우높은위험',
    yield: '78.64%',
    bannerImageUrl: null,
    link: 'https://example.com/ads/investment',
  },
};

export const Pension: Story = {
  args: {
    productType: 'pension',
    productName: '삼성글로벌메타버스증권자투자신탁UH(주식)Cpe(퇴직연금)',
    riskRating: '높은위험',
    yield: '51.93%',
    bannerImageUrl: null,
    link: 'https://example.com/ads/pension',
  },
};
