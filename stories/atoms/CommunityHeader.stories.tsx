import CommunityHeader, { Tab } from '@/components/atoms/CommunityHeader';
import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

const meta: Meta<typeof CommunityHeader> = {
  title: 'Atoms/CommunityHeader',
  component: CommunityHeader,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div className='w-[800px]'>
        <Story />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof CommunityHeader>;

const CommunityHeaderWithHooks = ({ defaultTab }: { defaultTab: Tab }) => {
  const [selectedTab, setSelectedTab] = useState<Tab>(defaultTab);

  return (
    <CommunityHeader
      selectedTab={selectedTab}
      onTabChange={(tab) => setSelectedTab(tab)}
    />
  );
};

export const Default: Story = {
  render: () => <CommunityHeaderWithHooks defaultTab='popular' />,
};

export const DreamGroup: Story = {
  render: () => <CommunityHeaderWithHooks defaultTab='group' />,
};

export const MyDreamGroup: Story = {
  render: () => <CommunityHeaderWithHooks defaultTab='mygroup' />,
};
