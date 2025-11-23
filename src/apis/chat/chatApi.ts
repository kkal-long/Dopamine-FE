import instance from "@/apis/instance";
import { CreateChatRoomResponse } from "@/types/chat/chatApi.type";

export const postCreateChatRoom = async (
  auctionId: number
): Promise<CreateChatRoomResponse> => {
  const response = await instance.post(`/api/auctions/${auctionId}/chat`);
  return response.data;
};
