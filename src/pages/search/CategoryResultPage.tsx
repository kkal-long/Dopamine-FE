import { Goback, Search } from "@/assets/svgs/search";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const mockProducts = [
  {
    id: 1,
    categoryId: 1,
    name: "나이키 에어포스1 로우 265",
    price: 110000,
    status: "경매중",
    timeLeft: "2",
  },
  {
    id: 2,
    categoryId: 1,
    name: "나이키 에어포스1 실버 새상품",
    price: 20000,
    status: "경매중",
    timeLeft: "2",
  },
  {
    id: 3,
    categoryId: 2,
    name: "아디다스 슈퍼스타",
    price: 90000,
    status: "경매중",
    timeLeft: "5",
  },
];

const CategoryResultPage: React.FC = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const category = state?.category || "카테고리";
  const categoryId = state?.categoryId || 1;

  const filteredProducts = mockProducts.filter(
    p => p.categoryId === categoryId
  );

  return (
    <div className="w-full max-w-[375px] mx-auto bg-white min-h-[812px] px-[20px] py-6">
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => navigate(-1)}
          className="flex justify-center items-center w-[32px] h-[32px] cursor-pointer bg-transparent outline-none"
        >
          <Goback className="w-[17.5px] h-[24px]" />
        </button>

        <h2 className="text-med16 text-darkgrey05">{category}</h2>

        <Search
          className="w-[17.5px] h-[24px] cursor-pointer"
          onClick={() =>
            navigate("/search/category-search", {
              state: { category, categoryId },
            })
          }
        />
      </div>

      <div className="w-full border-t border-grey02 mb-[5px]" />

      {filteredProducts.length ? (
        <div className="flex flex-col gap-3">
          {filteredProducts.map(({ id, name, price, status, timeLeft }) => (
            <div
              key={id}
              className="flex items-center border border-grey04 rounded-[8px] px-3 py-3"
            >
              <div className="w-[70px] h-[70px] bg-grey09 rounded-[8px] mr-4" />
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
          ))}
        </div>
      ) : (
        <p className="text-med14 text-grey04 text-center mt-8">
          해당 카테고리의 상품이 없습니다.
        </p>
      )}
    </div>
  );
};

export default CategoryResultPage;
