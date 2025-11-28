import instance from "@/apis/instance";

// 안 읽은 알림 개수 조회
export const getUnreadCount = async (): Promise<number> => {
  const res = await instance.get("/api/notification/unread-count");
  return res.data;
};

// 알림 리스트 조회
export const getNotificationList = async () => {
  const res = await instance.get("/api/notification/list");
  return res.data;
};
