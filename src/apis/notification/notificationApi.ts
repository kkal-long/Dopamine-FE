import instance from "@/apis/instance";

// 1) 안 읽은 알림 개수 조회
export const getUnreadCount = async (): Promise<number> => {
  const res = await instance.get("/api/notification/unread-count");
  return res.data; // 숫자 반환
};

// 2) 알림 리스트 조회 (자동 읽음 처리)
export const getNotificationList = async () => {
  const res = await instance.get("/api/notification/list");
  return res.data;
};
