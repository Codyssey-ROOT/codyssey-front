"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { ConfirmDialog } from "@/components/common/ConfirmDialog";
import { ErrorState } from "@/components/common/ErrorState";
import { InfoBox } from "@/components/common/InfoBox";
import { ListItem } from "@/components/common/ListItem";
import { PageHeader } from "@/components/common/PageHeader";
import { Toggle } from "@/components/common/Toggle";
import { useLogoutMutation } from "@/hooks/auth/useLogoutMutation";
import { useToast } from "@/hooks/common/useToast";
import { useMyProfileQuery } from "@/hooks/user/useMyProfileQuery";

type AccountDialog = "logout" | "withdraw";

const ACCOUNT_DIALOGS = {
  logout: { title: "로그아웃 할까요?", description: undefined, confirmLabel: "로그아웃" },
  withdraw: {
    title: "정말 탈퇴할까요?",
    description: "탈퇴하면 등록한 사진과 점검 기록이 모두 삭제돼요",
    confirmLabel: "탈퇴하기",
  },
} satisfies Record<AccountDialog, { title: string; description?: string; confirmLabel: string }>;

const ROW_BUTTON_CLASS_NAME =
  "flex w-full items-center py-3 text-left text-body-2 outline-none focus-visible:bg-bg-gray";

const MyPage = () => {
  const router = useRouter();
  const { data: profile, isError: isProfileError, refetch: refetchProfile } = useMyProfileQuery();
  const { showToast } = useToast();
  const logoutMutation = useLogoutMutation();
  // TODO: 푸시 구독 API 연동 (지금은 브라우저 알림 권한만 요청)
  const [isNotificationEnabled, setIsNotificationEnabled] = useState(false);
  // Type outlives `isDialogOpen` so the text stays put during the close animation.
  const [dialogType, setDialogType] = useState<AccountDialog>("logout");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const openDialog = (type: AccountDialog) => {
    setDialogType(type);
    setIsDialogOpen(true);
  };

  const handleNotificationChange = async (isChecked: boolean) => {
    if (!isChecked) {
      setIsNotificationEnabled(false);
      showToast("알림을 껐어요");
      return;
    }
    if (!("Notification" in window)) {
      showToast("이 브라우저는 알림을 지원하지 않아요");
      return;
    }
    const permission = await Notification.requestPermission();
    if (permission !== "granted") {
      showToast("브라우저 설정에서 알림을 허용해 주세요");
      return;
    }
    setIsNotificationEnabled(true);
    showToast("알림을 켰어요");
  };

  const handleConfirm = () => {
    if (dialogType === "logout") {
      // The hook sends the user to the login page whether or not the call succeeds.
      logoutMutation.mutate();
      return;
    }
    // TODO: 회원 탈퇴 API 연동
    setIsDialogOpen(false);
    showToast("회원 탈퇴는 아직 준비 중이에요");
  };

  const dialog = ACCOUNT_DIALOGS[dialogType];

  return (
    <div className="flex min-h-dvh flex-col">
      <PageHeader title="내 정보" onBack={() => router.back()} />

      {isProfileError ? (
        <ErrorState
          className="px-4"
          title="내 정보를 불러오지 못했어요"
          onRetry={() => void refetchProfile()}
        />
      ) : (
        <main className="flex flex-col gap-8 px-4 pt-6 pb-10">
          <section aria-label="프로필" className="flex flex-col items-center gap-3">
            <div className="relative size-30 overflow-hidden rounded-20 bg-surface-1">
              {profile?.profileImageUrl && (
                <Image
                  src={profile.profileImageUrl}
                  alt=""
                  fill
                  sizes="7.5rem"
                  className="object-cover"
                />
              )}
            </div>
            <p className="text-h2 font-bold text-fg-primary">{profile?.nickname}</p>
          </section>

          <section aria-labelledby="notification-settings" className="flex flex-col gap-3">
            <h2 id="notification-settings" className="text-h4 font-bold text-fg-title">
              알림 설정
            </h2>
            <InfoBox>방어 모델링 알림을 받기 위하여 알림을 활성화 해주세요</InfoBox>
            <ListItem
              title="알림 권한"
              trailing={
                <Toggle
                  aria-label="알림 권한"
                  checked={isNotificationEnabled}
                  onCheckedChange={handleNotificationChange}
                />
              }
            />
          </section>

          <section aria-labelledby="account-settings" className="flex flex-col gap-1">
            <h2 id="account-settings" className="pb-2 text-h4 font-bold text-fg-title">
              계정 설정
            </h2>
            <ListItem
              title="카카오 아이디"
              trailing={
                <span className="truncate text-body-3 text-fg-disable-light">{profile?.email}</span>
              }
            />
            <button
              type="button"
              onClick={() => openDialog("logout")}
              className={`${ROW_BUTTON_CLASS_NAME} text-fg-title`}
            >
              로그아웃
            </button>
            <button
              type="button"
              onClick={() => openDialog("withdraw")}
              className={`${ROW_BUTTON_CLASS_NAME} text-warning`}
            >
              회원 탈퇴
            </button>
          </section>
        </main>
      )}

      <ConfirmDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        title={dialog.title}
        description={dialog.description}
        confirmLabel={dialog.confirmLabel}
        onConfirm={handleConfirm}
        isConfirming={logoutMutation.isPending}
      />
    </div>
  );
};

export default MyPage;
