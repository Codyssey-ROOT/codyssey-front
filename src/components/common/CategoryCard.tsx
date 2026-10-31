import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/utils/cn";

// Figma: Category
type CategoryCardProps = ComponentProps<"div"> & {
  icon?: ReactNode;
  label: ReactNode;
  count: ReactNode;
};

const CategoryCard = ({ icon, label, count, className, ...props }: CategoryCardProps) => {
  return (
    <div
      data-slot="category-card"
      className={cn("flex flex-col gap-1 rounded-16 bg-white p-3 shadow-card", className)}
      {...props}
    >
      <div className="mb-2 flex size-8 items-center justify-center rounded-8 bg-surface-1 [&_svg]:size-5">
        {icon}
      </div>
      <span className="text-body-6 text-fg-secondary-1">{label}</span>
      <span className="text-h4 text-fg-title">{count}</span>
    </div>
  );
};

export { CategoryCard, type CategoryCardProps };
