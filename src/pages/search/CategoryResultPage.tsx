import { Goback, Search } from "@/assets/svgs/search";
import { useCategoryList } from "@/hooks/useSearch";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const CategoryResultPage: React.FC = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  const category = state?.category || "카테고리";
  const categoryId = state?.categoryId;

  const {
    data: products = [],
    isLoading,
    isError,
  } = useCategoryList(categoryId);

  /** 🔥 status 통일 (API에서 다양한 문자열이 올까봐 대비) */
  const normalizeStatus = (status: string | undefined) => {
    if (!status) return "경매중";

    const s = status.trim().toUpperCase();

    if (["경매종료", "종료"].includes(status)) return "경매종료";
    if (["FINISHED", "END", "ENDED", "CLOSED"].includes(s)) return "경매종료";

    return "경매중";
  };

  console.log("📌 카테고리 검색 API 응답:", products);

  return (
    <div className="w-full max-w-[375px] mx-auto bg-white min-h-[812px] px-[20px] py-6">
      {/* 헤더 */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => navigate(-1)}
          className="flex justify-center items-center w-[32px] h-[32px]"
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

      {isError && (
        <p className="text-center text-med14 text-red-500 mt-8">
          데이터를 불러오지 못했습니다.
        </p>
      )}

      {!isLoading && products.length > 0 ? (
        <div className="flex flex-col gap-3">
          {products.map(item => {
            const status = normalizeStatus(item.status);

            return (
              <div
                key={item.auctionId}
                className="flex items-center border border-grey04 rounded-[8px] px-3 py-3"
              >
                {/* 이미지 */}
                <div className="w-[70px] h-[70px] bg-grey09 rounded-[8px] mr-4 overflow-hidden">
                  {item.imageUrl && (
                    <img
                      src={item.imageUrl}
                      alt={item.goodsName}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>

                {/* 정보 */}
                <div className="flex flex-col flex-1">
                  <span className="text-med16 text-darkgrey05 mb-[4px]">
                    {item.goodsName}
                  </span>

                  <div className="flex items-center gap-2 mb-[4px]">
                    <span
                      className={
                        status === "경매종료"
                          ? "text-reg12 text-darkgrey04 bg-grey01 px-2 py-[2px] rounded-full"
                          : "text-reg12 text-orange01 bg-lightorange01 px-2 py-[2px] rounded-full"
                      }
                    >
                      {status}
                    </span>

                    {status !== "경매종료" && (
                      <span className="text-med14 text-mainpink">
                        {item.remainingTime}
                      </span>
                    )}
                  </div>

                  {/* 가격 */}
                  <span className="text-reg14 text-darkgrey05">
                    {status === "경매종료"
                      ? item.currentPrice > 0
                        ? `낙찰가: ₩${item.currentPrice.toLocaleString()}`
                        : "낙찰가 정보 없음"
                      : `현재 최고가: ₩${item.currentPrice.toLocaleString()}`}
                  </span>
                </div>
              </div>
            );
          })}
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
