import type { ReactNode } from "react";

import { ImageCard } from "@/components/common/ImageCard";
import type { PhotoDto } from "@/types/photo";

interface PhotoSectionProps {
  title: string;
  photos: PhotoDto[];
  onPhotoClick: (photo: PhotoDto) => void;
  footer?: ReactNode;
}

export const PhotoSection = ({ title, photos, onPhotoClick, footer }: PhotoSectionProps) => {
  return (
    <section className="flex flex-col gap-3">
      <h2 className="text-h4 text-fg-title">{title}</h2>
      <ul className="grid grid-cols-2 gap-1">
        {photos.map((photo) => (
          <li key={photo.id}>
            <button
              type="button"
              aria-disabled={photo.status === "inProgress"}
              onClick={() => onPhotoClick(photo)}
              className="block w-full rounded-20 text-left outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
            >
              <ImageCard src={photo.imageUrl} alt="" status={photo.status} />
            </button>
          </li>
        ))}
      </ul>
      {footer}
    </section>
  );
};
