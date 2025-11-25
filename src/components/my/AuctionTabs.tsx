interface AuctionTabsProps {
  activeTab: "ongoing" | "completed";
  setActiveTab: (tab: "ongoing" | "completed") => void;
  ongoingCount: number;
  completedCount: number;
}

const AuctionTabs = ({
  activeTab,
  setActiveTab,
  ongoingCount,
  completedCount,
}: AuctionTabsProps) => {
  return (
    <div className="px-4 mt-6">
      <div className="flex justify-between items-center my-3">
        <p className="text-med18">내가 등록한 경매</p>
        <button
          onClick={() => (window.location.href = "/my/item/new")}
          className="px-3 py-2 bg-bluegrey01 text-darkgrey05 text-med14 rounded-lg cursor-pointer"
        >
          + 새 경매 등록
        </button>
      </div>

      <div className="flex border-b -mx-3.5 border-bluegrey02">
        <button
          onClick={() => setActiveTab("ongoing")}
          className={`flex-1 py-3 text-center text-med16 cursor-pointer ${
            activeTab === "ongoing"
              ? "text-darkgrey05 border-b-2 border-darkgrey05"
              : "text-bluegrey07"
          }`}
        >
          경매중 <span className="ml-1">{ongoingCount}</span>
        </button>

        <button
          onClick={() => setActiveTab("completed")}
          className={`flex-1 py-3 text-center text-med16 cursor-pointer ${
            activeTab === "completed"
              ? "text-darkgrey05 border-b-2 border-darkgrey05"
              : "text-bluegrey07"
          }`}
        >
          거래 완료 <span className="ml-1">{completedCount}</span>
        </button>
      </div>
    </div>
  );
};

export default AuctionTabs;
