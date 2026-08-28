"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Reveal from "@/components/Reveal";
import ScrollButton from "@/components/ScrollButton";
import { SITE_CONFIG } from "@/lib/config";

const CARDS = [
  { label: "Name", value: SITE_CONFIG.MY_NAME },
  { label: "Current status", value: "Trying to be brave" },
  { label: "Special skill", value: "Overthinking simple conversations" },
  { label: "Current mission", value: "Successfully saying hi" },
  { label: "Biggest weakness", value: "Actually saying hi" },
  { label: "Reason this website exists", value: "You." },
];

const HOVER_SEQUENCE = ["Overthinking...", "Loading...", "Still loading...", "Okay, we're good."];

function ProfileCard({ label, value, delay }: { label: string; value: string; delay: number }) {
  const [step, setStep] = useState(-1);

  const startHover = () => {
    setStep(0);
    HOVER_SEQUENCE.forEach((_, i) => {
      setTimeout(() => setStep(i), i * 260);
    });
  };

  return (
    <Reveal delay={delay}>
      <motion.div
        onHoverStart={startHover}
        onHoverEnd={() => setStep(-1)}
        whileHover={{ y: -4 }}
        className="glass flex h-40 flex-col justify-between rounded-2xl p-6"
      >
        <p className="eyebrow">{label}</p>
        <div className="h-6">
          {step === -1 ? (
            <p className="font-display text-lg italic text-white">{value}</p>
          ) : (
            <motion.p
              key={step}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-sm text-accentSoft"
            >
              {HOVER_SEQUENCE[step]}
            </motion.p>
          )}
        </div>
      </motion.div>
    </Reveal>
  );
}

export default function AboutMe() {
  return (
    <section id="about" className="section-shell">
      <div className="relative z-10 w-full max-w-3xl">
        <Reveal className="text-center">
          <p className="eyebrow mb-3">a very informal introduction</p>
          <h2 className="font-display text-3xl italic text-white sm:text-4xl">
            Since I&apos;m basically introducing myself through a website...
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {CARDS.map((c, i) => (
            <ProfileCard key={c.label} label={c.label} value={c.value} delay={0.06 * i} />
          ))}
        </div>

        <Reveal delay={0.5} className="mt-12 flex justify-center">
          <ScrollButton targetId="honest">Keep going →</ScrollButton>
        </Reveal>
      </div>
    </section>
  );
}
