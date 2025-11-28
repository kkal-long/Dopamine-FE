import instance from "@/apis/instance";
import {
  CreateAuctionRequest,
  CreateAuctionResponse,
} from "@/types/auction/auctionApi.type";

export const createAuction = async (
  body: CreateAuctionRequest
): Promise<CreateAuctionResponse> => {
  const res = await instance.post<CreateAuctionResponse>("/auctions", body);
  return res.data;
};
