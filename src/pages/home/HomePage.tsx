import { Logo } from "@/assets/svgs/main";
import HeaderBell from "@/components/mainpage/HeaderBell";
import SwipeDeck from "@/components/mainpage/SwipeDeck";
import { useAuctionDeck } from "@/hooks/auction/useAuctionDeck";

export default function HomePage() {
  /** 실제 경매 카드를 가져오는 API 훅 */
  const { deck, isLoading, error, loadMore } = useAuctionDeck();

  return (
    <main className="w-full">
      {/* 상단 헤더 */}
      <header className="mx-auto w-[360px] py-4">
        <div className="flex items-center justify-between">
          {/* LOGO */}
          <Logo className="w-[58px] h-auto ml-3" aria-label="LOGO" />

          {/* 알림 버튼 */}
          <div className="mr-3">
            <HeaderBell />
          </div>
        </div>
      </header>

      {/* 카드 덱 */}
      <section className="py-3 min-h-[640px] flex justify-center items-center">
        {isLoading && <p className="text-bluegrey07">상품을 불러오는 중...</p>}

        {error && (
          <p className="text-red-500 text-center">
            데이터를 불러오는 중 오류가 발생했습니다.
          </p>
        )}

        {!isLoading && !error && deck.length === 0 && (
          <p className="text-bluegrey07">오늘의 추천 경매가 없습니다!</p>
        )}

        {deck.length > 0 && (
          <SwipeDeck items={deck} onDeckExhausted={loadMore} />
        )}
      </section>
    </main>
  );
}
