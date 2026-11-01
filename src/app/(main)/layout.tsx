import type { ReactNode } from "react";
import { HomeHeader } from "@/components/home/HomeHeader";

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="flex h-dvh flex-col">
      <HomeHeader />
      <div className="flex min-h-0 flex-1 flex-col">{children}</div>
    </div>
  );
};

export default MainLayout;
