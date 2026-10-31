import type { NotificationDto } from "@/types/notification";

const MOCK_NOTIFICATIONS: NotificationDto[] = [
  {
    id: "notification-0",
    title: "사진 처리 완료",
    message: "요청하신 사진이 보호가 완료되었습니다.",
    createdAt: "2026-10-31T09:00:00.000Z",
  },
  {
    id: "notification-1",
    title: "사진 처리 오류",
    message: "요청하신 사진을 보호 중 오류가 발생하였습니다.",
    createdAt: "2026-10-30T09:00:00.000Z",
  },
  {
    id: "notification-2",
    title: "취약점 발견",
    message: "새로운 취약점이 발견되었습니다.\n취약한 사진들을 확인하세요.",
    createdAt: "2026-10-29T09:00:00.000Z",
  },
  {
    id: "notification-3",
    title: "버전 업데이트",
    message: "DeepFence의 버전이 업데이트되었습니다.\n취약한 사진들을 확인하세요.",
    createdAt: "2026-10-28T09:00:00.000Z",
  },
];

// TODO: 알림 API가 나오면 http-client 호출로 교체. /notifications?mock=empty 로 빈 화면 확인
export const fetchNotifications = async (): Promise<NotificationDto[]> => {
  await new Promise((resolve) => setTimeout(resolve, 300));
  const isEmptyMock = new URLSearchParams(window.location.search).get("mock") === "empty";
  return isEmptyMock ? [] : MOCK_NOTIFICATIONS;
};
