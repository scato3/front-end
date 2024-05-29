import type { Metadata } from "next";
import { Suspense } from "react";
import "../styles/globals.css";
import RQProvider from "./_component/RQProvider";

export const metadata: Metadata = {
  title: "쇼터디 - 딱 맞는 온라인 스터디메이트 찾기",
  description: "나와 딱 맞는 온라인 스터디메이트를 만나 매일 할일을 공유하고 함께 목표를 달성하세요",
  icons: {
    icon: "/Icon_shortudy.ico",
  },
  openGraph: {
    title: "쇼터디 - 딱 맞는 온라인 스터디메이트 찾기",
    description: "나와 딱 맞는 온라인 스터디메이트를 만나 매일 할일을 공유하고 함께 목표를 달성하세요",
    images: [
      {
        url: "https://raw.githubusercontent.com/SWYP-LUCKY-SEVEN/front-end/develop/public/Icon_Logo.png",
        width: 1900,
        height: 600,
      },
    ],

    siteName: "쇼터디 - 딱 맞는 온라인 스터디메이트 찾기",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <RQProvider>
          <Suspense>
            <div className="root_container">{children}</div>
          </Suspense>
        </RQProvider>
        <div id="portal" />
      </body>
    </html>
  );
}
