import { useQuery } from "@tanstack/react-query";

import { fetchMyProfile } from "@/apis/user/api";
import { userKeys } from "@/apis/user/keys";

export const useMyProfileQuery = () => {
  return useQuery({
    queryKey: userKeys.me(),
    queryFn: fetchMyProfile,
  });
};
