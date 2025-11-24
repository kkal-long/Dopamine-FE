import instance from "@/apis/instance";
import {
  AuctionSummaryResponse,
  BidHistoryResponse,
} from "@/types/item/bid/bidApi.type";

export const getAuctionSummary = async (
  userId: number
): Promise<AuctionSummaryResponse> => {
  const response = await instance.get(`/api/users/${userId}/auction-summary`);
  return response.data;
};

export const getBidHistory = async (
  auctionId: number
): Promise<BidHistoryResponse> => {
  const response = await instance.get(`/api/auctions/${auctionId}/bids`);
  return response.data;
};
