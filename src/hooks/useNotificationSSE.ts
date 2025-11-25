import { useAuthStore } from "@/store/useAuthStore";
import { useNotificationStore } from "@/store/useNotificationStore";
import { formatTimeAgo } from "@/utils/dateUtils";
import { useEffect } from "react";

export default function useNotificationSSE() {
  const addAlarm = useNotificationStore(s => s.addAlarm);

  useEffect(() => {
    const token = useAuthStore.getState().accessToken;
    if (!token) return;

    const eventSource = new EventSource(
      `${import.meta.env.VITE_SERVER_API_URL}/api/notification/stream?token=${token}`
    );

    eventSource.onmessage = event => {
      try {
        const raw = JSON.parse(event.data);

        // 알림 데이터 가공 → AlarmItem 형태로 통일
        const alarm = {
          ...raw,
          typeLabel: raw.type === "OUTBID" ? "상위 입찰" : "낙찰 종료",
          timeLabel: formatTimeAgo(raw.createdAt),
        };

        console.log("🔥 SSE 알림 도착:", alarm);
        addAlarm(alarm);
      } catch (e) {
        console.error("SSE parse error", e);
      }
    };

    eventSource.onerror = err => {
      console.error("SSE error →", err);
    };

    return () => eventSource.close();
  }, []);
}
