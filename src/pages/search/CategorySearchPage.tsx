import { Delete, Goback, Search } from "@/assets/svgs/search";
import { useCategoryKeyword } from "@/hooks/useSearch";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const CategorySearchPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const initialCategory = location.state?.category || "카테고리";
  const categoryId = location.state?.categoryId;

  // 입력 중인 검색어
  const [query, setQuery] = useState("");

  // Enter로 확정된 검색어
  const [confirmedQuery, setConfirmedQuery] = useState("");

  // 로컬 최근 검색어
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  // 로컬스토리지 로드
  useEffect(() => {
    const stored = localStorage.getItem("recentSearches");
    if (stored) setRecentSearches(JSON.parse(stored));
  }, []);

  /* API: 카테고리 + 키워드 검색 */
  const {
    data: products = [],
    isLoading,
    isError,
  } = useCategoryKeyword(categoryId, confirmedQuery);

  /* 최신 검색어 저장 */
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
    setQuery(finalWord); // 검색창에도 반영
  };

  /* 최근 검색어 클릭 → 자동 검색 */
  const handleRecentClick = (word: string) => {
    handleSearchSubmit(word);
  };

  /* 최근 검색어 삭제 */
  const handleDelete = (word: string) => {
    const updated = recentSearches.filter(w => w !== word);
    setRecentSearches(updated);
    localStorage.setItem("recentSearches", JSON.stringify(updated));
  };

  return (
    <div className="w-full max-w-[375px] mx-auto bg-white min-h-[812px] px-[20px] py-6">
      {/* 상단 바 */}
      <div className="flex items-center mb-[14px]">
        <button
          onClick={() => navigate(-1)}
          className="flex justify-center items-center w-[32px] h-[32px]"
        >
          <Goback className="w-[17.5px] h-[24px] cursor-pointer -ml-2" />
        </button>

        {/* 입력창 */}
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

        {!isLoading && products.length === 0 && confirmedQuery && (
          <p className="text-med14 text-grey04">검색 결과가 없습니다.</p>
        )}

        {!isLoading &&
          products.map(item => (
            <Link
              to={`/item/${item.auctionId}`}
              key={item.auctionId}
              className="flex items-center border border-grey04 rounded-[8px] px-3 py-3 mb-3"
            >
              <div className="w-[70px] h-[70px] bg-grey09 rounded-[8px] mr-4 overflow-hidden">
                {item.imageUrl && (
                  <img
                    src={item.imageUrl}
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
                  <span className="text-med12 text-orange01 bg-lightorange01 px-2 py-[2px] rounded-full">
                    {item.status}
                  </span>
                  <span className="text-med14 text-mainpink">
                    {item.remainingTime}
                  </span>
                </div>
                <span className="text-med14 text-darkgrey05">
                  현재 최고가: ₩{item.currentPrice.toLocaleString()}
                </span>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default CategorySearchPage;
