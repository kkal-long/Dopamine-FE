import instance from "@/apis/instance";
import { useAuthStore } from "@/store/useAuthStore";

export const createBid = async (auctionId: number, bidPrice: number) => {
  const { userId } = useAuthStore.getState();

  if (!userId) {
    console.error("❌ userId 없음 — 로그인 필요");
    throw new Error("로그인 필요: userId 없음");
  }

  const body = {
    auctionId,
    userId,
    bidPrice,
  };

  console.log("📤 입찰 요청 body:", body);

  const res = await instance.post("/api/bids", body);

  console.log("📥 입찰 응답:", res.data);
  return res.data;
};
