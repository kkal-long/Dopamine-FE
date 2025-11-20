import Header from "@/components/common/Header";
import PointItem from "@/components/my/pointItem/PointItem";
import { mockPointHistory } from "@/mock/pointHistory";

const PointInquiryPage = () => {
  const pointHistory = mockPointHistory;

  return (
    <div>
      <Header title="포인트 내역 조회" />

      <div className="flex flex-col h-full px-4">
        {pointHistory.map(point => (
          <PointItem
            key={point.id}
            type={point.type}
            title={point.title}
            date={point.date}
            amount={point.amount}
          />
        ))}
      </div>
    </div>
  );
};

export default PointInquiryPage;
