import { Bidding, Edit, Flip } from "@/assets/svgs/main";
import type { DeckAuctionItem } from "@/types/auction/deck";

type Props = {
  product: DeckAuctionItem;
  onOpenBid: () => void;
  onDefer: () => void;
};

export default function ProductCard({ product, onOpenBid, onDefer }: Props) {
  /** 이미지 렌더링 — imageUrl만 사용 */
  const Media = () => {
    return (
      <img
        src={product.imageUrl}
        alt={product.title}
        className="absolute inset-0 h-full w-full object-cover pointer-events-none"
      />
    );
  };

  return (
    <div
      className="
        relative h-[632px] w-full overflow-hidden
        rounded-[15px] border border-white
        shadow-[0_8px_10.9px_rgba(81, 73, 73, 0.29)]
        bg-transparent
      "
    >
      <Media />

      {/* 그라데이션 */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0)_0%,rgba(0,0,0,0)_49.04%,#000_100%)]" />

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
              onClick={onOpenBid}
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
              onClick={onDefer}
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
              onClick={onOpenBid}
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
              onClick={onDefer}
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
