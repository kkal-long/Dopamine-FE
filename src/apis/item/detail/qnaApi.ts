import instance from "@/apis/instance";
import { QnaAuctionResponse } from "@/types/item/detail/qnaApi.type";

export const getAuctionQna = async (
  auctionId: number
): Promise<QnaAuctionResponse> => {
  const response = await instance.get(`/api/auctions/${auctionId}/qna`);
  return response.data;
};
