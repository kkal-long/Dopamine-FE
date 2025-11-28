export interface SearchResultItem {
  auctionId: number;
  goodsName: string;
  status: string;
  remainingTime: string;
  currentPrice: number;

  imageUrl: string | null;

  imageUrls: string[];

  condition: string;
  year: string;
  categoryId: number;
}

export interface RecentKeywordItem {
  id: number;
  keyword: string;
}
