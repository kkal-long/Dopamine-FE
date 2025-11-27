export interface QnaItem {
  qnaId: number;
  auctionId: number;
  questionUserId: number;
  questionUserNickname: string;
  questionUserProfileImageUrl: string;
  questionContent: string;
  questionCreatedAt: string;
  answerUserId: number | null;
  answerUserNickname: string | null;
  answerUserProfileImageUrl: string | null;
  answerContent: string | null;
  answerCreatedAt: string | null;
}

export type QnaAuctionResponse = QnaItem[];

export interface QnaQuestionRequest {
  auctionId: number;
  userId: number;
  questionContent: string;
}

export type QnaQuestionResponse = QnaItem;

export interface QnaAnswerRequest {
  qnaId: number;
  userId: number;
  answerContent: string;
}

export type QnaAnswerResponse = QnaItem;
