import instance from "@/apis/instance";
import {
  QnaAnswerRequest,
  QnaAuctionResponse,
  QnaQuestionRequest,
  QnaQuestionResponse,
} from "@/types/item/detail/qnaApi.type";

export const getAuctionQna = async (
  auctionId: number
): Promise<QnaAuctionResponse> => {
  const response = await instance.get(`/api/auctions/${auctionId}/qna`);
  return response.data;
};

export const postQnaQuestion = async (
  data: QnaQuestionRequest
): Promise<QnaQuestionResponse> => {
  const { auctionId, userId, questionContent } = data;

  const response = await instance.post(`/api/auctions/${auctionId}/qna`, {
    userId,
    questionContent,
  });
  return response.data;
};

export const postQnaAnswer = async (
  data: QnaAnswerRequest
): Promise<QnaAuctionResponse> => {
  const { qnaId, userId, answerContent } = data;

  const response = await instance.post(`/api/qna/${qnaId}/answer`, {
    userId,
    answerContent,
  });
  return response.data;
};
