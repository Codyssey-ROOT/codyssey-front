import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";
import { cn } from "@/utils/cn";

const badgeVariants = cva(
  "inline-flex w-fit shrink-0 items-center gap-1 px-2.5 py-1 text-body-5 whitespace-nowrap [&_svg]:size-3.5 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        info: "rounded-full bg-surface-2 text-primary-dark",
        danger: "rounded-8 bg-warning text-white",
        success: "rounded-full border border-success bg-white text-success",
      },
    },
    defaultVariants: {
      variant: "info",
    },
  },
);

type BadgeProps = ComponentProps<"span"> & VariantProps<typeof badgeVariants>;

const Badge = ({ className, variant, ...props }: BadgeProps) => {
  return (
    <span data-slot="badge" className={cn(badgeVariants({ variant, className }))} {...props} />
  );
};

export { Badge, badgeVariants, type BadgeProps };
