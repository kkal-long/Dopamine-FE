import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";
import { Down, Up } from "@/assets/svgs/main";

type BidSheetProps = {
  open: boolean;
  value: number;
  onChange: (v: number) => void;
  onClose: () => void;
  onConfirm: () => void;
  productTitle: string;
  highestBid: number;
};

export default function BidSheet({
  open,
  value,
  onChange,
  onClose,
  onConfirm,
  productTitle,
  highestBid,
}: BidSheetProps) {
  useEffect(() => {
    if (!open) return;
    const onEsc = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onEsc);
    return () => window.removeEventListener("keydown", onEsc);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="absolute inset-0 z-40"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              background: "rgba(33,33,33,0.2)",
              backdropFilter: "blur(10px)",
            }}
          />

          {/* 바텀 시트 */}
          <motion.div
            className="absolute bottom-0 left-1/2 z-50 w-full max-w-[420px] -translate-x-1/2 p-5 pb-8 flex flex-col items-center"
            style={{
              borderRadius: "20px 20px 0 0",
              background:
                "linear-gradient(180deg, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.85) 100%)",
              backdropFilter: "blur(20px)",
            }}
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 28 }}
            onPointerDownCapture={e => e.stopPropagation()}
          >
            <div className="h-[5px] w-[60px] rounded-full bg-white/30 mb-4" />

            <div className="flex justify-between items-end w-full mb-4 text-white px-1">
              <span className="text-[20px] font-medium">{productTitle}</span>
              <span className="text-[13px] opacity-80">
                현재 최고 입찰가 ₩ {highestBid.toLocaleString()}
              </span>
            </div>

            {/* 가격 조정 섹션 */}
            <div className="flex items-center justify-between w-full gap-4">
              <button
                className="grid h-[52px] w-[52px] place-items-center rounded-full bg-white/20 backdrop-blur-md cursor-pointer"
                onClick={e => {
                  e.stopPropagation();
                  onChange(Math.max(0, value - 1000));
                }}
              >
                <Down className="text-white" />
              </button>

              <div className="flex items-center justify-center gap-2 flex-1 h-[52px] text-white bg-white/10 backdrop-blur-lg border border-white/20 rounded-full px-4">
                <span className="text-[14px] opacity-80">₩</span>
                <input
                  type="text"
                  className="bg-transparent w-full text-center outline-none text-[18px] font-medium"
                  value={value.toLocaleString()}
                  onChange={e => {
                    const raw = e.target.value.replace(/[^0-9]/g, "");
                    onChange(Number(raw || 0));
                  }}
                />
              </div>

              <button
                className="grid h-[52px] w-[52px] place-items-center rounded-full bg-white/20 backdrop-blur-md cursor-pointer"
                onClick={e => {
                  e.stopPropagation();
                  onChange(value + 1000);
                }}
              >
                <Up className="text-white" />
              </button>
            </div>

            <button
              className="mt-6 w-full h-[52px] rounded-full bg-mainpink text-white font-medium text-[17px] shadow-[0_8px_18px_rgba(255,4,88,0.35)] active:scale-[0.99] cursor-pointer"
              onClick={e => {
                e.stopPropagation();
                onConfirm();
              }}
            >
              완료
            </button>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
