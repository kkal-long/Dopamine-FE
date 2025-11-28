import { useEffect, useState } from "react";
import GuideLine from "@/assets/svgs/guideLine/guideLine.svg";
import { Delete } from "@/assets/svgs/guideLine";

export default function GuideOverlay() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const seen = localStorage.getItem("onboarding_seen_main");
    if (seen === "true") setVisible(false);

    // 온보딩을 매번 보려면 true로 유지
    //setVisible(true);
  }, []);

  const closeGuide = () => {
    localStorage.setItem("onboarding_seen_main", "true");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex justify-center items-start pt-[60px]">
      <div className="relative w-[360px] mx-auto">
        {/* 온보딩 이미지 */}
        <img
          src={GuideLine}
          alt="guide-line"
          className="w-full h-auto pointer-events-none"
        />

        {/* X 버튼 (가이드 이미지 위치 기준) */}
        <button
          onClick={closeGuide}
          className="absolute top-[26px] right-[20px] z-[10000]"
        >
          <Delete className="w-4 h-4 cursor-pointer" />
        </button>
      </div>
    </div>
  );
}
