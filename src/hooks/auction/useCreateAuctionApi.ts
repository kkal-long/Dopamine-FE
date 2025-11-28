// src/hooks/auction/useCreateAuction.ts
import { createAuction } from "@/apis/my/createAuctionApi";
import { CreateAuctionRequest } from "@/types/auction/auctionApi.type";
import { useState } from "react";

export const useCreateAuction = () => {
  const [loading, setLoading] = useState(false);

  const submitAuction = async (data: CreateAuctionRequest) => {
    setLoading(true);
    try {
      const res = await createAuction(data);
      return res;
    } finally {
      setLoading(false);
    }
  };

  return { submitAuction, loading };
};
