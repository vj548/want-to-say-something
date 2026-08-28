"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const ATTEMPT_MESSAGES = [
  "Are you sure? 😭",
  "Wait, hear me out!",
  "That button is getting nervous.",
  "WHY ARE YOU CHASING IT 😭",
  "Bro is speedrunning rejection.",
  "Okay, I respect the determination.",
];

const FLAVOR_MESSAGES = [
  "Nice try.",
  "Too slow.",
  "Missed me!",
  "I saw that coming.",
  "That button has trust issues.",
  "Bro, leave the button alone 😭",
  "404: No button not found.",
  "Are you sure about that?",
  "The button has chosen violence.",
];

const MAX_ATTEMPTS = 6;

export default function RunawayNo({ onSurrender }: { onSurrender: () => void }) {
  const [pos, setPos] = useState({ top: "50%", left: "50%" });
  const [attempts, setAttempts] = useState(0);
  const [message, setMessage] = useState<string | null>(null);
  const [settled, setSettled] = useState(false);

  const dodge = () => {
    if (settled) return;

    const next = attempts + 1;
    setAttempts(next);

    const flavor =
      next <= ATTEMPT_MESSAGES.length
        ? ATTEMPT_MESSAGES[next - 1]
        : FLAVOR_MESSAGES[Math.floor(Math.random() * FLAVOR_MESSAGES.length)];
    setMessage(flavor);

    if (next >= MAX_ATTEMPTS) {
      setSettled(true);
      setPos({ top: "50%", left: "50%" });
      setTimeout(onSurrender, 1400);
      return;
    }

    const top = 15 + Math.random() * 65; // %
    const left = 10 + Math.random() * 70; // %
    setPos({ top: `${top}%`, left: `${left}%` });
  };

  return (
    <div className="relative h-52 w-full max-w-sm sm:h-60">
      <motion.button
        type="button"
        animate={{ top: pos.top, left: pos.left }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        onPointerEnter={dodge}
        onClick={dodge}
        onTouchStart={dodge}
        style={{ position: "absolute", transform: "translate(-50%, -50%)" }}
        className="glass rounded-full px-6 py-3 text-sm font-medium text-white/80 active:scale-95"
      >
        NO
      </motion.button>

      {message && !settled && (
        <motion.p
          key={message + attempts}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="pointer-events-none absolute left-1/2 top-2 -translate-x-1/2 text-xs text-white/50"
        >
          {message}
        </motion.p>
      )}

      {settled && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="pointer-events-none absolute left-1/2 top-1/2 w-full -translate-x-1/2 -translate-y-[calc(50%+2.6rem)] text-center text-sm text-white/60"
        >
          Okay, okay. I&apos;ll stop running.
        </motion.p>
      )}
    </div>
  );
}
