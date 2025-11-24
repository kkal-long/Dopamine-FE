import { getAuctionQna } from "@/apis/item/detail/qnaApi";
import { useQuery } from "@tanstack/react-query";

export const useAUctionQnaApi = () => {
  const getQnaMutation = (auctionId: number) => {
    return useQuery({
      queryKey: ["qna", auctionId],
      queryFn: () => getAuctionQna(auctionId),
      enabled: !!auctionId,
    });
  };

  return { getQnaMutation };
};
