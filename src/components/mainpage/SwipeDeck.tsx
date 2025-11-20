import SwipeCard from "@/components/mainpage/SwipeCard";
import { useMemo, useState } from "react";
import type { MainPageProduct } from "@/types/item/bid/Bid.type";
import ProductCard from "./ProductCard";
import BidSheet from "./BidSheet";
import { useBid } from "@/hooks/useSwipeBid";

interface Props {
  items: MainPageProduct[];
  onChange?: (current: MainPageProduct | undefined) => void;
}

export default function SwipeDeck({ items, onChange }: Props) {
  const [deck, setDeck] = useState<MainPageProduct[]>(items);
  const [index, setIndex] = useState(0);

  const current = deck[index];
  const hasNext = index < deck.length - 1;

  const [sheetOpen, setSheetOpen] = useState(false);
  const { price, setPrice } = useBid(
    current ? (current.bidPrice ?? current.highestBid) : 0
  );

  const openSheet = () => {
    if (!current) return;
    setPrice(current.bidPrice ?? current.highestBid);
    setSheetOpen(true);
  };

  const closeSheet = () => setSheetOpen(false);

  const confirmBid = () => {
    if (!current) return;
    const updated = deck.map((p, i) =>
      i === index ? { ...p, bidPlaced: true, bidPrice: price } : p
    );
    setDeck(updated);
    setSheetOpen(false);
  };

  const defer = () => {
    if (!current) return;
    setDeck(prev => {
      const next = [...prev];
      const [item] = next.splice(index, 1);
      next.push(item);
      return next;
    });
  };

  const onSwiped = (dir: string) => {
    if (dir === "left" && hasNext) {
      const nextIdx = Math.min(index + 1, deck.length - 1);
      setIndex(nextIdx);
      onChange?.(deck[nextIdx]);
    }
  };

  const visible = useMemo(() => deck.slice(index, index + 3), [deck, index]);

  return (
    <div className="relative mx-auto h-[640px] w-[360px]">
      {visible.map((product, i) => {
        const depth = i;
        const scale = 1 - depth * 0.06;
        const translateY = depth * 20;
        const translateX = depth * 6;

        return (
          <div
            key={product.id}
            className="absolute inset-0 pointer-events-auto transition-transform duration-300 ease-out"
            style={{
              zIndex: visible.length - i,
              transform: `translate(${translateX}px, ${translateY}px) scale(${scale})`,
              opacity: 1 - depth * 0.12,
            }}
          >
            <SwipeCard
              onSwipe={onSwiped}
              preventSwipe={
                sheetOpen
                  ? ["left", "right", "up", "down"]
                  : ["right", "up", "down"]
              }
            >
              <ProductCard
                product={product}
                onOpenBid={openSheet}
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
          onClose={closeSheet}
          onConfirm={confirmBid}
          productTitle={current.title}
          highestBid={current.highestBid}
        />
      )}
    </div>
  );
}
