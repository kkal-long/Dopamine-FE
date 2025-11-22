import { Warning } from "@/assets/svgs/my";
import { useNavigate, useSearchParams } from "react-router-dom";

const PaymentFailPage = () => {
  const navigate = useNavigate();
  const [params] = useSearchParams();

  const message =
    params.get("message") || "알 수 없는 이유로 결제에 실패했습니다.";
  const code = params.get("code");

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-5">
      <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-grey02">
        <Warning className="h-12 w-12" />
      </div>

      <h1 className="mb-2 text-bold24 text-bluegrey10">결제 실패</h1>
      <p className="mb-10 text-center text-reg16 text-bluegrey08 whitespace-pre-wrap">
        {message}
        <br />
        <span className="text-reg12 text-grey12">(에러코드: {code})</span>
      </p>

      <div className="flex w-full flex-col gap-3">
        <button
          onClick={() => navigate("/my/points/charge", { replace: true })}
          className="w-full rounded-xl bg-mainpink py-4 text-med16 text-white cursor-pointer"
        >
          다시 시도하기
        </button>
        <button
          onClick={() => navigate("/", { replace: true })}
          className="w-full rounded-xl bg-white border border-grey04 py-4 text-med16 text-bluegrey08 transition hover:bg-grey01 cursor-pointer"
        >
          홈으로 돌아가기
        </button>
      </div>
    </div>
  );
};

export default PaymentFailPage;
