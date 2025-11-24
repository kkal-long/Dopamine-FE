import { Trophy } from "@/assets/svgs/item/detail";
import { useUserStore } from "@/store/useUserStore";
import { BidHistoryData } from "@/types/item/bid/bidApi.type";
import { formatTimeAgo } from "@/utils/dateUtils";
import { formatPrice } from "@/utils/priceUtils";
import clsx from "clsx";

interface BidHistoryItemProps {
  bid: BidHistoryData;
  rank: number;
  isWinner: boolean; // 경매가 끝났을 때 1등
  isCurrentTop: boolean; // 경매가 진행중일 때 1등
}

const BidHistoryItem = ({
  bid,
  rank,
  isWinner,
  isCurrentTop,
}: BidHistoryItemProps) => {
  const userId = useUserStore(state => state.userId);
  const isMybid = bid.userId === userId;
  const renderRank = () => {
    if (isWinner) {
      return (
        <div className="w-6 h-6 flex items-center justify-center">
          <Trophy className="w-6 h-6" />
        </div>
      );
    }

    if (isCurrentTop) {
      return (
        <div className="w-6 h-6 flex items-center justify-center rounded-full bg-bluegrey10 text-white text-reg12">
          1
        </div>
      );
    }

    return (
      <div className="w-6 h-6 flex items-center justify-center rounded-full bg-grey06 text-white text-reg12">
        {rank}
      </div>
    );
  };

  const renderNameInfo = () => (
    <div className="flex flex-col">
      <div className="flex items-center gap-1">
        <span className="text-reg14 text-darkgrey05">{bid.nickname}</span>
        {isWinner && <span className="w-1 h-1 rounded-full bg-mainpink"></span>}
      </div>

      <div className="text-reg12 text-darkgrey01">
        {isWinner && <span>최종 낙찰자</span>}
        {isCurrentTop && <span>현재 최고 입찰자</span>}
      </div>
    </div>
  );

  const renderPriceInfo = () => (
    <div className="ml-auto text-right">
      <div
        className={
          isWinner || isCurrentTop
            ? "text-mainpink text-bold16"
            : "text-darkgrey05 text-med16"
        }
      >
        {formatPrice(bid.bidPrice)}
      </div>

      <div className="text-darkgrey01 text-reg12">
        {formatTimeAgo(bid.createAt)}
      </div>
    </div>
  );

  return (
    <div
      className={clsx("flex items-center p-4 rounded-lg border", {
        "bg-lightpink border-mainpink": isWinner,
        "bg-grey00 border-grey04": !isWinner && isMybid,
        "bg-white border-grey04": !isWinner && !isMybid,
      })}
    >
      {renderRank()}
      <img
        src={bid.profileImageUrl}
        alt={bid.nickname}
        className="w-10 h-10 rounded-full mx-2 bg-grey06"
      />
      {renderNameInfo()}
      {renderPriceInfo()}
    </div>
  );
};

export default BidHistoryItem;
