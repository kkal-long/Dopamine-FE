import instance from "@/apis/instance";
import { RecentKeyword, SearchAuctionItem } from "@/types/search/search";

// 1) 카테고리별 조회
export const fetchCategoryList = async (
  categoryId: number
): Promise<SearchAuctionItem[]> => {
  const res = await instance.get(`/api/search/category/${categoryId}`);
  return res.data;
};

// 2) 카테고리 내 키워드 검색
export const fetchCategoryKeyword = async ({
  categoryId,
  keyword,
}: {
  categoryId: number;
  keyword: string;
}): Promise<SearchAuctionItem[]> => {
  const res = await instance.get(`/api/search/category/${categoryId}/keyword`, {
    params: { keyword },
  });
  return res.data;
};

// 3) 전체 검색
export const fetchSearchAll = async (
  keyword: string
): Promise<SearchAuctionItem[]> => {
  const res = await instance.get(`/api/search/all`, { params: { keyword } });
  return res.data;
};

// 4) 필터 검색
export const fetchFilteredSearch = async (body: {
  conditions: string[];
  minYear: string;
  maxYear: string;
  minPrice: number;
  maxPrice: number;
  categoryIds: number[];
}): Promise<SearchAuctionItem[]> => {
  const res = await instance.post(`/api/search/all/filter`, body);
  return res.data;
};

// 5) 최근 검색어 조회
export const fetchRecentKeywords = async (): Promise<RecentKeyword[]> => {
  const res = await instance.get(`/api/search/recent`);
  return res.data;
};

// 6) 최근 검색어 삭제
export const deleteRecentKeyword = async (id: number) => {
  await instance.delete(`/api/search/recent/${id}`);
};
