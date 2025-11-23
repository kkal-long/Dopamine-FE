import { getChatMessage, postCreateChatRoom } from "@/apis/chat/chatApi";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useChatApi = () => {
  const postCreateChatRoomMutation = () => {
    return useMutation({
      mutationFn: postCreateChatRoom,
    });
  };

  const getChatMessageQuery = (roomId: number) => {
    return useQuery({
      queryKey: ["chatMessage", roomId],
      queryFn: () => getChatMessage(roomId),
      enabled: !!roomId && !isNaN(roomId),
    });
  };

  return {
    postCreateChatRoomMutation,
    getChatMessageQuery,
  };
};
