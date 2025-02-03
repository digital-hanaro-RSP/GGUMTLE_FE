import {
  AgreementItem,
  AgreementItemProps,
} from '@/components/atoms/AgreementItem';
import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

const meta: Meta<typeof AgreementItem> = {
  title: 'Atoms/AgreementItem',
  component: AgreementItem,
  tags: ['autodocs'],
  argTypes: {
    onChange: { action: 'changed' },
  },
};

export default meta;
type Story = StoryObj<AgreementItemProps>;

const StatefulWrapper = (args: AgreementItemProps) => {
  const [checked, setChecked] = useState(args.checked);
  return (
    <AgreementItem
      {...args}
      checked={checked}
      onChange={(newChecked) => {
        setChecked(newChecked);
        args.onChange(newChecked);
      }}
    />
  );
};

export const Default: Story = {
  args: {
    title: '이용 약관 동의',
    checked: false,
  },
  render: (args) => <StatefulWrapper {...args} />,
};

export const Checked: Story = {
  args: {
    title: '이미 동의하였습니다',
    checked: true,
  },
  render: (args) => <StatefulWrapper {...args} />,
};

export const WithSubItems: Story = {
  args: {
    title: '상세 항목 동의',
    checked: false,
    subItems: [
      '개인정보 수집 및 이용 동의',
      '마케팅 활용 동의',
      '이벤트 참여 조건 동의',
    ],
  },
  render: (args) => <StatefulWrapper {...args} />,
};
