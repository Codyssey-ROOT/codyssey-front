import type { ComponentProps } from "react";
import { cn } from "@/utils/cn";

// Figma: CTA / Bottom Button, 2 CTA / Bottom 2 Button. Sticks to the bottom and respects the iOS safe area.
const BottomCTA = ({ className, ...props }: ComponentProps<"div">) => {
  return (
    <div
      data-slot="bottom-cta"
      className={cn(
        "sticky bottom-0 flex gap-2 bg-white px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]",
        className,
      )}
      {...props}
    />
  );
};

export { BottomCTA };
