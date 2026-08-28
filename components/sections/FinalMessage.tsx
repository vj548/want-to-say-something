"use client";

import { FormEvent, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Instagram, Send } from "lucide-react";
import Reveal from "@/components/Reveal";
import { SITE_CONFIG } from "@/lib/config";

const DEV_NOTES = [["Lines of code", "A questionable amount"],["Sleep sacrificed", "Yes"],["Confidence level", "Concerning"],["Normal ways of saying hi", "1"],["Normal ways I chose", "0"],["Websites unnecessarily created", "1"]];

export default function FinalMessage({ userName }: { userName: string }) {
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    setStatus("sending");
    try {
      let answers = {};
      try { answers = JSON.parse(sessionStorage.getItem("hello_answers") || "{}"); } catch {}
      const res = await fetch("/api/message", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name: userName, isTargetPerson: true, answers, message }) });
      if (!res.ok) throw new Error("send failed");
      setStatus("sent"); setMessage("");
    } catch { setStatus("error"); }
  };

  return <section id="final" className="section-shell">
    <div className="relative z-10 max-w-lg text-center">
      <Reveal><h2 className="font-display text-3xl italic text-white sm:text-4xl">That&apos;s all I wanted to say.</h2></Reveal>
      <Reveal delay={.15} className="mt-8 space-y-2 text-lg text-white/65"><p>I know this was probably a very unexpected way to approach you.</p><p>I could have simply said hello.</p><p>But apparently my solution was to spend hours building a website.</p></Reveal>
      <Reveal delay={.35} className="mt-6"><p className="text-sm text-white/40">Please appreciate the effort. 😭</p></Reveal>

      <Reveal delay={.5} className="mt-12">
        <div className="glass rounded-2xl p-6 text-left">
          {status === "sent" ? <div className="py-4 text-center"><p className="font-display text-2xl italic text-white">Okay. It&apos;s officially sent.</p><p className="mt-3 text-sm text-white/50">Now I actually have to read this without overthinking it.</p></div> : <form onSubmit={submit}>
            <p className="eyebrow">your turn</p><p className="mt-2 font-display text-2xl italic text-white">Anything you want to say, {userName}?</p><p className="mt-2 text-sm text-white/45">No pressure. Seriously.</p>
            <textarea value={message} onChange={e => setMessage(e.target.value)} maxLength={5000} rows={5} placeholder="You can say whatever you want..." className="glass mt-5 w-full resize-none rounded-xl bg-transparent p-4 text-sm text-white outline-none placeholder:text-white/25 focus:border-white/25" />
            <div className="mt-4 flex items-center justify-between gap-3"><span className="text-[11px] text-white/25">{message.length}/5000</span><button disabled={!message.trim() || status === "sending"} className="accent-btn inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium text-white disabled:opacity-40"><Send size={15}/>{status === "sending" ? "Sending..." : "Send"}</button></div>
            {status === "error" && <p className="mt-3 text-xs text-rose-300">Couldn&apos;t send that. Try again.</p>}
          </form>}
        </div>
      </Reveal>

      <Reveal delay={.65} className="mt-8"><p className="text-white/60">If you&apos;d rather just talk, that works too.</p>{SITE_CONFIG.INSTAGRAM_LINK && <motion.a href={SITE_CONFIG.INSTAGRAM_LINK} target="_blank" rel="noopener noreferrer" whileHover={{scale:1.04}} whileTap={{scale:.97}} className="accent-btn mt-5 inline-flex items-center gap-2 rounded-full px-8 py-3.5 text-sm font-medium text-white"><Instagram size={16}/> Say hi on Instagram →</motion.a>}</Reveal>

      <Reveal delay={.85} className="mt-16 w-full max-w-xs mx-auto text-left"><p className="eyebrow mb-3 text-center">developer&apos;s notes</p><div className="glass space-y-1.5 rounded-2xl p-5 font-mono text-[11px] text-white/40">{DEV_NOTES.map(([label,value]) => <div key={label} className="flex justify-between gap-4"><span>{label}:</span><span className="text-white/60">{value}</span></div>)}</div></Reveal>
      <Reveal delay={1} className="mt-10"><p className="text-[11px] tracking-wide text-white/25">Made with courage, overthinking, and way too much JavaScript.</p></Reveal>
    </div>
  </section>;
}
