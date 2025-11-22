export interface WonItemData {
  auctionId: number;
  goodsName: string;
  createdAt: string;
  finalPrice: number;
  imageUrl: string;
}

export interface BidItemData {
  acutionId: number;
  goodsName: string;
  createdAt: string;
  endAt: string;
  currentPrice: number;
  imageUrl: string;
  status: "IN_PROGRESS" | "FAIL";
}

export interface AuctionSummaryResponse {
  wonItems: WonItemData[];
  bidItems: BidItemData[];
}
