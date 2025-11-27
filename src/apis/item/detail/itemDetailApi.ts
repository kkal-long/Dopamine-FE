import instance from "@/apis/instance";
import {
  AuctionDetailResponse,
  RefusePurchaseResponse,
} from "@/types/item/detail/itemDetailApi.type";

export const getAuctionDetail = async (
  auctionId: number
): Promise<AuctionDetailResponse> => {
  const response = await instance.get(`/auctions/${auctionId}`);
  return response.data;
};

export const postRefusePurchase = async (
  auctionId: number
): Promise<RefusePurchaseResponse> => {
  const response = await instance.post(
    `/auctions/${auctionId}/purchase/refuse`
  );
  return response.data;
};
