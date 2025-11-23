import instance from "@/apis/instance";
import {
  ChatMesageList,
  CreateChatRoomResponse,
} from "@/types/chat/chatApi.type";

export const postCreateChatRoom = async (
  auctionId: number
): Promise<CreateChatRoomResponse> => {
  const response = await instance.post(`/api/auctions/${auctionId}/chat`);
  return response.data;
};

export const getChatMessage = async (
  roomId: number
): Promise<ChatMesageList> => {
  const response = await instance.get(`/api/chat/rooms/${roomId}/messages`);
  return response.data;
};

export const postChatComplete = async (roomId: number): Promise<string> => {
  const response = await instance.post(`/api/chat/rooms/${roomId}/complete`);
  return response.data;
};
