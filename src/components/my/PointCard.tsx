import { Plus } from "@/assets/svgs/my";

import { useNavigate } from "react-router-dom";

interface PointCardProps {
  amount: number;
}

const PointCard = ({ amount }: PointCardProps) => {
  const navigate = useNavigate();

  return (
    <div className="mx-4 mt-5 rounded-xl bg-grey00">
      <div className="flex justify-between items-center px-5 py-3">
        <p className="text-med18">포인트</p>
        <button
          onClick={() => navigate("/my/points/charge")}
          className="p-2 bg-black text-white rounded-full hover:bg-gray-800 transition cursor-pointer"
        >
          <Plus className="w-[12px] h-[12px]" />
        </button>
      </div>

      <div className="flex flex-col items-center py-5">
        <p className="text-med30 ">₩ {amount.toLocaleString()}</p>
        <p className="text-med14 text-darkgrey01 mb-5">사용 가능한 포인트</p>
      </div>
    </div>
  );
};

export default PointCard;
