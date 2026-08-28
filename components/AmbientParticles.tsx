"use client";

import { useMemo } from "react";

// A handful of slow-drifting embers. Deliberately sparse —
// this is atmosphere, not a Valentine's Day parade.
export default function AmbientParticles() {
  const particles = useMemo(
    () =>
      Array.from({ length: 14 }).map((_, i) => ({
        id: i,
        left: Math.round(Math.random() * 100),
        size: 2 + Math.random() * 3,
        delay: Math.random() * 14,
        duration: 12 + Math.random() * 10,
      })),
    []
  );

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      {particles.map((p) => (
        <span
          key={p.id}
          className="absolute bottom-0 rounded-full animate-drift"
          style={{
            left: `${p.left}%`,
            width: p.size,
            height: p.size,
            background:
              "radial-gradient(circle, rgba(255,157,184,0.9) 0%, rgba(255,92,134,0.15) 70%, transparent 100%)",
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
          }}
        />
      ))}
    </div>
  );
}
