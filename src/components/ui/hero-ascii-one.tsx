"use client";

import { useEffect, useRef, useState } from "react";
import { SpecialText } from "@/components/ui/special-text";

const GLYPHS =
  "NITHISH01AI<>/\\|{}[]()=+-_*?$#@%&:.··010101NITASH";

export function AsciiField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let width = 0;
    let height = 0;

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = parent.clientWidth;
      height = parent.clientHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    window.addEventListener("resize", resize);

    const FONT = "13px ui-monospace, SFMono-Regular, Menlo, monospace";
    const starCount = Math.max(220, Math.floor((width * height) / 2600));
    const stars = Array.from({ length: starCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      speed: 0.3 + Math.random() * 1.6,
      char: GLYPHS[Math.floor(Math.random() * GLYPHS.length)],
      bright: 0.3 + Math.random() * 0.7,
    }));

    let t = 0;
    const render = () => {
      t += 0.016;
      ctx.clearRect(0, 0, width, height);

      ctx.font = FONT;
      for (const s of stars) {
        s.y -= s.speed;
        if (s.y < -10) {
          s.y = height + 10;
          s.x = Math.random() * width;
        }
        const flicker = 0.55 + 0.45 * Math.sin(t * 2 + s.x + s.y);
        ctx.fillStyle = `rgba(220,228,255,${s.bright * flicker})`;
        ctx.fillText(s.char, s.x, s.y);
      }

      raf = requestAnimationFrame(render);
    };

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      ctx.font = FONT;
      ctx.fillStyle = "rgba(220,228,255,0.35)";
      for (const s of stars) ctx.fillText(s.char, s.x, s.y);
    } else {
      raf = requestAnimationFrame(render);
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />;
}

function Corner({
  className = "",
}: {
  className: string;
}) {
  return (
    <div
      className={`pointer-events-none absolute z-20 h-8 w-8 border-2 border-white/30 lg:h-12 lg:w-12 ${className}`}
    />
  );
}

