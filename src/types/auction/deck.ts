export interface DeckAuctionItem {
  id: number;
  title: string;
  imageUrl: string;
  currentPrice: number;
  endAt: string;

  /* 프론트에서만 쓰는 UI 상태 */
  bidPlaced?: boolean; // 이미 입찰했는지 여부
  bidPrice?: number; // 사용자가 입력한 입찰 금액
}

export interface DeckAuctionResponse {
  auctions: DeckAuctionItem[];
}
