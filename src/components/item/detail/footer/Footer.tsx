import { Bid, Chat } from "@/assets/svgs/common";
import { Reject } from "@/assets/svgs/item/detail";
import { ViewState } from "@/types/item/detail/itemCard.type";

interface FooterProps {
  viewState: ViewState;
  isSeller: boolean;
  onBidClick: () => void;
  onChatClick: () => void;
  onRejectBuyClick: () => void;
}

const Footer = ({
  viewState,
  isSeller,
  onBidClick,
  onChatClick,
  onRejectBuyClick,
}: FooterProps) => {
  let content = null;

  switch (viewState) {
    case "LIVE":
    case "LIVE_BIDDING":
      if (!isSeller) {
        content = (
          <button
            onClick={onBidClick}
            className="w-full flex justify-center items-center gap-2 py-3 bg-mainpink text-white rounded-xl text-med16 cursor-pointer"
          >
            <Bid className="w-5 h-5" />
            입찰하기
          </button>
        );
      }
      break;

    case "WON":
      if (isSeller) {
        content = (
          <button
            onClick={onChatClick}
            className="w-full flex justify-center items-center gap-2 py-3 bg-mainpink text-white rounded-xl text-med16 cursor-pointer"
          >
            <Chat className="w-5 h-5" />
            낙찰자와 채팅하기
          </button>
        );
      } else {
        content = (
          <div className="flex gap-3">
            <button
              onClick={onRejectBuyClick}
              className="flex-[3] flex justify-center items-center gap-2 py-3 bg-grey01 text-grey14 border-bluegrey01 rounded-xl text-med16 cursor-pointer"
            >
              <Reject className="w-4 h-4" />
              구매 거부
            </button>
            <button
              onClick={onChatClick}
              className="flex-[5] flex justify-center items-center gap-2 py-3 bg-mainpink text-white  border-bluegrey02 rounded-xl text-med16 cursor-pointer"
            >
              <Chat className="w-4 h-4" />
              채팅
            </button>
          </div>
        );
      }
      break;

    case "LOST":
    case "ENDED":
    default:
      content = null;
      break;
  }

  if (!content) {
    return;
  }

  return (
    <div className="sticky bottom-0 w-full bg-white p-4">
      <div>{content}</div>
    </div>
  );
};

export default Footer;
