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
// pauses before the next burst.
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
// pointing backwards along the direction of travel while the ship circles.
function JetExhaust() {
  return (
    <>
      {/* Long faint streamer — gently pulsing */}
      <motion.div
        aria-hidden
        className="absolute top-1/2 left-[12px] -translate-x-full -translate-y-1/2 h-[2px] w-44"
        style={{
          background: `linear-gradient(90deg, rgba(185,195,212,0) 0%, rgba(185,195,212,0.28) 100%)`,
        }}
        animate={{ opacity: [0.3, 0.7, 0.4, 0.65, 0.3] }}
        transition={{ duration: 1.1, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* Flickering engine core */}
      <motion.div
        aria-hidden
        className="absolute top-1/2 left-[12px] -translate-x-full -translate-y-1/2 h-[2px] w-24"
        style={{
          background: `linear-gradient(90deg, rgba(185,195,212,0) 0%, rgba(185,195,212,0.95) 100%)`,
        }}
        animate={{ opacity: [0.9, 0.4, 0.95, 0.5, 0.9] }}
        transition={{ duration: 0.65, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* Soft glow */}
      <motion.div
        aria-hidden
        className="absolute top-1/2 left-[12px] -translate-x-full -translate-y-1/2 h-[7px] w-16 blur-[3px]"
        style={{
          background: `linear-gradient(90deg, rgba(185,195,212,0) 0%, rgba(185,195,212,0.55) 100%)`,
        }}
        animate={{ opacity: [0.55, 1, 0.7, 0.9, 0.55] }}
        transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* Splashing exhaust particles */}
      {EXHAUST_PARTICLES.map((p, i) => (
        <motion.div
          key={i}
          aria-hidden
          className="absolute left-[14px] h-[2px] w-[2px] rounded-full"
          style={{ top: `calc(50% - 1px + ${p.y}px)`, background: ACCENT }}
          initial={{ x: 0, opacity: 0 }}
          animate={{
            x: [0, -p.dist],
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
  const [orbitMinElapsed, setOrbitMinElapsed] = useState(false);
  const [hardCap, setHardCap] = useState(false);
  const [exitNow, setExitNow] = useState(false);
  const [gone, setGone] = useState(false);

  // Whether the load is done and we are allowed to leave the orbit (we still
  // wait for the current revolution to wrap around before actually exiting).
  const pendingExitRef = useRef(false);
  const lastRotateRef = useRef(0);

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
  const pendingExit = loaded && orbitMinElapsed;
  useEffect(() => {
    pendingExitRef.current = pendingExit;
  }, [pendingExit]);

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
  } else {
    // 3. Swoop up and out to the right in a smooth arc once loading is done.
    jetAnimate = {
      x: [0, "38vw", "76vw"],
      y: [-ORBIT, "-58vh", "-34vh"],
      rotate: [0, -20, -8],
    };
    jetTransition = { duration: 1.25, ease: "easeInOut" };
  }

  return (
    !gone && (
      <motion.div
        className="pointer-events-none absolute inset-0 z-[25] flex items-center justify-center overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: effPhase === "exiting" ? 0 : 1 }}
        transition={{
          opacity: { duration: 0.5, delay: effPhase === "exiting" ? 1.05 : 0 },
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
              // The orbit rotate keyframes run 0 -> 360 per revolution. When the
              // angle wraps back down below 60 we know one full circle just
              // completed — that is the only moment we allow a pending exit.
              const r = Number(latest.rotate ?? 0);
              const prev = lastRotateRef.current;
              lastRotateRef.current = r;
              if (prev > 300 && r < 60 && pendingExitRef.current) {
                setExitNow(true);
              }
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