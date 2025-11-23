import { Goback, Search } from "@/assets/svgs/search";
import { useCategoryList } from "@/hooks/useSearch";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const CategoryResultPage: React.FC = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  const category = state?.category || "카테고리";
  const categoryId = state?.categoryId;

  /* 카테고리별 검색 API 연결 */
  const { data: products, isLoading, isError } = useCategoryList(categoryId);

  return (
    <div className="w-full max-w-[375px] mx-auto bg-white min-h-[812px] px-[20px] py-6">
      {/* 헤더 */}
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

      {/* 에러 */}
      {isError && (
        <p className="text-center text-med14 text-red-500 mt-8">
          데이터를 불러오지 못했습니다.
        </p>
      )}

      {/* 데이터 */}
      {!isLoading && products?.length ? (
        <div className="flex flex-col gap-3">
          {products.map(item => (
            <div
              key={item.auctionId}
              className="flex items-center border border-grey04 rounded-[8px] px-3 py-3"
            >
              {/* 이미지 */}
              <div className="w-[70px] h-[70px] bg-grey09 rounded-[8px] mr-4 overflow-hidden">
                {item.imageUrl ? (
                  <img
                    src={item.imageUrl}
                    alt={item.goodsName}
                    className="w-full h-full object-cover"
                  />
                ) : null}
              </div>

              {/* 정보 */}
              <div className="flex flex-col flex-1">
                <span className="text-med16 text-darkgrey05 mb-[4px]">
                  {item.goodsName}
                </span>

                <div className="flex items-center gap-2 mb-[4px]">
                  {/* 상태 badge */}
                  <span
                    className={
                      item.status === "경매종료"
                        ? "text-reg12 text-darkgrey04 bg-grey01 px-2 py-[2px] rounded-full"
                        : "text-reg12 text-orange01 bg-lightorange01 px-2 py-[2px] rounded-full"
                    }
                  >
                    {item.status}
                  </span>

                  {item.status !== "경매종료" && (
                    <span className="text-med14 text-mainpink">
                      {item.remainingTime}
                    </span>
                  )}
                </div>

                <span className="text-reg14 text-darkgrey05">
                  {item.status === "경매종료"
                    ? `낙찰가: ₩${item.currentPrice.toLocaleString()}`
                    : `현재 최고가: ₩${item.currentPrice.toLocaleString()}`}
                </span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        !isLoading && (
          <p className="text-med14 text-grey04 text-center mt-8">
            해당 카테고리의 상품이 없습니다.
          </p>
        )
      )}
    </div>
  );
};

export default CategoryResultPage;
