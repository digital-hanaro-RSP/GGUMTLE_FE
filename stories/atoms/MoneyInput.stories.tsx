import { MoneyInputRef } from '@/components/atoms/Inputs';
import { Meta, StoryObj } from '@storybook/react';
import { useEffect, useRef } from 'react';

const meta: Meta = {
  title: 'Atoms/Input/MoneyInput',
  component: MoneyInputRef,
  tags: ['autodocs'],
  decorators: [(Story) => <Story />],
};

export default meta;

type Story = StoryObj<typeof MoneyInputRef>;

export const Default: Story = {
  render: (args) => {
    const MoneyInputWithRef = () => {
      const inputRef = useRef<HTMLInputElement>(null);

      useEffect(() => {
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }, []);

      return <MoneyInputRef ref={inputRef} {...args} />;
    };

    return <MoneyInputWithRef />;
  },
};

export const Filled: Story = {
  render: (args) => {
    const MoneyInputWithValue = () => {
      const inputRef = useRef<HTMLInputElement>(null);

      useEffect(() => {
        if (inputRef.current) {
          inputRef.current.value = '1,000,000원';
          inputRef.current.focus();
        }
      }, []);

      return <MoneyInputRef ref={inputRef} {...args} />;
    };

    return <MoneyInputWithValue />;
  },
};
