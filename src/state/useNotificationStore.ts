import { create } from "zustand";
import { persist } from "zustand/middleware";

type Alarm = {
  type: string;
  productName: string; // 상품명 따로 분리
  fullMessage: string; // 최종 메시지
  price: string | null;
  time: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
};

type NotificationStore = {
  alarms: Alarm[];
  unreadCount: number;

  addAlarm: (alarm: Alarm) => void;
  setAlarms: (list: Alarm[]) => void;
  resetUnread: () => void;
};

// persist 적용된 버전
export const useNotificationStore = create<NotificationStore>()(
  persist(
    set => ({
      alarms: [],
      unreadCount: 0,

      // 새 알림 추가
      addAlarm: alarm =>
        set(state => ({
          alarms: [alarm, ...state.alarms], // 최신 알림이 위로
          unreadCount: state.unreadCount + 1,
        })),

      // 알림 리스트 전체 세팅
      setAlarms: list => set({ alarms: list }),

      // 읽지 않은 알림 개수 초기화
      resetUnread: () => set({ unreadCount: 0 }),
    }),

    {
      name: "notification-store", // localStorage key
    }
  )
);
