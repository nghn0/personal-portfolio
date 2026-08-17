"use client";

import { useEffect, useState } from "react";
import {
  motion,
  type TargetAndTransition,
  type Transition,
} from "framer-motion";
import { useProgress } from "@react-three/drei";

const ACCENT = "#b9c3d4";

// Orbit radius (px) — large enough that the jet never clips the status text.
const ORBIT = 160;

// Sample the orbit circle at 24 points (plus the closing point) so the path
// reads as a true circle, not a polygon/diamond.
const CIRCLE_STEPS = 24;

// Keyframes that trace a full circle in the clockwise direction. `rotate` is
// set to the tangent angle at each point so the jet always points along the
// direction of travel. The last keyframe equals the first for a seamless loop.
const orbitKeyframes = (() => {
  const x: number[] = [];
  const y: number[] = [];
  const rotate: number[] = [];
  for (let i = 0; i <= CIRCLE_STEPS; i++) {
    const theta = (i / CIRCLE_STEPS) * Math.PI * 2;
    x.push(ORBIT * Math.sin(theta));
    y.push(-ORBIT * Math.cos(theta));
    rotate.push((theta * 180) / Math.PI);
  }
  return { x, y, rotate };
})();

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

type Phase = "entering" | "orbiting" | "exiting";

export default function SpaceJetLoader() {
  const { active, progress } = useProgress();
  const [phase, setPhase] = useState<Phase>("entering");
  const [orbitMinElapsed, setOrbitMinElapsed] = useState(false);
  const [hardCap, setHardCap] = useState(false);
  const [gone, setGone] = useState(false);

  // Guarantee a minimum orbit time so the circling motion is always visible
  // before the exit flight.
  useEffect(() => {
    if (phase !== "orbiting") return;
    const t = setTimeout(() => setOrbitMinElapsed(true), 2500);
    return () => clearTimeout(t);
  }, [phase]);

  // Safety net: never trap the visitor on the loader if an asset hangs.
  useEffect(() => {
    const t = setTimeout(() => setHardCap(true), 12000);
    return () => clearTimeout(t);
  }, []);

  const loaded = !active && progress >= 100;
  const done = (loaded && orbitMinElapsed) || hardCap;
  const effPhase: Phase = done ? "exiting" : phase;

  let jetAnimate: TargetAndTransition;
  let jetTransition: Transition;

  if (effPhase === "entering") {
    // 1. Fly in from the left, arriving at the top of the orbit circle.
    jetAnimate = { x: 0, y: -ORBIT };
    jetTransition = { duration: 1.2, ease: "easeInOut" };
  } else if (effPhase === "orbiting") {
    // 2. Circle around the center status text until the load finishes.
    jetAnimate = orbitKeyframes;
    jetTransition = { duration: 8, ease: "linear", repeat: Infinity };
  } else {
    // 3. Fly out to the right once loading is done, straightening out as it leaves.
    jetAnimate = { x: "70vw", y: 0, rotate: 0 };
    jetTransition = { duration: 0.85, ease: "easeIn" };
  }

  return (
    !gone && (
      <motion.div
        className="pointer-events-none absolute inset-0 z-[25] flex items-center justify-center overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: effPhase === "exiting" ? 0 : 1 }}
        transition={{
          opacity: { duration: 0.5, delay: effPhase === "exiting" ? 0.8 : 0 },
        }}
      >
        {/* Jet — centered, transform-driven */}
        <motion.div
          className="absolute left-1/2 top-1/2 -ml-10 -mt-10 z-10"
          initial={{ x: "-50vw", y: 0 }}
          animate={jetAnimate}
          transition={jetTransition}
          onAnimationComplete={() => {
            if (effPhase === "entering") setPhase("orbiting");
            else if (effPhase === "exiting") setGone(true);
          }}
        >
          <JetSVG />
        </motion.div>

        {/* Status text — the jet circles around this */}
        <div className="absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2">
          <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-white/70">
            Initializing Projects
          </span>
        </div>
      </motion.div>
    )
  );
}