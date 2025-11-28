// CategorySearchPage.tsx
import { Delete, Goback, Search } from "@/assets/svgs/search";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import { useCategoryKeyword } from "@/hooks/search/useSearchApi";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

interface CategoryItem {
  auctionId: number;
  goodsName: string;
  currentPrice: number;
  remainingTime?: string;

  imageUrl: string | null; // API 문자열
  imageUrls: string[]; // 프론트 배열 변환

  status?: string;
  progressStatus?: string;
  auctionStatus?: string;
  state?: string;
}

const CategorySearchPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const initialCategory = location.state?.category || "카테고리";
  const categoryId = location.state?.categoryId;

  const [query, setQuery] = useState("");
  const [confirmedQuery, setConfirmedQuery] = useState("");
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  /* 최근 검색어 로드 */
  useEffect(() => {
    const stored = localStorage.getItem("recentSearches");
    if (stored) setRecentSearches(JSON.parse(stored));
  }, []);

  /* API */
  const {
    data: rawProducts = [],
    isLoading,
    isError,
  } = useCategoryKeyword(categoryId, confirmedQuery);

  /* 🔥 imageUrl → imageUrls 정규화 */
  const products: CategoryItem[] = rawProducts.map(
    (item: CategoryItem): CategoryItem => ({
      ...item,
      imageUrls: item.imageUrl ? [item.imageUrl] : [],
    })
  );

  /* 최근 검색어 저장 */
  const saveRecentKeyword = (word: string) => {
    const trimmed = word.trim();
    if (!trimmed) return;

    const updated = [
      trimmed,
      ...recentSearches.filter(w => w !== trimmed),
    ].slice(0, 10);

    setRecentSearches(updated);
    localStorage.setItem("recentSearches", JSON.stringify(updated));
  };

  /* 검색 실행 */
  const handleSearchSubmit = (word?: string) => {
    const finalWord = (word ?? query).trim();
    if (!finalWord) return;

    saveRecentKeyword(finalWord);
    setConfirmedQuery(finalWord);
    setQuery(finalWord);
  };

  const handleRecentClick = (word: string) => handleSearchSubmit(word);

  const handleDelete = (word: string) => {
    const updated = recentSearches.filter(w => w !== word);
    setRecentSearches(updated);
    localStorage.setItem("recentSearches", JSON.stringify(updated));
  };

  /** 상태 통합 */
  const normalizeStatus = (item: CategoryItem) => {
    const rawStatus =
      item.status ||
      item.progressStatus ||
      item.auctionStatus ||
      item.state ||
      "";

    const s = rawStatus.trim().toUpperCase();

    const remaining = item.remainingTime?.trim();
    const isEnd =
      remaining === "경매 종료" ||
      remaining === "종료" ||
      remaining === "마감" ||
      remaining === "END";

    if (s === "SOLD" || isEnd) return "경매종료";
    if (s === "IN_PROGRESS") return "경매중";

    return "경매중";
  };

  /** 남은 시간 정제 */
  const getValidRemainingTime = (status: string, time?: string) => {
    if (status === "경매종료") return "";
    if (!time) return "";

    const trimmed = time.trim();
    const isEnd =
      trimmed === "경매 종료" ||
      trimmed === "종료" ||
      trimmed === "마감" ||
      trimmed === "END";

    if (isEnd) return "";

    const isValid =
      trimmed.includes("남음") ||
      trimmed.includes("일") ||
      trimmed.includes("시간") ||
      trimmed.includes("분") ||
      /^[0-9]/.test(trimmed);

    return isValid ? trimmed : "";
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="w-full max-w-[375px] mx-auto bg-white min-h-[812px] px-[20px] py-6">
      {/* 상단 바 */}
      <div className="flex items-center mb-[14px]">
        <button
          onClick={() => navigate("/search")}
          className="flex justify-center items-center w-[32px] h-[32px]"
        >
          <Goback className="w-[17.5px] h-[24px] cursor-pointer -ml-2" />
        </button>

        <div className="flex w-[304px] h-[50px] items-center bg-white rounded-lg pl-[8px] pr-[12px] py-[13px] border border-grey09">
          <Search className="w-[17.5px] h-[24px] mr-[14.5px]" />

          {/* 카테고리 태그 */}
          {initialCategory && (
            <div className="flex items-center whitespace-nowrap border border-grey09 rounded-[8px] px-[6px] py-[5px] mr-2">
              <span className="text-med14 text-darkgrey01 mr-[4px]">
                {initialCategory}
              </span>
              <button onClick={() => navigate(-1)}>
                <Delete className="w-3.5 h-3.5 cursor-pointer" />
              </button>
            </div>
          )}

          {/* 검색 입력 */}
          <input
            value={query}
            onChange={e => setQuery(e.target.value)}
            onKeyDown={e => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleSearchSubmit();
              }
            }}
            placeholder="검색어를 입력하세요"
            className="flex-1 bg-transparent outline-none text-med16 text-darkgrey02"
          />
        </div>
      </div>

      {/* 최근 검색어 */}
      {recentSearches.length > 0 && (
        <div className="mt-4">
          <p className="text-med14 text-darkgrey05 mb-3">최근 검색어</p>

          <div className="flex overflow-x-auto gap-2 pb-1 scrollbar-hide">
            {recentSearches.map((word, index) => (
              <div
                key={index}
                className="flex items-center border border-grey09 rounded-[8px] px-3 py-1.5 flex-shrink-0"
              >
                <button
                  className="mr-1 text-reg14 text-darkgrey04 cursor-pointer"
                  onClick={() => handleRecentClick(word)}
                >
                  {word}
                </button>

                <button onClick={() => handleDelete(word)}>
                  <Delete className="w-3 h-4 cursor-pointer" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 검색 결과 */}
      <div className="mt-6">
        {isError && (
          <p className="text-center text-red-500 text-med14 mt-8">
            데이터를 불러오지 못했습니다.
          </p>
        )}

        {confirmedQuery && (
          <p className="text-med12 text-black mb-[10px]">
            검색 결과 {products.length}개
          </p>
        )}

        {!isLoading &&
          products.map(item => {
            const status = normalizeStatus(item);
            const isEnded = status === "경매종료";
            const remainingTime = getValidRemainingTime(
              status,
              item.remainingTime
            );

            return (
              <div
                key={item.auctionId}
                className="flex items-center border border-grey04 rounded-[8px] px-3 py-3 mb-3"
              >
                <div className="w-[70px] h-[70px] bg-grey09 rounded-[8px] mr-4 overflow-hidden">
                  {item.imageUrls[0] && (
                    <img
                      src={item.imageUrls[0]}
                      alt={item.goodsName}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>

                <div className="flex flex-col flex-1">
                  <span className="text-med16 text-darkgrey05 mb-[4px]">
                    {item.goodsName}
                  </span>

                  <div className="flex items-center gap-2 mb-[4px]">
                    <span
                      className={
                        isEnded
                          ? "text-reg12 text-darkgrey04 bg-grey01 px-2 py-[2px] rounded-full"
                          : "text-reg12 text-orange01 bg-lightorange01 px-2 py-[2px] rounded-full"
                      }
                    >
                      {status}
                    </span>

                    {remainingTime && (
                      <span className="text-med14 text-mainpink">
                        {remainingTime}
                      </span>
                    )}
                  </div>

                  <span className="text-reg14 text-darkgrey05">
                    {isEnded
                      ? item.currentPrice > 0
                        ? `낙찰가: ₩${item.currentPrice.toLocaleString()}`
                        : "낙찰가 정보 없음"
                      : `현재 최고가: ₩${item.currentPrice.toLocaleString()}`}
                  </span>
                </div>
              </div>
            );
          })}

        {!isLoading && products.length === 0 && confirmedQuery && (
          <p className="text-med14 text-grey04">검색 결과가 없습니다.</p>
        )}
      </div>
    </div>
  );
};

export default CategorySearchPage;
