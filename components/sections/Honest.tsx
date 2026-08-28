"use client";

import Reveal from "@/components/Reveal";
import ScrollButton from "@/components/ScrollButton";

export default function Honest() {
  return (
    <section id="honest" className="section-shell">
      <div className="relative z-10 max-w-lg text-center">
        <Reveal>
          <p className="eyebrow mb-4">no performance, just this</p>
          <h2 className="font-display text-3xl italic text-white sm:text-4xl">
            One thing I want you to know.
          </h2>
        </Reveal>

        <Reveal delay={0.15} className="mt-9">
          <p className="text-lg leading-relaxed text-white/65">
            I don&apos;t want to pretend we have some huge story together.
            <br />
            We don&apos;t.
          </p>
          <p className="mt-5 text-lg leading-relaxed text-white/65">
            We haven&apos;t had countless conversations.
            <br />
            We don&apos;t have years of memories.
            <br />
            And I don&apos;t know what you think about me.
          </p>
        </Reveal>

        <Reveal delay={0.35} className="mt-9">
          <p className="font-display text-xl italic text-white">
            But I do know that I&apos;d like the chance to change that.
          </p>
        </Reveal>

        <Reveal delay={0.5} className="mt-6">
          <p className="text-lg text-white/65">I&apos;d like to know you.</p>
        </Reveal>

        <Reveal delay={0.65} className="mt-8 space-y-1 text-sm text-white/45">
          <p>No pressure.</p>
          <p>No expectations.</p>
          <p>Just one honest question.</p>
        </Reveal>

        <Reveal delay={0.8} className="mt-12">
          <ScrollButton targetId="game">Alright, keep going →</ScrollButton>
        </Reveal>
      </div>
    </section>
  );
}
