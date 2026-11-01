import { useMutation, useQueryClient } from "@tanstack/react-query";

import { logout } from "@/apis/auth/api";

export const useLogoutMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: logout,
    onSettled: () => {
      queryClient.clear();
      window.location.replace("/");
    },
  });
};
