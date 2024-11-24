import Link from 'next/link';

import Logo from '@/components/icon/Logo';

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Link href="/">
        <Logo className="w-12 h-12 mb-8" fill="#e60022" />
      </Link>
      {children}
    </div>
  );
}
