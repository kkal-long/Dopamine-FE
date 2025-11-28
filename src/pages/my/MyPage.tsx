import Footer from "@/components/common/Footer";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import AuctionList from "@/components/my/point/AuctionList";
import AuctionTabs from "@/components/my/auction/AuctionTabs";
import PointCard from "@/components/my/point/PointCard";
import PointHistoryList from "@/components/my/point/PointHistoryList";
import ProfileHeader from "@/components/my/profile/ProfileHeader";
import { useMyAuctions } from "@/hooks/auction/useMyAuctionsApi";
import { useAuthApi } from "@/hooks/auth/useAuthApi";
import { usePointApi } from "@/hooks/my/charge/usePointApi";
import { useUserStore } from "@/store/useUserStore";
import { useEffect, useState } from "react";

const MyPage = () => {
  const [activeTab, setActiveTab] = useState<"ongoing" | "completed">(
    "ongoing"
  );

  const { ongoing, completed, loading: auctionLoading } = useMyAuctions();

  const { getUserProfileMutation } = useAuthApi();
  const { getPointHisotryQuery } = usePointApi();
  const { data: PointHistoryData, isLoading: pointLoading } =
    getPointHisotryQuery();

  useEffect(() => {
    getUserProfileMutation.mutate();
  }, []);

  const userName = useUserStore(state => state.userName);
  const userImage = useUserStore(state => state.userImage);
  const point = useUserStore(state => state.point);
  if (!userName || !userImage) {
    alert("로그인 정보가 없습니다.");
    return;
  }

  const now = new Date();

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

      imageUrls: a.imageUrls,

      timeLeft: { hours, minutes },
    };
  });

  const completedItems = completed.map(a => ({
    id: a.id,
    title: a.title,
    price: a.currentPrice,
    status: "거래 완료",

    imageUrls: a.imageUrls,
  }));

  if (auctionLoading || pointLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <div className="flex-1 overflow-y-auto pb-20">
        {/* 프로필 */}
        <ProfileHeader name={userName} profileImage={userImage} />

        {/* 포인트 카드 */}
        <PointCard amount={point} />

        {/* 포인트 내역 */}
        <PointHistoryList histories={PointHistoryData || []} />

        {/* 탭 */}
        <AuctionTabs
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          ongoingCount={ongoingItems.length}
          completedCount={completedItems.length}
        />

        {/* 리스트 */}
        <AuctionList
          activeTab={activeTab}
          ongoingItems={ongoingItems}
          completedItems={completedItems}
        />
      </div>

      <Footer />
    </div>
  );
};

export default MyPage;
