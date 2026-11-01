import { cva, type VariantProps } from "class-variance-authority";
import { ChevronLeft } from "lucide-react";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/utils/cn";

const pageHeaderVariants = cva("relative flex h-14 items-center justify-center px-4", {
  variants: {
    tone: {
      light: "bg-white text-fg-title",
      dark: "bg-black text-white",
    },
  },
  defaultVariants: {
    tone: "light",
  },
});

type PageHeaderProps = Omit<ComponentProps<"header">, "title"> &
  VariantProps<typeof pageHeaderVariants> & {
    title?: ReactNode;
    onBack?: () => void;
    action?: ReactNode;
  };

const PageHeader = ({ title, onBack, action, tone, className, ...props }: PageHeaderProps) => {
  return (
    <header
      data-slot="page-header"
      className={cn(pageHeaderVariants({ tone }), className)}
      {...props}
    >
      {onBack && (
        <button
          type="button"
          onClick={onBack}
          aria-label="뒤로 가기"
          className="absolute cursor-pointer left-2 flex size-10 items-center justify-center"
        >
          <ChevronLeft aria-hidden className="size-6" />
        </button>
      )}
      {title && <h1 className="truncate text-h3">{title}</h1>}
      {action && <div className="absolute right-4 text-body-6 text-fg-secondary-2">{action}</div>}
    </header>
  );
};

export { PageHeader, type PageHeaderProps };
