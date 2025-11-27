import { useAuctionQnaApi } from "@/hooks/item/detail/useAuctionQnaApi";
import { useUserStore } from "@/store/useUserStore";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

export const useItemQna = (auctionId: number) => {
  const queryClient = useQueryClient();

  const [isAsking, setIsAsking] = useState(false);
  const [replyingToId, setReplyingToId] = useState<number | null>(null);

  const { postQuestionMutation, postAnswerMutation } = useAuctionQnaApi();
  const { mutate: postQuestion } = postQuestionMutation();
  const { mutate: postAnswer } = postAnswerMutation();

  const userId = useUserStore(state => state.userId);

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
  const handleQuestionSubmit = (questionContent: string) => {
    if (!userId) {
      alert("로그인 정보를 찾을 수 없습니다.");
      return;
    }

    if (!questionContent) {
      alert("질문을 입력하세요");
      return;
    }

    postQuestion(
      {
        auctionId,
        userId,
        questionContent,
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["qna", auctionId] });
          setIsAsking(false);
        },
        onError: error => {
          console.error("질문 등록 실패: ", error);
          alert("질문 등록에 실패했습니다.");
        },
      }
    );
    setIsAsking(false);
  };

  // 답변 제출
  const handleReplySubmit = (qnaId: number, answerContent: string) => {
    if (!userId) {
      alert("로그인 정보를 찾을 수 없습니다.");
      return;
    }

    if (!answerContent) {
      alert("답변을 입력하세요");
      return;
    }

    postAnswer(
      {
        qnaId,
        userId,
        answerContent,
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["qna", auctionId] });
          setReplyingToId(null);
        },
        onError: error => {
          console.error("답변 등록 실패: ", error);
          alert("답변 등록에 실패했습니다.");
        },
      }
    );
  };

  const cancelAsking = () => setIsAsking(false);

  return {
    isAsking,
    replyingToId,
    handleAskQuestion,
    handleStartReply,
    handleCancelReply,
    handleQuestionSubmit,
    handleReplySubmit,
    cancelAsking,
  };
};
