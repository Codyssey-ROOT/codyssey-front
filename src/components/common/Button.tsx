import { Button as ButtonPrimitive } from "@base-ui/react/button";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utils/cn";

// Figma: Button, Flexable Button, CTA / Bottom Button
const buttonVariants = cva(
  "inline-flex h-13 shrink-0 items-center justify-center gap-1.5 rounded-16 px-5 text-bottom-button whitespace-nowrap transition-colors outline-none select-none focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:border-transparent disabled:bg-surface-7 disabled:text-fg-disable [&_svg]:size-5 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary: "bg-surface-6 text-white hover:bg-surface-6/90 active:bg-surface-6/80",
        secondary:
          "border border-border-1 bg-white text-fg-title hover:bg-bg-gray active:bg-surface-7",
        blue: "bg-primary text-white hover:bg-primary-hover active:bg-primary-active",
      },
      isFullWidth: {
        true: "w-full",
      },
    },
    defaultVariants: {
      variant: "primary",
    },
  },
);

type ButtonProps = ButtonPrimitive.Props & VariantProps<typeof buttonVariants>;

const Button = ({ className, variant, isFullWidth, ...props }: ButtonProps) => {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, isFullWidth, className }))}
      {...props}
    />
  );
};

export { Button, buttonVariants, type ButtonProps };
