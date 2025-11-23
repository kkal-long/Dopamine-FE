import instance from "@/apis/instance";
import { AuctionSummaryResponse } from "@/types/item/bid/bidApi.type";

export const getAuctionSummary = async (
  userId: number
): Promise<AuctionSummaryResponse> => {
  const response = await instance.get(`/api/users/${userId}/auction-summary`);
  return response.data;
};
