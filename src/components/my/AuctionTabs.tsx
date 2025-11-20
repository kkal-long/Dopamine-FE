interface AuctionTabsProps {
  activeTab: "ongoing" | "completed";
  setActiveTab: (tab: "ongoing" | "completed") => void;
  ongoingCount?: number;
  completedCount?: number;
}

const AuctionTabs = ({
  activeTab,
  setActiveTab,
  ongoingCount = 0,
  completedCount = 0,
}: AuctionTabsProps) => {
  return (
    <div className="px-4 mt-6">
      {/* 상단 타이틀 + 새 경매 등록 버튼 */}
      <div className="flex justify-between items-center my-3">
        <p className="text-med18">내가 등록한 경매</p>
        <button
          onClick={() => (window.location.href = "/my/item/new")}
          className="px-3 py-2 bg-bluegrey01 text-darkgrey05 text-med14 rounded-lg hover:bg-grey02 transition cursor-pointer"
        >
          + 새 경매 등록
        </button>
      </div>

      {/* 탭 영역 */}
      <div className="flex border-b -mx-3.5 border-bluegrey02">
        {/* 경매중 탭 */}
        <button
          onClick={() => setActiveTab("ongoing")}
          className={`flex-1 py-3 text-center text-med16 transition cursor-pointer ${
            activeTab === "ongoing"
              ? "text-darkgrey05 border-b-2 border-darkgrey05"
              : "text-bluegrey07"
          }`}
        >
          <span
            className={`${
              activeTab === "ongoing" ? "text-darkgrey05" : "text-bluegrey07"
            }`}
          >
            경매중
          </span>
          <span
            className={`text-sm ml-1 ${
              activeTab === "ongoing" ? "text-darkgrey05" : "text-bluegrey07"
            }`}
          >
            {ongoingCount}
          </span>
        </button>

        {/* 거래 완료 탭 */}
        <button
          onClick={() => setActiveTab("completed")}
          className={`flex-1 py-3 text-center text-med16 transition cursor-pointer ${
            activeTab === "completed"
              ? "text-darkgrey05 border-b-2 border-darkgrey05"
              : "text-bluegrey07"
          }`}
        >
          <span
            className={`${
              activeTab === "completed" ? "text-darkgrey05" : "text-bluegrey07"
            }`}
          >
            거래 완료
          </span>
          <span
            className={`text-sm ml-1 ${
              activeTab === "completed" ? "text-darkgrey05" : "text-bluegrey07"
            }`}
          >
            {completedCount}
          </span>
        </button>
      </div>
    </div>
  );
};

export default AuctionTabs;
