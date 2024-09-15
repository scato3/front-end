import type { Metadata } from 'next';

import '../styles/global.css';
import QueryProvider from '@/context/queryProvider';

import localFont from 'next/font/local';
import Footer from '@/component/common/footer';
import { AlertProvider } from '@/context/alertProvider';
import FromProvider from '@/context/fromProvider';

const pretendard = localFont({
  src: '../../public/fonts/PretendardVariable.woff2',
  display: 'swap',
  weight: '45 920',
  variable: '--font-pretendard',
});

export const metadata: Metadata = {
  title: '쇼터디 - 딱 맞는 온라인 스터디메이트 찾기',
  description:
    '나와 딱 맞는 온라인 스터디메이트를 만나 매일 할일을 공유하고 함께 목표를 달성하세요',
  openGraph: {
    title: '쇼터디 - 딱 맞는 온라인 스터디메이트 찾기',
    description:
      '나와 딱 맞는 온라인 스터디메이트를 만나 매일 할일을 공유하고 함께 목표를 달성하세요',
    images: [
      {
        url: 'https://raw.githubusercontent.com/SWYP-LUCKY-SEVEN/front-end/develop/public/Icon_Logo.png',
        width: 1900,
        height: 600,
      },
    ],

    siteName: '쇼터디 - 딱 맞는 온라인 스터디메이트 찾기',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="kr" className={`${pretendard.variable}`}>
      <body className={pretendard.className}>
        <QueryProvider>
          <AlertProvider>
            <FromProvider>
              <div className="root_container">{children}</div>
            </FromProvider>
          </AlertProvider>
          <Footer />
        </QueryProvider>
        <div id="portal"></div>
      </body>
    </html>
  );
}
