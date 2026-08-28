"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function ExitIntent() {
  const [show, setShow] = useState(false);
  const [triggered, setTriggered] = useState(false);

  useEffect(() => {
    const onLeave = (e: MouseEvent) => {
      if (triggered) return;
      if (e.clientY <= 0) {
        setTriggered(true);
        setShow(true);
        setTimeout(() => setShow(false), 3600);
      }
    };
    document.addEventListener("mouseleave", onLeave);
    return () => document.removeEventListener("mouseleave", onLeave);
  }, [triggered]);

  return (
    <div className="pointer-events-none fixed top-5 left-1/2 z-50 -translate-x-1/2">
      <AnimatePresence>
        {show && (
          <motion.div
            initial={{ opacity: 0, y: -14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            className="glass-strong rounded-full px-5 py-2.5 text-sm text-white/85"
          >
            Wait... you made it this far 😭
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
