import { useBidApi } from "@/hooks/item/bid/useBidApi";
import { useUserStore } from "@/store/useUserStore";
import { useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useState } from "react";

export const useItemBid = (currentPrice: number, auctionId: number) => {
  const [isBidSheetOpen, setBidSheetOpen] = useState(false);
  const [currentHighestPrice, setCurrentHighestPrice] = useState(currentPrice);
  const queryClient = useQueryClient();

  const { postSwipMutation, postBidMutation } = useBidApi();
  const { mutate: createBid } = postBidMutation();
  const { mutate: swipeAction } = postSwipMutation();

  const userId = useUserStore(state => state.userId);
  if (!userId) {
    alert("로그인이 필요합니다.");
  }

  const handleBidClick = () => {
    setBidSheetOpen(true);
  };

  const handleBidSubmit = (amount: number) => {
    swipeAction(
      {
        auctionId: auctionId,
        action: "BIDDING",
      },
      {
        onSuccess: () => {
          createBid(
            {
              auctionId: auctionId,
              userId: userId as number,
              bidPrice: amount,
            },
            {
              onSuccess: () => {
                setCurrentHighestPrice(amount);
                setBidSheetOpen(false);
                queryClient.invalidateQueries({
                  queryKey: ["auctionDetail", auctionId],
                });
                queryClient.invalidateQueries({
                  queryKey: ["bidHistory", auctionId],
                });
              },
              onError: (err: AxiosError<{ message: string }>) => {
                alert(
                  err.response?.data.message || "입찰 도중 오류가 발생했습니다."
                );
              },
            }
          );
        },
        onError: err => {
          console.error(err);
          alert("입찰에 실패했습니다.");
        },
      }
    );
  };

  const closeBidSheet = () => setBidSheetOpen(false);

  return {
    isBidSheetOpen,
    setBidSheetOpen,
    currentHighestPrice,
    handleBidClick,
    handleBidSubmit,
    closeBidSheet,
  };
};
