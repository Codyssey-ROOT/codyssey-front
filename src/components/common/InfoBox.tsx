import { cva, type VariantProps } from "class-variance-authority";
import { Info, ShieldCheck } from "lucide-react";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/utils/cn";

const infoBoxVariants = cva("flex bg-primary-light text-body-6", {
  variants: {
    variant: {
      note: "items-center gap-2 rounded-8 px-3 py-2.5 text-primary",
      summary: "flex-col gap-2 rounded-16 p-4 text-fg-secondary-1",
    },
  },
  defaultVariants: {
    variant: "note",
  },
});

type InfoBoxProps = Omit<ComponentProps<"div">, "title"> &
  VariantProps<typeof infoBoxVariants> & {
    title?: ReactNode;
  };

const InfoBox = ({ variant, title, className, children, ...props }: InfoBoxProps) => {
  return (
    <div
      role="note"
      data-slot="info-box"
      className={cn(infoBoxVariants({ variant, className }))}
      {...props}
    >
      {variant === "summary" ? (
        <>
          <p className="flex items-center gap-1.5 text-h4 text-fg-title">
            <ShieldCheck aria-hidden className="size-5 shrink-0 text-success" />
            {title}
          </p>
          <div className="leading-relaxed">{children}</div>
        </>
      ) : (
        <>
          <Info aria-hidden className="size-4 shrink-0" />
          {children}
        </>
      )}
    </div>
  );
};

export { InfoBox, infoBoxVariants, type InfoBoxProps };
