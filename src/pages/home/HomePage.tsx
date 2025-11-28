import LoadingSpinner from "@/components/common/LoadingSpinner";
import HeaderBell from "@/components/mainpage/HeaderBell";
import SwipeDeck from "@/components/mainpage/SwipeDeck";
import { useAuctionDeck } from "@/hooks/auction/useAuctionDeck";

export default function HomePage() {
  /** 실제 경매 카드를 가져오는 API 훅 */
  const { deck, isLoading, error, loadMore } = useAuctionDeck();

  return (
    <main className="relative w-full h-full bg-white">
      {/* 상단 헤더 */}
      <HeaderBell />

      {/* 카드 덱 */}
      <section className="flex h-full items-center justify-center">
        {isLoading && <LoadingSpinner />}

        {error && (
          <p className="text-center text-red-500">
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
