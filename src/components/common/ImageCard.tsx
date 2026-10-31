import Image from "next/image";
import type { ComponentProps } from "react";

import type { PhotoStatus } from "@/types/photo";
import { cn } from "@/utils/cn";
import { PhotoStatusBadge } from "../photo/PhotoStatusBadge";

type ImageCardProps = ComponentProps<"figure"> & {
  src?: string;
  alt: string;
  status: PhotoStatus;
};

const ImageCard = ({ src, alt, status, className, ...props }: ImageCardProps) => {
  return (
    <figure
      data-slot="image-card"
      data-status={status}
      className={cn("relative aspect-square overflow-hidden rounded-16 bg-surface-1", className)}
      {...props}
    >
      {src && <Image src={src} alt={alt} fill sizes="50vw" className="object-cover" />}
      <div className="absolute top-2 left-2">
        <PhotoStatusBadge status={status} />
      </div>
    </figure>
  );
};

export { ImageCard, type ImageCardProps };
