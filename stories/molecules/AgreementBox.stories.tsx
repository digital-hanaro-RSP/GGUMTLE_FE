import {
  AgreementBox,
  AgreementBoxProps,
} from '@/components/molecules/AgreementBox';
import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

const meta: Meta<typeof AgreementBox> = {
  title: 'Molecules/AgreementBox',
  component: AgreementBox,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<AgreementBoxProps>;

const StatefulWrapper = (args: AgreementBoxProps) => {
  const [checked, setChecked] = useState(args.checked);

  return (
    <div style={{ padding: '1rem' }}>
      <AgreementBox
        {...args}
        checked={checked}
        onChange={(newChecked) => setChecked(newChecked)}
      />
    </div>
  );
};

export const Default: Story = {
  args: {
    title: '전체 동의',
    checked: false,
    isOpen: true,
  },
  render: (args) => <StatefulWrapper {...args} />,
};

export const Closed: Story = {
  args: {
    title: '전체 동의',
    checked: false,
    isOpen: false,
  },
  render: (args) => <StatefulWrapper {...args} />,
};

export const PreChecked: Story = {
  args: {
    title: '전체 동의',
    checked: true,
    isOpen: true,
  },
  render: (args) => <StatefulWrapper {...args} />,
};
