"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

type Achievement = { title: string; subtitle?: string };

const SCROLL_ACHIEVEMENTS: Record<string, Achievement> = {
  overthinking: { title: "You survived the awkward section." },
  question: { title: "You reached the final question." },
};

export function fireAchievement(achievement: Achievement) {
  window.dispatchEvent(new CustomEvent("achievement", { detail: achievement }));
}

export default function Achievements() {
  const [queue, setQueue] = useState<Achievement[]>([]);
  const shown = useRef<Set<string>>(new Set());

  const enqueue = (a: Achievement) => {
    if (shown.current.has(a.title)) return;
    shown.current.add(a.title);
    setQueue((q) => [...q, a]);
  };

  useEffect(() => {
    const onAchievement = (e: Event) => enqueue((e as CustomEvent<Achievement>).detail);
    window.addEventListener("achievement", onAchievement);

    const timer = setTimeout(
      () => enqueue({ title: "You didn't close the website." }),
      42000
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const a = SCROLL_ACHIEVEMENTS[entry.target.id];
          if (a) enqueue(a);
        });
      },
      { threshold: 0.5 }
    );
    Object.keys(SCROLL_ACHIEVEMENTS).forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      window.removeEventListener("achievement", onAchievement);
      clearTimeout(timer);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (queue.length === 0) return;
    const t = setTimeout(() => setQueue((q) => q.slice(1)), 3400);
    return () => clearTimeout(t);
  }, [queue]);

  const current = queue[0];

  return (
    <div className="pointer-events-none fixed right-4 top-5 z-50 md:right-6">
      <AnimatePresence>
        {current && (
          <motion.div
            key={current.title}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 30 }}
            transition={{ duration: 0.4 }}
            className="glass-strong flex items-center gap-2 rounded-full px-4 py-2.5 text-xs text-white/85"
          >
            <span>🏆</span>
            <span>{current.title}</span>
            {current.subtitle && <span className="text-white/50">{current.subtitle}</span>}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
