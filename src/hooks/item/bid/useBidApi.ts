import { getAuctionSummary, getBidHistory } from "@/apis/item/bid/bidApi";
import { useQuery } from "@tanstack/react-query";

export const useBidApi = () => {
  const getAuctionSummaryQuery = (userId: number | null) => {
    return useQuery({
      queryKey: ["auctionSummary", userId],
      queryFn: () => getAuctionSummary(userId!),
      enabled: !!userId,
    });
  };

  const getBidHistoryQuery = (auctionId: number) => {
    return useQuery({
      queryKey: ["bidHistory", auctionId],
      queryFn: () => getBidHistory(auctionId),
      enabled: !!auctionId,
      refetchInterval: 5000,
      refetchOnMount: true,
    });
  };

  return {
    getAuctionSummaryQuery,
    getBidHistoryQuery,
  };
};
