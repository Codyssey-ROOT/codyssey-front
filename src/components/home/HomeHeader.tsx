import { Bell, BellDot } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import textLogo from "@/assets/images/textLogo.svg";
import { SERVICE_NAME } from "@/const/service";

export interface HomeHeaderProps {
  hasNotification?: boolean;
  onNotificationClick?: () => void;
}

export const HomeHeader = ({ hasNotification = false, onNotificationClick }: HomeHeaderProps) => {
  const NotificationIcon = hasNotification ? BellDot : Bell;

  return (
    <header className="flex h-14 shrink-0 items-center justify-between bg-white px-4">
      <Link
        href="/home"
        aria-label={`${SERVICE_NAME} 홈으로 이동`}
        className="flex items-center justify-center focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
      >
        <Image src={textLogo} alt={SERVICE_NAME} className="h-7 w-auto" priority />
      </Link>
      <button
        type="button"
        onClick={onNotificationClick}
        aria-label={hasNotification ? "새 알림 있음" : "알림"}
        className="flex size-10 items-center justify-center text-fg-title"
      >
        <NotificationIcon aria-hidden className="size-6" strokeWidth={1.5} />
      </button>
    </header>
  );
};
