import { Bidding, Edit, Flip } from "@/assets/svgs/main";
import type { DeckAuctionItem } from "@/types/auction/deckApi.type";
import { useNavigate } from "react-router-dom";

type Props = {
  product: DeckAuctionItem;
  onOpenBid: () => void;
  onDefer: () => void;
};

export default function ProductCard({ product, onOpenBid, onDefer }: Props) {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`/item/${product.id}`);
  };

  const handleOpenBid = (e: React.MouseEvent) => {
    e.stopPropagation();
    onOpenBid();
  };

  const handleDefer = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDefer();
  };

  return (
    <div
      onClick={handleNavigate}
      className="
      relative h-[632px] w-full  overflow-hidden
      rounded-2xl border border-white
      shadow-lg
      bg-transparent cursor-pointer
    "
    >
      <img
        src={product.imageUrl}
        alt={product.title}
        className="absolute inset-0 h-full w-full object-cover pointer-events-none"
      />

      {/* 그라데이션 */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black" />

      {/* 콘텐츠 영역 */}
      <div className="absolute inset-x-0 bottom-0 p-4 pointer-events-none">
        <div className="flex items-end justify-between gap-3">
          <h3 className="text-[20px] leading-tight text-white">
            {product.title}
          </h3>

          <div className="shrink-0 text-[11px] text-white">
            <span>현재 최고 입찰가 </span>
            <span>₩ {product.currentPrice.toLocaleString()}</span>
          </div>
        </div>

        {/* 입찰 전 */}
        {!product.bidPlaced ? (
          <div className="mt-3 flex items-center gap-3">
            <button
              onClick={handleOpenBid}
              className="
                pointer-events-auto
                w-[203px] h-[47px] ml-[72px]
                rounded-[25.68px] bg-mainpink
                text-white flex items-center justify-center gap-2 cursor-pointer
              "
            >
              <Bidding className="h-[20px] w-[20px]" />
              <span>입찰</span>
            </button>

            <button
              onClick={handleDefer}
              title="보류"
              aria-label="보류"
              className="pointer-events-auto"
            >
              <Flip className="h-13 w-13 cursor-pointer" />
            </button>
          </div>
        ) : (
          // 입찰 완료 UI
          <div className="mt-3 flex items-center gap-3 cursor-pointer">
            <button
              onClick={handleOpenBid}
              className="grid h-12 w-12 place-items-center rounded-full pointer-events-auto"
              title="가격 수정"
              aria-label="가격 수정"
            >
              <Edit className="h-[38px] w-[38px]" />
            </button>

            <div className="flex w-[203px] h-[47px] flex-1 items-center gap-2 rounded-[25.68px] bg-black/45 px-4 py-2 text-[#FF0458] backdrop-blur pointer-events-none">
              <span className="text-[12px]">₩</span>
              <span className="font-med18">
                {(product.bidPrice ?? 0).toLocaleString()}원
              </span>
              <span className="ml-[13px] font-med18">입찰 완료</span>
            </div>

            <button
              onClick={handleDefer}
              title="보류"
              aria-label="보류"
              className="grid h-12 w-12 place-items-center cursor-pointer pointer-events-auto"
            >
              <Flip className="h-[50px] w-[50px]" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
