"use client";

import { Radio as RadioPrimitive } from "@base-ui/react/radio";
import { RadioGroup as RadioGroupPrimitive } from "@base-ui/react/radio-group";
import { cn } from "@/utils/cn";

// Figma: Radio Button
const RadioGroup = ({ className, ...props }: RadioGroupPrimitive.Props) => {
  return (
    <RadioGroupPrimitive
      data-slot="radio-group"
      className={cn("flex flex-col gap-3", className)}
      {...props}
    />
  );
};

const Radio = ({ className, ...props }: RadioPrimitive.Root.Props) => {
  return (
    <RadioPrimitive.Root
      data-slot="radio"
      className={cn(
        "flex size-6 shrink-0 items-center justify-center rounded-full border-2 border-border-1 bg-white outline-none focus-visible:ring-3 focus-visible:ring-ring/50 data-checked:border-primary data-disabled:opacity-50",
        className,
      )}
      {...props}
    >
      <RadioPrimitive.Indicator className="size-3 rounded-full bg-primary" />
    </RadioPrimitive.Root>
  );
};

export { Radio, RadioGroup };
