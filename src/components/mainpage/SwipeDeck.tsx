import SwipeCard from "@/components/mainpage/SwipeCard";
import BidSheet from "./BidSheet";
import ProductCard from "./ProductCard";

import { sendSwipeAction } from "@/apis/auction/sendSwipeAction";
import { useBid } from "@/hooks/auction/useBid";
import type { DeckAuctionItem } from "@/types/auction/deck";
import { useMemo, useState } from "react";

interface SwipeDeckProps {
  items: DeckAuctionItem[];
  onDeckExhausted: () => void;
}

export default function SwipeDeck({ items, onDeckExhausted }: SwipeDeckProps) {
  const [deck, setDeck] = useState(items);
  const [index, setIndex] = useState(0);

  const current = deck[index];
  const hasNext = index < deck.length - 1;

  const [sheetOpen, setSheetOpen] = useState(false);
  const { price, setPrice } = useBid(current ? current.currentPrice : 0);

  const openBidSheet = () => {
    if (!current) return;
    setPrice(current.currentPrice);
    setSheetOpen(true);
  };

  const closeBidSheet = () => setSheetOpen(false);

  /** 🔥 입찰하기 */
  const confirmBid = async () => {
    if (!current) return;

    await sendSwipeAction({
      auctionId: current.id,
      action: "BIDDING",
    });

    setDeck(prev => prev.filter((_, i) => i !== index));

    setSheetOpen(false);

    if (deck.length <= 3) onDeckExhausted();
  };

  /** 🔥 보류 */
  const defer = async () => {
    if (!current) return;

    await sendSwipeAction({
      auctionId: current.id,
      action: "HOLD",
    });

    setDeck(prev => {
      const next = [...prev];
      const [item] = next.splice(index, 1);
      next.push(item);
      return next;
    });

    if (deck.length <= 3) onDeckExhausted();
  };

  /** 🔥 왼쪽 스와이프 (관심 없음) */
  const onSwiped = async (dir: string) => {
    if (dir === "left" && current) {
      await sendSwipeAction({
        auctionId: current.id,
        action: "DISLIKE",
      });

      setDeck(prev => prev.filter((_, i) => i !== index));

      if (deck.length <= 3) onDeckExhausted();
    }
  };

  const visible = useMemo(() => deck.slice(index, index + 3), [deck, index]);

  return (
    <div className="relative mx-auto h-[640px] w-[360px]">
      {visible.map((product, i) => {
        const depth = i;
        const scale = 1 - depth * 0.06;
        const translateY = depth * 20;

        return (
          <div
            key={product.id}
            className="absolute inset-0"
            style={{
              zIndex: visible.length - i,
              transform: `translateY(${translateY}px) scale(${scale})`,
            }}
          >
            <SwipeCard
              onSwipe={onSwiped}
              preventSwipe={
                sheetOpen ? ["left", "right"] : ["right", "up", "down"]
              }
            >
              <ProductCard
                product={product}
                onOpenBid={openBidSheet}
                onDefer={defer}
              />
            </SwipeCard>
          </div>
        );
      })}

      {current && (
        <BidSheet
          open={sheetOpen}
          value={price}
          onChange={setPrice}
          onClose={closeBidSheet}
          onConfirm={confirmBid}
          productTitle={current.title}
          highestBid={current.currentPrice}
        />
      )}
    </div>
  );
}
