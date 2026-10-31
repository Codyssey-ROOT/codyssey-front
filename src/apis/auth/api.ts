import { api, API_BASE_URL } from "@/lib/api/http-client";

export const getKakaoLoginUrl = () => `${API_BASE_URL}/oauth2/authorization/kakao`;

export const logout = async (): Promise<void> => {
  await api.post<void>("/auth/logout", { shouldSkipReissue: true });
};
