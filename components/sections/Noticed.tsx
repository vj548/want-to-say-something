"use client";

import { useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Reveal from "@/components/Reveal";
import ScrollButton from "@/components/ScrollButton";

const DETAILS = ["The ponytail.", "That hair band.", "The band matching your dress.", "And that red bag."];

function CoordinationDiagram() {
  // Abstract shapes only — no image of her, just a visual echo of the
  // matching-colours idea (ponytail → band → dress → bag).
  return (
    <div className="glass mx-auto mt-8 flex max-w-xs items-center justify-center gap-3 rounded-2xl p-6 sm:max-w-sm">
      {[
        { shape: "rounded-full", size: "h-8 w-8" },
        { shape: "rounded-full", size: "h-5 w-5" },
        { shape: "rounded-md", size: "h-10 w-7" },
        { shape: "rounded-lg", size: "h-6 w-8" },
      ].map((s, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0.6 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 * i, duration: 0.5 }}
          className={`${s.shape} ${s.size} bg-gradient-to-br from-accent to-[#ff9db8]`}
        />
      ))}
    </div>
  );
}

export default function Noticed() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [detailStep, setDetailStep] = useState(-1);
  const [notification, setNotification] = useState(false);

  useEffect(() => {
    if (!inView) return;
    DETAILS.forEach((_, i) => {
      setTimeout(() => setDetailStep(i), 700 + i * 750);
    });
    const t = setTimeout(() => setNotification(true), 700 + DETAILS.length * 750 + 2600);
    return () => clearTimeout(t);
  }, [inView]);

  return (
    <section id="noticed" ref={ref} className="section-shell">
      <div className="relative z-10 w-full max-w-xl text-center">
        <Reveal>
          <p className="eyebrow mb-3">the part i wasn&apos;t sure whether to say</p>
          <h2 className="font-display text-2xl italic text-white sm:text-3xl">
            Okay... here&apos;s the slightly embarrassing part.
          </h2>
        </Reveal>

        <Reveal delay={0.15} className="mt-8 space-y-2">
          <p className="text-lg leading-relaxed text-white/65">
            I don&apos;t really know you.
          </p>
          <p className="text-lg leading-relaxed text-white/65">
            We haven&apos;t had those long conversations where I could say
            &ldquo;I know everything about you.&rdquo;
          </p>
          <p className="text-lg leading-relaxed text-white/65">
            So I can&apos;t pretend this is some huge love story.
          </p>
          <p className="mt-2 text-white/50">It&apos;s actually much simpler than that.</p>
        </Reveal>

        <Reveal delay={0.32} className="mt-8">
          <p className="glow-text font-display text-2xl italic text-white sm:text-3xl">
            I just noticed you.
          </p>
        </Reveal>

        <Reveal delay={0.45} className="mt-5 space-y-1 text-sm text-white/45">
          <p>Not in some dramatic movie-scene kind of way.</p>
          <p>Just... little things.</p>
        </Reveal>

        <div className="mt-8 space-y-2.5">
          {DETAILS.map((d, i) => (
            <motion.p
              key={d}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: detailStep >= i ? 1 : 0, y: detailStep >= i ? 0 : 8 }}
              transition={{ duration: 0.5 }}
              className="text-lg text-white/75"
            >
              {d}
            </motion.p>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: detailStep >= DETAILS.length - 1 ? 1 : 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-6 space-y-1.5 text-sm text-white/45"
        >
          <p>I don&apos;t know if you intentionally coordinate everything...</p>
          <p>But if you do...</p>
          <p className="text-white/60">...that&apos;s an impressive level of coordination.</p>
          <p className="mt-2 text-xs text-white/35">
            Respectfully, my colour coordination skills could never.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: detailStep >= DETAILS.length - 1 ? 1 : 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <CoordinationDiagram />
        </motion.div>

        {/* quiet emotional beat */}
        <Reveal delay={0.2} className="mt-14 space-y-2">
          <p className="text-lg leading-relaxed text-white/60">
            For some reason, that little combination — the dress, the
            matching band, the ponytail, and that red bag — stuck in my mind.
          </p>
          <p className="text-white/45">I don&apos;t really know why.</p>
        </Reveal>

        <Reveal delay={0.35} className="mt-6 max-w-md mx-auto">
          <p className="text-lg leading-relaxed text-white/60">
            Maybe because sometimes it&apos;s not one big thing that makes
            someone stand out. Sometimes it&apos;s just a bunch of tiny
            details that somehow make you noticeable.
          </p>
        </Reveal>

        <Reveal delay={0.5} className="mt-6">
          <p className="text-white/50">And apparently my brain decided:</p>
          <div className="glass mx-auto mt-3 inline-flex items-center gap-2 rounded-full px-5 py-2 font-mono text-[11px] text-accentSoft">
            Remember this person.
          </div>
          {notification && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-3 text-sm text-white/45"
            >
              Thanks, brain. Very helpful. 😭
            </motion.p>
          )}
        </Reveal>

        <Reveal delay={0.7} className="mt-6">
          <p className="text-white/60">Because now I&apos;m here...</p>
          <p className="mt-1 text-white/60">building a whole website about it.</p>
        </Reveal>

        {/* honest clarification */}
        <Reveal delay={0.15} className="mt-16 space-y-1.5 border-t border-white/10 pt-10">
          <p className="text-white/60">But I want to be honest about something.</p>
          <p className="mt-3 text-lg text-white/70">I don&apos;t know you yet.</p>
          <p className="text-white/50">I don&apos;t know your favourite song.</p>
          <p className="text-white/50">I don&apos;t know what makes you laugh.</p>
          <p className="text-white/50">
            I don&apos;t know what kind of person you are when you&apos;re
            completely comfortable around someone.
          </p>
          <p className="mt-3 text-white/50">I don&apos;t know any of those things.</p>
        </Reveal>

        <Reveal delay={0.3} className="mt-6">
          <p className="text-white/60">And honestly...</p>
          <p className="mt-2 glow-text font-display text-xl italic text-white">
            I&apos;d like to know you.
          </p>
        </Reveal>

        <Reveal delay={0.5} className="mt-12 flex justify-center">
          <ScrollButton targetId="about">Keep going →</ScrollButton>
        </Reveal>
      </div>
    </section>
  );
}
