import { SupportCard } from '@/components/molecules/SuppportCard';
import {
  supportEduData,
  supportJobData,
  supportTownData,
} from '@/data/Support';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta = {
  title: 'Molecules/SupportCard List',
  parameters: {
    layout: 'padded',
  },
};

export default meta;

// 교육 지원 카드 목록
export const EducationSupport: StoryObj = {
  render: () => (
    <div className='grid grid-cols-2 gap-4 p-4'>
      {supportEduData.map((item, index) => (
        <SupportCard key={index} {...item} />
      ))}
    </div>
  ),
};

// 취업 지원 카드 목록
export const JobSupport: StoryObj = {
  render: () => (
    <div className='grid grid-cols-2 gap-4 p-4'>
      {supportJobData.map((item, index) => (
        <SupportCard key={index} {...item} />
      ))}
    </div>
  ),
};

// 타운 지원 카드 목록
export const TownSupport: StoryObj = {
  render: () => (
    <div className='grid grid-cols-2 gap-4 p-4'>
      {supportTownData.map((item, index) => (
        <SupportCard key={index} {...item} />
      ))}
    </div>
  ),
};
