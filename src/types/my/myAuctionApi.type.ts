export interface MyAuctionItem {
  id: number;
  title: string;
  imageUrls: string[];
  currentPrice: number;
  endAt: string;
}

export interface MyAuctionResponse {
  auctions: MyAuctionItem[];
}
