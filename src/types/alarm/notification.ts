export interface NotificationItem {
  id: number;
  message: string;
  auctionId: number;
  type: "OUTBID" | "WIN" | "FAIL";
  isRead: boolean;
  createdAt: string;
}
