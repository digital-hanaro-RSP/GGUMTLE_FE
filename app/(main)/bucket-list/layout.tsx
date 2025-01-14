import Header from '@/components/atoms/Header';

export default function BucketListLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Header
        text='버킷리스트'
        showActionButton={false}
        showBackButton={false}
      />
      <div className='px-5'>{children}</div>
    </div>
  );
}
