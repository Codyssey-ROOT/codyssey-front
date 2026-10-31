import { Button as ButtonPrimitive } from "@base-ui/react/button";
import { Plus } from "lucide-react";
import { cn } from "@/utils/cn";

// Icon-only, so a label for screen readers is required.
type FloatingButtonProps = ButtonPrimitive.Props & { "aria-label": string };

const FloatingButton = ({ className, children, ...props }: FloatingButtonProps) => {
  return (
    <ButtonPrimitive
      data-slot="floating-button"
      className={cn(
        "inline-flex size-14 shrink-0 items-center justify-center rounded-full bg-surface-6 text-white shadow-floating transition-colors outline-none hover:bg-surface-6/90 active:bg-surface-6/80 focus-visible:ring-3 focus-visible:ring-ring/50 [&_svg]:size-6",
        className,
      )}
      {...props}
    >
      {children ?? <Plus aria-hidden />}
    </ButtonPrimitive>
  );
};

export { FloatingButton, type FloatingButtonProps };
