"use client";

import { useState } from "react";
import { Heart } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { fireAchievement } from "@/components/Achievements";

const STAGES = [
  { title: "Congratulations.", body: "You found the secret." },
  { title: "There is no secret.", body: "...unless there is." },
  { title: "Okay, you win.", body: "You have officially explored everything." },
];

export default function EasterEgg() {
  const [clicks, setClicks] = useState(0);
  const [show, setShow] = useState(false);
  const [stage, setStage] = useState(0);

  const handleClick = () => {
    const next = clicks + 1;
    setClicks(next);
    if (next >= 5) {
      if (stage === 0) fireAchievement({ title: "You found the secret." });
      setStage((s) => Math.min(s + 1, STAGES.length - 1));
      setShow(true);
      setTimeout(() => setShow(false), 4200);
    }
  };

  return (
    <>
      <button
        onClick={handleClick}
        aria-label="???"
        className="fixed bottom-5 left-5 z-40 flex h-9 w-9 items-center justify-center rounded-full text-white/15 transition-colors hover:text-accent/70"
      >
        <Heart size={16} fill="currentColor" />
      </button>

      <AnimatePresence>
        {show && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 12 }}
            className="fixed bottom-20 left-5 z-40 max-w-[220px] rounded-2xl glass-strong px-4 py-3 text-sm text-white/90"
          >
            <p className="font-medium">{STAGES[stage].title}</p>
            <p className="mt-1 text-white/60">{STAGES[stage].body}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
