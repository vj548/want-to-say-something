"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import Reveal from "@/components/Reveal";
import ScrollButton from "@/components/ScrollButton";

const DRAFTS = ["Hi", "Hey", "Hello", "Hey, I wanted to...", "Never mind."];
const TYPE_SPEED = 65;
const DELETE_SPEED = 40;
const HOLD_TIME = 500;

export default function TypingDemo() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [text, setText] = useState("");
  const [draftIndex, setDraftIndex] = useState(0);
  const [phase, setPhase] = useState<"typing" | "holding" | "deleting">("typing");
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!inView || done) return;
    if (draftIndex >= DRAFTS.length) {
      setDone(true);
      return;
    }

    const target = DRAFTS[draftIndex];

    if (phase === "typing") {
      if (text.length < target.length) {
        const t = setTimeout(() => setText(target.slice(0, text.length + 1)), TYPE_SPEED);
        return () => clearTimeout(t);
      }
      const t = setTimeout(() => setPhase("holding"), HOLD_TIME);
      return () => clearTimeout(t);
    }

    if (phase === "holding") {
      const t = setTimeout(() => setPhase("deleting"), HOLD_TIME);
      return () => clearTimeout(t);
    }

    if (phase === "deleting") {
      if (text.length > 0) {
        const t = setTimeout(() => setText(text.slice(0, -1)), DELETE_SPEED);
        return () => clearTimeout(t);
      }
      const t = setTimeout(() => {
        setDraftIndex((i) => i + 1);
        setPhase("typing");
      }, 250);
      return () => clearTimeout(t);
    }
  }, [inView, text, phase, draftIndex, done]);

  return (
    <section id="typing" ref={ref} className="section-shell">
      <div className="relative z-10 w-full max-w-md">
        <Reveal className="text-center">
          <p className="eyebrow mb-3">meanwhile, in my messages app</p>
          <h2 className="font-display text-2xl italic text-white sm:text-3xl">
            Here&apos;s what actually happened first.
          </h2>
        </Reveal>

        <div className="glass mt-10 rounded-2xl p-6">
          <p className="text-xs text-white/40">Vj is typing...</p>
          <div className="mt-4 flex min-h-[52px] items-center">
            {!done ? (
              <p className="font-mono text-lg text-white/85">
                {text}
                <span className="animate-pulse">|</span>
              </p>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-1.5"
              >
                <p className="text-white/60">Yeah.</p>
                <p className="text-white/60">That wasn&apos;t going anywhere.</p>
                <p className="font-display italic text-white">So I built this.</p>
              </motion.div>
            )}
          </div>
        </div>

        {done && (
          <Reveal delay={0.3} className="mt-10 flex justify-center">
            <ScrollButton targetId="tried-vs-did">Fair enough →</ScrollButton>
          </Reveal>
        )}
      </div>
    </section>
  );
}
