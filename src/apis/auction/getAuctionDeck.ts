import instance from "@/apis/instance";
import type { DeckAuctionResponse } from "@/types/auction/deck";

export const getAuctionDeck = async (): Promise<DeckAuctionResponse> => {
  const res = await instance.get<DeckAuctionResponse>("/auctions/deck");
  return res.data;
};
