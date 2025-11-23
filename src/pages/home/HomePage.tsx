import { Logo } from "@/assets/svgs/main";
import HeaderBell from "@/components/mainpage/HeaderBell";
import SwipeDeck from "@/components/mainpage/SwipeDeck";
import useNotificationSSE from "@/hooks/useNotificationSSE";
import { useNotificationStore } from "@/store/useNotificationStore";
import type { MainPageProduct } from "@/types/item/bid/Bid.type";
import { useMemo } from "react";

export default function HomePage() {
  // 페이지 로드 시 SSE 연결
  useNotificationSSE();

  const unread = useNotificationStore(s => s.unreadCount);
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
        imageUrl: "https://www.mibizshop.co.kr/data/goods/657c2fe01ae63.jpg",
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
          <Logo className="w-[58px] h-auto ml-3" aria-label="LOGO" />

          {/* 2) 알림 아이콘 → HeaderBell 컴포넌트로 교체 */}
          <div className="mr-3">
            <HeaderBell />
          </div>
        </div>
      </header>

      {/* 카드 덱 */}
      <section className="py-3">
        <SwipeDeck items={products} />
      </section>
    </main>
  );
}
