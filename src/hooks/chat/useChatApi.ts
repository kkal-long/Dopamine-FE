import { postCreateChatRoom } from "@/apis/chat/postApi";
import { useMutation } from "@tanstack/react-query";

export const useChatApi = () => {
  const postCreateChatRoomMutation = () => {
    return useMutation({
      mutationFn: postCreateChatRoom,
    });
  };

  return {
    postCreateChatRoomMutation,
  };
};
