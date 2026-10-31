"use client";

import { Switch } from "@base-ui/react/switch";
import { cn } from "@/utils/cn";

// Figma: Toggle
const Toggle = ({ className, ...props }: Switch.Root.Props) => {
  return (
    <Switch.Root
      data-slot="toggle"
      className={cn(
        "inline-flex h-7 w-13 shrink-0 items-center rounded-full bg-surface-1 p-0.5 transition-colors outline-none focus-visible:ring-3 focus-visible:ring-ring/50 data-checked:bg-primary data-disabled:opacity-50",
        className,
      )}
      {...props}
    >
      <Switch.Thumb className="size-6 rounded-full bg-white shadow-card transition-transform data-checked:translate-x-6" />
    </Switch.Root>
  );
};

export { Toggle };
