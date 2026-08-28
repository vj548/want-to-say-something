"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const MESSAGES = [
  "Still here?",
  "Okay, you're actually reading this.",
  "Respect.",
  "You're making it to the important part.",
  "Don't panic.",
  "Neither am I.",
  "Confidence: 12%",
  "Confidence temporarily unavailable.",
  "Brain.exe has stopped working.",
  "Still overthinking...",
  "Okay, don't panic.",
  "She is actually reading this.",
  "Vj, breathe.",
  "Why did you make this so complicated?",
  "Everything is completely under control.",
  "Everything is NOT completely under control.",
];

export default function RandomMessages() {
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    let used: string[] = [];
    const timeouts: ReturnType<typeof setTimeout>[] = [];

    const showOne = () => {
      if (used.length === MESSAGES.length) used = [];
      const remaining = MESSAGES.filter((m) => !used.includes(m));
      const next = remaining[Math.floor(Math.random() * remaining.length)];
      used.push(next);
      setMessage(next);
      const hide = setTimeout(() => setMessage(null), 3200);
      timeouts.push(hide);
    };

    const interval = setInterval(showOne, 16000);
    const first = setTimeout(showOne, 9000);
    timeouts.push(first);

    return () => {
      clearInterval(interval);
      timeouts.forEach(clearTimeout);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed bottom-5 left-1/2 z-40 -translate-x-1/2 md:bottom-8 md:left-auto md:right-8 md:translate-x-0">
      <AnimatePresence>
        {message && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.4 }}
            className="glass rounded-full px-4 py-2 text-xs text-white/70"
          >
            {message}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
