import api from "@/lib/axios";

import type {
  Notification,
} from "../types/notification";

export const getNotifications = async (): Promise<
  Notification[]
> => {
  const response = await api.get<Notification[]>(
    "/notifications/",
  );

  return response.data;
};

export const getUnreadNotificationCount =
  async (): Promise<number> => {
    const response = await api.get<number>(
      "/notifications/unread-count",
    );

    return response.data;
  };

export const markNotificationAsRead = async (
  notificationId: number,
): Promise<Notification> => {
  const response = await api.patch<Notification>(
    `/notifications/${notificationId}/read`,
  );

  return response.data;
};

export const markAllNotificationsAsRead =
  async (): Promise<number> => {
    const response = await api.patch<number>(
      "/notifications/read-all",
    );

    return response.data;
  };