import { LoaderCircle } from "lucide-react";
import type { ComponentProps } from "react";
import { cn } from "@/utils/cn";

// Centered spinner for a page or section waiting on data.
type LoadingStateProps = ComponentProps<"output"> & {
  label?: string;
};

const LoadingState = ({ label = "불러오는 중이에요", className, ...props }: LoadingStateProps) => {
  return (
    <output
      data-slot="loading-state"
      className={cn("flex flex-1 flex-col items-center justify-center gap-3", className)}
      {...props}
    >
      <LoaderCircle aria-hidden className="size-8 animate-spin text-primary" strokeWidth={2} />
      <p className="text-body-6 text-fg-secondary-2">{label}</p>
    </output>
  );
};

export { LoadingState, type LoadingStateProps };
