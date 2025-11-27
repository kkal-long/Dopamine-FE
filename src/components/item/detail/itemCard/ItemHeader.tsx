import { formatTimeLeft } from "@/utils/dateUtils";
import clsx from "clsx";
import { useEffect, useState } from "react";

interface ItemHeaderProps {
  isLive: boolean;
  endAt: string;
  goodsName: string;
}

const ItemHeader = ({ isLive, endAt, goodsName }: ItemHeaderProps) => {
  const [displayTime, setDisplayTime] = useState(() =>
    isLive ? formatTimeLeft(endAt) : ""
  );

  useEffect(() => {
    if (!isLive) {
      setDisplayTime("경매 종료");
      return;
    }
    const intervalId = setInterval(() => {
      const endDate = new Date(endAt);
      const now = new Date();
      const diff = endDate.getTime() - now.getTime();

      if (diff <= 0) {
        clearInterval(intervalId);
        setDisplayTime("경매 종료");
      } else {
        setDisplayTime(formatTimeLeft(endAt));
      }
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [isLive, endAt]);

  return (
    <div className="mb-5">
      <div className="flex justify-between items-center mb-4">
        <span
          className={clsx(
            "flex items-center justify-center text-med13 w-[76px] h-7 rounded-full",
            isLive
              ? "bg-lightorange01 text-orange01"
              : "bg-grey01 text-darkgrey04"
          )}
        >
          {isLive ? "경매 진행중" : "경매종료"}
        </span>
        {isLive && (
          <span className="text-semibold14 text-mainpink">{displayTime}</span>
        )}
      </div>
      <h1 className="text-bold20 text-bluegrey10">{goodsName}</h1>
    </div>
  );
};

export default ItemHeader;
