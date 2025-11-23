import Footer from "@/components/chat/footer/Footer";
import Header from "@/components/chat/header/Header";
import MessageList from "@/components/chat/message/MessageList";
import ConfirmModal from "@/components/common/ConfirmModal";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import { useChatApi } from "@/hooks/chat/useChatApi";
import { useStompClient } from "@/hooks/chat/useStompClient";
import { useUserStore } from "@/store/useUserStore";
import { ChatMesageList, ChatMessageItem } from "@/types/chat/chatApi.type";
import { useCallback, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

const ChatPage = () => {
  const { id } = useParams();
  const roomId = Number(id);
  const navigate = useNavigate();
  const location = useLocation();

  const [isSending, setSending] = useState(false);
  const [isModalOPen, setModalOpen] = useState(false);

  const itemInfo = location.state.itemInfo;

  const userId = useUserStore(state => state.userId);
  const userName = useUserStore(state => state.userName);
  const userImage = useUserStore(state => state.userImage);

  const isBuyer = itemInfo ? userId === itemInfo.buyerId : false;
  const opponentName = isBuyer
    ? itemInfo.sellerNickname
    : itemInfo.buyerNickname;

  const { getChatMessageQuery } = useChatApi();
  const { data: initialChatMessages, isLoading } = getChatMessageQuery(roomId);

  const [realTimeMessages, setRealTimeMessages] = useState<ChatMesageList>([]);

  const handleReceiveMessage = useCallback((message: ChatMessageItem) => {
    if (message.senderId === userId) return;
    setRealTimeMessages(prev => [...prev, message]);
  }, []);

  const { sendMessage } = useStompClient({
    roomId,
    onMessage: handleReceiveMessage,
  });

  const disaplayMessages: ChatMesageList = [
    ...(initialChatMessages || []),
    ...realTimeMessages,
  ];

  const handleMessageSubmit = (text: string) => {
    if (isSending) return;
    setSending(true);

    const payload = {
      senderId: userId,
      messageContent: text,
    };

    const tempMessage: ChatMessageItem = {
      messageId: Date.now(),
      senderId: userId as number,
      senderName: userName || "",
      profileImageUrl: userImage || "",
      messageContent: text,
      sendAt: new Date().toISOString(),
      isRead: false,
      myMessage: true,
    };

    setRealTimeMessages(prev => [...prev, tempMessage]);

    try {
      const success = sendMessage(payload);
      if (!success) {
        alert("채팅 서버와 연결에 실패했습니다.");
      }
    } catch (error) {
      console.error("메세지 전송 실패", error);
      alert("메세지 전송에 실패했습니다.");
    } finally {
      setSending(false);
    }
  };

  const handelCompleteAution = () => {
    setModalOpen(false);
    navigate("/items");
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="flex flex-col h-full">
      <Header
        opponentName={opponentName}
        goodsName={itemInfo.goodsName}
        imageUrl={itemInfo.imageUrl}
      />
      <MessageList messages={disaplayMessages} />
      <Footer
        isBuyer={isBuyer}
        isSending={isSending}
        onSubmit={handleMessageSubmit}
        onComplete={() => setModalOpen(true)}
      />

      <ConfirmModal
        isOpen={isModalOPen}
        onClose={() => setModalOpen(false)}
        onConfirm={handelCompleteAution}
        title="거래 종료"
        confirmText="거래 완료 됐어요"
      >
        <p>
          거래가 무사히 성사되었나요?
          <br />
          상품을 받으신 후, 거래 완료를 눌러주세요
        </p>
      </ConfirmModal>
    </div>
  );
};

export default ChatPage;
