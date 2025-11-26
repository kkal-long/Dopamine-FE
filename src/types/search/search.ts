// 검색 결과 아이템
export interface SearchResultItem {
  auctionId: number;
  goodsName: string;
  status: string;
  remainingTime: string;
  currentPrice: number;

  /** API 실제 값 (문자열) */
  imageUrl: string | null;

  /** 프론트에서 변환한 배열 */
  imageUrls: string[];

  condition: string;
  year: string;
  categoryId: number;
}

// 최근 검색어
export interface RecentKeywordItem {
  id: number;
  keyword: string;
}
