import { CircleAlert } from "lucide-react";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/utils/cn";
import { Button } from "./Button";

// Page or section level failure with an optional retry and extra action (e.g. a link home).
type ErrorStateProps = Omit<ComponentProps<"section">, "title"> & {
  title?: ReactNode;
  description?: ReactNode;
  onRetry?: () => void;
  retryLabel?: string;
  action?: ReactNode;
};

const ErrorState = ({
  title = "문제가 발생했어요",
  description = "잠시 후 다시 시도해 주세요",
  onRetry,
  retryLabel = "다시 시도",
  action,
  className,
  ...props
}: ErrorStateProps) => {
  return (
    <section
      role="alert"
      data-slot="error-state"
      className={cn(
        "flex flex-1 flex-col items-center justify-center gap-5 text-center",
        className,
      )}
      {...props}
    >
      <span className="flex size-16 items-center justify-center rounded-full bg-surface-7">
        <CircleAlert aria-hidden className="size-8 text-fg-disable" strokeWidth={1.5} />
      </span>
      <div className="flex flex-col gap-2">
        <h2 className="text-h2 text-fg-secondary-2">{title}</h2>
        {description && (
          <p className="text-body-3 leading-relaxed text-fg-disable">{description}</p>
        )}
      </div>
      {(onRetry || action) && (
        <div className="flex gap-2">
          {onRetry && (
            <Button variant="secondary" className="h-11" onClick={onRetry}>
              {retryLabel}
            </Button>
          )}
          {action}
        </div>
      )}
    </section>
  );
};

export { ErrorState, type ErrorStateProps };
