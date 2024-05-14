import type { Metadata } from "next";
import { Suspense } from "react";
import "../styles/globals.css";
import RQProvider from "./_component/RQProvider";
import { SocketProvider } from "./_component/SocketProvider";

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
      <SocketProvider>
        <body>
          <RQProvider>
            <Suspense>
              <div className="root_container">{children}</div>
            </Suspense>
          </RQProvider>
          <div id="portal" />
        </body>
      </SocketProvider>
    </html>
  );
}
