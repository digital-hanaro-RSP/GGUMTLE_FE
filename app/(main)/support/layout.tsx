import Header from '@/components/atoms/Header';

export default function SupportLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Header
        className='z-[6] backdrop-blur-md bg-opacity-30 w-screen max-w-screen-md fixed'
        text='지원'
        showActionButton={false}
      />

      <div className='px-5 pt-[50px]'>{children}</div>
    </div>
  );
}
