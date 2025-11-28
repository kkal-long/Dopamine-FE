import Header from "@/components/common/Header";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import PointItem from "@/components/my/point/PointItem";
import { PointHistoryResponse } from "@/types/my/pointApi.type";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const PointInquiryPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const pointHistory = location.state?.histories as PointHistoryResponse;
  useEffect(() => {
    if (!pointHistory) {
      alert("잘못된 접근입니다.");
      navigate("/my", { replace: true });
    }
  }, [pointHistory, navigate]);

  if (!pointHistory) {
    return <LoadingSpinner />;
  }

  return (
    <div>
      <Header title="포인트 내역 조회" />

      <div className="flex flex-col h-full px-4">
        {pointHistory.map(point => (
          <PointItem key={point.historyId} pointHistory={point} />
        ))}
      </div>
    </div>
  );
};

export default PointInquiryPage;
