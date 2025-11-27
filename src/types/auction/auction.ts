export interface CreateAuctionRequest {
  goodsName: string;
  description: string;
  startPrice: number;
  startAt: string;
  endAt: string;
  condition: string;
  transactionMethod: "FACE_TO_FACE" | "DELIVERY";
  manufactureYear: string;
  location: string;
  imageUrls: string[]; // ← 현재 정의된 이름
  categoryIds: number[];
  hideBidPrice: boolean;
}

export interface CreateAuctionResponse {
  id: number;
}
