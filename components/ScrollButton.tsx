"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

export default function ScrollButton({
  targetId,
  children,
  variant = "solid",
}: {
  targetId: string;
  children: ReactNode;
  variant?: "solid" | "ghost";
}) {
  const scroll = () => {
    document.getElementById(targetId)?.scrollIntoView({ behavior: "smooth" });
  };

  const base =
    "rounded-full px-7 py-3.5 text-sm font-medium tracking-wide transition-transform";

  return (
    <motion.button
      onClick={scroll}
      whileHover={{ scale: 1.035 }}
      whileTap={{ scale: 0.97 }}
      className={
        variant === "solid"
          ? `${base} accent-btn text-white`
          : `${base} glass text-white/85 hover:text-white`
      }
    >
      {children}
    </motion.button>
  );
}
