import { MinusPoint, PlusPoint } from "@/assets/svgs/my";
import { useNavigate } from "react-router-dom";

export interface PointHistory {
  id: number;
  type: "plus" | "minus";
  title: string;
  amount: number;
  date: string;
}

interface PointHistoryListProps {
  histories: PointHistory[];
}

const PointHistoryList = ({ histories }: PointHistoryListProps) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white mx-4 mt-3 rounded-xl">
      <div className="flex justify-between items-center py-3">
        <p className="text-med18">포인트 내역</p>
        <button
          onClick={() => navigate("/my/points")}
          className="text-sm text-reg14 text-darkgrey01 hover:underline cursor-pointer"
        >
          더 많은 내역 조회 &gt;
        </button>
      </div>

      {/* 추가: 구분선 색상 수정 */}
      <div className="divide-y divide-bluegrey02">
        {histories.map(item => (
          <div
            key={item.id}
            className="flex justify-between items-center px-5 py-3"
          >
            <div className="flex items-center gap-2">
              {item.type === "plus" ? (
                <div className="-ml-3 mr-1 w-10 h-10 bg-lightgreen01 rounded-full flex items-center justify-center">
                  <PlusPoint className="w-[12.25px] h-[14px]" />
                </div>
              ) : (
                <div className="-ml-3 mr-1 w-10 h-10 bg-lightpink rounded-full flex items-center justify-center">
                  <MinusPoint className="w-[12.25px] h-[14px]" />
                </div>
              )}

              <div>
                <p className="text-reg14 text-darkgrey05">{item.title}</p>
                <p className="text-reg12 text-darkgrey01">{item.date}</p>
              </div>
            </div>

            {/* 금액 색상 + ₩ 표기 */}
            <p className="text-reg14 text-darkgrey02">
              {item.type === "plus" ? "+" : "-"}₩
              {Math.abs(item.amount).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PointHistoryList;
