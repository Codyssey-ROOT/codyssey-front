import { useId, type ComponentProps, type ReactNode } from "react";
import { cn } from "@/utils/cn";

// Figma: Input Box. Default, with trailing action (e.g. copy), disabled; aria-invalid shows the error border.
type TextFieldProps = ComponentProps<"input"> & {
  label?: ReactNode;
  trailing?: ReactNode;
};

const TextField = ({ label, trailing, id, className, ...props }: TextFieldProps) => {
  const generatedId = useId();
  const inputId = id ?? generatedId;

  return (
    <div data-slot="text-field" className={cn("flex flex-col gap-2", className)}>
      {label && (
        <label htmlFor={inputId} className="text-h4 text-fg-title">
          {label}
        </label>
      )}
      <div className="flex h-13 items-center gap-2 rounded-16 border border-border-1 bg-white px-4 has-[input:disabled]:border-transparent has-[input:disabled]:bg-surface-7 has-[input:focus-visible]:border-border-3 has-[input[aria-invalid=true]]:border-warning">
        <input
          id={inputId}
          className="min-w-0 flex-1 bg-transparent text-body-3 text-fg-primary outline-none placeholder:text-fg-disable disabled:text-fg-disable"
          {...props}
        />
        {trailing}
      </div>
    </div>
  );
};

export { TextField, type TextFieldProps };
