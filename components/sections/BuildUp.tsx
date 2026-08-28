"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { useRef } from "react";
import ScrollButton from "@/components/ScrollButton";

const LINES = [
  "Okay.",
  "This is the part I've been overthinking.",
  "I don't know what you're going to say.",
  "But I think it's better to ask than to keep wondering.",
  "So...",
];

const CONFIDENCE_STEPS = [23, 17, 12, 8, 3];

function NervousMeter({ active }: { active: boolean }) {
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!active) return;
    CONFIDENCE_STEPS.forEach((_, i) => {
      setTimeout(() => setStep(i), i * 500);
    });
    setTimeout(() => setDone(true), CONFIDENCE_STEPS.length * 500 + 300);
  }, [active]);

  if (!active) return null;

  return (
    <div className="mt-6 flex flex-col items-center gap-1.5">
      <p className="text-[11px] uppercase tracking-widest text-white/35">
        Vj&apos;s current confidence
      </p>
      <p className="font-mono text-sm text-accentSoft">
        {done ? "Whatever. Send it." : `${CONFIDENCE_STEPS[step]}%`}
      </p>
    </div>
  );
}

export default function BuildUp() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [line, setLine] = useState(-1);

  useEffect(() => {
    if (!inView) return;
    LINES.forEach((_, i) => {
      setTimeout(() => setLine(i), i * 1200 + 300);
    });
  }, [inView]);

  return (
    <section
      id="buildup"
      ref={ref}
      className="section-shell bg-gradient-to-b from-transparent via-black/40 to-transparent"
    >
      <div className="relative z-10 flex min-h-[40vh] max-w-lg flex-col items-center justify-center text-center">
        <AnimatePresence mode="wait">
          {line >= 0 && (
            <motion.p
              key={line}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5 }}
              className={
                line === LINES.length - 1
                  ? "font-display text-2xl italic text-white sm:text-3xl"
                  : "text-lg text-white/60"
              }
            >
              {LINES[line]}
            </motion.p>
          )}
        </AnimatePresence>

        <NervousMeter active={line >= LINES.length - 1} />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: line >= LINES.length - 1 ? 1 : 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="mt-10"
        >
          <ScrollButton targetId="question">Ask the question →</ScrollButton>
        </motion.div>
      </div>
    </section>
  );
}
