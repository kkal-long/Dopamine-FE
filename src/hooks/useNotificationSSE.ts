import { useNotificationStore } from "@/store/useNotificationStore";
import { useEffect } from "react";

export default function useNotificationSSE() {
  const addAlarm = useNotificationStore(s => s.addAlarm);

  useEffect(() => {
    const eventSource = new EventSource("/api/notification/stream");

    eventSource.onmessage = event => {
      try {
        const data = JSON.parse(event.data);
        addAlarm(data);
      } catch (e) {
        console.error("SSE parse error", e);
      }
    };

    eventSource.onerror = () => {
      console.error("SSE error");
    };

    return () => eventSource.close();
  }, []);
}
