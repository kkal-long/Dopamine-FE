import instance from "../instance";

// 1) 안 읽은 알림 개수 조회
export const fetchUnreadCount = async (): Promise<number> => {
  const res = await instance.get("/api/notification/unread-count");
  return res.data; // 숫자
};

// 2) 알림 리스트 조회 (자동 읽음 처리)
export const fetchNotificationList = async () => {
  const res = await instance.get("/api/notification/list");
  return res.data;
};

// 3) SSE 연결
export const connectNotificationStream = () => {
  return new EventSource(
    `${import.meta.env.VITE_SERVER_API_URL}/api/notification/stream`,
    { withCredentials: true }
  );
};
