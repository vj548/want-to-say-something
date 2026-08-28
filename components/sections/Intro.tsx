"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import ScrollButton from "@/components/ScrollButton";
import { SITE_CONFIG } from "@/lib/config";

export default function Intro() {
  const [barDone, setBarDone] = useState(false);
  const [showSerious, setShowSerious] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [showCouldve, setShowCouldve] = useState(false);
  const [showTooEasy, setShowTooEasy] = useState(false);
  const [showHereWeAre, setShowHereWeAre] = useState(false);
  const [showDisclaimer, setShowDisclaimer] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setBarDone(true), 1900);
    const t2 = setTimeout(() => setShowSerious(true), 2300);
    const t2a = setTimeout(() => setShowCouldve(true), 3000);
    const t2b = setTimeout(() => setShowTooEasy(true), 3900);
    const t2c = setTimeout(() => setShowHereWeAre(true), 4700);
    const t3 = setTimeout(() => setShowButton(true), 5400);
    const t4 = setTimeout(() => setShowDisclaimer(true), 6000);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t2a);
      clearTimeout(t2b);
      clearTimeout(t2c);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, []);

  return (
    <section id="intro" className="section-shell">
      <div className="relative z-10 flex max-w-xl flex-col items-center text-center">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7 }}
          className="mb-6 text-base text-white/60"
        >
          Hey, {SITE_CONFIG.HER_NAME} 👋
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="glow-text font-display text-4xl italic leading-[1.15] text-white sm:text-5xl"
        >
          {SITE_CONFIG.INTRO_MESSAGE}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-5 text-lg text-white/60"
        >
          So naturally, I made a website.
        </motion.p>

        <div className="mt-10 h-px w-48 overflow-hidden rounded-full bg-white/10">
          <motion.div
            className="h-full accent-btn"
            initial={{ width: "0%" }}
            animate={{ width: barDone ? "100%" : "78%" }}
            transition={{ duration: 1.7, ease: "easeInOut" }}
          />
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: showSerious ? 1 : 0 }}
          transition={{ duration: 0.5 }}
          className="mt-6 text-sm text-white/50"
        >
          Yes. I&apos;m serious.
        </motion.p>

        <div className="mt-5 space-y-1.5">
          <motion.p
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: showCouldve ? 1 : 0, y: showCouldve ? 0 : 6 }}
            transition={{ duration: 0.5 }}
            className="text-sm text-white/45"
          >
            I could&apos;ve just said hi.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: showTooEasy ? 1 : 0, y: showTooEasy ? 0 : 6 }}
            transition={{ duration: 0.5 }}
            className="text-sm text-white/45"
          >
            But apparently that was too easy.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: showHereWeAre ? 1 : 0, y: showHereWeAre ? 0 : 6 }}
            transition={{ duration: 0.5 }}
            className="text-sm italic text-white/60"
          >
            So here we are.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: showButton ? 1 : 0, y: showButton ? 0 : 10 }}
          transition={{ duration: 0.6 }}
          className="mt-10"
        >
          <ScrollButton targetId="confession">Okay... show me →</ScrollButton>
        </motion.div>
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: showDisclaimer ? 1 : 0 }}
        transition={{ duration: 0.7 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 px-4 text-center text-[11px] text-white/30"
      >
        Disclaimer: An unreasonable amount of overthinking went into this.
      </motion.p>
    </section>
  );
}
