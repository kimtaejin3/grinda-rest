// import './globals.css';

import type { Metadata } from 'next';
import { ToastContainer } from 'react-toastify';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import bundleCss from '!raw-loader!../styles/tailwindSSR.css';
import ClientProvider from '@/components/ClientProvider';

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
        <style
          key="custom-tailwind"
          dangerouslySetInnerHTML={{ __html: bundleCss }}
        />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        <ClientProvider>
          <div className="max-w-[1100px] mx-auto px-4">{children}</div>
        </ClientProvider>
        <ToastContainer
          position="top-center"
          // autoClose={2000}
          hideProgressBar={false}
          theme="light"
          closeButton={false}
          rtl={false}
        />
      </body>
    </html>
  );
}
