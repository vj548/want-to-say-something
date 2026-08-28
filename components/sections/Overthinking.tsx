"use client";

import { X, Check } from "lucide-react";
import Reveal from "@/components/Reveal";
import ScrollButton from "@/components/ScrollButton";

const OPTIONS = [
  { label: "Just say hi.", good: false },
  { label: "Send a normal message.", good: false },
  { label: "Ask a friend what to do.", good: false },
  { label: "Do nothing and keep overthinking.", good: false },
  { label: "Build an entire website.", good: true },
];

export default function Overthinking() {
  return (
    <section id="overthinking" className="section-shell">
      <div className="relative z-10 w-full max-w-lg">
        <Reveal className="text-center">
          <p className="eyebrow mb-3">the overthinking department</p>
          <h2 className="font-display text-3xl italic text-white sm:text-4xl">
            I had simpler options.
          </h2>
        </Reveal>

        <div className="mt-10 space-y-3">
          {OPTIONS.map((opt, i) => (
            <Reveal key={opt.label} delay={0.1 * i}>
              <div className="glass flex items-center justify-between rounded-xl px-5 py-3.5">
                <span
                  className={
                    opt.good
                      ? "font-display text-base italic text-white"
                      : "text-sm text-white/60 line-through decoration-white/25"
                  }
                >
                  {opt.label}
                </span>
                {opt.good ? (
                  <Check size={18} className="shrink-0 text-emerald-400" />
                ) : (
                  <X size={18} className="shrink-0 text-accent/70" />
                )}
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.65} className="mt-8 text-center">
          <p className="text-white/70">Yep.</p>
          <p className="mt-1 font-display text-lg italic text-white">
            That was the decision.
          </p>
          <p className="mt-3 text-sm text-white/40">
            My brain has questionable problem-solving skills.
          </p>
        </Reveal>

        <Reveal delay={0.8} className="mt-10 flex justify-center">
          <ScrollButton targetId="typing">Keep going →</ScrollButton>
        </Reveal>
      </div>
    </section>
  );
}
