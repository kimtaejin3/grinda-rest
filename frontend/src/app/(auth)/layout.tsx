import Logo from '@/components/icon/Logo';

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Logo className="w-12 h-12 mb-8" fill="#e60022" />
      {children}
    </div>
  );
}
