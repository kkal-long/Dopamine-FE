import { useMemo } from "react";
import SwipeDeck from "@/components/mainpage/SwipeDeck";
import type { MainPageProduct } from "@/types/item/bid/Bid.type";

import { Logo, Alarm } from "@/assets/svgs/main";

export default function HomePage() {
  const products: MainPageProduct[] = useMemo(
    () => [
      {
        id: "p1",
        title: "빈티지 레더자켓",
        imageUrl:
          "https://m.ouof.kr/web/product/big/202403/8d67e618b8def1c197c0ae62117deeb6.jpg",
        highestBid: 85000,
      },
      {
        id: "p2",
        title: "에어포스",
        imageUrl:
          "https://cafe24.poxo.com/ec01/boom2004/2MPBwJPY1W6L+wzPUGJ+dBY8T2Dq6MzVgsX5AKsZoRi3EhBrPTywEEFf8iZ9+YZAsSJNJIiK+Qv2rBXcZNprig==/_/web/product/big/20200325/7832d45821017324b869ab3125eaac53.jpg",
        highestBid: 42000,
      },
      {
        id: "p3",
        title: "에어팟",
        imageUrl:
          "https://sitem.ssgcdn.com/48/29/95/item/1000550952948_i1_750.jpg",
        highestBid: 32000,
      },
      {
        id: "p4",
        title: "카드지갑",
        imageUrl:
          "https://crowdticket0.s3.ap-northeast-1.amazonaws.com/real/files/items/2691/1659951765742_thumb_img.jpg",
        highestBid: 50000,
      },
    ],
    []
  );

  return (
    <main className="w-full">
      {/* 상단 헤더 */}
      <header className="mx-auto w-[360px] py-4">
        <div className="flex items-center justify-between">
          {/* LOGO (컴포넌트) */}
          <Logo className="h-3.5 w-auto ml-3" aria-label="LOGO" />

          {/* 알림 아이콘 (컴포넌트) */}
          <button
            type="button"
            aria-label="알림"
            className="grid h-6 w-6 place-items-center mr-3"
          >
            <Alarm className="h-5 w-5" />
          </button>
        </div>
      </header>

      {/* 카드 덱 */}
      <section className="py-3">
        <SwipeDeck items={products} />
      </section>
    </main>
  );
}
