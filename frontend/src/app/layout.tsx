import './globals.css';

import type { Metadata } from 'next';

import ClientProvider from '@/components/shared/ClientProvider';
import ToastContainerWrapper from '@/components/shared/ToastContainerWrapper';

export const metadata: Metadata = {
  title: '그린다레스트',
  description: '이미지 공유 서비스',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        <ClientProvider>
          <div className="max-w-[1100px] mx-auto px-4">{children}</div>
        </ClientProvider>
        <ToastContainerWrapper />
      </body>
    </html>
  );
}
