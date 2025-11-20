import { useState, useEffect } from "react";

export function useBid(initialPrice: number) {
  const [price, setPrice] = useState(initialPrice);

  useEffect(() => setPrice(initialPrice), [initialPrice]);

  const inc = () => setPrice(p => p + 1000);
  const dec = () => setPrice(p => Math.max(0, p - 1000));

  return { price, setPrice, inc, dec } as const;
}
