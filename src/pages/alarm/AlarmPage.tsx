import { AlarmItem } from "@/store/useNotificationStore";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { AlarmLogo, AlarmUp } from "@/assets/svgs/alarm";
import { Goback } from "@/assets/svgs/search";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import { useNotificationList } from "@/hooks/useNotification";
import useNotificationSSE from "@/hooks/useNotificationSSE";
import { useNotificationStore } from "@/store/useNotificationStore";
import { formatTimeAgo } from "@/utils/dateUtils";

const AlarmPage = () => {
  const navigate = useNavigate();

  const { data: notifications, isLoading } = useNotificationList();
  const { setAlarms, resetUnread, alarms } = useNotificationStore();

  useNotificationSSE();

  /* 백엔드 type → 한글 타입 */
  const typeLabel = (t: "OUTBID" | "WIN") => {
    return t === "OUTBID" ? "상위 입찰" : "낙찰 종료";
  };

  /* 백엔드 type → 아이콘 매핑 */
  const getTypeIcon = (t: "OUTBID" | "WIN") => {
    console.log(t);
    return t === "OUTBID" ? AlarmUp : AlarmLogo;
  };

  /* API 알림 데이터를 Zustand alarms로 변환 */
  useEffect(() => {
    if (!notifications) return;

    const mapped = notifications.map(
      (n): AlarmItem => ({
        id: n.id,
        message: n.message,
        auctionId: n.auctionId,
        type: n.type,
        isRead: n.isRead,
        createdAt: n.createdAt,

        // UI 가공 필드
        typeLabel: typeLabel(n.type),
        timeLabel: formatTimeAgo(n.createdAt),
      })
    );

    setAlarms(mapped);
  }, [notifications, setAlarms]);

  useEffect(() => {
    return () => resetUnread();
  }, []);

  if (isLoading || !notifications) return <LoadingSpinner />;

  return (
    <div className="w-full min-h-screen bg-white">
      <div className="w-full flex items-center px-4 py-3 border-b border-bluegrey02 mt-3 relative">
        <button onClick={() => navigate(-1)} className="text-xl font-bold">
          <Goback className="w-4 h-4 cursor-pointer" />
        </button>
        <h2 className="absolute left-1/2 -translate-x-1/2 text-med16 text-bluegrey10">
          알림
        </h2>
      </div>

      <div className="p-4 mt-4 space-y-6">
        {alarms.map(item => {
          const IconComp = getTypeIcon(item.type);
          return (
            <div
              key={item.id}
              className="flex items-start gap-3 border-b border-grey01 pb-4"
            >
              <IconComp
                className={
                  item.type === "WIN" ? "w-7 h-7 mt-1" : "w-5 h-5 mt-1"
                }
              />

              <div className="flex-1 min-w-0">
                <div className="flex items-center min-w-0">
                  <p className="text-grey14 text-[11px]">{item.typeLabel}</p>
                  <p className="text-[11px] text-grey14 whitespace-nowrap shrink-0 ml-auto">
                    {item.timeLabel}
                  </p>
                </div>

                <p className="text-reg14 text-darkgrey05 break-words mt-1">
                  {item.message}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AlarmPage;
