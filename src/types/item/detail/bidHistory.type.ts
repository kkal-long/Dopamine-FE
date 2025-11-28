export interface BidData {
  userId: number | null;
  name: string;
  image: string;
  bidPrice: number;
  bidAt: string;
}

export interface BidHistoryListProps {
  state: "RUNNING" | "ENDED";
  bids: BidData[];
  totalBidCount: number;
}

export interface BidHistoryItemProps {
  bid: BidData;
  rank: number;
  isWinner: boolean; // 경매가 끝났을 때 1등
  isCurrentTop: boolean; // 경매가 진행중일 때 1등
}
