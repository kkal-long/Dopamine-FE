import Footer from "@/components/common/Footer";
import AuctionList from "@/components/my/AuctionList";
import AuctionTabs from "@/components/my/AuctionTabs";
import PointCard from "@/components/my/PointCard";
import PointHistoryList from "@/components/my/PointHistoryList";
import ProfileHeader from "@/components/my/ProfileHeader";
import { useState } from "react";

import { useMyAuctions } from "@/hooks/auction/useMyAuctions";

const MyPage = () => {
  const [activeTab, setActiveTab] = useState<"ongoing" | "completed">(
    "ongoing"
  );

  const { ongoing, completed, loading } = useMyAuctions();

  const now = new Date();

  // 진행중 포맷팅
  const ongoingItems = ongoing.map(a => {
    const end = new Date(a.endAt);
    const diff = end.getTime() - now.getTime();

    const hours = Math.floor(diff / 1000 / 60 / 60);
    const minutes = Math.floor((diff / 1000 / 60) % 60);

    return {
      id: a.id,
      title: a.title,
      price: a.currentPrice,
      status: "경매중",
      image: a.imageUrl,
      timeLeft: { hours, minutes },
    };
  });

  // 완료된 경매 포맷팅
  const completedItems = completed.map(a => ({
    id: a.id,
    title: a.title,
    price: a.currentPrice,
    status: "거래 완료",
    image: a.imageUrl,
  }));

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <div className="flex-1 overflow-y-auto pb-20">
        {/* 프로필 */}
        <ProfileHeader
          name="후멬딧!"
          email="hoomakethis@email.com"
          profileImage="/assets/profile.png"
        />

        {/* 포인트 카드 */}
        <PointCard amount={150000} />

        {/* 포인트 내역 (더미) */}
        <PointHistoryList
          histories={[
            {
              id: 1,
              type: "plus",
              title: "포인트 충전",
              amount: 50000,
              date: "2025-01-15 14:30",
            },
            {
              id: 2,
              type: "minus",
              title: "보증금 지불 - 크리스마스 컵",
              amount: -30000,
              date: "2025-01-14 16:20",
            },
            {
              id: 3,
              type: "plus",
              title: "보증금 환불 - 빈티지 레더자켓",
              amount: 8900,
              date: "2025-01-12 10:15",
            },
          ]}
        />

        {/* 탭 */}
        <AuctionTabs
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          ongoingCount={ongoingItems.length}
          completedCount={completedItems.length}
        />

        {/* 리스트 */}
        {loading ? (
          <p className="text-center text-bluegrey07 mt-6">불러오는 중...</p>
        ) : (
          <AuctionList
            activeTab={activeTab}
            ongoingItems={ongoingItems}
            completedItems={completedItems}
          />
        )}
      </div>

      <Footer />
    </div>
  );
};

export default MyPage;
