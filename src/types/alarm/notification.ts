export interface NotificationItem {
  id: number;
  message: string;
  auctionId: number;
  type: "OUTBID" | "WIN";
  isRead: boolean;
  createdAt: string;
}
