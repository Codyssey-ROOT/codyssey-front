import { ChevronLeft } from "lucide-react";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/utils/cn";

// Figma: Page Name
type PageHeaderProps = Omit<ComponentProps<"header">, "title"> & {
  title?: ReactNode;
  /** Shows the back button when provided. */
  onBack?: () => void;
  /** Right-side slot, e.g. "건너뛰기". */
  action?: ReactNode;
};

const PageHeader = ({ title, onBack, action, className, ...props }: PageHeaderProps) => {
  return (
    <header
      data-slot="page-header"
      className={cn("relative flex h-14 items-center justify-center bg-white px-4", className)}
      {...props}
    >
      {onBack && (
        <button
          type="button"
          onClick={onBack}
          aria-label="뒤로 가기"
          className="absolute left-2 flex size-10 items-center justify-center text-fg-title"
        >
          <ChevronLeft aria-hidden className="size-6" />
        </button>
      )}
      {title && <h1 className="truncate text-h3 text-fg-title">{title}</h1>}
      {action && <div className="absolute right-4 text-body-6 text-fg-secondary-2">{action}</div>}
    </header>
  );
};

export { PageHeader, type PageHeaderProps };
