import Header from '@/components/shared/Header';

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="max-w-[1100px] mx-auto">
      <Header />
      {children}
    </div>
  );
}
