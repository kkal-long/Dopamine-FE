import { useState } from "react";

export const useBid = (initialPrice: number) => {
  const [price, setPrice] = useState(initialPrice);
  return { price, setPrice };
};
