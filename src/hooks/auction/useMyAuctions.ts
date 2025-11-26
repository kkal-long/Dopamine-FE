import { getMyAuctions } from "@/apis/auction/getMyAuction";
import { MyAuctionItem } from "@/types/auction/myauction";
import { useEffect, useState } from "react";

export const useMyAuctions = () => {
  const [ongoing, setOngoing] = useState<MyAuctionItem[]>([]);
  const [completed, setCompleted] = useState<MyAuctionItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getMyAuctions();
        console.log("📌 GET /auctions/my 결과:", res);

        const now = new Date();

        const normalized: MyAuctionItem[] = res.auctions.map(a => ({
          ...a,
          imageUrls: a.imageUrl ? [a.imageUrl] : [], // 배열 통일
          price: a.currentPrice, // UI용 price 반영
        }));

        const ongoingItems = normalized.filter(a => new Date(a.endAt) > now);
        const completedItems = normalized.filter(a => new Date(a.endAt) <= now);

        setOngoing(ongoingItems);
        setCompleted(completedItems);
      } catch (err) {
        console.error(err);
        setError("데이터를 불러오는 중 오류가 발생했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { ongoing, completed, loading, error };
};
