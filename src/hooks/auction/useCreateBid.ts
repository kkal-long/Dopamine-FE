import { createBid } from "@/apis/auction/createBidApi";

export const useCreateBid = () => {
  const submitBid = async ({
    auctionId,
    bidPrice,
  }: {
    auctionId: number;
    bidPrice: number;
  }) => {
    try {
      const result = await createBid(auctionId, bidPrice);
      console.log("✅ 입찰 성공:", result);
      return result;
    } catch (err) {
      console.error("❌ 입찰 실패:", err);
      throw err;
    }
  };

  return { submitBid };
};
