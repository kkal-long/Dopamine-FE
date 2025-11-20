import { useEffect, useRef, useState } from "react";

interface Props {
  value: string;
  onChange: (value: string) => void;
  options: string[];
}

const DurationSelector = ({ value, onChange, options }: Props) => {
  const [openSheet, setOpenSheet] = useState(false);
  const [isCustom, setIsCustom] = useState(false);

  // wheel index
  const [dayIndex, setDayIndex] = useState(0);
  const [hourIndex, setHourIndex] = useState(0);
  const [minuteIndex, setMinuteIndex] = useState(0);

  // 리스트 데이터 (앞뒤에 빈값 2개씩 추가)

  const days = [
    "",
    "",
    ...Array.from({ length: 15 }, (_, i) => `${String(i).padStart(2, "0")}일`),
  ];

  const hours = [
    "",
    "",
    ...Array.from(
      { length: 24 },
      (_, i) => `${String(i).padStart(2, "0")}시간`
    ),
  ];

  const minutes = ["", "", ...["00분", "10분", "20분", "30분", "40분", "50분"]];
  // 저장 버튼 눌렀을 때
  const handleSave = () => {
    const result = `${days[dayIndex]} ${hours[hourIndex]} ${minutes[minuteIndex]}`;
    setIsCustom(true);
    onChange(result);
    setOpenSheet(false);
  };

  const handleOpen = () => setOpenSheet(true);

  // Wheel로 경매 기간 직접 설정
  const Wheel = ({
    list,
    selectedIndex,
    onSelect,
  }: {
    list: string[];
    selectedIndex: number;
    onSelect: (i: number) => void;
  }) => {
    const containerRef = useRef<HTMLDivElement>(null);

    const itemHeight = 36;
    const padding = 72;

    useEffect(() => {
      if (openSheet && containerRef.current) {
        containerRef.current.scrollTop = selectedIndex * itemHeight;
      }
    }, [openSheet]);

    const handleScroll = () => {
      if (!containerRef.current) return;
      const idx = Math.round(containerRef.current.scrollTop / itemHeight);
      onSelect(idx);
    };

    return (
      <div className="relative h-[180px] w-[90px] flex flex-col items-center overflow-hidden">
        {/* 선택선 */}
        <div className="absolute top-1/2 -translate-y-1/2 w-full h-[36px] border-y border-bluegrey03 z-10" />

        {/* Scroll Area */}
        <div
          ref={containerRef}
          onScroll={handleScroll}
          className="w-full h-full overflow-y-scroll no-scrollbar snap-y snap-mandatory"
          style={{
            paddingTop: padding,
            paddingBottom: padding,
          }}
        >
          {list.map((item, i) => (
            <div
              key={i}
              className={`h-[36px] snap-start flex items-center justify-center ${
                selectedIndex === i
                  ? "text-bluegrey10 text-med16"
                  : "text-bluegrey05 text-reg14"
              }`}
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    );
  };

  // 종료 예정 시간 계산
  const calcEndTime = () => {
    const d = parseInt(days[dayIndex]);
    const h = parseInt(hours[hourIndex]);
    const m = parseInt(minutes[minuteIndex]);

    const end = new Date();
    end.setDate(end.getDate() + d);
    end.setHours(end.getHours() + h);
    end.setMinutes(end.getMinutes() + m);

    const formatted = end.toLocaleString("ko-KR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      weekday: "short",
      hour: "numeric",
      minute: "numeric",
    });

    return formatted.replace(",", "");
  };

  return (
    <>
      {/* 경매 시간 버튼 */}
      <div className="flex h-[38px] gap-3 mb-4">
        {options.map(d => {
          const isSelected =
            (isCustom && d === "직접 입력") || (!isCustom && value === d);

          return (
            <button
              key={d}
              onClick={() => {
                if (d === "직접 입력") {
                  setIsCustom(true);
                  handleOpen();
                } else {
                  setIsCustom(false);
                  onChange(d);
                }
              }}
              className={`flex-1 py-2 rounded-[8px] border text-med14 cursor-pointer
                ${
                  isSelected
                    ? "bg-[#FEE6EE] text-mainpink border-mainpink"
                    : "border-bluegrey03 text-bluegrey09"
                }
              `}
            >
              {d}
            </button>
          );
        })}
      </div>

      {/* 직접 입력 결과 표시 */}
      {isCustom && value.includes("일") && (
        <div className="flex items-center justify-between bg-white border border-bluegrey03 rounded-[8px] px-4 py-3 mb-3">
          <span className="text-med14 text-bluegrey10">{value}</span>

          {/* 변경 버튼 */}
          <button
            onClick={handleOpen}
            className="text-darkgrey01 text-med14 cursor-pointer
              border border-grey10 rounded-[39px] px-5 py-[6px]"
          >
            {" "}
            변경
          </button>
        </div>
      )}

      {/* 바텀시트 */}
      {openSheet && (
        <div
          className="fixed inset-0 z-[200] flex items-end"
          style={{ background: "rgba(0,0,0,0.60)" }}
          onClick={() => setOpenSheet(false)}
        >
          <div
            className="bg-white rounded-t-[20px] pt-6 pb-8 px-6"
            style={{
              width: "375px",
              maxHeight: "75vh",
              margin: "0 auto",
            }}
            onClick={e => e.stopPropagation()}
          >
            <p className="text-med16 text-center mb-6">경매 시간 입력</p>

            {/* Wheel 3개 */}
            <div className="flex justify-center gap-6 mb-6">
              <Wheel
                list={days}
                selectedIndex={dayIndex}
                onSelect={setDayIndex}
              />
              <Wheel
                list={hours}
                selectedIndex={hourIndex}
                onSelect={setHourIndex}
              />
              <Wheel
                list={minutes}
                selectedIndex={minuteIndex}
                onSelect={setMinuteIndex}
              />
            </div>

            {/* 종료 예정 시간 */}
            <p className="text-center text-orange01 text-reg14 mb-6">
              {calcEndTime()} 에 경매가 종료돼요.
            </p>

            {/* 저장 */}
            <button
              onClick={handleSave}
              className="w-full bg-mainpink text-white py-3 rounded-[8px] text-med18 cursor-pointer"
            >
              저장
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default DurationSelector;
