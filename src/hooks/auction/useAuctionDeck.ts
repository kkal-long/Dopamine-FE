import { getAuctionDeck } from "@/apis/auction/auctionDeckApi";
import type { DeckAuctionItem } from "@/types/auction/deck";
import { useEffect, useState } from "react";

export const useAuctionDeck = () => {
  const [deck, setDeck] = useState<DeckAuctionItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchDeck = async () => {
    try {
      setIsLoading(true);

      const res = await getAuctionDeck();
      setDeck(prev => [...prev, ...res.auctions]); // 기존 덱 뒤에 추가
    } catch (err) {
      console.error(err);
      setError("경매 데이터를 가져오는 중 오류가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  // 최초 로드 시 10개 요청
  useEffect(() => {
    fetchDeck();
  }, []);

  // loadMore로도 직접 불러올 수 있게 함
  const loadMore = fetchDeck;

  return { deck, setDeck, isLoading, error, loadMore };
};
