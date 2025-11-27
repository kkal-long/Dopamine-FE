import DurationSelector from "./DurationSelector";

interface Props {
  duration: string;
  onChangeDuration: (value: string) => void;
  options: string[];
  hideBid: boolean;
  onToggle: (checked: boolean) => void;
}

const AuctionTimeSection = ({
  duration,
  onChangeDuration,
  options,
  hideBid,
  onToggle,
}: Props) => {
  // 🔥 옵션에 "직접 입력" 추가!
  const fullOptions = [...options, "직접 입력"];

  return (
    <div className="my-6">
      {/* 경매 시간 제목 */}
      <label className="block text-med16 text-bluegrey10 mb-2">경매 시간</label>

      {/* 시간 선택 버튼 */}
      <DurationSelector
        value={duration}
        onChange={onChangeDuration}
        options={fullOptions}
      />

      {/* 텍스트 + 토글 */}
      <div className="flex justify-between items-center mt-2 mb-6">
        <div>
          <p className="text-med14 text-bluegrey10 mb-1">
            마감 10분 전 입찰가 가리기
          </p>
          <p className="text-reg12 text-bluegrey08">
            마지막 순간 경쟁을 방지합니다
          </p>
        </div>

        {/* 토글 */}
        <label className="relative inline-block w-12 h-6 cursor-pointer">
          <input
            type="checkbox"
            className="hidden"
            checked={hideBid}
            onChange={e => onToggle(e.target.checked)}
          />
          <span
            className={`absolute inset-0 rounded-full transition ${
              hideBid ? "bg-mainpink" : "bg-bluegrey02"
            }`}
          ></span>
          <span
            className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition ${
              hideBid ? "translate-x-6" : ""
            }`}
          ></span>
        </label>
      </div>
    </div>
  );
};

export default AuctionTimeSection;
