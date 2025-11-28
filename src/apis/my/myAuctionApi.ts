import instance from "@/apis/instance";
import { MyAuctionsResponse } from "@/types/auction/myauctionApi.type";

export const getMyAuctions = async (): Promise<MyAuctionsResponse> => {
  const res = await instance.get<MyAuctionsResponse>("/auctions/my");
  return res.data;
};
