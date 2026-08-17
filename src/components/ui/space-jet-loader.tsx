"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useProgress } from "@react-three/drei";

const ACCENT = "#b9c3d4";

function JetSVG() {
  return (
    <svg
      viewBox="0 0 140 80"
      className="h-20 w-auto"
      fill="none"
      style={{ filter: "drop-shadow(0 0 10px rgba(185,195,212,0.35))" }}
      aria-hidden
    >
      <g stroke={ACCENT} strokeWidth="1.5" strokeLinejoin="round">
        <path d="M84 30 L14 10 L50 34 Z" fill="rgba(185,195,212,0.10)" />
        <path d="M84 50 L14 70 L50 46 Z" fill="rgba(185,195,212,0.10)" />
        <path
          d="M128 40 C112 28 92 22 60 32 L60 48 C92 58 112 52 128 40 Z"
          fill="rgba(185,195,212,0.18)"
        />
        <path
          d="M104 36 C112 38 114 42 104 45 C96 42 96 37 104 36 Z"
          fill="rgba(185,195,212,0.35)"
        />
      </g>
      <motion.path
        d="M60 36 L38 40 L60 44 Z"
        fill={ACCENT}
        opacity="0.8"
        animate={{ opacity: [0.9, 0.35, 0.9] }}
        transition={{ duration: 0.6, repeat: Infinity, ease: "easeInOut" }}
      />
      <circle cx="30" cy="40" r="1.4" fill={ACCENT} opacity="0.5" />
      <circle cx="20" cy="40" r="1.1" fill={ACCENT} opacity="0.3" />
      <circle cx="12" cy="40" r="0.8" fill={ACCENT} opacity="0.15" />
    </svg>
  );
}

export default function SpaceJetLoader() {
  const { active, progress } = useProgress();
  const [minElapsed, setMinElapsed] = useState(false);
  const startedAt = useRef<number | null>(null);

  // Show for a minimum of 700ms so the loader never flashes on fast loads.
  useEffect(() => {
    if (active) {
      if (startedAt.current === null) startedAt.current = Date.now();
      return;
    }
    const elapsed =
      startedAt.current === null ? 0 : Date.now() - startedAt.current;
    const wait = Math.max(0, 700 - elapsed);
    const t = setTimeout(() => setMinElapsed(true), wait);
    startedAt.current = null;
    return () => clearTimeout(t);
  }, [active]);

  // Safety net: never trap the visitor on the loader if an asset hangs.
  useEffect(() => {
    if (!active) return;
    const t = setTimeout(() => setMinElapsed(true), 12000);
    return () => clearTimeout(t);
  }, [active]);

  const show = active || !minElapsed;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="space-jet-loader"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.6, ease: "easeInOut" } }}
          className="pointer-events-none absolute inset-0 z-[25] flex flex-col items-center justify-center overflow-hidden"
        >
          <motion.div
            className="relative"
            animate={{ x: ["-60vw", "60vw"], y: [0, -16, 0] }}
            transition={{
              x: { duration: 5, ease: "linear", repeat: Infinity },
              y: { duration: 2.4, ease: "easeInOut", repeat: Infinity },
            }}
          >
            <JetSVG />
          </motion.div>

          <div className="absolute bottom-16 flex flex-col items-center gap-3">
            <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-white/70">
              Initializing Projects
            </span>
            <div className="h-px w-56 overflow-hidden bg-white/15">
              <div
                className="h-px bg-[#b9c3d4] transition-[width] duration-300 ease-out"
                style={{ width: `${Math.min(100, Math.round(progress))}%` }}
              />
            </div>
            <span className="font-mono text-[10px] tracking-[0.25em] text-white/40">
              {Math.round(progress)}%
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}