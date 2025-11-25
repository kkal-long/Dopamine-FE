// src/apis/auction/sendSwipeAction.ts
import instance from "@/apis/instance";

export type SwipeActionType = "DISLIKE" | "HOLD" | "BIDDING";

export interface SwipeActionRequest {
  auctionId: number;
  action: SwipeActionType;
}

export interface SwipeActionResponse {
  success: boolean;
}

export const sendSwipeAction = async (body: SwipeActionRequest) => {
  const res = await instance.post<SwipeActionResponse>("/swipes/action", body);
  return res.data;
};
