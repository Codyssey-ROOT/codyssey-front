import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/utils/cn";

// Figma: Card, Switch, Text List. One row: optional thumbnail, title/description, optional trailing control.
type ListItemProps = Omit<ComponentProps<"div">, "title"> & {
  title: ReactNode;
  description?: ReactNode;
  thumbnail?: ReactNode;
  trailing?: ReactNode;
};

const ListItem = ({
  title,
  description,
  thumbnail,
  trailing,
  className,
  ...props
}: ListItemProps) => {
  return (
    <div data-slot="list-item" className={cn("flex items-center gap-3 py-3", className)} {...props}>
      {thumbnail && (
        <div className="flex size-11 shrink-0 items-center justify-center overflow-hidden rounded-8 bg-surface-1">
          {thumbnail}
        </div>
      )}
      <div className="flex min-w-0 flex-1 flex-col gap-0.5">
        <p className="truncate text-body-2 text-fg-title">{title}</p>
        {description && <p className="truncate text-body-6 text-fg-secondary-2">{description}</p>}
      </div>
      {trailing}
    </div>
  );
};

export { ListItem, type ListItemProps };
