import { ViewState } from "@/types/item/detail/itemDetail.type";
import { formatPrice } from "@/utils/priceUtils";
import clsx from "clsx";

interface PriceBoxProps {
  viewState: ViewState;
  isEnded: boolean;
  currentPrice: number;
  bidCount: number;
  myPrice: number | null;
  hasBid: boolean;
  depositAmount: number;
}

const PriceBox = ({
  viewState,
  isEnded,
  currentPrice,
  bidCount,
  myPrice,
  hasBid,
  depositAmount,
}: PriceBoxProps) => {
  const isWonView = viewState === "WON";
  const isLostView = viewState === "LOST";

  return (
    <div className="mb-4">
      <div
        className={clsx(
          "p-4 rounded-xl mb-4",
          isWonView ? "bg-mainpink text-white" : "bg-grey02 text-mainpink"
        )}
      >
        <div className="flex justify-between items-center">
          <div className="text-reg14 mb-1">
            {isEnded ? "최종 낙찰가" : "현재 최고 입찰가"}
          </div>
          {viewState === "WON" && (
            <div className="flex items-center justify-center w-16 h-6 rounded-full bg-lightpink text-mainpink text-med13 leading-none">
              낙찰 성공
            </div>
          )}
          {viewState === "LOST" && (
            <div className="flex items-center justify-center w-16 h-6 rounded-full bg-grey03 text-darkgrey05 text-med13 leading-none">
              낙찰 실패
            </div>
          )}
        </div>

        <div className="text-bold24 mb-1">{formatPrice(currentPrice)}</div>

        <div className="flex items-center gap-5 text-reg14">
          <span>입찰자 {bidCount}명</span>
          {(viewState === "LIVE_BIDDING" || viewState === "LOST") &&
            myPrice && <span>내 입찰가 {formatPrice(myPrice)}</span>}
        </div>
      </div>

      {/* 보증금 */}
      {hasBid && (
        <div
          className={clsx(
            "text-reg14 px-2",
            isLostView ? "text-darkgrey05" : "text-mainpink"
          )}
        >
          {isLostView
            ? `보증금 ${formatPrice(depositAmount)} 환급완료`
            : `! 보증금 ${formatPrice(depositAmount)}`}
        </div>
      )}
    </div>
  );
};

export default PriceBox;
