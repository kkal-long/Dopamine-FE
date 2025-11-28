import {
  AnimatePresence,
  motion,
  useMotionValue,
  useTransform,
} from "framer-motion";
import React, { useEffect } from "react";

export type Direction = "left" | "right" | "up" | "down";

type Props = {
  children: React.ReactNode;
  onSwipe?: (dir: Direction) => void;
  preventSwipe?: Direction[];
  className?: string;
};

export default function SwipeCard({
  children,
  onSwipe,
  preventSwipe = [],
  className,
}: Props) {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-300, 0, 300], [-8, 0, 8]);

  const ALL_DIRS: Direction[] = ["left", "right", "up", "down"];
  const draggingDisabled = ALL_DIRS.every(d => preventSwipe.includes(d));

  useEffect(() => {
    if (draggingDisabled) x.set(0);
  }, [draggingDisabled]);

  return (
    <AnimatePresence mode="popLayout">
      <motion.div
        style={{
          x,
          rotate,
          touchAction: "none",
          cursor: draggingDisabled ? "default" : "grab",
          userSelect: "none",
        }}
        drag={draggingDisabled ? false : "x"}
        dragElastic={0.35}
        dragMomentum={true}
        dragConstraints={{ left: 0, right: 0 }}
        onDragStart={() => {
          document.body.style.cursor = "grabbing";
        }}
        onDragEnd={(_, info) => {
          document.body.style.cursor = "default";

          const threshold = 40;

          if (info.offset.x < -threshold && !preventSwipe.includes("left")) {
            onSwipe?.("left");
            x.set(0);
          } else if (
            info.offset.x > threshold &&
            !preventSwipe.includes("right")
          ) {
            onSwipe?.("right");
            x.set(0);
          } else {
            x.set(0);
          }
        }}
        transition={{ type: "spring", stiffness: 280, damping: 24 }}
        className={`w-full ${className}`}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
