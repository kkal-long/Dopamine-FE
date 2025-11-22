import Alarm from "@/assets/svgs/main/alarm.svg";
import { useNotificationStore } from "@/state/useNotificationStore";
import { useNavigate } from "react-router-dom";

export default function HeaderBell() {
  const navigate = useNavigate();
  const unread = useNotificationStore(s => s.unreadCount);

  return (
    <button className="relative" onClick={() => navigate("/alarm")}>
      <img src={Alarm} className="w-6 h-6 cursor-pointer" />
      {unread > 0 && (
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-mainpink text-white text-reg12 rounded-full flex items-center justify-center">
          {unread}
        </span>
      )}
    </button>
  );
}
