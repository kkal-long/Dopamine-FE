import React from "react";
import searchIcon from "../assets/search/search.svg";
import { useNavigate } from "react-router-dom";

const categories = Array.from({ length: 12 }, (_, i) => ({
  id: i,
  name: `카테고리 ${i + 1}`,
}));

const CategorySelectPage: React.FC = () => {
  const navigate = useNavigate();

  const handleCategoryClick = (category: string) => {
    navigate("/search/category-result", { state: { category } });
  };

  const handleSearchClick = () => {
    navigate("/search");
  };

  return (
    <div className="w-full max-w-[375px] mx-auto bg-white min-h-[812px] px-[34px] py-6">
      {/* 검색창 */}
      <div className="mb-6">
        <div
          className="flex items-center bg-white rounded-xl px-4 py-3 border border-grey09 cursor-pointer"
          onClick={handleSearchClick}
        >
          <img src={searchIcon} alt="검색" className="w-4 h-4 mr-2" />
          <input
            type="text"
            placeholder="검색어를 입력하세요"
            className="bg-transparent outline-none flex-1 text-darkgrey02 placeholder-bluegrey04 pointer-events-none"
          />
        </div>
      </div>

      {/* 구분선 */}
      <div className="w-full border-t border-grey02 mb-6" />

      {/* 카테고리 */}
      <h2 className="text-base font-semibold mb-6 text-[16px] text-darkgrey05">
        카테고리 선택
      </h2>

      <div className="flex justify-center">
        <div className="grid grid-cols-3 gap-x-[21px] gap-y-[30px]">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => handleCategoryClick(cat.name)}
              className="w-[88px] h-[88px] bg-gray-200 rounded-full"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategorySelectPage;
