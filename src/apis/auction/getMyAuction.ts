import instance from "@/apis/instance";
import { MyAuctionResponse } from "@/types/auction/myauction";

export const getMyAuctions = async (): Promise<MyAuctionResponse> => {
  const res = await instance.get<MyAuctionResponse>("auctions/my");
  return res.data;
};
