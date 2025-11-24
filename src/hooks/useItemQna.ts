import { useState } from "react";

export const useItemQna = () => {
  const [isAsking, setIsAsking] = useState(false);
  const [replyingToId, setReplyingToId] = useState<number | null>(null);

  // 질문하기
  const handleAskQuestion = () => {
    setIsAsking(true);
    setReplyingToId(null);
  };

  // 답변 달기
  const handleStartReply = (questionId: number) => {
    setReplyingToId(questionId);
    setIsAsking(false);
  };

  // 답변 취소 클릭
  const handleCancelReply = () => {
    setReplyingToId(null);
  };

  // 새 질문 제출
  const handleQuestionSubmit = (questionText: string) => {
    console.log("질문 등록: ", questionText);
    setIsAsking(false);
  };

  // 답변 제출
  const handleReplySubmit = (questionId: number, answerText: string) => {
    console.log("답변 제출: ", questionId, answerText);
    setReplyingToId(null);
  };

  const cancelAsking = () => setIsAsking(false);

  return {
    isAsking,
    replyingToId,
    setIsAsking,
    handleAskQuestion,
    handleStartReply,
    handleCancelReply,
    handleQuestionSubmit,
    handleReplySubmit,
    cancelAsking,
  };
};
