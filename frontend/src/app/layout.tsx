import './globals.css';

import type { Metadata } from 'next';

import ClientProvider from '@/components/ClientProvider';

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ClientProvider>
          <div className="max-w-[1100px] mx-auto px-4">{children}</div>
        </ClientProvider>
      </body>
    </html>
  );
}
