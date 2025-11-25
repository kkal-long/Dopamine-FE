export interface MyAuctionItem {
  id: number;
  title: string;
  imageUrl: string;
  currentPrice: number;
  endAt: string;
}

export interface MyAuctionResponse {
  auctions: MyAuctionItem[];
}
