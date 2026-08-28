"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Reveal from "@/components/Reveal";
import RunawayNo from "@/components/sections/RunawayNo";
import { fireAchievement } from "@/components/Achievements";
import { SITE_CONFIG } from "@/lib/config";

type Phase = "asking" | "chasing" | "declineOffer" | "declined" | "accepted";

function TypedLine({ text }: { text: string }) {
  const [shown, setShown] = useState("");

  useEffect(() => {
    setShown("");
    let i = 0;
    const id = setInterval(() => {
      i += 1;
      setShown(text.slice(0, i));
      if (i >= text.length) clearInterval(id);
    }, 45);
    return () => clearInterval(id);
  }, [text]);

  return (
    <span className="font-display italic text-white">
      {shown}
      <span className="animate-pulse">|</span>
    </span>
  );
}

async function fireConfetti() {
  const confetti = (await import("canvas-confetti")).default;
  const colors = ["#ff5c86", "#ff9db8", "#ffffff"];
  confetti({ particleCount: 90, spread: 75, origin: { y: 0.6 }, colors });
  setTimeout(
    () => confetti({ particleCount: 60, spread: 100, origin: { y: 0.4 }, colors }),
    250
  );
  if (typeof navigator !== "undefined" && "vibrate" in navigator) {
    navigator.vibrate?.(60);
  }
}

export default function MainQuestion() {
  const [phase, setPhase] = useState<Phase>("asking");
  const [showCloseHint, setShowCloseHint] = useState(false);
  const [retryCount, setRetryCount] = useState(0);

  const handleAccept = () => {
    setPhase("accepted");
    fireConfetti();
    fireAchievement({ title: "FINAL BOSS UNLOCKED", subtitle: "Actually talking to Vj." });
  };

  return (
    <section id="question" className="section-shell overflow-hidden">
      <div className="relative z-10 flex w-full max-w-lg flex-col items-center text-center">
        <AnimatePresence mode="wait">
          {phase === "asking" || phase === "chasing" || phase === "declineOffer" ? (
            <motion.div
              key="ask"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex w-full flex-col items-center"
            >
              <Reveal>
                <p className="text-sm text-white/50">So...</p>
                <h2 className="glow-text mt-3 font-display text-4xl italic text-white sm:text-5xl">
                  Would you like to get to know me?
                </h2>
                <p className="mt-4 text-white/60">
                  Maybe we could start with a conversation?
                </p>
              </Reveal>

              {phase === "asking" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="mt-10 flex flex-wrap items-center justify-center gap-4"
                >
                  <motion.button
                    onClick={handleAccept}
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                    className="accent-btn rounded-full px-8 py-3.5 text-sm font-medium text-white"
                  >
                    YES ❤️
                  </motion.button>
                  <button
                    onClick={() => setPhase("chasing")}
                    className="glass rounded-full px-8 py-3.5 text-sm font-medium text-white/80"
                  >
                    NO
                  </button>
                </motion.div>
              )}

              {(phase === "chasing" || phase === "declineOffer") && (
                <div className="mt-8 flex w-full flex-col items-center">
                  <RunawayNo onSurrender={() => setPhase("declineOffer")} />
                  {phase === "declineOffer" && (
                    <motion.button
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      onClick={() => setPhase("declined")}
                      className="glass mt-2 rounded-full px-7 py-3 text-sm text-white/80"
                    >
                      I really don&apos;t want to
                    </motion.button>
                  )}
                </div>
              )}
            </motion.div>
          ) : phase === "declined" ? (
            <motion.div
              key="declined"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center"
            >
              <h3 className="font-display text-2xl italic text-white">
                That&apos;s completely okay ❤️
              </h3>
              <p className="mt-5 text-white/60">
                No awkwardness.
                <br />
                No pressure.
                <br />
                Thanks for giving this little website a chance.
              </p>
              <button
                onClick={() => {
                  window.close();
                  setShowCloseHint(true);
                }}
                className="glass mt-8 rounded-full px-7 py-3 text-sm text-white/70"
              >
                Close this website
              </button>
              {showCloseHint && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-3 text-xs text-white/35"
                >
                  (Your browser won&apos;t let me close this — feel free to
                  just close the tab.)
                </motion.p>
              )}
              
              <div className="mt-16 flex flex-col items-center">
                <p className="mb-4 text-xs italic text-white/40">
                  {retryCount === 0 
                    ? "Okay... you still have one more chance." 
                    : "Alright... I'll give you another chance to reconsider."}
                </p>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => {
                    setRetryCount(r => r + 1);
                    setPhase("asking");
                  }}
                  className="glass rounded-full px-6 py-2.5 text-xs text-white/60 transition-colors hover:text-white/80"
                >
                  Give me another chance
                </motion.button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="accepted"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center"
            >
              <p className="text-sm uppercase tracking-widest text-white/50">
                WAIT...
              </p>
              <h3 className="glow-text mt-3 font-display text-3xl italic text-white sm:text-4xl">
                You actually said yes?! 😭
              </h3>
              <p className="mt-4 text-white/60">Okay.</p>
              <p className="mt-1 text-white/60">
                Let&apos;s not get ahead of ourselves.
              </p>

              <div className="glass mt-8 w-full max-w-sm space-y-5 rounded-2xl p-6 text-left">
                <div>
                  <p className="eyebrow">Step 1</p>
                  <p className="mt-1 text-white/70">Say hi.</p>
                  <p className="mt-1 h-6">
                    <TypedLine text={`Hi, I'm ${SITE_CONFIG.MY_NAME}.`} />
                  </p>
                </div>
                <div>
                  <p className="eyebrow">Step 2</p>
                  <p className="mt-1 text-white/70">Actually talk.</p>
                </div>
                <div>
                  <p className="eyebrow">Step 3</p>
                  <p className="mt-1 text-white/70">See where this goes.</p>
                </div>
              </div>

              <p className="mt-8 max-w-sm text-sm text-white/45">
                No unrealistic expectations. No dramatic movie ending. Just
                two people getting to know each other.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}


