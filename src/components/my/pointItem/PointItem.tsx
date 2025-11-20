import { PointItemData } from "@/types/my/PointHistory.type";
import { formatDateSimple } from "@/utils/dateUtils";
import { formatPrice } from "@/utils/priceUtils";
import clsx from "clsx";

type PointItemProps = Omit<PointItemData, "id">;

const PointItem = ({ type, title, date, amount }: PointItemProps) => {
  const isCharge = type === "CHARGE";

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
          {isCharge ? "포인트 충전" : `포인트 지불 - ${title}`}
        </span>
        <span className="text-reg12 text-darkgrey01">
          {formatDateSimple(date)}
        </span>
      </div>

      <div className="text-med14 text-darkgrey02 ml-auto flex items-center">
        {isCharge ? "+" : "-"} {formatPrice(amount)}
      </div>
    </div>
  );
};

export default PointItem;
