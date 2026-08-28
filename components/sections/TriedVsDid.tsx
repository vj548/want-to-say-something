"use client";

import { motion } from "framer-motion";
import Reveal from "@/components/Reveal";
import ScrollButton from "@/components/ScrollButton";

const WANTED = ["Walk up.", "Say hi.", "Have a normal conversation."];
const DID = ["Overthink.", "Overthink some more.", "Build a website."];

export default function TriedVsDid() {
  return (
    <section id="tried-vs-did" className="section-shell">
      <div className="relative z-10 w-full max-w-2xl">
        <Reveal className="text-center">
          <h2 className="font-display text-2xl italic text-white sm:text-3xl">
            For the record, here&apos;s the plan versus the execution.
          </h2>
        </Reveal>

        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          <Reveal delay={0.1}>
            <div className="glass h-full rounded-2xl p-6">
              <p className="eyebrow mb-4">what i wanted to do</p>
              <ul className="space-y-3">
                {WANTED.map((line) => (
                  <li key={line} className="text-white/60">
                    {line}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.22}>
            <div className="glass h-full rounded-2xl p-6">
              <p className="eyebrow mb-4">what i actually did</p>
              <ul className="space-y-3">
                {DID.map((line, i) => (
                  <li
                    key={line}
                    className={
                      i === DID.length - 1
                        ? "font-display italic text-white"
                        : "text-white/70"
                    }
                  >
                    {line}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-8 text-center text-sm text-white/40"
        >
          Clearly, I chose efficiency.
        </motion.p>

        <Reveal delay={0.55} className="mt-10 flex justify-center">
          <ScrollButton targetId="why">Keep going →</ScrollButton>
        </Reveal>
      </div>
    </section>
  );
}
