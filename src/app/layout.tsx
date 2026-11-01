import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import type { ReactNode } from "react";
import "@/styles/globals.css";
import { AppToast } from "@/components/common/AppToast";
import { QueryProvider } from "@/components/providers/query-provider";
import { SERVICE_NAME } from "@/const/service";

const pretendard = localFont({
  src: "../../node_modules/pretendard/dist/web/variable/woff2/PretendardVariable.woff2",
  variable: "--font-pretendard",
  weight: "45 920",
  display: "swap",
});

export const metadata: Metadata = {
  title: SERVICE_NAME,
  description: "딥페이크와 개인정보 노출로부터 내 사진을 지켜요",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#ffffff",
};

interface RootLayoutProps {
  children: ReactNode;
}

const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <html lang="ko" className={pretendard.variable} suppressHydrationWarning>
      <body
        className="font-pretendard flex min-h-screen justify-center bg-bg-gray"
        suppressHydrationWarning
      >
        <QueryProvider>
          <div className="flex min-h-screen w-full max-w-md flex-col bg-white">{children}</div>
          <AppToast />
        </QueryProvider>
      </body>
    </html>
  );
};

export default RootLayout;
