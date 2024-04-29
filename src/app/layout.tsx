import type { Metadata } from "next";
import "../styles/globals.css";
import RQProvider from "./_component/RQProvider";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "SWYP",
  description: "SWYP",
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
