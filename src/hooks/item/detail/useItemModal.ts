import { useChatApi } from "@/hooks/chat/useChatApi";
import { useAuctionDeailApi } from "@/hooks/item/detail/useAuctionDetailApi";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const useItemModal = (
  auctionId: number,
  imageUrl: string,
  currentPrice: number,
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
              finalPrice: currentPrice,
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

  const { postRefusePurchaseMutation } = useAuctionDeailApi();
  const { mutate: refusePurchase } = postRefusePurchaseMutation();

  const handleConfirmReject = () => {
    refusePurchase(auctionId, {
      onSuccess: () => {
        setRejectModalOpen(false);
        alert("구매 거부가 완료되었습니다.");
        navigate("/");
      },
      onError: err => {
        console.error("구매 거부 실패: ", err);
        alert("구매 거부에 실패했습니다.");
      },
    });
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
