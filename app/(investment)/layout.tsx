import '../globals.css';

// app/layout.tsx
export default function MydataLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='relative mx-auto max-w-screen-md min-h-screen bg-background pb-[58px]'>
      {children}
    </div>
  );
}
