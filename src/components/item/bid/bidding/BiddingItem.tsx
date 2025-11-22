import type { BidItemData } from "@/types/item/bid/bidApi.type";
import { formatTimeLeftSimple } from "@/utils/dateUtils";
import { formatPrice } from "@/utils/priceUtils";
import { Link } from "react-router-dom";

interface BiddingItemProps {
  biddingItem: BidItemData;
}

const BiddingItem = ({ biddingItem }: BiddingItemProps) => {
  const isAcutioning = biddingItem.status === "IN_PROGRESS";

  return (
    <Link
      to={`/item/${biddingItem.acutionId}`}
      className="w-full p-3 flex items-center justify-between gap-2 rounded-lg bg-white border border-grey04"
    >
      <img
        src={biddingItem.imageUrl}
        alt={biddingItem.goodsName}
        className="object-cover w-16 h-16 rounded-lg bg-grey09"
      />

      <div className="flex flex-col flex-1 gap-1">
        <div className="text-med14 text-darkgrey05">
          {biddingItem.goodsName}
        </div>
        <div className="flex items-center gap-2">
          {isAcutioning ? (
            <>
              <span className="px-2 py-0.5 text-reg12 text-orange01 bg-lightorange01 rounded-full">
                경매중
              </span>
              <span className="text-reg14 text-mainpink">
                {formatTimeLeftSimple(biddingItem.endAt)}
              </span>
            </>
          ) : (
            <>
              <span className="px-2 py-0.5 text-reg12 text-darkgrey04 bg-grey01 rounded-full">
                경매종료
              </span>
              <span className="text-reg14 text-darkgrey02">낙찰 실패</span>
            </>
          )}
        </div>

        <div className="text-reg14 text-darkgrey05">
          현재 최고가: {formatPrice(biddingItem.currentPrice)}
        </div>
      </div>
    </Link>
  );
};

export default BiddingItem;
