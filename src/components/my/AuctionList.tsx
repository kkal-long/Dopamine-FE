import { useNavigate } from "react-router-dom";

interface AuctionItem {
  id: number;
  title: string;
  price: number;
  status: string;
  imageUrl: string[];
  timeLeft?: {
    hours: number;
    minutes: number;
  };
}

interface AuctionListProps {
  activeTab: "ongoing" | "completed";
  ongoingItems: AuctionItem[];
  completedItems: AuctionItem[];
}

const AuctionList = ({
  activeTab,
  ongoingItems,
  completedItems,
}: AuctionListProps) => {
  const navigate = useNavigate();
  const list = activeTab === "ongoing" ? ongoingItems : completedItems;

  const formatTimeLeft = (timeLeft?: { hours: number; minutes: number }) => {
    if (!timeLeft) return "";
    const { hours, minutes } = timeLeft;
    if (hours === 0 && minutes === 0) return "마감";
    if (hours === 0) return `${minutes}분 남음`;
    if (minutes === 0) return `${hours}시간 남음`;
    return `${hours}시간 ${minutes}분 남음`;
  };

  return (
    <div className="bg-white mx-4 mt-3 rounded-xl p-4">
      {list.length === 0 ? (
        <p className="text-sm text-bluegrey07 text-center py-6">
          등록된 경매가 없습니다.
        </p>
      ) : (
        <div className="flex flex-col gap-3">
          {list.map(item => (
            <div
              key={item.id}
              onClick={() => navigate(`/item/${item.id}`)}
              className="flex items-center gap-4 border border-bluegrey02 rounded-xl px-4 py-3 hover:shadow-sm transition cursor-pointer active:bg-grey01"
            >
              {/* 왼쪽 상품 이미지 */}
              <div className="w-[72px] h-[72px] rounded-lg bg-grey02 flex-shrink-0 overflow-hidden">
                <img
                  src={item.imageUrl?.[0]}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* 오른쪽 상품 정보 */}
              <div className="flex flex-col flex-1 justify-center">
                <p className="text-reg14 text-darkgrey05 mb-[2px]">
                  {item.title}
                </p>
                <p className="text-reg12 text-darkgrey01 mb-[6px]">
                  {activeTab === "ongoing"
                    ? `최고가: ₩${item.price.toLocaleString()}`
                    : `최종가: ₩${item.price.toLocaleString()}`}
                </p>

                {/* 경매중 배지 + 시간*/}
                <div className="flex items-center justify-between">
                  <span
                    className={`px-2 py-[2px] rounded-full text-reg12 ${
                      activeTab === "ongoing"
                        ? "bg-lightorange01 text-orange01"
                        : "bg-grey01 text-darkgrey04"
                    }`}
                  >
                    {item.status}
                  </span>
                  <p className="text-reg12 text-darkgrey02 whitespace-nowrap">
                    {activeTab === "ongoing"
                      ? formatTimeLeft(item.timeLeft)
                      : "거래 완료"}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AuctionList;
