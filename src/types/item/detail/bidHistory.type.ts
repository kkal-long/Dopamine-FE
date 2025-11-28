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
  isWinner: boolean;
  isCurrentTop: boolean;
}
