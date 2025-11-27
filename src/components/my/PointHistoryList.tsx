import PointItem from "@/components/my/pointItem/PointItem";
import { PointHistoryResponse } from "@/types/my/pointApi.type";
import { useNavigate } from "react-router-dom";

interface PointHistoryListProps {
  histories: PointHistoryResponse;
}

const PointHistoryList = ({ histories }: PointHistoryListProps) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white mx-4 mt-3 rounded-xl">
      <div className="flex justify-between items-center py-3">
        <p className="text-med18">포인트 내역</p>
        <button
          onClick={() => navigate("/my/points", { state: { histories } })}
          className="text-sm text-reg14 text-darkgrey01 hover:underline cursor-pointer"
        >
          {"더 많은 내역 조회 >"}
        </button>
      </div>

      <div className="divide-y divide-bluegrey02">
        {histories.slice(0, 3).map(item => (
          <PointItem key={item.historyId} pointHistory={item} />
        ))}
      </div>
    </div>
  );
};

export default PointHistoryList;
