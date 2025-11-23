// 검색 결과 아이템
export interface SearchAuctionItem {
  auctionId: number;
  goodsName: string;
  status: string;
  remainingTime: string;
  currentPrice: number;
  imageUrl: string;
  condition: string;
  year: string;
  categoryId: number;
}

// 최근 검색어
export interface RecentKeyword {
  id: number;
  keyword: string;
}
