import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import backIcon from "../assets/search/back.svg";
import searchIcon from "../assets/search/search.svg";
import deleteIcon from "../assets/search/delete.svg";

const mockProducts = [
  {
    id: 1,
    category: "스포츠",
    name: "나이키 에어포스1 로우 265",
    price: 110000,
    status: "경매중",
    timeLeft: "2시간 남음",
  },
  {
    id: 2,
    category: "스포츠",
    name: "나이키 에어포스1 실버 새상품",
    price: 20000,
    status: "경매중",
    timeLeft: "2시간 남음",
  },
  {
    id: 3,
    category: "스포츠",
    name: "아디다스 슈퍼스타",
    price: 90000,
    status: "경매중",
    timeLeft: "5시간 남음",
  },
  {
    id: 4,
    category: "스포츠",
    name: "뉴발란스 327",
    price: 80000,
    status: "경매중",
    timeLeft: "1시간 남음",
  },
  {
    id: 5,
    category: "패션",
    name: "슈프림 박스 로고 후드",
    price: 250000,
    status: "경매중",
    timeLeft: "3시간 남음",
  },
  {
    id: 6,
    category: "패션",
    name: "나이키 블루종 재킷",
    price: 180000,
    status: "경매중",
    timeLeft: "6시간 남음",
  },
];

const CategorySearchPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const initialCategory = location.state?.category || "카테고리 2";
  const [activeCategory, setActiveCategory] = useState<string | null>(
    initialCategory
  );
  const [query, setQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState(mockProducts);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  // 최근 검색어 로드
  useEffect(() => {
    const stored = localStorage.getItem("recentSearches");
    if (stored) setRecentSearches(JSON.parse(stored));
  }, []);

  // 검색 로직 (카테고리 필터 포함)
  useEffect(() => {
    let baseList = mockProducts;

    // 카테고리 선택되어 있다면 해당 카테고리로 제한
    if (activeCategory) {
      baseList = baseList.filter(p => p.category === activeCategory);
    }

    const results = baseList.filter(p =>
      p.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredProducts(results);
  }, [query, activeCategory]);

  // 최근 검색어 저장
  const handleSearchSubmit = () => {
    if (!query.trim()) return;
    const updated = [query, ...recentSearches.filter(q => q !== query)].slice(
      0,
      10
    );
    setRecentSearches(updated);
    localStorage.setItem("recentSearches", JSON.stringify(updated));
  };

  const handleRecentDelete = (keyword: string) => {
    const updated = recentSearches.filter(item => item !== keyword);
    setRecentSearches(updated);
    localStorage.setItem("recentSearches", JSON.stringify(updated));
  };

  const handleCategoryRemove = () => {
    setActiveCategory(null);
  };

  return (
    <div className="w-full max-w-[375px] mx-auto bg-white min-h-[812px] px-[20px] py-6">
      {/* 상단 바 */}
      <div className="flex items-center mb-[14px]">
        <button
          onClick={() => navigate(-1)}
          className="flex justify-center items-center w-[32px] h-[32px] bg-transparent border-none outline-none p-0"
          style={{ WebkitTapHighlightColor: "transparent" }}
        >
          <img src={backIcon} alt="뒤로가기" className="w-[17.5px] h-[24px]" />
        </button>

        {/* 검색창 */}
        <div className="flex flex-1 h-[50px] items-center bg-white rounded-[8px] pl-[8px] pr-[12px] py-[13px] border border-grey09">
          <img src={searchIcon} alt="검색" className="w-4 h-4 mr-2" />

          {/* 카테고리 태그 */}
          {activeCategory && (
            <div className="flex items-center whitespace-nowrap border border-grey09 rounded-[8px] px-[6px] py-[5px] mr-2">
              <span className="text-[14px] text-darkgrey01 mr-[4px]">
                {activeCategory}
              </span>
              <button
                onClick={handleCategoryRemove}
                className="flex justify-center items-center w-4 h-4"
              >
                <img
                  src={deleteIcon}
                  alt="삭제"
                  className="w-3.5 h-3.5 cursor-pointer"
                />
              </button>
            </div>
          )}

          {/* 검색 입력 */}
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
            className="flex-1 bg-transparent outline-none text-[16px] font-medium leading-[150%] text-darkgrey02 placeholder-bluegrey04"
          />
        </div>
      </div>

      {/* 최근 검색어 */}
      {recentSearches.length > 0 && (
        <div className="mt-4">
          <p className="text-[14px] text-darkgrey05 mb-3">최근 검색어</p>
          <div className="flex flex-wrap gap-2">
            {recentSearches.map((word, i) => (
              <div
                key={i}
                className="flex items-center text-[14px] text-grey14 border border-grey09 rounded-[8px] px-[6px] py-[5px]"
              >
                <button
                  onClick={() => setQuery(word)}
                  className="mr-1 text-darkgrey04"
                >
                  {word}
                </button>
                <button
                  onClick={() => handleRecentDelete(word)}
                  className="text-grey09 text-[12px]"
                >
                  <img src={deleteIcon} alt="삭제" className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 검색 결과 */}
      {query && (
        <div className="mt-6">
          <p className="text-[12px] text-black mb-[10px]">
            검색 결과 {filteredProducts.length}개
          </p>

          <div
            className="flex flex-col gap-3 overflow-y-auto max-h-[550px] scrollbar-hide"
            style={{ msOverflowStyle: "none", scrollbarWidth: "none" }}
          >
            {filteredProducts.length === 0 ? (
              <p className="text-[14px] text-grey04">검색 결과가 없습니다.</p>
            ) : (
              filteredProducts.map(product => (
                <div
                  key={product.id}
                  className="flex items-center border border-grey04 rounded-[8px] px-3 py-3"
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
                      현재 최고가: ₩{product.price.toLocaleString()}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CategorySearchPage;
