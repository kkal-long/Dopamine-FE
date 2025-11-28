import { Search } from "@/assets/svgs/search";
import { categories } from "@/constants/category";
import React from "react";
import { useNavigate } from "react-router-dom";

const CategorySelectPage: React.FC = () => {
  const navigate = useNavigate();

  const handleCategoryClick = (categoryName: string, id: number) =>
    navigate("/search/category-result", {
      state: { category: categoryName, categoryId: id },
    });

  const handleSearchClick = () => navigate("/search");

  return (
    <div className="w-full max-w-[375px] mx-auto bg-white min-h-[812px] px-[34px] py-6">
      {/* 검색창 */}
      <div className="mb-[21px]">
        <div
          className="flex items-center bg-white rounded-xl px-4 py-3 border border-grey09 cursor-pointer"
          onClick={handleSearchClick}
        >
          <Search className="w-4 h-4 mr-2" />
          <span className="text-med16 text-darkgrey02 placeholder-bluegrey04">
            검색어를 입력하세요
          </span>
        </div>
      </div>

      {/* 구분선 */}
      <div className="w-full border-t border-grey02 mb-[19px]" />

      {/* 카테고리 */}
      <h2 className="mb-[15px] text-med16 text-darkgrey05">카테고리 선택</h2>

      <div className="flex justify-center">
        <div className="grid grid-cols-3 gap-x-[21px] gap-y-[12px]">
          {categories.map(({ id, name, imageUrl }) => (
            <button
              key={id}
              onClick={() => handleCategoryClick(name, id)}
              className="flex flex-col items-center cursor-pointer"
            >
              <div className="w-[88px] aspect-square flex items-center justify-center overflow-hidden">
                <img
                  src={imageUrl}
                  alt={name}
                  className="max-w-[70%] max-h-[70%] object-contain"
                />
              </div>
              <span className="mt-2 text-med14 text-darkgrey05 text-center">
                {name}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategorySelectPage;
