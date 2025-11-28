import { useCallback, useMemo, useState } from "react";
import type { MainPageProduct } from "@/types/item/bid/bid.type";

export function useSwipeDeck(initial: MainPageProduct[]) {
  const [products, setProducts] = useState<MainPageProduct[]>(initial);
  const [currentIndex, setCurrentIndex] = useState(0);

  const current = products[currentIndex];
  const hasNext = currentIndex < products.length - 1;

  const skipCurrent = useCallback(() => {
    if (!hasNext) return; // 마지막이면 그대로 유지
    setCurrentIndex(i => Math.min(i + 1, products.length - 1));
  }, [hasNext, products.length]);

  const deferCurrent = useCallback(() => {
    setProducts(prev => {
      const next = [...prev];
      const item = next[currentIndex];
      next.splice(currentIndex, 1);
      next.push(item);
      return next;
    });
  }, [currentIndex]);

  const updateProduct = useCallback(
    (id: string, patch: Partial<MainPageProduct>) => {
      setProducts(prev =>
        prev.map(p => (p.id === id ? { ...p, ...patch } : p))
      );
    },
    []
  );

  const visibleStack = useMemo(
    () => products.slice(currentIndex, currentIndex + 3),
    [products, currentIndex]
  );

  return {
    products,
    currentIndex,
    current,
    visibleStack,
    skipCurrent,
    deferCurrent,
    updateProduct,
  } as const;
}
