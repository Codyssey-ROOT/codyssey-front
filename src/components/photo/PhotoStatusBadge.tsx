import { cva } from "class-variance-authority";
import { Clock, ShieldCheck, TriangleAlert, type LucideIcon } from "lucide-react";

import type { PhotoStatus } from "@/types/photo";

const photoStatusBadgeVariants = cva(
  "inline-flex w-fit shrink-0 items-center gap-1 px-2 py-1 text-body-7 whitespace-nowrap [&_svg]:size-3.5 [&_svg]:shrink-0",
  {
    variants: {
      status: {
        inProgress: "rounded-8 bg-white text-primary",
        vulnerable: "rounded-8 bg-warning text-white",
        safe: "rounded-8 bg-white text-success",
      },
    },
  },
);

const STATUS_CONTENTS: Record<PhotoStatus, { label: string; icon: LucideIcon }> = {
  inProgress: { label: "진행중", icon: Clock },
  vulnerable: { label: "취약점 발견", icon: TriangleAlert },
  safe: { label: "보호됨", icon: ShieldCheck },
};

interface PhotoStatusBadgeProps {
  status: PhotoStatus;
}

export const PhotoStatusBadge = ({ status }: PhotoStatusBadgeProps) => {
  const { label, icon: Icon } = STATUS_CONTENTS[status];

  return (
    <span data-slot="photo-status-badge" className={photoStatusBadgeVariants({ status })}>
      <Icon aria-hidden />
      {label}
    </span>
  );
};
