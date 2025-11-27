export interface CreateBidRequest {
  auctionId: number;
  bidPrice: number;
}

export interface CreateBidResponse {
  bidId: number;
  userId: number;
  auctionId: number;
  bidPrice: number;
  depositAmount: number;
  status: "PENDING" | "SUCCESS" | "FAILED";
  depositStatus: "HELD" | "RELEASED";
}
