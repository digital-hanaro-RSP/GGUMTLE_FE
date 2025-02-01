import ProductCard from '@/components/molecules/ProductCard';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof ProductCard> = {
  title: 'Molecules/ProductCard',
  component: ProductCard,
  parameters: {
    layout: 'centered',
  },
  // 데코레이터 추가: 부모 컨테이너의 최대 너비를 500px로 제한
  decorators: [
    (Story) => (
      <div style={{ maxWidth: '500px', margin: '0 auto' }}>
        <Story />
      </div>
    ),
  ],
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ProductCard>;

export const SavingTimeDeposit: Story = {
  args: {
    adsData: {
      mainAds: [
        {
          id: 1,
          productType: 'SAVING_TIME_DEPOSIT',
          productName: 'OSB저축은행 정기예금 1년 DB',
          riskRating: '매우낮은위험',
          yield: '3.60%',
          link: 'https://example.com/ads/savingtimedeposit',
          locationType: 'default',
        },
        {
          id: 2,
          productType: 'SAVING_TIME_DEPOSIT',
          productName: 'OSB저축은행 정기예금 2년 DB',
          riskRating: '매우낮은위험',
          yield: '3.80%',
          link: 'https://example.com/ads/savingtimedeposit-2',
          locationType: 'default',
        },
      ],
    },
  },
};

export const Investment: Story = {
  args: {
    adsData: {
      mainAds: [
        {
          id: 3,
          productType: 'INVESTMENT',
          productName: '미래에셋TIGER200중공업증권상장지수투자신탁(주식)',
          riskRating: '매우높은위험',
          yield: '78.64%',
          link: 'https://example.com/ads/investment',
          locationType: 'default',
        },
        {
          id: 4,
          productType: 'INVESTMENT',
          productName:
            '미래에셋TIGER200중공업증권상장지수투자신탁(주식) - 추가',
          riskRating: '매우높은위험',
          yield: '80.00%',
          link: 'https://example.com/ads/investment-2',
          locationType: 'default',
        },
      ],
    },
  },
};

export const Pension: Story = {
  args: {
    adsData: {
      mainAds: [
        {
          id: 5,
          productType: 'PENSION',
          productName: '삼성글로벌메타버스증권자투자신탁UH(주식)Cpe(퇴직연금)',
          riskRating: '높은위험',
          yield: '51.93%',
          link: 'https://example.com/ads/pension',
          locationType: 'default',
        },
        {
          id: 6,
          productType: 'PENSION',
          productName:
            '삼성글로벌메타버스증권자투자신탁UH(주식)Cpe(퇴직연금) - 추가',
          riskRating: '높은위험',
          yield: '52.50%',
          link: 'https://example.com/ads/pension-2',
          locationType: 'default',
        },
      ],
    },
  },
};
