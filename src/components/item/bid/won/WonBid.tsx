import { Check } from "@/assets/svgs/common/index";
import Trophy from "@/assets/svgs/item/bid/trophy.svg?react";
import WonItem from "@/components/item/bid/won/WonItem";
import { WonItems } from "@/types/item/bid/Bid.type";

interface WonBidProps {
  wonItems: WonItems;
}

const WonBid = ({ wonItems }: WonBidProps) => {
  const autions = wonItems.autions ?? [];

  const hasItems = autions.length > 0;
  const firstItem = autions[0];
  const restItems = autions.slice(1);

  return (
    <div className="bg-white p-4 mb-2">
      <div className="flex items-center gap-2 mb-3">
        <Trophy className="w-5 h-5" />
        <span className="text-med18 text-darkgrey05">낙찰된 물품</span>
      </div>

      {hasItems ? (
        <div className="flex flex-col gap-4">
          <div className="border-l-4 border-mainpink bg-lightpink01 rounded-xl p-4 pr-0">
            <div className="flex items-center gap-2 mb-3">
              <Check className="w-5 h-5" />
              <p className="text-darkgrey04 text-med13">
                낙찰을 축하합니다! 바로 판매자와 채팅해보세요.
              </p>
            </div>

            <div>
              <WonItem wonItem={firstItem} />
            </div>
          </div>

          {restItems.map(item => (
            <WonItem key={item.autionId} wonItem={item} />
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center h-24 rounded-lg border border-grey03 text-grey10">
          낙찰된 물품이 없습니다
        </div>
      )}
    </div>
  );
};

export default WonBid;
