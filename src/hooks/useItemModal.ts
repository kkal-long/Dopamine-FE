import { useChatApi } from "@/hooks/chat/useChatApi";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const useItemModal = (
  auctionId: number,
  imageUrl: string,
  startPrice: number,
  goodsName: string
) => {
  const [isChatModalOpen, setChatModalOpen] = useState(false);
  const [isRejectModalOpen, setRejectModalOpen] = useState(false);
  const navigate = useNavigate();

  const { postCreateChatRoomMutation } = useChatApi();
  const { mutate: createChatRoom } = postCreateChatRoomMutation();

  const handleConfirmChat = () => {
    createChatRoom(auctionId, {
      onSuccess: res => {
        setChatModalOpen(false);

        navigate(`/chat/${res.chatRoomId}`, {
          state: {
            itemInfo: {
              goodsName: goodsName,
              imageUrl: imageUrl,
              finalPrice: startPrice,
              sellId: res.sellerId,
              sellerNickname: res.sellerNickname,
              buyerId: res.buyerId,
              buyerNickname: res.buyerNickname,
            },
          },
        });
      },
      onError: err => {
        console.error("채팅방 생성 실패: ", err);
        alert("채팅방 연결에 실패했습니다.");
      },
    });
  };

  const handleConfirmReject = () => {
    setRejectModalOpen(false);
    navigate("/");
  };

  return {
    isChatModalOpen,
    setChatModalOpen,
    isRejectModalOpen,
    setRejectModalOpen,
    handleConfirmChat,
    handleConfirmReject,
  };
};