export default function Home() {
  const openChat = () => {
    const btn = document.getElementById("ai-chat-btn");
    if (btn) (btn as HTMLButtonElement).click();
  };

  const scrollToId = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      window.scrollTo({ top: el.offsetTop - 80, behavior: "smooth" });
    }
  };

  const [spot, setSpotState] = useState<{ x: number; y: number } | null>(null);
  const [hovering, setHovering] = useState(false);
  const spotRef = useRef<{ x: number; y: number } | null>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const loop = () => {
      if (spotRef.current) setSpotState(spotRef.current);
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  const asciiMaskStyle =
    hovering && spot
      ? {
          WebkitMaskImage: `radial-gradient(circle 170px at ${spot.x}px ${spot.y}px, transparent 0%, transparent 25%, black 80%)`,
          maskImage: `radial-gradient(circle 170px at ${spot.x}px ${spot.y}px, transparent 0%, transparent 25%, black 80%)`,
        }
      : undefined;

  // Clean (no-ASCII) layer: hidden by default. On hover it appears only inside the
  // reveal circle. Its mask is the exact mirror of the ASCII mask so both toggle at the
  // same edge — producing a single clean ring instead of two doubled white masks.
  const cleanMaskStyle =
    hovering && spot
      ? {
          WebkitMaskImage: `radial-gradient(circle 170px at ${spot.x}px ${spot.y}px, black 0%, black 20%, transparent 75%)`,
          maskImage: `radial-gradient(circle 170px at ${spot.x}px ${spot.y}px, black 0%, black 20%, transparent 75%)`,
        }
      : undefined;

  return (
    <section id="hero" className="relative min-h-screen overflow-hidden bg-black">
      {/* ASCII field (desktop) + dotted fallback (mobile) */}
      <div className="absolute inset-0 hidden h-full w-full lg:block">
        <AsciiField />
        <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:26px_26px] opacity-50" />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/10 to-black/60" />
      </div>
      <div
        className="absolute inset-0 lg:hidden"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.07) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      {/* Frame corner brackets */}
      <Corner className="left-0 top-0 border-r-0 border-b-0" />
      <Corner className="right-0 top-0 border-l-0 border-b-0" />

      {/* Content — gif on top of content on mobile, gif left + content right on desktop */}
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center pt-28 lg:flex-row lg:pt-0">
        <div
          className="relative mx-auto mb-8 w-48 lg:absolute lg:left-[4%] lg:top-1/2 lg:mx-0 lg:mb-0 lg:w-[38vw] lg:max-w-[640px] lg:-translate-y-1/2"
          style={{ aspectRatio: "4 / 5" }}
          onMouseMove={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            spotRef.current = {
              x: e.clientX - rect.left,
              y: e.clientY - rect.top,
            };
            setHovering(true);
          }}
          onMouseEnter={() => setHovering(true)}
          onMouseLeave={() => {
            setHovering(false);
            spotRef.current = null;
          }}
        >
          {/* Clean version (no ASCII) — base layer. Hidden unless hovering; only the reveal circle shows. */}
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            poster="/nithiwithoutascii.jpg"
            className="absolute inset-0 h-full w-full object-cover object-center mix-blend-screen opacity-100 grayscale"
            style={cleanMaskStyle ?? { opacity: 0, visibility: "hidden" }}
          >
            <source src="/nithiwithoutascii.webm" type="video/webm" />
            <source src="/nithiwithoutascii.mp4" type="video/mp4" />
          </video>
          {/* ASCII version — fully visible by default; a cursor-following hole erases it to reveal the clean version below */}
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            poster="/nithwithout.jpg"
            className="absolute inset-0 h-full w-full object-cover object-center mix-blend-screen opacity-100 grayscale"
            style={asciiMaskStyle}
          >
            <source src="/nithwithout.webm" type="video/webm" />
            <source src="/nithwithout.mp4" type="video/mp4" />
          </video>
        </div>
        <div className="relative w-full max-w-2xl px-6 lg:max-w-3xl lg:translate-x-[34%]">
          <div className="relative grid w-full lg:w-max">
            {/* Infinity label bar */}
            <div className="mb-3 flex items-center gap-2 opacity-60">
              <div className="h-px w-8 bg-white" />
              <span className="font-mono text-[10px] tracking-wider text-white">
                ∞
              </span>
              <div className="h-px flex-1 bg-white" />
            </div>

            {/* Headline */}
            <div className="relative">
              <div className="dither-pattern absolute -right-3 top-0 bottom-0 hidden w-1 opacity-40 lg:block" />
              <h1
                className="font-mono text-2xl font-bold leading-[1.15] tracking-wider whitespace-nowrap text-white lg:text-6xl"
                style={{ letterSpacing: "0.1em" }}
              >
                <SpecialText text="NITHISH GOWDA" />
              </h1>
            </div>

            {/* dotted rule */}
            <div className="mb-3 hidden gap-1 opacity-40 lg:flex">
              {Array.from({ length: 40 }).map((_, i) => (
                <div
                  key={i}
                  className="h-0.5 w-0.5 rounded-full bg-white"
                />
              ))}
            </div>

            {/* Sub-line */}
            <p className="mb-5 whitespace-normal font-mono text-[11px] leading-relaxed tracking-[0.3em] text-white/60 uppercase lg:whitespace-nowrap lg:text-xs">
              AI Engineer &amp; Intelligent Systems Builder · Cyber Security Enthusiast
            </p>

            {/* Description */}
            <div className="relative">
              <p className="mb-3 whitespace-normal font-mono text-base font-bold leading-relaxed text-white lg:mb-4 lg:whitespace-nowrap lg:text-lg">
                  AI by curiosity. Cybersecurity by obsession. Impossible problems by choice.
                </p>
                <p className="mb-5 max-w-[720px] font-mono text-xs leading-relaxed text-gray-300 opacity-80 lg:mb-6 lg:text-base">
                  I teach machines to do things they probably shouldn&apos;t — mostly to see what happens. I&apos;ve made models read faces, predict the Sun&apos;s mood swings, argue with humans, and turn experiments into IEEE research. I build intelligent systems, put contracts on the blockchain, and love breaking systems just enough to understand how to secure them.
                </p>
              <div
                className="absolute -left-4 top-1/2 hidden h-3 w-3 border border-white opacity-30 lg:block"
                style={{ transform: "translateY(-50%)" }}
              >
                <div
                  className="absolute top-1/2 left-1/2 h-1 w-1 bg-white"
                  style={{ transform: "translate(-50%, -50%)" }}
                />
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col gap-3 lg:flex-row lg:gap-4">
              <button
                onClick={() => scrollToId("projects")}
                className="group relative bg-transparent border border-white px-5 py-2 font-mono text-xs text-white uppercase transition-all duration-200 hover:bg-white hover:text-black lg:px-6 lg:py-2.5 lg:text-sm"
              >
                <span className="absolute -top-1 -left-1 hidden h-2 w-2 border-t border-l border-white opacity-0 transition-opacity group-hover:opacity-100 lg:block" />
                <span className="absolute -bottom-1 -right-1 hidden h-2 w-2 border-b border-r border-white opacity-0 transition-opacity group-hover:opacity-100 lg:block" />
                Explore Projects
              </button>
              <button
                onClick={openChat}
                className="bg-transparent border border-white px-5 py-2 font-mono text-xs text-white uppercase transition-all duration-200 hover:bg-white hover:text-black lg:px-6 lg:py-2.5 lg:text-sm"
                style={{ borderWidth: 1 }}
              >
                Talk to My AI
              </button>
            </div>

            {/* Footer strip */}
            <div className="mt-6 hidden items-center gap-2 opacity-40 lg:flex">
              <span className="font-mono text-[9px] text-white">∞</span>
              <div className="h-px flex-1 bg-white" />
              <span className="font-mono text-[9px] text-white">
                AI.ENGINEER.PROTOCOL
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
