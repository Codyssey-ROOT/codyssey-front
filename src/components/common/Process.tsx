import { CircleCheck } from "lucide-react";
import type { ComponentProps } from "react";
import { cn } from "@/utils/cn";

// Figma: Process (completed step)
const Process = ({ className, children, ...props }: ComponentProps<"p">) => {
  return (
    <p
      data-slot="process"
      className={cn("flex items-center gap-1.5 text-body-6 text-fg-title", className)}
      {...props}
    >
      <CircleCheck aria-hidden className="size-5 shrink-0 fill-success text-white" />
      {children}
    </p>
  );
};

export { Process };
