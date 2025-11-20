import { Goback } from "@/assets/svgs/search";
import Footer from "@/components/common/Footer";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ChargePointPage = () => {
  const navigate = useNavigate();
  const [amount, setAmount] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const handleCharge = () => {
    if (!amount || amount <= 0) {
      setModalMessage("금액을 입력하세요");
      setIsModalOpen(true);
      return;
    }

    setModalMessage(`${amount.toLocaleString()}원 충전되었습니다!`);
    setIsModalOpen(true);
    setAmount(0);
  };

  const handleConfirm = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <div className="flex-1 overflow-y-auto pb-20">
        {/* 상단 헤더 */}
        <div className="flex items-center gap-2 mt-5 ml-5 mb-4">
          <Goback
            className="w-5 h-5 cursor-pointer"
            onClick={() => navigate(-1)}
          />
          <h1 className="text-med18 text-darkgrey05">포인트 충전</h1>
        </div>

        {/* 본문 영역 */}
        <div className="p-4">
          <div className="bg-white rounded-xl shadow p-6">
            <label className="block text-sm text-gray-500 mb-2">
              충전 금액
            </label>
            <input
              type="number"
              value={amount || ""}
              onChange={e => setAmount(Number(e.target.value))}
              placeholder="금액을 입력하세요"
              className="w-full border border-gray-300 rounded-lg p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-gray-400
                [&::-webkit-inner-spin-button]:appearance-none
                [&::-webkit-outer-spin-button]:appearance-none"
            />
            <button
              onClick={handleCharge}
              className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 cursor-pointer"
            >
              충전하기
            </button>
          </div>
        </div>
      </div>

      <Footer />

      {/* 모달 */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
          <div className="bg-white rounded-xl w-[70%] max-w-[280px] p-6 text-center shadow-lg">
            <p className="text-med16 text-darkgrey05 mb-5 whitespace-pre-line">
              {modalMessage}
            </p>
            <button
              onClick={handleConfirm}
              className="w-full bg-grey01 text-darkgrey05 text-med14 py-3 rounded-lg hover:bg-grey02 transition cursor-pointer"
            >
              확인
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChargePointPage;
