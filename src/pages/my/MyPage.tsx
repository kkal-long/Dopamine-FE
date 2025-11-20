import { useState } from "react";
import ProfileHeader from "@/components/my/ProfileHeader";
import PointCard from "@/components/my/PointCard";
import PointHistoryList from "@/components/my/PointHistoryList";
import AuctionTabs from "@/components/my/AuctionTabs";
import AuctionList from "@/components/my/AuctionList";
import Footer from "@/components/common/Footer";

const MyPage = () => {
  const [activeTab, setActiveTab] = useState<"ongoing" | "completed">(
    "ongoing"
  );

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <div className="flex-1 overflow-y-auto pb-20">
        {/* 프로필 영역 */}
        <ProfileHeader
          name="후멬딧!"
          email="hoomakethis@email.com"
          profileImage="/assets/profile.png"
        />

        {/* 포인트 카드 */}
        <PointCard amount={150000} />

        {/* 포인트 내역 */}
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

        {/* 경매 탭 */}
        <AuctionTabs
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          ongoingCount={2}
          completedCount={3}
        />

        {/* 경매 리스트 */}
        <AuctionList
          activeTab={activeTab}
          ongoingItems={[
            {
              id: 1,
              title: "아이폰 15 Pro 256GB",
              price: 800000,
              status: "경매중",
              timeLeft: { hours: 1, minutes: 0 },
              image: "/assets/iphone15.png",
            },
            {
              id: 2,
              title: "맥북 프로 M3",
              price: 1500000,
              status: "경매중",
              timeLeft: { hours: 9, minutes: 40 },
              image: "/assets/macbook.png",
            },
          ]}
          completedItems={[
            {
              id: 3,
              title: "아이폰 15 Pro 256GB",
              price: 800000,
              status: "거래 완료",
              image: "/assets/iphone15.png",
            },
            {
              id: 4,
              title: "맥북 프로 M3",
              price: 1500000,
              status: "거래 완료",
              image: "/assets/macbook.png",
            },
            {
              id: 5,
              title: "에어팟 프로 2세대",
              price: 200000,
              status: "거래 완료",
              image: "/assets/airpods.png",
            },
          ]}
        />
      </div>

      <Footer />
    </div>
  );
};

export default MyPage;
