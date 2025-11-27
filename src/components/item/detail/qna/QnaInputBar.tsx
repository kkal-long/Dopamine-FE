import { ArrowUp } from "@/assets/svgs/item/detail";
import { useEffect, useState } from "react";

interface QnaInputBarProps {
  onSubmit: (questionText: string) => void;
  onClose: () => void;
}

const QnaInputBar = ({ onSubmit, onClose }: QnaInputBarProps) => {
  const [text, setText] = useState("");
  const [bottomOffset, setBottomOffest] = useState(0);

  const handleSubmit = () => {
    if (text.trim().length === 0) return;

    onSubmit(text);
    setText("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSubmit();
    }
  };

  // 모바일 이용시 항상 자판 위에 위치하도록
  useEffect(() => {
    const viewport = window.visualViewport;
    if (!viewport) return;

    const handleResize = () => {
      const offset = window.innerHeight - viewport.height - viewport.offsetTop;
      setBottomOffest(offset > 0 ? offset : 0);
    };

    viewport.addEventListener("resize", handleResize);
    viewport.addEventListener("scroll", handleResize);

    handleResize();

    return () => {
      viewport.removeEventListener("resize", handleResize);
      viewport.removeEventListener("scroll", handleResize);
    };
  }, []);

  return (
    <div
      className="fixed inset-0 z-40 bg-black/30 flex justify-center items-end"
      style={{ bottom: bottomOffset }}
      onClick={onClose}
    >
      <div
        className="w-full max-w-[375px] bg-white p-3 border-t border-grey04"
        onClick={e => e.stopPropagation()}
        style={{
          paddingBottom: "max(12px, env(safe-area-inset-bottom))",
        }}
      >
        <div className="flex items-center gap-2 bg-grey02 rounded-xl px-2 py-1">
          <input
            type="text"
            value={text}
            onChange={e => setText(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="질문을 남겨보세요..."
            className="flex-1 text-reg16 text-darkgrey04 placeholder-grey11 outline-none bg-transparent"
            autoFocus
          />
          <button
            onClick={handleSubmit}
            disabled={!text}
            className="w-10 h-7 flex items-center justify-center bg-grey06 rounded-xl cursor-pointer"
          >
            <ArrowUp className="w-3 h-5 text-white" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default QnaInputBar;
