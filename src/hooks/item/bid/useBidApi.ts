import { getAuctionSummary } from "@/apis/item/bid/bidApi";
import { useQuery } from "@tanstack/react-query";

export const useBidApi = () => {
  const getAuctionSummaryQuery = (userId: number | null) => {
    return useQuery({
      queryKey: ["auctionSummary", userId],
      queryFn: () => getAuctionSummary(userId!),
      enabled: !!userId,
    });
  };

  return {
    getAuctionSummaryQuery,
  };
};
