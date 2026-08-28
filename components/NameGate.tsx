"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SITE_CONFIG } from "@/lib/config";

export default function NameGate({ onVerified }: { onVerified: (name: string) => void }) {
  const [step, setStep] = useState<"verify" | "no" | "name">("verify");
  const [name, setName] = useState("");

  const target = SITE_CONFIG.HER_NAME === "there" 
    ? "the person this website was meant for" 
    : `the person named as ${SITE_CONFIG.HER_NAME}, this website was meant for`;

  return (
    <div className="fixed inset-0 z-[100] flex min-h-screen items-center justify-center overflow-hidden bg-[#08060a] px-6">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,92,134,.10),transparent_55%)]" />
      <AnimatePresence mode="wait">
        {step === "verify" && (
          <motion.div key="verify" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="relative z-10 w-full max-w-md text-center">
            <p className="eyebrow">quick verification</p>
            <h1 className="glow-text mt-4 font-display text-4xl italic text-white sm:text-5xl">Before we continue...</h1>
            <p className="mt-5 text-white/60">I just need to make sure this actually reached the right person.</p>
            <p className="mt-8 text-xl text-white">Are you <span className="font-display italic">{target}</span>?</p>
            <div className="mt-8 flex justify-center gap-3">
              <button onClick={() => setStep("name")} className="accent-btn rounded-full px-7 py-3 text-sm font-medium text-white">Yes, that&apos;s me</button>
              <button onClick={() => setStep("no")} className="glass rounded-full px-7 py-3 text-sm text-white/80">Nope</button>
            </div>
          </motion.div>
        )}

        {step === "no" && (
          <motion.div key="no" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="relative z-10 w-full max-w-md text-center">
            <p className="eyebrow">well...</p>
            <h2 className="mt-4 font-display text-3xl italic text-white">That&apos;s awkward.</h2>
            <p className="mt-5 text-white/60">I was pretty confident about this.</p>
            <button onClick={() => setStep("verify")} className="glass mt-8 rounded-full px-7 py-3 text-sm text-white/80">Go back</button>
          </motion.div>
        )}

        {step === "name" && (
          <motion.form key="name" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} onSubmit={(e) => { e.preventDefault(); if (name.trim()) onVerified(name.trim()); }} className="relative z-10 w-full max-w-md text-center">
            <p className="eyebrow">one tiny thing</p>
            <h2 className="mt-4 font-display text-3xl italic text-white">What should I call you?</h2>
            <input autoFocus value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" className="glass mt-8 w-full rounded-2xl bg-transparent px-5 py-4 text-center text-white outline-none placeholder:text-white/25 focus:border-white/25" />
            <button disabled={!name.trim()} className="accent-btn mt-4 w-full rounded-full px-7 py-3.5 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-40">Continue →</button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
