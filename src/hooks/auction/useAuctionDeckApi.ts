import { getAuctionDeck } from "@/apis/auction/auctionDeckApi";
import type { DeckAuctionItem } from "@/types/auction/deckApi.type";
import { useEffect, useState } from "react";

export const useAuctionDeck = () => {
  const [deck, setDeck] = useState<DeckAuctionItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchDeck = async () => {
    try {
      setIsLoading(true);

      const res = await getAuctionDeck();
      setDeck(prev => [...prev, ...res.auctions]);
    } catch (err) {
      console.error(err);
      setError("경매 데이터를 가져오는 중 오류가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDeck();
  }, []);

  const loadMore = fetchDeck;

  return { deck, setDeck, isLoading, error, loadMore };
};
