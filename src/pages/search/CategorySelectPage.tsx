import { Search } from "@/assets/svgs/search";
import React from "react";
import { useNavigate } from "react-router-dom";

// SVG 아이콘 import (11개 모두 추가, 프론트에서 처리)
import {
  Category1,
  Category10,
  Category11,
  Category2,
  Category3,
  Category4,
  Category5,
  Category6,
  Category7,
  Category8,
  Category9,
} from "@/assets/svgs/search";

const categories = [
  { id: 1, name: "디지털 기기", Icon: Category1 },
  { id: 2, name: "가구/인테리어", Icon: Category2 },
  { id: 3, name: "유아동", Icon: Category3 },
  { id: 4, name: "생활가전", Icon: Category4 },
  { id: 5, name: "스포츠", Icon: Category5 },
  { id: 6, name: "가공식품", Icon: Category6 },
  { id: 7, name: "취미/게임/음반", Icon: Category7 },
  { id: 8, name: "도서", Icon: Category8 },
  { id: 9, name: "남성패션", Icon: Category9 },
  { id: 10, name: "여성패션", Icon: Category10 },
  { id: 11, name: "식물", Icon: Category11 },
];

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
          {categories.map(({ id, name, Icon }) => (
            <button
              key={id}
              onClick={() => handleCategoryClick(name, id)}
              className="flex flex-col items-center cursor-pointer"
            >
              <div className="w-[88px] h-[88px] flex items-center justify-center">
                <Icon className="w-[88px] h-[88px]" />
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
