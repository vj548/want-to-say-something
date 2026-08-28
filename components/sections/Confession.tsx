"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Reveal from "@/components/Reveal";
import ScrollButton from "@/components/ScrollButton";

const CARDS = [
  { who: "You:", line: "Who makes a website instead of just saying hi?" },
  { who: "Me:", line: "...apparently me." },
  { who: "My brain:", line: "Just talk to her normally." },
];

export default function Confession() {
  const [glitch, setGlitch] = useState(false);

  useEffect(() => {
    const id = setInterval(() => setGlitch((g) => !g), 1400);
    return () => clearInterval(id);
  }, []);

  return (
    <section id="confession" className="section-shell">
      <div className="relative z-10 w-full max-w-3xl">
        <Reveal className="text-center">
          <p className="eyebrow mb-3">the awkward part</p>
          <h2 className="font-display text-3xl italic text-white sm:text-4xl">
            Let&apos;s address the obvious.
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-4 sm:grid-cols-3">
          {CARDS.map((c, i) => (
            <Reveal key={c.who} delay={0.12 * i}>
              <div className="glass flex h-full flex-col justify-between rounded-2xl p-6">
                <p className="text-xs font-medium uppercase tracking-widest text-accent/80">
                  {c.who}
                </p>
                <p className="mt-4 text-base text-white/85">{c.line}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.4} className="mt-8 text-center">
          <p className="text-sm text-white/50">Me:</p>
          <p className="mt-1 font-display text-xl italic text-white">
            Absolutely not. Let&apos;s build a website.
          </p>
        </Reveal>

        <Reveal delay={0.55} className="mt-8 flex justify-center">
          <motion.div
            animate={{ opacity: glitch ? 0.4 : 1 }}
            transition={{ duration: 0.15 }}
            className="glass rounded-full px-5 py-2 font-mono text-[11px] text-white/50"
          >
            brain.exe has stopped working
          </motion.div>
        </Reveal>

        <Reveal delay={0.7} className="mt-12 flex justify-center">
          <ScrollButton targetId="overthinking">Okay, fair enough →</ScrollButton>
        </Reveal>
      </div>
    </section>
  );
}
