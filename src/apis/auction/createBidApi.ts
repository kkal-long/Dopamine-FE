import instance from "@/apis/instance";
import {
  CreateBidRequest,
  CreateBidResponse,
} from "@/types/item/bid/bidApi.type";

export const postBid = async (
  data: CreateBidRequest
): Promise<CreateBidResponse> => {
  const response = await instance.post("/api/bids", data);
  return response.data;
};
