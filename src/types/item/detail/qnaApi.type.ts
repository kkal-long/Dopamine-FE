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
