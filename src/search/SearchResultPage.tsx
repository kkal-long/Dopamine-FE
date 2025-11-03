import React, { useState, useEffect } from "react";
import searchIcon from "../assets/search/search.svg";
import backIcon from "../assets/search/back.svg";
import filterIcon from "../assets/search/filter.svg";
import dropdownIcon from "../assets/search/dropdown.svg";
import { useLocation, useNavigate } from "react-router-dom";

const mockProducts = [
  {
    id: 1,
    name: "나이키 에어포스1 로우 265",
    price: 110000,
    status: "경매중",
    timeLeft: "2시간 남음",
  },
  {
    id: 2,
    name: "나이키 에어포스1 실버 새상품",
    price: 20000,
    status: "경매중",
    timeLeft: "2시간 남음",
  },
  {
    id: 3,
    name: "슈프림 에어포스1",
    price: 40000,
    status: "경매중",
    timeLeft: "2시간 남음",
  },
];

const SearchResultPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // 초기 검색어는 이전 페이지에서 전달된 query 값
  const initialQuery = location.state?.query || "";
  const [query, setQuery] = useState(initialQuery);
  const [filteredProducts, setFilteredProducts] = useState(mockProducts);

  // 최근 검색어 목록 관리 (localStorage 사용)
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  // 컴포넌트 로드시 localStorage에서 최근 검색어 불러오기
  useEffect(() => {
    const stored = localStorage.getItem("recentSearches");
    if (stored) setRecentSearches(JSON.parse(stored));
  }, []);

  // query 변경 시마다 필터링
  useEffect(() => {
    const results = mockProducts.filter(product =>
      product.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredProducts(results);
  }, [query]);

  // 검색 완료 시 (엔터 또는 blur 시) 최근 검색어에 추가
  const handleSearchSubmit = () => {
    if (!query.trim()) return;

    const updatedSearches = [
      query,
      ...recentSearches.filter(item => item !== query),
    ].slice(0, 10); // 최대 10개까지만 저장

    setRecentSearches(updatedSearches);
    localStorage.setItem("recentSearches", JSON.stringify(updatedSearches));
  };

  return (
    <div className="w-full max-w-[375px] mx-auto bg-white min-h-[812px] px-[20px] py-6 flex flex-col">
      {/* 상단 바 */}
      <div className="flex items-center mb-[14px] flex-shrink-0">
        <button
          onClick={() => navigate("/search")}
          className="flex justify-center items-center w-[32px] h-[32px] flex-shrink-0 bg-transparent border-none outline-none p-0"
          style={{ WebkitTapHighlightColor: "transparent" }}
        >
          <img src={backIcon} alt="뒤로가기" className="w-[17.5px] h-[24px]" />
        </button>

        <div className="flex flex-1 w-[309px] h-[50px] items-center bg-white rounded-[8px] pl-[8px] pr-[174px] py-[13px] border border-09">
          <img src={searchIcon} alt="검색" className="w-4 h-4 mr-2" />
          <input
            value={query}
            onChange={e => setQuery(e.target.value)}
            onBlur={handleSearchSubmit}
            onKeyDown={e => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleSearchSubmit();
              }
            }}
            type="text"
            placeholder="검색어를 입력하세요"
            className="flex-1 bg-transparent outline-none text-[16px] font-medium leading-[150%] text-darkgrey02 placeholder-bluegrey04"
          />
        </div>
      </div>

      {/* 필터 */}
      <div className="flex items-center mb-4 flex-shrink-0">
        <img src={filterIcon} alt="필터" className="w-[28px] h-[28px] mr-2" />
        <div className="flex flex-wrap gap-2">
          {["상태", "연식", "가격", "카테고리"].map((filter, i) => (
            <button
              key={i}
              className="flex items-center text-[14px] text-grey14 border border-grey09 rounded-[3px] pl-[8px] py-[4px]"
            >
              {filter}
              <img
                src={dropdownIcon}
                alt="상세보기"
                className="w-[21px] h-[21px] mx-0.5"
              />
            </button>
          ))}
        </div>
      </div>

      {/* 검색 결과 수 */}
      <p className="text-[12px] text-black mb-[10px] flex-shrink-0">
        검색 결과 {filteredProducts.length}개
      </p>

      {/* 상품 리스트*/}
      <div
        className="flex flex-col gap-4 overflow-y-scroll flex-1 scrollbar-hide"
        style={{
          msOverflowStyle: "none",
          scrollbarWidth: "none",
        }}
      >
        {filteredProducts.length === 0 ? (
          <p className="text-[14px] text-grey04">검색 결과가 없습니다.</p>
        ) : (
          filteredProducts.map(product => (
            <div
              key={product.id}
              className="flex items-center border border-grey09 rounded-[8px] px-3 py-3"
            >
              <div className="w-[70px] h-[70px] bg-grey09 rounded-[8px] mr-4 flex-shrink-0" />
              <div className="flex flex-col flex-1">
                <span className="text-[16px] text-darkgrey05 mb-[4px]">
                  {product.name}
                </span>

                <div className="flex items-center gap-2 mb-[4px]">
                  <span className="text-[12px] text-orange01 bg-lightorange01 px-2 py-[2px] rounded-full">
                    {product.status}
                  </span>
                  <span className="text-[14px] text-mainpink">
                    {product.timeLeft}
                  </span>
                </div>

                <span className="text-[14px] text-darkgrey05">
                  현재 최고가: <span>₩{product.price.toLocaleString()}</span>
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default SearchResultPage;
