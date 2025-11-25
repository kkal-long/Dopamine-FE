import { useNotificationStore } from "@/store/useNotificationStore";
import { useEffect } from "react";

export default function useNotificationSSE() {
  const addAlarm = useNotificationStore(s => s.addAlarm);

  useEffect(() => {
    const eventSource = new EventSource(
      `${import.meta.env.VITE_SERVER_API_URL}/api/notification/stream`,
      { withCredentials: true } as EventSourceInit
    );

    eventSource.onmessage = event => {
      try {
        const data = JSON.parse(event.data);
        addAlarm(data);
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
