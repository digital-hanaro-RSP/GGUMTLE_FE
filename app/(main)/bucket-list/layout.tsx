import Header from '@/components/atoms/Header';

export default function BucketListLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Header
        className='z-[100] backdrop-blur-md bg-opacity-30 w-screen max-w-screen-md fixed'
        text='버킷리스트'
        showActionButton={false}
      />

      <div className='px-5 pt-[50px]'>{children}</div>
    </div>
  );
}
