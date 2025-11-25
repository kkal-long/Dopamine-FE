// 검색 결과 아이템
export interface SearchResultItem {
  auctionId: number;
  goodsName: string;
  status: string;
  remainingTime: string;
  currentPrice: number;
  imageUrl: string[] | null;
  condition: string;
  year: string;
  categoryId: number;
}

// 최근 검색어
export interface RecentKeywordItem {
  id: number;
  keyword: string;
}
