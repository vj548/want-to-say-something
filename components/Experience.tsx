"use client";

import { useEffect, useState } from "react";
import LoadingScreen from "@/components/LoadingScreen";
import AmbientParticles from "@/components/AmbientParticles";
import CursorGlow from "@/components/CursorGlow";
import RandomMessages from "@/components/RandomMessages";
import Achievements from "@/components/Achievements";
import ExitIntent from "@/components/ExitIntent";
import EasterEgg from "@/components/EasterEgg";
import Intro from "@/components/sections/Intro";
import Confession from "@/components/sections/Confession";
import Overthinking from "@/components/sections/Overthinking";
import TypingDemo from "@/components/sections/TypingDemo";
import TriedVsDid from "@/components/sections/TriedVsDid";
import WhyExists from "@/components/sections/WhyExists";
import Noticed from "@/components/sections/Noticed";
import AboutMe from "@/components/sections/AboutMe";
import Honest from "@/components/sections/Honest";
import MiniGame from "@/components/sections/MiniGame";
import BuildUp from "@/components/sections/BuildUp";
import MainQuestion from "@/components/sections/MainQuestion";
import FinalMessage from "@/components/sections/FinalMessage";
import NameGate from "@/components/NameGate";

export default function Experience() {
  const [loading, setLoading] = useState(true);
  const [verified, setVerified] = useState(false);
  const [userName, setUserName] = useState("there");

  useEffect(() => {
    // eslint-disable-next-line no-console
    console.log(
      "%cHey developer 👀\nYou really made a whole website for this?",
      "font-size:14px; color:#ff9db8;"
    );
  }, []);

  return (
    <>
      {loading && <LoadingScreen onDone={() => setLoading(false)} />}

      {!verified && <NameGate onVerified={(name) => {
        sessionStorage.setItem("hello_name", name);
        sessionStorage.setItem("hello_verified", "true");
        localStorage.setItem("hello_name", name);
        setUserName(name);
        setVerified(true);
      }} />}

      <main className={`relative ${!verified ? "pointer-events-none select-none blur-[2px]" : ""}`}>
        <AmbientParticles />
        <CursorGlow />

        <Intro />
        <Confession />
        <Overthinking />
        <TypingDemo />
        <TriedVsDid />
        <WhyExists />
        <Noticed />
        <AboutMe />
        <Honest />
        <MiniGame />
        <BuildUp />
        <MainQuestion />
        <FinalMessage userName={userName} />

        <RandomMessages />
        <Achievements />
        <ExitIntent />
        <EasterEgg />
      </main>
    </>
  );
}
