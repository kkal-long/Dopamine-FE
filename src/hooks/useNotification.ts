import {
  fetchNotificationList,
  fetchUnreadCount,
} from "@/apis/notification/notificationApi";

import { NotificationItem } from "@/types/alarm/notification";
import { useQuery } from "@tanstack/react-query";

// 안 읽은 개수
export const useUnreadCount = () => {
  return useQuery<number>({
    queryKey: ["unreadCount"],
    queryFn: fetchUnreadCount,
    staleTime: 1000 * 10,
  });
};

// 알림 목록
export const useNotificationList = () => {
  return useQuery<NotificationItem[]>({
    queryKey: ["notificationList"],
    queryFn: fetchNotificationList,
  });
};
