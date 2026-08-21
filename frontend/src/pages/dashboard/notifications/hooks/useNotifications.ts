import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import {
  getNotifications,
  getUnreadNotificationCount,
  markAllNotificationsAsRead,
  markNotificationAsRead,
} from "../api/notificationApi";

export const notificationQueryKey = [
  "notifications",
];

export const useNotifications = () => {
  return useQuery({
    queryKey: notificationQueryKey,
    queryFn: getNotifications,
  });
};

export const useUnreadNotificationCount = () => {
  return useQuery({
    queryKey: [
      ...notificationQueryKey,
      "unread-count",
    ],
    queryFn: getUnreadNotificationCount,
  });
};

export const useMarkNotificationAsRead = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: markNotificationAsRead,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: notificationQueryKey,
      });
    },
  });
};

export const useMarkAllNotificationsAsRead = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: markAllNotificationsAsRead,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: notificationQueryKey,
      });
    },
  });
};