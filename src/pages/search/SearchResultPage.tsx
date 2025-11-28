// SearchResultPage.tsx
import { Delete, Goback, Search } from "@/assets/svgs/search";
import { useSearchAll } from "@/hooks/search/useSearch";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

interface SearchItem {
  auctionId: number;
  goodsName: string;
  currentPrice: number;
  remainingTime?: string;

  /** API: 문자열 */
  imageUrl: string | null;

  /** 프론트: 배열로 정규화한 필드 */
  imageUrls: string[];

  status?: string;
  progressStatus?: string;
  auctionStatus?: string;
  state?: string;
}

const SearchResultPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const initialQuery = location.state?.query || "";

  const [query, setQuery] = useState(initialQuery);
  const [confirmedQuery, setConfirmedQuery] = useState(initialQuery);

  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  /* 최근 검색어 로드 */
  useEffect(() => {
    const stored = localStorage.getItem("recentSearches");
    if (stored) setRecentSearches(JSON.parse(stored));
  }, []);

  /* API 호출 */
  const {
    data: rawProducts = [],
    isLoading,
    isError,
  } = useSearchAll(confirmedQuery);

  /** 🔥 imageUrl → imageUrls 로 정규화 */
  const products: SearchItem[] = rawProducts.map((item: SearchItem) => ({
    ...item,
    imageUrls: item.imageUrl ? [item.imageUrl] : [],
  }));

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
  const handleSearchSubmit = () => {
    if (!query.trim()) return;
    const finalWord = query.trim();
    saveRecentKeyword(finalWord);
    setConfirmedQuery(finalWord);
  };

  /* 최근 검색어 자동 검색 */
  const handleRecentClick = (word: string) => {
    setQuery(word);
    saveRecentKeyword(word);
    setConfirmedQuery(word);
  };

  /* 최근 검색어 삭제 */
  const handleDelete = (word: string) => {
    const updated = recentSearches.filter(w => w !== word);
    setRecentSearches(updated);
    localStorage.setItem("recentSearches", JSON.stringify(updated));
  };

  /** 상태 통합 */
  const normalizeStatus = (item: SearchItem) => {
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

    return "경매중"; // 기본값
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

  return (
    <div className="w-full max-w-[375px] mx-auto bg-white min-h-[812px] px-[20px] py-6 flex flex-col">
      {/* 상단 바 */}
      <div className="flex items-center mb-6">
        <button
          onClick={() => navigate("/search")}
          className="flex justify-center items-center w-[32px] h-[32px]"
        >
          <Goback className="w-[17.5px] h-[24px] mr-3 cursor-pointer" />
        </button>

        {/* 검색창 */}
        <div className="w-full h-[50px] flex items-center bg-white rounded-[8px] pl-[8px] pr-[12px] py-[13px] border border-grey09">
          <Search className="w-4 h-4 mr-2" />
          <input
            value={query}
            onChange={e => setQuery(e.target.value)}
            onKeyDown={e => e.key === "Enter" && handleSearchSubmit()}
            placeholder="검색어를 입력하세요"
            className="flex-1 bg-transparent outline-none text-med16 text-darkgrey02"
          />
        </div>
      </div>

      {/* 최근 검색어 */}
      {recentSearches.length > 0 && (
        <div className="mb-4">
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

      {/* 검색 결과 수 */}
      {confirmedQuery && (
        <p className="text-med12 text-black mb-[10px]">
          검색 결과 {products.length}개
        </p>
      )}

      {/* 리스트 */}
      <div className="flex flex-col gap-4 overflow-y-auto flex-1 scrollbar-hide">
        {isError && (
          <p className="text-center text-red-500 text-med14 mt-8">
            데이터를 불러오지 못했습니다.
          </p>
        )}

        {!isLoading && products.length === 0 && confirmedQuery && (
          <p className="text-med14 text-grey04">검색 결과가 없습니다.</p>
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
                className="flex items-center border border-grey09 rounded-[8px] px-3 py-3"
              >
                {/* 이미지 */}
                <div className="w-[70px] h-[70px] bg-grey09 rounded-[8px] mr-4 overflow-hidden">
                  {item.imageUrls[0] && (
                    <img
                      src={item.imageUrls[0]}
                      alt={item.goodsName}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>

                {/* 정보 */}
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
      </div>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default SearchResultPage;
