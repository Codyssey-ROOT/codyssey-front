import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/utils/cn";

// Figma: Tab (bottom navigation)
type TabBarItem = {
  href: string;
  label: string;
  /** Icon element, colored via currentColor. */
  icon: ReactNode;
};

type TabBarProps = ComponentProps<"nav"> & {
  items: TabBarItem[];
  activeHref: string;
};

const TabBar = ({ items, activeHref, className, ...props }: TabBarProps) => {
  return (
    <nav
      data-slot="tab-bar"
      className={cn("flex bg-white pb-[env(safe-area-inset-bottom)]", className)}
      {...props}
    >
      {items.map(({ href, label, icon }) => {
        const isActive = href === activeHref;
        return (
          <Link
            key={href}
            href={href}
            aria-current={isActive ? "page" : undefined}
            className={cn(
              "flex h-16 flex-1 flex-col items-center justify-center gap-1 text-tab [&_svg]:size-6",
              isActive ? "text-fg-title" : "text-fg-disable",
            )}
          >
            {icon}
            {label}
          </Link>
        );
      })}
    </nav>
  );
};

export { TabBar, type TabBarItem, type TabBarProps };
