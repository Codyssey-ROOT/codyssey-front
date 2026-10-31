"use client";

import { Tabs } from "@base-ui/react/tabs";
import { cn } from "@/utils/cn";

// Figma: Menu (segmented tabs with underline). Render the matching content yourself based on `value`.
type MenuItem = {
  value: string;
  label: string;
};

type MenuProps = Omit<Tabs.Root.Props, "children"> & {
  items: MenuItem[];
};

const Menu = ({ items, className, ...props }: MenuProps) => {
  return (
    <Tabs.Root data-slot="menu" className={cn("w-full", className)} {...props}>
      <Tabs.List className="flex border-b border-border-1">
        {items.map((item) => (
          <Tabs.Tab
            key={item.value}
            value={item.value}
            className="-mb-px h-12 flex-1 border-b-2 border-transparent text-menu text-fg-disable outline-none focus-visible:bg-bg-gray data-active:border-fg-title data-active:font-semibold data-active:text-fg-title"
          >
            {item.label}
          </Tabs.Tab>
        ))}
      </Tabs.List>
    </Tabs.Root>
  );
};

export { Menu, type MenuItem, type MenuProps };
