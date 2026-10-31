import type { ComponentProps } from "react";
import { cn } from "@/utils/cn";

// Onboarding step dots. `current` is 0-based.
type PageIndicatorProps = ComponentProps<"div"> & {
  total: number;
  current: number;
};

const PageIndicator = ({ total, current, className, ...props }: PageIndicatorProps) => {
  return (
    <div
      data-slot="page-indicator"
      className={cn("flex items-center justify-center gap-1.5", className)}
      {...props}
    >
      <span className="sr-only">{`${total}단계 중 ${current + 1}단계`}</span>
      {Array.from({ length: total }, (_, index) => (
        <span
          key={index}
          aria-hidden
          className={cn(
            "size-1.5 rounded-full bg-fg-disable-light",
            index === current && "bg-fg-title",
          )}
        />
      ))}
    </div>
  );
};

export { PageIndicator, type PageIndicatorProps };
