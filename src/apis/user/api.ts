import type { UserProfileDto } from "@/types/user";

const MOCK_PROFILE: UserProfileDto = {
  nickname: "USER NAME",
  email: "useraccount@kakao.com",
};

// TODO: 내 정보 API가 나오면 http-client 호출로 교체
export const fetchMyProfile = async (): Promise<UserProfileDto> => {
  await new Promise((resolve) => setTimeout(resolve, 300));
  return MOCK_PROFILE;
};
