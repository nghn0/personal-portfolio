"use client";

import { useEffect, useRef, useState } from "react";
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

// Deterministic particle config for the splashing exhaust trail. Each particle
// spurts out behind the ship (negative local x), grows dim and shrinks, then
// pauses before the next burst. `curve` bends it along the orbit so the trail
// arcs instead of flying straight while the jet goes around.
const CURVE = (dist: number) => ORBIT - Math.sqrt(ORBIT * ORBIT - dist * dist);

const EXHAUST_PARTICLES = [
  { dist: 26, dur: 0.5, delay: 0, y: 0, mid: 0.5, gap: 0.35 },
  { dist: 38, dur: 0.65, delay: 0.12, y: 2, mid: 0.4, gap: 0.45 },
  { dist: 22, dur: 0.42, delay: 0.05, y: -2, mid: 0.6, gap: 0.3 },
  { dist: 48, dur: 0.75, delay: 0.2, y: -4, mid: 0.35, gap: 0.55 },
  { dist: 30, dur: 0.55, delay: 0.3, y: 4, mid: 0.45, gap: 0.4 },
  { dist: 18, dur: 0.38, delay: 0.08, y: -1, mid: 0.65, gap: 0.28 },
  { dist: 42, dur: 0.7, delay: 0.15, y: 1, mid: 0.38, gap: 0.5 },
  { dist: 34, dur: 0.6, delay: 0.22, y: -3, mid: 0.42, gap: 0.48 },
];

// The engine flame behind the ship. Anchored to the jet container, so it stays
// pointing backwards along the direction of travel while the ship circles. The
// trail is drawn as an arc that bends toward the orbit centre — following the
// circular path the ship actually takes.
const TRAIL_PATH = "M168 40 C 120 36 80 50 45 58 C 24 63 10 65 0 66";

function JetExhaust() {
  return (
    <>
      {/* Curved comet trail */}
      <svg
        viewBox="0 0 180 80"
        className="pointer-events-none absolute left-[-156px] top-0 h-20 w-[180px]"
        aria-hidden
      >
        <defs>
          <linearGradient id="trailGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor={ACCENT} stopOpacity="0" />
            <stop offset="100%" stopColor={ACCENT} stopOpacity="1" />
          </linearGradient>
        </defs>
        {/* Soft glow */}
        <motion.path
          d={TRAIL_PATH}
          fill="none"
          stroke="url(#trailGrad)"
          strokeWidth="8"
          strokeLinecap="round"
          style={{ filter: "blur(3px)" }}
          animate={{ opacity: [0.14, 0.28, 0.18, 0.24, 0.14] }}
          transition={{ duration: 1.1, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* Flickering streamer */}
        <motion.path
          d={TRAIL_PATH}
          fill="none"
          stroke="url(#trailGrad)"
          strokeWidth="2.5"
          strokeLinecap="round"
          animate={{ opacity: [0.5, 0.85, 0.6, 0.75, 0.5] }}
          transition={{ duration: 0.65, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* Bright core */}
        <path
          d={TRAIL_PATH}
          fill="none"
          stroke={ACCENT}
          strokeWidth="1"
          strokeLinecap="round"
          opacity="0.9"
        />
      </svg>

      {/* Splashing exhaust particles — curve along the orbit like the trail */}
      {EXHAUST_PARTICLES.map((p, i) => (
        <motion.div
          key={i}
          aria-hidden
          className="absolute left-[14px] h-[2px] w-[2px] rounded-full"
          style={{ top: "calc(50% - 1px)", background: ACCENT }}
          initial={{ x: 0, y: p.y, opacity: 0 }}
          animate={{
            x: [0, -p.dist],
            y: [p.y, p.y + CURVE(p.dist)],
            opacity: [0.9, p.mid, 0],
            scale: [1, 0.4],
          }}
          transition={{
            duration: p.dur,
            delay: p.delay,
            repeat: Infinity,
            repeatDelay: p.gap,
            ease: "easeOut",
          }}
        />
      ))}
    </>
  );
}

export default function SpaceJetLoader() {
  const { active, progress } = useProgress();
  const [phase, setPhase] = useState<Phase>("entering");
  const [exitTarget, setExitTarget] = useState<{
    x: number;
    y: number;
    rotate: number;
  } | null>(null);
  const [exitNow, setExitNow] = useState(false);
  const [hardCap, setHardCap] = useState(false);
  const [gone, setGone] = useState(false);

  // Latest interpolated jet position/heading, captured every animation frame
  // so the exit flight can launch from wherever the jet currently is.
  const latestRef = useRef({ x: 0, y: -ORBIT, rotate: 0 });

  // Safety net: never trap the visitor on the loader if an asset hangs.
  useEffect(() => {
    const t = setTimeout(() => setHardCap(true), 12000);
    return () => clearTimeout(t);
  }, []);

  const loaded = !active && progress >= 100;

  // The moment assets are ready, leave the orbit immediately from wherever the
  // jet is pointing — no need to finish the revolution.
  useEffect(() => {
    if (!loaded || exitNow || gone) return;
    const cur = latestRef.current;
    const rad = ((cur.rotate ?? 0) * Math.PI) / 180;
    const D = 2000;
    setExitTarget({
      x: cur.x + Math.cos(rad) * D,
      y: cur.y + Math.sin(rad) * D,
      rotate: cur.rotate ?? 0,
    });
    setExitNow(true);
  }, [loaded, exitNow, gone]);

  const done = exitNow || hardCap;
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
  } else if (hardCap) {
    // Failsafe: bail out in a straight line from wherever we are.
    jetAnimate = { x: "76vw", y: "-20vh", rotate: 0 };
    jetTransition = { duration: 0.8, ease: "easeInOut" };
  } else if (exitTarget) {
    // 3. Shoot off in the direction the jet was pointing when the load finished.
    jetAnimate = {
      x: exitTarget.x,
      y: exitTarget.y,
      rotate: exitTarget.rotate,
    };
    jetTransition = { duration: 0.7, ease: "easeInOut" };
  } else {
    // Unreachable, but keeps the branches exhaustive.
    jetAnimate = { x: 0, y: -ORBIT };
    jetTransition = { duration: 1.2, ease: "easeInOut" };
  }

  return (
    !gone && (
      <motion.div
        className="pointer-events-none absolute inset-0 z-[25] flex items-center justify-center overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: effPhase === "exiting" ? 0 : 1 }}
        transition={{
          opacity: { duration: 0.5, delay: effPhase === "exiting" ? 0.75 : 0 },
        }}
      >
        {/* Responsive scale — the whole loader (jet + status text) sits smaller
            and stays centered on mobile. */}
        <div className="scale-[0.85] sm:scale-100">
          {/* Jet — centered, transform-driven */}
          <motion.div
            className="absolute left-1/2 top-1/2 -ml-[70px] -mt-10 z-10"
            initial={{ x: "-50vw", y: 0 }}
            animate={jetAnimate}
            transition={jetTransition}
            onAnimationComplete={() => {
              if (effPhase === "entering") setPhase("orbiting");
              else if (effPhase === "exiting") setGone(true);
            }}
            onUpdate={(latest) => {
              latestRef.current = {
                x: Number(latest.x ?? 0),
                y: Number(latest.y ?? 0),
                rotate: Number(latest.rotate ?? 0),
              };
            }}
          >
            <JetExhaust />
            <JetSVG />
          </motion.div>

          {/* Status text — the jet circles around this */}
          <div className="absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2">
            <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-white/70">
              Initializing Projects
            </span>
          </div>
        </div>
      </motion.div>
    )
  );
}