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
      className={cn("rounded-20 bg-white p-1.5 shadow-card", className)}
      {...props}
    >
      <div className="relative aspect-square overflow-hidden rounded-16 bg-surface-1">
        {src && <Image src={src} alt={alt} fill sizes="50vw" className="object-cover" />}
        <div className="absolute top-2.5 left-2.5">
          <PhotoStatusBadge status={status} />
        </div>
      </div>
    </figure>
  );
};

export { ImageCard, type ImageCardProps };
