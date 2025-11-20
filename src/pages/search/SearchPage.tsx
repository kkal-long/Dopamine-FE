import { Delete, Goback, Search } from "@/assets/svgs/search";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchPage: React.FC = () => {
  const [query, setQuery] = useState("");
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const navigate = useNavigate();

  // 최근 검색어 로드
  useEffect(() => {
    const stored = localStorage.getItem("recentSearches");
    if (stored) setRecentSearches(JSON.parse(stored));
  }, []);

  // 검색 실행
  const executeSearch = (searchTerm: string) => {
    if (!searchTerm.trim()) return;
    const trimmed = searchTerm.trim();
    const prev = JSON.parse(localStorage.getItem("recentSearches") || "[]");
    const updated = [
      trimmed,
      ...prev.filter((w: string) => w !== trimmed),
    ].slice(0, 10);
    setRecentSearches(updated);
    localStorage.setItem("recentSearches", JSON.stringify(updated));
    navigate("/search/result", { state: { query: trimmed } });
  };

  // 엔터 입력 시 검색
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") executeSearch(query);
  };

  // 최근 검색어 삭제
  const handleDelete = (item: string) => {
    const updated = recentSearches.filter(word => word !== item);
    setRecentSearches(updated);
    localStorage.setItem("recentSearches", JSON.stringify(updated));
  };

  // 최근 검색어 클릭 시 자동 입력 + 이동
  const handleRecentClick = (item: string) => {
    setQuery(item);
    executeSearch(item);
  };

  return (
    <div className="max-w-[375px] w-full mx-auto bg-white min-h-[812px] px-[20px] py-6 overflow-x-hidden">
      {/* 상단 바 */}
      <div className="flex items-center mb-6">
        <button
          onClick={() => navigate("/search/category-select")}
          className="flex justify-center items-center w-[32px] h-[32px] cursor-pointer bg-transparent outline-none"
        >
          <Goback className="w-[17.5px] h-[24px] mr-3" />
        </button>

        {/* 검색창 */}
        <div className="w-full h-[50px] flex items-center bg-white rounded-lg pl-[8px] pr-[12px] py-[13px] border border-grey09">
          <Search className="w-[17.5px] h-[24px] mr-[14.5px]" />
          <input
            value={query}
            onChange={e => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            type="text"
            placeholder="검색어를 입력하세요"
            className="flex-1 bg-transparent outline-none text-med16 text-darkgrey02 placeholder-bluegrey04"
          />
        </div>
      </div>

      {/* 최근 검색어 */}
      <h2 className="text-med16 text-darkgrey05 mb-4">최근 검색어</h2>

      <div
        className="flex flex-nowrap overflow-x-auto gap-2 pb-1 scrollbar-hide"
        style={{
          msOverflowStyle: "none",
          scrollbarWidth: "none",
        }}
      >
        {recentSearches.length === 0 ? (
          <p className="text-med14 text-grey04">최근 검색어가 없습니다.</p>
        ) : (
          recentSearches.map((item, i) => (
            <div
              key={i}
              className="flex items-center text-med14 text-darkgrey01 border border-grey09 rounded-[8px] px-3 py-1.5 flex-shrink-0 cursor-pointer"
            >
              {/* 최근 검색어 클릭 시 자동 검색 */}
              <span onClick={() => handleRecentClick(item)}>{item}</span>
              <button
                onClick={() => handleDelete(item)}
                className="ml-1 cursor-pointer flex items-center justify-center"
              >
                <Delete className="w-3 h-4" />
              </button>
            </div>
          ))
        )}
      </div>

      {/* 스크롤바 숨기기 */}
      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default SearchPage;
