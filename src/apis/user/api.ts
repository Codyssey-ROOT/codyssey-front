import { api } from "@/lib/api/http-client";
import type { ApiResponse } from "@/types/api";
import type { UserProfileDto } from "@/types/user";

export const fetchMyProfile = async (): Promise<UserProfileDto> => {
  const response = await api.get<ApiResponse<UserProfileDto>>("/users/me");
  return response.data;
};
