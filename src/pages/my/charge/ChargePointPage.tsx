import Header from "@/components/common/Header";
import {
  ANONYMOUS,
  loadTossPayments,
  TossPaymentsPayment,
} from "@tosspayments/tosspayments-sdk";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

const clientKey = import.meta.env.VITE_TOSS_CLIENT_KEY;

const CHARGE_OPTIONS = [5000, 10000, 20000, 30000, 40000, 50000];

const ChargePointPage = () => {
  const [amount, setAmount] = useState<number>(0);
  const [inputValue, setInputValue] = useState("");

  const [modalMessage, setModalMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [payment, setPayment] = useState<TossPaymentsPayment | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchPayment = async () => {
      try {
        const tossPayments = await loadTossPayments(clientKey);

        const payemnt = tossPayments.payment({ customerKey: ANONYMOUS });

        setPayment(payemnt);
      } catch (error) {
        console.error("Error fetching payment: ", error);
      }
    };

    fetchPayment();
  }, [clientKey]);

  const handleOptionClick = (value: number) => {
    setAmount(value);
    setInputValue(value.toLocaleString());
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/[^0-9]/g, "");
    if (rawValue === "") {
      setAmount(0);
      setInputValue("");
      return;
    }

    const numValue = Number(rawValue);
    setAmount(numValue);
    setInputValue(numValue.toLocaleString());
  };

  const handleCharge = async () => {
    try {
      if (!payment) return;

      await payment.requestPayment({
        method: "CARD",
        amount: { currency: "KRW", value: amount },
        orderId: uuidv4(),
        orderName: "포인트 충전",
        successUrl: window.location.origin + "/payment/success", // 성공 시 리디렉션 URL
        failUrl: window.location.origin + "/payment/fail", // 실패 시 리디렉션 URL
      });
    } catch (error) {
      console.error("결제 요청 실패:", error);

      if (typeof error === "object" && error !== null && "code" in error) {
        const err = error as { code: string; message?: string };

        if (err.code === "USER_CANCEL") {
          setModalMessage("결제를 취소했습니다.");
        } else {
          setModalMessage(`결제 중 오류가 발생했습니다.\n(${err.message})`);
        }
      } else {
        setModalMessage("알 수 없는 오류가 발생했습니다.");
      }
      setIsModalOpen(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleConfirm = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="flex flex-col">
      {/* 상단 헤더 */}
      <Header title="포인트 충전" />

      {/* 본문 영역 */}
      <div className="flex-1 overflow-y-auto p-4 my-9">
        {/* 금액 입력 */}
        <div className="mb-8">
          <h3 className="text-reg14 text-darkgrey01 mb-3">충전 금액 선택</h3>
          <div className="grid grid-cols-2 gap-3 mb-5">
            {CHARGE_OPTIONS.map(opt => (
              <button
                key={opt}
                onClick={() => handleOptionClick(opt)}
                className={clsx(
                  "w-full px-12 py-4 rounded-lg text-reg14 cursor-pointer transition",
                  amount === opt
                    ? "bg-lightpink text-bluegrey10 border border-mainpink"
                    : "bg-grey02 text-darkgrey01 border border-transparent"
                )}
              >
                {opt.toLocaleString()}원
              </button>
            ))}
          </div>
          <div>
            <h3 className="text-reg14 text-darkgrey01 mb-3">직접 입력</h3>
            <input
              type="text"
              inputMode="numeric"
              value={inputValue}
              onChange={handleInputChange}
              placeholder="금액을 입력하세요"
              className={clsx(
                "w-full px-5 py-3 text-reg16 text-bluegrey10 placeholder:text-darkgrey01 outline-none border rounded-lg",
                amount > 0 && !CHARGE_OPTIONS.includes(amount)
                  ? "border-mainpink "
                  : "border-bluegrey03 placeholder-bluegrey04"
              )}
            />
          </div>

          {amount > 0 && (
            <button
              onClick={handleCharge}
              disabled={isLoading}
              className={clsx(
                "w-full bg-mainpink text-white text-semibold16 py-3 rounded-lg  mt-6 transition border border-transparent",
                isLoading ? "bg-grey05 cursor-not-allowed" : "cursor-pointer"
              )}
            >
              {isLoading
                ? "결제 시스템 로딩 중..."
                : `${amount.toLocaleString()}원 결제하기`}
            </button>
          )}
        </div>
      </div>

      {/* 모달 */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
          <div className="bg-white rounded-xl w-[70%] max-w-[280px] p-6 text-center shadow-lg">
            <p className="font-med16 text-darkgrey05 mb-5 whitespace-pre-line">
              {modalMessage}
            </p>
            <button
              onClick={handleConfirm}
              className="w-full bg-grey01 text-darkgrey05 font-med14 py-3 rounded-lg hover:bg-grey02 transition cursor-pointer"
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
