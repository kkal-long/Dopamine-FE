export interface DeckAuctionItem {
  id: number;
  title: string;
  imageUrl: string;
  currentPrice: number;
  endAt: string;

  bidPlaced?: boolean;
  bidPrice?: number;
}

export interface DeckAuctionResponse {
  auctions: DeckAuctionItem[];
}

export type SwipeActionType = "DISLIKE" | "HOLD" | "BIDDING";

export interface SwipeActionRequest {
  auctionId: number;
  action: SwipeActionType;
}

export interface SwipeActionResponse {
  success: boolean;
}
