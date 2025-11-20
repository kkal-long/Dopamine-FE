import { Dropdown, Filter, Goback, Search } from "@/assets/svgs/search";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const mockProducts = [
  {
    id: 1,
    name: "나이키 에어포스1 로우 265",
    price: 110000,
    status: "경매중",
    timeLeft: "2",
  },
  {
    id: 2,
    name: "나이키 에어포스1 실버 새상품",
    price: 20000,
    status: "경매중",
    timeLeft: "2",
  },
  {
    id: 3,
    name: "슈프림 에어포스1",
    price: 40000,
    status: "경매중",
    timeLeft: "2",
  },
];

const SearchResultPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const initialQuery = location.state?.query || "";

  const [query, setQuery] = useState(initialQuery);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  const filteredProducts = mockProducts.filter(p =>
    p.name.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    const stored = localStorage.getItem("recentSearches");
    if (stored) setRecentSearches(JSON.parse(stored));
  }, []);

  const handleSearchSubmit = () => {
    if (!query.trim()) return;
    const updated = [query, ...recentSearches.filter(i => i !== query)].slice(
      0,
      10
    );
    setRecentSearches(updated);
    localStorage.setItem("recentSearches", JSON.stringify(updated));
  };

  return (
    <div className="w-full max-w-[375px] mx-auto bg-white min-h-[812px] px-[20px] py-6 flex flex-col">
      {/* 상단 바 */}
      <div className="flex items-center mb-6">
        <button
          onClick={() => navigate("/search")}
          className="flex justify-center items-center w-[32px] h-[32px] flex-shrink-0 bg-transparent border-0 cursor-pointer outline-none"
        >
          <Goback className="w-[17.5px] h-[24px] mr-3" />
        </button>

        <div className="w-full h-[50px] flex items-center bg-white rounded-[8px] pl-[8px] pr-[12px] py-[13px] border border-grey09">
          <Search className="w-4 h-4 mr-2" />
          <input
            value={query}
            onChange={e => setQuery(e.target.value)}
            onBlur={handleSearchSubmit}
            onKeyDown={e => e.key === "Enter" && handleSearchSubmit()}
            type="text"
            placeholder="검색어를 입력하세요"
            className="flex-1 bg-transparent outline-none text-med16 text-darkgrey02 placeholder-bluegrey04"
          />
        </div>
      </div>

      {/* 필터 */}
      <div className="flex items-center mb-4 flex-shrink-0">
        <Filter className="w-[28px] h-[28px] mr-1" />
        <div
          className="flex flex-nowrap overflow-x-auto gap-1.5 scrollbar-hide"
          style={{
            msOverflowStyle: "none",
            scrollbarWidth: "none",
          }}
        >
          {["상태", "연식", "가격", "카테고리"].map(label => (
            <button
              key={label}
              className="flex items-center text-med13 text-grey14 border border-grey09 rounded-[3px] px-[6px] py-[3px] whitespace-nowrap flex-shrink-0"
            >
              {label}
              <Dropdown className="w-[18px] h-[18px] ml-[4px]" />
            </button>
          ))}
        </div>
      </div>

      <p className="text-med12 text-black mb-[10px]">
        검색 결과 {filteredProducts.length}개
      </p>

      {/* 상품 리스트 */}
      <div
        className="flex flex-col gap-4 overflow-y-auto flex-1 scrollbar-hide"
        style={{
          msOverflowStyle: "none",
          scrollbarWidth: "none",
        }}
      >
        {filteredProducts.length === 0 ? (
          <p className="text-med14 text-grey04">검색 결과가 없습니다.</p>
        ) : (
          filteredProducts.map(({ id, name, price, status, timeLeft }) => (
            <div
              key={id}
              className="flex items-center border border-grey09 rounded-[8px] px-3 py-3"
            >
              <div className="w-[70px] h-[70px] bg-grey09 rounded-[8px] mr-4 flex-shrink-0" />
              <div className="flex flex-col flex-1">
                <span className="text-med16 text-darkgrey05 mb-[4px]">
                  {name}
                </span>
                <div className="flex items-center gap-2 mb-[4px]">
                  <span className="text-med12 text-orange01 bg-lightorange01 px-2 py-[2px] rounded-full">
                    {status}
                  </span>
                  <span className="text-med14 text-mainpink">
                    {timeLeft}시간 남음
                  </span>
                </div>
                <span className="text-med14 text-darkgrey05">
                  현재 최고가: ₩{price.toLocaleString()}
                </span>
              </div>
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

export default SearchResultPage;
