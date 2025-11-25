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

        const now = new Date();

        const ongoingItems = res.auctions.filter(a => new Date(a.endAt) > now);
        const completedItems = res.auctions.filter(
          a => new Date(a.endAt) <= now
        );

        setOngoing(ongoingItems);
        setCompleted(completedItems);
      } catch (err) {
        setError("데이터를 불러오는 중 오류가 발생했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { ongoing, completed, loading, error };
};
