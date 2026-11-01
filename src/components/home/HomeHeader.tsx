import { Bell, BellDot, CircleUserRound } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import textLogo from "@/assets/images/textLogo.svg";
import { SERVICE_NAME } from "@/const/service";

export interface HomeHeaderProps {
  hasNotification?: boolean;
}

const ICON_BUTTON_CLASS_NAME = "flex size-10 items-center justify-center text-fg-title";

export const HomeHeader = ({ hasNotification = false }: HomeHeaderProps) => {
  const NotificationIcon = hasNotification ? BellDot : Bell;

  return (
    <header className="flex h-14 shrink-0 items-center justify-between bg-white pr-2 pl-4">
      <Link
        href="/home"
        aria-label={`${SERVICE_NAME} 홈으로 이동`}
        className="flex items-center justify-center focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
      >
        <Image src={textLogo} alt={SERVICE_NAME} className="h-7 w-auto translate-y-0.75" priority />
      </Link>
      <nav aria-label="사용자 메뉴" className="flex items-center">
        <Link
          href="/notifications"
          aria-label={hasNotification ? "새 알림 있음" : "알림"}
          className={ICON_BUTTON_CLASS_NAME}
        >
          <NotificationIcon aria-hidden className="size-6" strokeWidth={1.5} />
        </Link>
        <Link href="/myPage" aria-label="내 정보" className={ICON_BUTTON_CLASS_NAME}>
          <CircleUserRound aria-hidden className="size-6" strokeWidth={1.5} />
        </Link>
      </nav>
    </header>
  );
};
