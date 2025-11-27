import { postBid } from "@/apis/auction/createBidApi";
import { postSwipeAction } from "@/apis/auction/postSwipeApi";
import { getAuctionSummary } from "@/apis/item/bid/bidApi";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useBidApi = () => {
  const getAuctionSummaryQuery = (userId: number | null) => {
    return useQuery({
      queryKey: ["auctionSummary", userId],
      queryFn: () => getAuctionSummary(userId!),
      enabled: !!userId,
    });
  };

  const postSwipMutation = () => {
    return useMutation({
      mutationFn: postSwipeAction,
    });
  };

  const postBidMutation = () => {
    return useMutation({
      mutationFn: postBid,
    });
  };

  return {
    getAuctionSummaryQuery,
    postSwipMutation,
    postBidMutation,
  };
};
