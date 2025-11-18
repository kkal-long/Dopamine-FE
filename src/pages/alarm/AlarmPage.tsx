import { AlarmLogo, AlarmUp } from "@/assets/svgs/alarm";
import { Goback } from "@/assets/svgs/search";
import { useNotificationStore } from "@/state/useNotificationStore";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function AlarmPage() {
  const navigate = useNavigate();
  const alarms = useNotificationStore(s => s.alarms);
  const resetUnread = useNotificationStore(s => s.resetUnread);
  const setAlarms = useNotificationStore(s => s.setAlarms);

  // day/hour/minute → "시간 전" 포맷
  const formatTime = (day: number, hour: number, minute: number) => {
    if (day > 0) return `${day}일 전`;
    if (hour > 0) return `${hour}시간 전`;
    return `${minute}분 전`;
  };

  // 페이지 나갈 때 unreadCount 초기화
  useEffect(() => {
    return () => {
      resetUnread();
    };
  }, []);

  // mock 데이터 세팅 (테스트 모드)
  useEffect(() => {
    setAlarms([]); // 기존 알림 제거

    const mockList = [
      {
        type: "상위 입찰",
        productName: "빈티지 레더 자켓",
        message: (productName: string) =>
          `다른 사용자가 "${productName}"에 상위 입찰을 했어요.`,
        price: "243,000원",
        day: 0,
        hour: 5,
        minute: 30,
        icon: AlarmUp,
      },
      {
        type: "낙찰 종료",
        productName: "인센스 홀더",
        message: (productName: string) =>
          `축하해요! "${productName}"가 방금 당신에게 낙찰됐어요. 구매를 이어서 진행할 수 있어요.`,
        price: null,
        day: 1,
        hour: 2,
        minute: 20,
        icon: AlarmLogo,
      },
    ];

    // 최신순 정렬
    const sortedList = [...mockList].sort((a, b) => {
      const tA = a.day * 1440 + a.hour * 60 + a.minute;
      const tB = b.day * 1440 + b.hour * 60 + b.minute;
      return tA - tB;
    });

    // 상태 저장
    setAlarms(
      sortedList.map(m => ({
        ...m,
        fullMessage: m.message(m.productName),
        time: formatTime(m.day, m.hour, m.minute),
      }))
    );
  }, [setAlarms]);

  return (
    <div className="w-full min-h-screen bg-white">
      {/* 헤더 */}
      <div className="w-full flex items-center px-4 py-3 border-b border-bluegrey02 mt-[57px] relative">
        <button onClick={() => navigate(-1)} className="text-xl font-bold">
          <Goback className="w-4 h-4 cursor-pointer" />
        </button>
        <h2 className="absolute left-1/2 -translate-x-1/2 text-med16 text-bluegrey10">
          알림
        </h2>
      </div>

      {/* 알림 리스트 */}
      <div className="p-4 mt-4 space-y-6">
        {alarms.map((item, index) => {
          // 아이콘 크기 지정
          const iconSize =
            item.type === "낙찰 종료" ? "w-7 h-7 mt-1" : "w-5 h-5 mt-1";

          const IconComp = item.icon ?? (() => null);

          return (
            <div
              key={index}
              className="flex items-start gap-3 border-b border-grey01 pb-4"
            >
              <IconComp className={iconSize} />

              <div className="flex-1 min-w-0">
                {/* 타입 + 시간 */}
                <div className="flex items-center min-w-0">
                  <p className="text-grey14 text-[11px]">{item.type}</p>

                  <p className="text-[11px] text-grey14 whitespace-nowrap shrink-0 ml-auto">
                    {item.time}
                  </p>
                </div>

                {/* 메시지 */}
                <p className="text-reg14 text-darkgrey05 break-words mt-1">
                  {item.fullMessage}
                  {item.price && ` (${item.price})`}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
