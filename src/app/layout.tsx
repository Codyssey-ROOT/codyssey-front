import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import type { ReactNode } from "react";
import "@/styles/globals.css";
import { QueryProvider } from "@/components/providers/query-provider";

const pretendard = localFont({
  src: "../../node_modules/pretendard/dist/web/variable/woff2/PretendardVariable.woff2",
  variable: "--font-pretendard",
  weight: "45 920",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Codyssey",
  description: "Codyssey",
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
        </QueryProvider>
      </body>
    </html>
  );
};

export default RootLayout;
