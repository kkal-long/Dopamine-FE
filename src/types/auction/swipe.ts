export type SwipeActionType = "DISLIKE" | "HOLD" | "BIDDING";

export interface SwipeActionRequest {
  auctionId: number;
  action: SwipeActionType;
}

export interface SwipeActionResponse {
  success: boolean;
}
