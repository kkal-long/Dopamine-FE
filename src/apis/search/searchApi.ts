import instance from "@/apis/instance";
import { SearchResultItem } from "@/types/search/search";

// 카테고리별 조회
export const getCategoryList = async (
  categoryId: number
): Promise<SearchResultItem[]> => {
  const res = await instance.get(`/api/search/category/${categoryId}`);
  return res.data;
};

// 카테고리 내 키워드 검색
export const getCategoryKeyword = async ({
  categoryId,
  keyword,
}: {
  categoryId: number;
  keyword: string;
}): Promise<SearchResultItem[]> => {
  const res = await instance.get(`/api/search/category/${categoryId}/keyword`, {
    params: { keyword },
  });
  return res.data;
};

// 전체 검색
export const getSearchAll = async (
  keyword: string
): Promise<SearchResultItem[]> => {
  const res = await instance.get(`/api/search/all`, { params: { keyword } });
  return res.data;
};

// 필터 검색
export const postFilteredSearch = async (body: {
  conditions: string[];
  minYear: string;
  maxYear: string;
  minPrice: number;
  maxPrice: number;
  categoryIds: number[];
}): Promise<SearchResultItem[]> => {
  const res = await instance.post(`/api/search/all/filter`, body);
  return res.data;
};
