import { InstallPWA } from '@/components/atoms/InstallPWA';
import type { Meta, StoryObj } from '@storybook/react';
import { useEffect } from 'react';

const meta: Meta<typeof InstallPWA> = {
  title: 'Atoms/InstallPWA',
  component: InstallPWA,
  tags: ['autodocs'],
  decorators: (Story) => (
    <div style={{ height: '500px', position: 'relative' }}>
      <Story />
    </div>
  ),
};

export default meta;
type Story = StoryObj<typeof InstallPWA>;

interface BeforeInstallPromptEvent extends Event {
  preventDefault: () => void;
  prompt: () => Promise<void>;
  userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
}

const InstallPWAWrapper = () => {
  useEffect(() => {
    const simulatedEvent = new CustomEvent(
      'beforeinstallprompt'
    ) as unknown as BeforeInstallPromptEvent;

    simulatedEvent.preventDefault = () => {};

    simulatedEvent.prompt = async () => {
      console.log('prompt() 실행');
      return;
    };

    simulatedEvent.userChoice = Promise.resolve({
      outcome: 'accepted',
      platform: 'web',
    });

    window.dispatchEvent(simulatedEvent);
  }, []);

  return <InstallPWA />;
};

export const Default: Story = {
  render: () => <InstallPWAWrapper />,
};
