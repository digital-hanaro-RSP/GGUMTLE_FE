import '../globals.css';

// app/layout.tsx
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='relative mx-auto max-w-screen-md min-h-screen bg-background'>
      {children}
    </div>
  );
}
