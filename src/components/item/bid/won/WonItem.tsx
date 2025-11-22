import { Chat } from "@/assets/svgs/common";
import type { WonItemData } from "@/types/item/bid/bidApi.type";
import { formatPrice } from "@/utils/priceUtils";
import { Link } from "react-router-dom";

interface WonItemProps {
  wonItem: WonItemData;
  onChat: (auctionId: number) => void;
}

const WonItem = ({ wonItem, onChat }: WonItemProps) => {
  return (
    <div className="w-full p-3 flex items-center justify-between gap-2 rounded-lg bg-white border border-grey04">
      <Link
        to={`/item/${wonItem.auctionId}`}
        className="flex flex-1 items-center gap-2 min-w-0"
      >
        <img
          src={wonItem.imageUrl}
          alt={wonItem.goodsName}
          className="object-cover w-16 h-16 rounded-lg bg-grey09"
        />

        <div className="flex flex-col flex-1 gap-1">
          <div className="text-med14 text-darkgrey05">{wonItem.goodsName}</div>
          <div className="text-reg12 text-darkgrey02">
            낙찰가: {formatPrice(wonItem.finalPrice)}
          </div>
          <div className="flex items-center justify-center w-14 h-5 rounded-full bg-lightpink text-mainpink text-reg12">
            낙찰완료
          </div>
        </div>
      </Link>

      <button
        onClick={() => onChat(wonItem.auctionId)}
        className="flex flex-col gap-1 items-center cursor-pointer"
      >
        <div className=" w-10 h-10 rounded-full bg-lightpink02 flex justify-center items-center">
          <Chat className="w-5 h-5" />
        </div>
        <div className="text-reg12 text-darkgrey01">채팅하기</div>
      </button>
    </div>
  );
};

export default WonItem;
