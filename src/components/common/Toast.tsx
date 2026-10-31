import type { ComponentProps } from "react";
import { cn } from "@/utils/cn";

type ToastProps = ComponentProps<"output"> & {
  message: string | null;
};

const Toast = ({ message, className, ...props }: ToastProps) => {
  return (
    <output
      data-slot="toast"
      className={cn(
        "pointer-events-none fixed inset-x-4 bottom-24 z-50 flex justify-center",
        className,
      )}
      {...props}
    >
      {message && (
        <p className="rounded-16 bg-surface-6/90 px-4 py-3 text-body-6 text-white shadow-floating">
          {message}
        </p>
      )}
    </output>
  );
};

export { Toast, type ToastProps };
