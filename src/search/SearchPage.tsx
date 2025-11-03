import React, { useState, useEffect } from "react";
import searchIcon from "../assets/search/search.svg";
import backIcon from "../assets/search/back.svg";
import deleteIcon from "../assets/search/delete.svg";
import { useNavigate } from "react-router-dom";

const SearchPage: React.FC = () => {
  const [query, setQuery] = useState("");
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const navigate = useNavigate();

  // 페이지가 렌더링될 때마다 항상 최신 로컬스토리지 불러오기
  useEffect(() => {
    const stored = localStorage.getItem("recentSearches");
    if (stored) setRecentSearches(JSON.parse(stored));
  }, []);

  // 검색 실행 (Enter)
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && query.trim() !== "") {
      const newQuery = query.trim();
      const stored = localStorage.getItem("recentSearches");
      const prev = stored ? JSON.parse(stored) : [];
      const updated = [
        newQuery,
        ...prev.filter((word: string) => word !== newQuery),
      ];

      // 로컬스토리지에 저장
      localStorage.setItem("recentSearches", JSON.stringify(updated));

      // 상태 갱신
      setRecentSearches(updated);

      // navigate 수행
      navigate("/search/result", { state: { query: newQuery } });
    }
  };

  // 최근 검색어 삭제
  const handleDelete = (item: string) => {
    const updated = recentSearches.filter(word => word !== item);
    setRecentSearches(updated);
    localStorage.setItem("recentSearches", JSON.stringify(updated));
  };

  return (
    <div className="w-full max-w-[375px] mx-auto bg-white min-h-[812px] px-[20px] py-6">
      {/* 상단 바 */}
      <div className="flex items-center mb-6">
        <button
          onClick={() => navigate("/")}
          className="flex justify-center items-center w-[32px] h-[32px] flex-shrink-0 bg-transparent border-none outline-none focus:outline-none active:outline-none p-0"
          style={{ WebkitTapHighlightColor: "transparent" }}
        >
          <img src={backIcon} alt="뒤로가기" className="w-[17.5px] h-[24px]" />
        </button>

        {/* 검색창 */}
        <div className="flex w-[304px] h-[50px] items-center bg-white rounded-lg pl-[8px] pr-[174px] py-[13px] border border-grey09">
          <img src={searchIcon} alt="검색" className="w-4 h-4 mr-2" />
          <input
            value={query}
            onChange={e => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            type="text"
            placeholder="검색어를 입력하세요"
            className="flex-1 bg-transparent outline-none text-[16px] font-medium leading-[150%] text-darkgrey02 placeholder-bluegrey04"
          />
        </div>
      </div>

      {/* 최근 검색어 */}
      <div>
        <h2 className="text-[16px] font-semibold text-darkgrey05 mb-4">
          최근 검색어
        </h2>

        <div className="flex flex-wrap gap-2">
          {recentSearches.length === 0 ? (
            <p className="text-[14px] text-grey04">최근 검색어가 없습니다.</p>
          ) : (
            recentSearches.map((item, i) => (
              <div
                key={i}
                className="flex items-center text-[14px] text-darkgrey01 border border-grey09 rounded-[8px] px-3 py-1.5"
              >
                {item}
                <button onClick={() => handleDelete(item)} className="ml-1">
                  <img src={deleteIcon} alt="삭제" className="w-4 h-4" />
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
