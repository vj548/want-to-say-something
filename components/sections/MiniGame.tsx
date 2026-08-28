"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Reveal from "@/components/Reveal";
import ScrollButton from "@/components/ScrollButton";

type Question = { prompt: string; options: string[]; response: string };

const QUESTIONS: Question[] = [
  { prompt: "Coffee or tea?", options: ["Coffee", "Tea"], response: "Good to know. That information will definitely be useful for absolutely no reason." },
  { prompt: "Was making this website slightly unnecessary?", options: ["Yes", "Very yes"], response: "I can't argue with that." },
  { prompt: "Do you think I should've just said hi?", options: ["Yes", "Definitely"], response: "Exactly. Finally, someone understands." },
];

export default function MiniGame() {
  const [index, setIndex] = useState(0);
  const [response, setResponse] = useState<string | null>(null);
  const [finished, setFinished] = useState(false);

  const answer = (choice: string) => {
    setResponse(QUESTIONS[index].response);
    try {
      const saved = JSON.parse(sessionStorage.getItem("hello_answers") || "{}");
      sessionStorage.setItem("hello_answers", JSON.stringify({ ...saved, [index]: choice }));
    } catch {}
    setTimeout(() => {
      if (index + 1 < QUESTIONS.length) { setIndex(i => i + 1); setResponse(null); }
      else setFinished(true);
    }, 1300);
  };

  return <section id="game" className="section-shell">
    <div className="relative z-10 w-full max-w-md text-center">
      <Reveal><p className="eyebrow mb-3">before the serious question</p><h2 className="font-display text-3xl italic text-white sm:text-4xl">Let&apos;s see if you can survive 3 extremely important questions.</h2></Reveal>
      <div className="glass mt-10 flex min-h-[200px] flex-col items-center justify-center rounded-2xl p-8">
        <AnimatePresence mode="wait">
          {!finished ? <motion.div key={index} initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }} transition={{ duration: .35 }} className="w-full">
            <p className="mb-2 text-xs text-white/40">Question {index + 1} of {QUESTIONS.length}</p>
            <p className="font-display text-xl italic text-white">{QUESTIONS[index].prompt}</p>
            {response ? <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-5 text-sm text-accentSoft">{response}</motion.p> : <div className="mt-6 flex flex-wrap justify-center gap-3">{QUESTIONS[index].options.map(opt => <button key={opt} onClick={() => answer(opt)} className="glass rounded-full px-5 py-2 text-sm text-white/85 transition-colors hover:text-white">{opt}</button>)}</div>}
          </motion.div> : <motion.div key="done" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col items-center gap-6"><p className="text-white/70">Okay. Enough distractions.</p><p className="text-sm text-white/45">There&apos;s one actual question.</p><ScrollButton targetId="buildup">Let&apos;s do this →</ScrollButton></motion.div>}
        </AnimatePresence>
      </div>
    </div>
  </section>;
}
