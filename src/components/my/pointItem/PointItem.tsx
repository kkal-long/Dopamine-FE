import { POINT_HISTORY_TYPE_MAP } from "@/constants/pointHistory";
import { PointHistoryData } from "@/types/my/pointApi.type";
import { formatDateSimple } from "@/utils/dateUtils";
import { formatPriceSimple } from "@/utils/priceUtils";
import clsx from "clsx";

interface PointItemProps {
  pointHistory: PointHistoryData;
}

const PointItem = ({ pointHistory }: PointItemProps) => {
  const isCharge = ["CHARGE", "REFUND", "SALE"].includes(pointHistory.type);

  return (
    <div className="flex gap-3 py-4 border-b border-grey01 ">
      <div
        className={clsx(
          "flex items-center justify-center w-10 h-10 rounded-full text-bold16",
          isCharge
            ? "bg-lightgreen01 text-green01"
            : "bg-lightpink text-mainpink"
        )}
      >
        {isCharge ? "+" : "-"}
      </div>

      <div className="flex flex-col">
        <span className="text-reg14 text-darkgrey05">
          {POINT_HISTORY_TYPE_MAP[pointHistory.type]}
        </span>
        <span className="text-reg12 text-darkgrey01">
          {formatDateSimple(pointHistory.createdAt)}
        </span>
      </div>

      <div className="text-med14 text-darkgrey02 ml-auto flex items-center">
        {formatPriceSimple(pointHistory.changeAmount)} 원
      </div>
    </div>
  );
};

export default PointItem;
