import React from "react";
import backIcon from "../assets/search/back.svg";
import searchIcon from "../assets/search/search.svg";
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
];

const CategoryResultPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const category = location.state?.category || "카테고리";

  return (
    <div className="w-full max-w-[375px] mx-auto bg-white min-h-[812px] px-[20px] py-6">
      {/* 상단 바 */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => navigate(-1)}
          className="flex justify-center items-center w-[32px] h-[32px] bg-transparent border-none outline-none focus:outline-none active:outline-none p-0"
          style={{ WebkitTapHighlightColor: "transparent" }}
        >
          <img src={backIcon} alt="뒤로가기" className="w-[17.5px] h-[24px]" />
        </button>
        <h2 className="text-[16px] text-darkgrey05">{category}</h2>
        <img
          src={searchIcon}
          alt="검색"
          className="w-[17.5px] h-[24px] cursor-pointer"
          onClick={() =>
            navigate("/search/category-search", { state: { category } })
          }
        />
      </div>

      {/* 구분선 */}
      <div className="w-full border-t border-grey02 mb-[5px]" />

      {/* 상품 리스트 */}
      <div className="flex flex-col gap-3">
        {mockProducts.map(product => (
          <div
            key={product.id}
            className="flex items-center border border-grey04 rounded-[8px] px-3 py-3"
          >
            {/* 이미지 영역 */}
            <div className="w-[70px] h-[70px] bg-grey09 rounded-[8px] mr-4 flex-shrink-0" />

            {/* 텍스트 영역 */}
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
        ))}
      </div>
    </div>
  );
};

export default CategoryResultPage;
