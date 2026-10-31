"use client";

import { House, LayoutGrid, User } from "lucide-react";
import { usePathname } from "next/navigation";
import { TabBar, type TabBarItem } from "./TabBar";

const MAIN_TAB_ITEMS: TabBarItem[] = [
  { href: "/home", label: "홈", icon: <House aria-hidden strokeWidth={1.5} /> },
  { href: "/storage", label: "보관함", icon: <LayoutGrid aria-hidden strokeWidth={1.5} /> },
  { href: "/myPage", label: "내 정보", icon: <User aria-hidden strokeWidth={1.5} /> },
];

export const MainTabBar = () => {
  const pathname = usePathname();
  const activeHref = MAIN_TAB_ITEMS.find(({ href }) => pathname.startsWith(href))?.href ?? "";

  return <TabBar items={MAIN_TAB_ITEMS} activeHref={activeHref} />;
};
