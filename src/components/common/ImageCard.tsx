import Image from "next/image";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/utils/cn";

// Figma: Image. Square thumbnail with an optional badge, title and date.
type ImageCardProps = Omit<ComponentProps<"figure">, "title"> & {
  src?: string;
  alt: string;
  title: ReactNode;
  date?: ReactNode;
  badge?: ReactNode;
};

const ImageCard = ({ src, alt, title, date, badge, className, ...props }: ImageCardProps) => {
  return (
    <figure data-slot="image-card" className={cn("flex flex-col gap-2", className)} {...props}>
      <div className="relative aspect-square overflow-hidden rounded-16 bg-surface-1">
        {src && <Image src={src} alt={alt} fill sizes="50vw" className="object-cover" />}
        {badge && <div className="absolute top-2 left-2">{badge}</div>}
      </div>
      <figcaption className="flex flex-col gap-0.5">
        <span className="truncate text-h4 text-fg-title">{title}</span>
        {date && <span className="text-body-6 text-fg-secondary-2">{date}</span>}
      </figcaption>
    </figure>
  );
};

export { ImageCard, type ImageCardProps };
