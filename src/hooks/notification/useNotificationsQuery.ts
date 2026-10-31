import { useQuery } from "@tanstack/react-query";

import { fetchNotifications } from "@/apis/notification/api";
import { notificationKeys } from "@/apis/notification/keys";

export const useNotificationsQuery = () => {
  return useQuery({
    queryKey: notificationKeys.lists(),
    queryFn: fetchNotifications,
  });
};
