import { getAuctionDetail } from "@/apis/item/detail/itemDetailApi";
import { useQuery } from "@tanstack/react-query";

export const useAuctionDeailApi = () => {
  const getAuctionDetailQuery = (auctionId: number) => {
    return useQuery({
      queryKey: ["auctionDetail", auctionId],
      queryFn: () => getAuctionDetail(auctionId),
      enabled: !!auctionId,
      refetchInterval: 10000,
      refetchOnMount: true,
    });
  };

  return { getAuctionDetailQuery };
};
