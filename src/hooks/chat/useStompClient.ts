import { ChatMessageItem } from "@/types/chat/chatApi.type";
import { Client } from "@stomp/stompjs";
import { useEffect, useRef } from "react";
import SockJS from "sockjs-client";

interface UseStompClientProps {
  roomId: number;
  onMessage: (message: ChatMessageItem) => void;
}

export const useStompClient = ({ roomId, onMessage }: UseStompClientProps) => {
  const stompClient = useRef<Client | null>(null);

  useEffect(() => {
    if (!roomId) return;

    const client = new Client({
      webSocketFactory: () =>
        new SockJS(`${import.meta.env.VITE_SERVER_API_URL}/ws/chat`),

      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,

      onConnect: () => {
        client.subscribe(`/topic/chat/rooms/${roomId}`, message => {
          const receivedMsg: ChatMessageItem = JSON.parse(message.body);
          onMessage(receivedMsg);
        });
      },

      onStompError: frame => {
        console.error("연결 오류: ", frame.headers["message"]);
      },
    });

    client.activate();
    stompClient.current = client;

    return () => {
      client.deactivate();
    };
  }, [roomId]);

  const sendMessage = (message: object) => {
    if (stompClient.current && stompClient.current.connected) {
      stompClient.current.publish({
        destination: `/app/chat/rooms/${roomId}/send`,
        body: JSON.stringify(message),
      });
      return true;
    } else {
      return false;
    }
  };

  return { sendMessage };
};
