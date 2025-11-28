import {
  getCategoryKeyword,
  getCategoryList,
  getSearchAll,
  postFilteredSearch,
} from "@/apis/search/searchApi";
import { useMutation, useQuery } from "@tanstack/react-query";

// 1) 카테고리별 조회
export const useCategoryList = (categoryId: number) =>
  useQuery({
    queryKey: ["categoryList", categoryId],
    queryFn: () => getCategoryList(categoryId),
  });

// 2) 카테고리 내 키워드
export const useCategoryKeyword = (categoryId: number, keyword: string) =>
  useQuery({
    queryKey: ["categoryKeyword", categoryId, keyword],
    queryFn: () => getCategoryKeyword({ categoryId, keyword }),
    enabled: keyword.length > 0,
  });

// 3) 전체 검색
export const useSearchAll = (keyword: string) =>
  useQuery({
    queryKey: ["searchAll", keyword],
    queryFn: () => getSearchAll(keyword),
    enabled: keyword.length > 0,
  });

// 4) 필터 검색
export const useFilteredSearch = () =>
  useMutation({
    mutationFn: postFilteredSearch,
  });
