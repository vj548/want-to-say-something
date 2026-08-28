"use client";

import Reveal from "@/components/Reveal";
import ScrollButton from "@/components/ScrollButton";

export default function WhyExists() {
  return (
    <section id="why" className="section-shell">
      <div className="relative z-10 max-w-xl text-center">
        <Reveal>
          <p className="eyebrow mb-3">honestly</p>
          <h2 className="font-display text-3xl italic text-white sm:text-4xl">
            Okay, but why?
          </h2>
        </Reveal>

        <Reveal delay={0.12} className="mt-8">
          <p className="text-lg leading-relaxed text-white/70">
            We haven&apos;t really talked. And that&apos;s exactly why this is
            probably a little awkward.
          </p>
        </Reveal>

        <Reveal delay={0.24} className="mt-6">
          <p className="text-lg leading-relaxed text-white/70">
            I&apos;ve noticed you, thought you seemed interesting, and
            eventually decided...
          </p>
        </Reveal>

        <Reveal delay={0.36} className="mt-8">
          <p className="glow-text font-display text-2xl italic text-white sm:text-3xl">
            &ldquo;Maybe I should actually do something about it.&rdquo;
          </p>
        </Reveal>

        <Reveal delay={0.48} className="mt-8">
          <p className="text-lg leading-relaxed text-white/70">
            Instead of endlessly thinking about whether I should approach
            you, I decided to take one small chance.
          </p>
        </Reveal>

        <Reveal delay={0.6} className="mt-10 space-y-1.5 text-sm text-white/50">
          <p>Was making a website the normal solution?</p>
          <p className="text-white/70">Probably not.</p>
          <p>Did I do it anyway?</p>
          <p className="text-white/70">Absolutely.</p>
        </Reveal>

        <Reveal delay={0.75} className="mt-12">
          <ScrollButton targetId="noticed">Keep going →</ScrollButton>
        </Reveal>
      </div>
    </section>
  );
}
