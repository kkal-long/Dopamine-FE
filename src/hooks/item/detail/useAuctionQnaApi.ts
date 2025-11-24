import {
  getAuctionQna,
  postQnaAnswer,
  postQnaQuestion,
} from "@/apis/item/detail/qnaApi";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useAuctionQnaApi = () => {
  const getQnaMutation = (auctionId: number) => {
    return useQuery({
      queryKey: ["qna", auctionId],
      queryFn: () => getAuctionQna(auctionId),
      enabled: !!auctionId,
    });
  };

  const postQuestionMutation = () => {
    return useMutation({
      mutationFn: postQnaQuestion,
    });
  };

  const postAnswerMutation = () => {
    return useMutation({
      mutationFn: postQnaAnswer,
    });
  };

  return { getQnaMutation, postQuestionMutation, postAnswerMutation };
};
