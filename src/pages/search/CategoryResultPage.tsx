// CategoryResultPage.tsx
import { Goback, Search } from "@/assets/svgs/search";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import { useCategoryList } from "@/hooks/search/useSearch";
import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

/** 카테고리 검색 결과 아이템 타입 */
interface CategoryItem {
  auctionId: number;
  goodsName: string;
  currentPrice: number;
  remainingTime: string;
  imageUrl: string | null; // 백엔드 원본
  imageUrls: string[]; // 배열 변환
  status?: string;
  progressStatus?: string;
  auctionStatus?: string;
  state?: string;
}

const CategoryResultPage: React.FC = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  const category = state?.category || "카테고리";
  const categoryId = state?.categoryId;

  const {
    data: rawProducts = [],
    isLoading,
    isError,
  } = useCategoryList(categoryId);

  /** 🔥 imageUrl → imageUrls 로 정규화 */
  const products: CategoryItem[] = rawProducts.map(
    (item: CategoryItem): CategoryItem => ({
      ...item,
      imageUrls: item.imageUrl ? [item.imageUrl] : [],
    })
  );

  /** 상태 정규화 */
  const normalizeStatus = (item: CategoryItem) => {
    const rawStatus =
      item.status ||
      item.progressStatus ||
      item.auctionStatus ||
      item.state ||
      "";

    const s = rawStatus.trim().toUpperCase();
    const remaining = item.remainingTime?.trim();

    const isOver =
      remaining === "경매 종료" ||
      remaining === "종료" ||
      remaining === "마감" ||
      remaining === "END";

    if (s === "SOLD" || isOver) return "경매종료";
    if (s === "IN_PROGRESS") return "경매중";

    return "경매중";
  };

  /** 남은 시간 정제 */
  const getValidRemainingTime = (status: string, time?: string) => {
    if (status === "경매종료") return "";
    if (!time) return "";

    const trimmed = time.trim();
    const isEnd =
      trimmed === "경매 종료" ||
      trimmed === "종료" ||
      trimmed === "마감" ||
      trimmed === "END";

    if (isEnd) return "";

    const isValid =
      trimmed.includes("남음") ||
      trimmed.includes("일") ||
      trimmed.includes("시간") ||
      trimmed.includes("분") ||
      /^[0-9]/.test(trimmed);

    return isValid ? trimmed : "";
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="w-full max-w-[375px] mx-auto bg-white min-h-[812px] px-[20px] py-6">
      {/* 헤더 */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => navigate(-1)}
          className="flex justify-center items-center w-[32px] h-[32px]"
        >
          <Goback className="w-[17.5px] h-[24px] cursor-pointer" />
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
            const status = normalizeStatus(item);
            const isEnded = status === "경매종료";
            const remainingTime = getValidRemainingTime(
              status,
              item.remainingTime
            );

            return (
              <Link
                to={`/item/${item.auctionId}`}
                key={item.auctionId}
                className="flex items-center border border-grey04 rounded-[8px] px-3 py-3"
              >
                {/* 이미지 */}
                <div className="w-[70px] h-[70px] bg-grey09 rounded-[8px] mr-4 overflow-hidden">
                  {item.imageUrls[0] && (
                    <img
                      src={item.imageUrls[0]}
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
                        isEnded
                          ? "text-reg12 text-darkgrey04 bg-grey01 px-2 py-[2px] rounded-full"
                          : "text-reg12 text-orange01 bg-lightorange01 px-2 py-[2px] rounded-full"
                      }
                    >
                      {status}
                    </span>

                    {remainingTime && (
                      <span className="text-med14 text-mainpink">
                        {remainingTime}
                      </span>
                    )}
                  </div>

                  <span className="text-reg14 text-darkgrey05">
                    {isEnded
                      ? item.currentPrice > 0
                        ? `낙찰가: ₩${item.currentPrice.toLocaleString()}`
                        : "낙찰가 정보 없음"
                      : `현재 최고가: ₩${item.currentPrice.toLocaleString()}`}
                  </span>
                </div>
              </Link>
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
