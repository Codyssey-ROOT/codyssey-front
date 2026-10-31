import { Clock, ShieldCheck, TriangleAlert, type LucideIcon } from "lucide-react";

import { Badge, type BadgeProps } from "@/components/common/Badge";
import type { PhotoStatus } from "@/types/photo";

const STATUS_BADGES: Record<
  PhotoStatus,
  { label: string; icon: LucideIcon; variant: NonNullable<BadgeProps["variant"]> }
> = {
  inProgress: { label: "진행중", icon: Clock, variant: "info" },
  vulnerable: { label: "취약점 발견", icon: TriangleAlert, variant: "danger" },
  safe: { label: "보호됨", icon: ShieldCheck, variant: "success" },
};

interface PhotoStatusBadgeProps {
  status: PhotoStatus;
}

export const PhotoStatusBadge = ({ status }: PhotoStatusBadgeProps) => {
  const { label, icon: Icon, variant } = STATUS_BADGES[status];

  return (
    <Badge variant={variant}>
      <Icon aria-hidden />
      {label}
    </Badge>
  );
};
