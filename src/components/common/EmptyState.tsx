import Image, { type StaticImageData } from "next/image";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/utils/cn";

type EmptyStateProps = Omit<ComponentProps<"section">, "title"> & {
  image: StaticImageData;
  title: ReactNode;
  description?: ReactNode;
};

const EmptyState = ({ image, title, description, className, ...props }: EmptyStateProps) => {
  return (
    <section
      data-slot="empty-state"
      className={cn("flex flex-col items-center gap-5 text-center", className)}
      {...props}
    >
      <Image src={image} alt="" className="h-auto w-50 opacity-50" priority />
      <div className="flex flex-col gap-3">
        <h2 className="text-h2 text-fg-secondary-2">{title}</h2>
        {description && (
          <p className="text-body-3 leading-relaxed text-fg-disable">{description}</p>
        )}
      </div>
    </section>
  );
};

export { EmptyState, type EmptyStateProps };
