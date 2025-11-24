import { QnaItem } from "@/types/item/detail/qnaApi.type";

export interface QnaListProps {
  qnaList: QnaItem[];
  isSeller: boolean;
  replyingToId: number | null;
  onAskQuestion: () => void;
  onStartReply: (questionId: number) => void;
  onCancelReply: () => void;
  onReplySubmit: (questionId: number, answerText: string) => void;
}

export interface QnaItemProps {
  qna: QnaItem;
  isSeller: boolean;
  isReplying: boolean;
  onStartReply: (questionId: number) => void;
  onCancelReply: () => void;
  onReplySubmit: (questionId: number, answerText: string) => void;
}
