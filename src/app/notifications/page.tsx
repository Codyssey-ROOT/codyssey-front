"use client";

import { useRouter } from "next/navigation";

import logo from "@/assets/images/logo.svg";
import { EmptyState } from "@/components/common/EmptyState";
import { ErrorState } from "@/components/common/ErrorState";
import { LoadingState } from "@/components/common/LoadingState";
import { PageHeader } from "@/components/common/PageHeader";
import { NotificationCard } from "@/components/notification/NotificationCard";
import { useNotificationsQuery } from "@/hooks/notification/useNotificationsQuery";

const NotificationsPage = () => {
  const router = useRouter();
  const { data: notifications, isPending, isError, refetch } = useNotificationsQuery();

  const renderContent = () => {
    if (isPending) return <LoadingState />;

    if (isError) {
      return <ErrorState title="알림을 불러오지 못했어요" onRetry={() => void refetch()} />;
    }

    if (notifications.length === 0) {
      return (
        <EmptyState
          image={logo}
          title="알림이 없어요"
          description={
            <>
              알림 권한이 없으면 알림을 받을 수 없어요
              <br />
              마이페이지에서 확인해보세요
            </>
          }
          className="flex-1 justify-center"
        />
      );
    }

    return (
      <ul className="flex flex-col gap-2.5">
        {notifications.map(({ id, title, message, link }) => (
          <li key={id}>
            {link ? (
              <button
                type="button"
                onClick={() => router.push(link)}
                className="block w-full rounded-16 text-left outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
              >
                <NotificationCard title={title} message={message} />
              </button>
            ) : (
              <NotificationCard title={title} message={message} />
            )}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="flex h-dvh flex-col">
      <PageHeader title="알림 목록" onBack={() => router.back()} />
      <main className="flex min-h-0 flex-1 flex-col overflow-y-auto px-4 pt-6 pb-10">
        {renderContent()}
      </main>
    </div>
  );
};

export default NotificationsPage;
