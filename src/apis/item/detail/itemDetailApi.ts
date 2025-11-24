import instance from "@/apis/instance";
import { AuctionDetailResponse } from "@/types/item/detail/itemDetailApi.type";

export const getAuctionDetail = async (
  auctionId: number
): Promise<AuctionDetailResponse> => {
  const response = await instance.get(`/auctions/${auctionId}`);
  return response.data;
};
