"use client";

import {
  useCallback,
  useRef,
  useState,
} from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { LiquidMetalFrame } from "@/components/ui/liquid-metal-frame";
import type { Project } from "@/data/projects";
import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";
import { Draggable } from "gsap/Draggable";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, CustomEase, Draggable, ScrollTrigger);

const DECK: Record<number, DeckSpec> = {
  0: { x: 0, y: 0, scale: 1, rotate: 0, z: 30, opacity: 1 },
  [-1]: { x: -220, y: 26, scale: 0.92, rotate: -10, z: 25, opacity: 1 },
  [-2]: { x: -380, y: 56, scale: 0.84, rotate: -18, z: 20, opacity: 1 },
  [-3]: { x: -398, y: 92, scale: 0.74, rotate: -26, z: 15, opacity: 0 },
  [-4]: { x: -620, y: 118, scale: 0.64, rotate: -34, z: 10, opacity: 0 },
  [-5]: { x: -680, y: 138, scale: 0.56, rotate: -40, z: 5, opacity: 0 },
  1: { x: 225, y: 26, scale: 0.92, rotate: 10, z: 22, opacity: 1 },
  2: { x: 390, y: 56, scale: 0.84, rotate: 18, z: 17, opacity: 1 },
  3: { x: 398, y: 92, scale: 0.74, rotate: 26, z: 12, opacity: 0 },
  4: { x: 600, y: 118, scale: 0.64, rotate: 34, z: 8, opacity: 0 },
  5: { x: 660, y: 138, scale: 0.56, rotate: 40, z: 4, opacity: 0 },
};

type DeckSpec = {
  x: number;
  y: number;
  scale: number;
  rotate: number;
  z: number;
  opacity: number;
};

function offsetOf(slot: number, cursor: number, total: number): number {
  const half = Math.floor(total / 2);
  let offset = ((slot - cursor) % total + total) % total;
  if (offset > half) offset -= total;
  return offset;
}

// Elastic-but-refined settle for deck movement: quick flip with a soft overshoot.
const EASE_SETTLE = CustomEase.create(
  "deckSettle",
  "M0,0 C0.2,0.85 0.4,1.05 0.55,1.02 0.75,0.98 0.93,1 1,1"
);

type StackedCarouselProps = {
  projects: Project[];
  onSelect?: (project: Project) => void;
};

export function StackedCarousel({ projects, onSelect }: StackedCarouselProps) {
  const total = projects.length;
  const [cursor, setCursor] = useState(0);
  const [deckSettled, setDeckSettled] = useState(true);

  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const setCardRef = useCallback((i: number) => (el: HTMLDivElement | null) => {
    cardRefs.current[i] = el;
  }, []);

  const initialRunRef = useRef(true);
  const dealScrollRef = useRef<ScrollTrigger | null>(null);
  const cursorRef = useRef(0);
  cursorRef.current = cursor;

  const draggableRef = useRef<Draggable | null>(null);
  const draggingRef = useRef(false);
  const suppressClickRef = useRef(false);
  const navRef = useRef({ next: () => {}, prev: () => {} });
  navRef.current.next = () => setCursor((c) => c + 1);
  navRef.current.prev = () => setCursor((c) => c - 1);

  const offsets = projects.map((_, i) => offsetOf(i, cursor, total));
  const activeIndex = offsets.findIndex((o) => o === 0);

  useGSAP(
    () => {
      const els = cardRefs.current;

      if (initialRunRef.current) {
        initialRunRef.current = false;

        const finalDeck = els.map((_, i) => DECK[offsetOf(i, 0, total)]);
        const controls = containerRef.current?.querySelector<HTMLElement>("[data-deal-fade]");
        const prefersReduced = window.matchMedia(
          "(prefers-reduced-motion: reduce)"
        ).matches;

        if (prefersReduced) {
          // No deal — snap straight to the fanned deck.
          els.forEach((el, i) => {
            if (!el) return;
            const st = finalDeck[i];
            gsap.set(el, {
              x: st.x, y: st.y, scale: st.scale, rotation: st.rotate, opacity: st.opacity,
            });
          });
          if (controls) gsap.set(controls, { opacity: 1 });
          return;
        }

        // Base state: the whole deck compressed into one tight stack. Keep a dim
        // ghost visible so there's never an empty void between the heading and the deck.
        els.forEach((el) => {
          if (el) gsap.set(el, { x: 0, y: 40, scale: 0.45, rotation: 0, opacity: 0.4 });
        });
        if (controls) gsap.set(controls, { opacity: 0 });

        // Scroll-scrubbed reveal — cards are "dealt" as the section moves through
        // the viewport. No pin: the deck stays in normal flow right under the heading.
        const tl = gsap.timeline({
          defaults: { ease: "power3.inOut" },
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "top 15%",
            scrub: 1,
          },
        });

        els.forEach((el, i) => {
          if (!el) return;
          const st = finalDeck[i];
          tl.to(
            el,
            {
              x: st.x,
              y: st.y,
              scale: st.scale,
              rotation: st.rotate,
              opacity: st.opacity,
              duration: 0.75,
            },
            i * 0.05
          );
        });

        // The active card snaps into place with a tiny overshoot at the end.
        const activeEl = els[0];
        if (activeEl) {
          tl.to(activeEl, { scale: 1.06, duration: 0.1, ease: "power2.out" }, "-=0.3");
          tl.to(activeEl, { scale: 1, duration: 0.25, ease: "power2.inOut" });
        }

        if (controls) {
          tl.fromTo(
            controls,
            { opacity: 0 },
            { opacity: 1, duration: 0.35, ease: "power2.out" },
            "-=0.15"
          );
        }

        if (tl.scrollTrigger) dealScrollRef.current = tl.scrollTrigger;
        document.fonts?.ready?.then(() => ScrollTrigger.refresh());

        return () => {
          // Fully tear down the deal — otherwise StrictMode's double-mount
          // leaves a stale scrubbed timeline alive that fights the nav slides.
          const st = dealScrollRef.current;
          if (st) {
            st.kill(true);
            dealScrollRef.current = null;
          }
          tl.kill();
          initialRunRef.current = true;
        };
      }

      // Deck is interactive now — drop any leftover scroll-linking without
      // reverting the deal (kill(false) preserves current paused state), and
      // make sure the controls are fully visible after any navigation.
      dealScrollRef.current?.kill(false);
      dealScrollRef.current = null;

      // Re-slice the deck whenever the cursor moves.
      setDeckSettled(false);
      els.forEach((el, i) => {
        if (!el) return;
        const st = DECK[offsetOf(i, cursorRef.current, total)];
        gsap.to(el, {
          x: st.x,
          y: st.y,
          scale: st.scale,
          rotation: st.rotate,
          opacity: st.opacity,
          duration: 1.2,
          ease: EASE_SETTLE,
          overwrite: "auto",
        });
      });
      // The card reaches center quickly (EASE_SETTLE overshoots by ~40% of the
      // slide) — reveal the metallic frame as soon as it's close, not at the end.
      gsap.delayedCall(0.3, () => setDeckSettled(true));

      const controlsAfter = containerRef.current?.querySelector<HTMLElement>(
        "[data-deal-fade]"
      );
      if (controlsAfter) {
        gsap.to(controlsAfter, { opacity: 1, duration: 0.3, ease: "power2.out" });
      }
    },
    { dependencies: [activeIndex], scope: containerRef }
  );

  // Interaction layer: momentum drag on the active card + pointer tilt.
  useGSAP(
    () => {
      const el = cardRefs.current[activeIndex];
      if (!el) return;

let lastX = 0;
      let lastT = 0;
      let velX = 0;

      const tiltX = gsap.quickTo(el, "rotationY", { duration: 0.7, ease: "power3.out" });
      const tiltY = gsap.quickTo(el, "rotationX", { duration: 0.7, ease: "power3.out" });
      const setGlow = (px: number, py: number) => {
        el.style.setProperty("--glow-x", `${(px + 0.5) * 100}%`);
        el.style.setProperty("--glow-y", `${(py + 0.5) * 100}%`);
      };
      const resetTilt = () => {
        tiltX(0);
        tiltY(0);
        el.style.setProperty("--glow-x", "50%");
        el.style.setProperty("--glow-y", "120%");
      };

      const onMove = (e: PointerEvent) => {
        if (draggingRef.current) return;
        // Tilt only responds while the cursor is over the active card itself.
        const rect = el.getBoundingClientRect();
        if (
          e.clientX < rect.left || e.clientX > rect.right ||
          e.clientY < rect.top || e.clientY > rect.bottom
        ) {
          return;
        }
        const px = (e.clientX - rect.left) / rect.width - 0.5;
        const py = (e.clientY - rect.top) / rect.height - 0.5;
        tiltX(px * 36);
        tiltY(-py * 28);
        setGlow(px, py);
      };

      el.addEventListener("pointermove", onMove);
      el.addEventListener("pointerleave", resetTilt);

      draggableRef.current?.kill();
      draggableRef.current = Draggable.create(el, {
        type: "x",
        cursor: "grab",
        activeCursor: "grabbing",
        touchAction: "pan-y",
        onDragStart: function (this: Draggable) {
          draggingRef.current = true;
          suppressClickRef.current = true;
          gsap.to(el, { rotationX: 0, rotationY: 0, duration: 0.25, overwrite: "auto" });
          lastX = this.x;
          lastT = performance.now();
          velX = 0;
        },
        onDrag: function (this: Draggable) {
          const now = performance.now();
          const dt = now - lastT;
          if (dt > 0) velX = ((this.x - lastX) / dt) * 1000;
          lastX = this.x;
          lastT = now;
        },
        onDragEnd: function (this: Draggable) {
          draggingRef.current = false;
          const x = this.x;
          if (x < -70 || velX < -320) {
            navRef.current.next();
          } else if (x > 70 || velX > 320) {
            navRef.current.prev();
          } else {
            gsap.to(el, { x: 0, duration: 0.8, ease: "elastic.out(1.2, 0.5)", overwrite: "auto" });
          }
          window.setTimeout(() => (suppressClickRef.current = false), 250);
        },
      })[0];

      return () => {
        draggableRef.current?.kill();
        draggableRef.current = null;
        el.removeEventListener("pointermove", onMove);
        el.removeEventListener("pointerleave", resetTilt);
        resetTilt();
      };
    },
    { dependencies: [activeIndex], scope: containerRef }
  );

  const goTo = (i: number) => {
    // Bring project i to slot 0, picking the cursor closest to the current one.
    let best = i;
    let bestDist = Infinity;
    for (let k = -1; k <= 1; k++) {
      const cand = i + k * total;
      const dist = Math.abs(cand - cursorRef.current);
      if (dist < bestDist) {
        bestDist = dist;
        best = cand;
      }
    }
    setCursor(best);
  };

  return (
    <div ref={containerRef} className="relative mx-auto w-full max-w-4xl select-none">
      <div
        className="relative h-[540px] sm:h-[520px]"
        style={{ perspective: "950px" }}
      >
        {projects.map((project, i) => {
          const offset = offsets[i];
          const spec = DECK[offset];
          const isActive = offset === 0;

          return (
            <div
              key={project.id}
              ref={setCardRef(i)}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 will-change-transform"
              style={{ zIndex: spec.z }}
            >
              <div
                className={cn("w-[260px] sm:w-[380px] rounded-lg", isActive && "cursor-grab")}
                onClick={() => {
                  if (isActive && !suppressClickRef.current) onSelect?.(project);
                }}
              >
                <ProjectCard project={project} active={isActive} dimLevel={Math.min(2, Math.abs(offset))} frameOn={deckSettled} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Controls */}
      <div data-deal-fade className="mt-8 flex items-center justify-center gap-6">
        <button onClick={() => navRef.current.prev()} aria-label="Previous project" className="flex items-center justify-center h-11 w-11 rounded-full border border-white/20 text-white/80 transition-colors hover:border-white/50 hover:text-white">
          <ChevronLeft size={20} />
        </button>
        <div className="flex items-center gap-2">
          {projects.map((p, i) => (
            <button
              key={p.id}
              onClick={() => goTo(i)}
              aria-label={p.title}
              className={cn(
                "h-1.5 rounded-full transition-all duration-300",
                i === activeIndex ? "w-6 bg-white" : "w-1.5 bg-white/25 hover:bg-white/50"
              )}
            />
          ))}
        </div>
        <button onClick={() => navRef.current.next()} aria-label="Next" className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white transition-colors hover:border-white/50 hover:text-white">
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
}

function ProjectCard({
  project,
  active,
  dimLevel,
  frameOn,
}: {
  project: Project;
  active: boolean;
  dimLevel: number;
  frameOn: boolean;
}) {
  return (
    <div className={cn("group relative", active && "rounded-[13.5px] p-[1.5px]")}>
      {active && (
        <LiquidMetalFrame
          radius={13.5}
          thickness={1.5}
          speed={0.5}
          className={cn(
            "transition-opacity duration-200",
            frameOn ? "opacity-100" : "opacity-0"
          )}
        />
      )}
      <div
        className={cn(
          "relative flex min-h-[430px] flex-col overflow-hidden rounded-xl bg-[#0d0d12] p-8 text-left font-mono transition-shadow duration-300",
          active
            ? "shadow-[0_24px_60px_rgba(0,0,0,0.6)]"
            : "shadow-[0_20px_60px_rgba(0,0,0,0.45)]"
        )}
      >
      {/* Hairline accent */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />

      <h3 className="text-2xl font-bold tracking-tight text-white sm:text-[26px]">
        {project.title}
      </h3>

      <span className="mt-3 inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-neutral-300">
        <span className="h-1 w-1 rounded-full bg-white" />
        {project.type}
      </span>

      <p className="mt-4 text-sm leading-relaxed text-neutral-400 sm:text-[15px]">
        {project.shortDesc}
      </p>

      <div className="mt-auto flex flex-wrap gap-2 pt-8">
        {project.tech.slice(0, 4).map((t) => (
          <span
            key={t}
            className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-neutral-300"
          >
            {t}
          </span>
        ))}
        {project.tech.length > 4 && (
          <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-neutral-500">
            +{project.tech.length - 4}
          </span>
        )}
      </div>
      {!active && dimLevel > 0 && (
        <div
          className="pointer-events-none absolute inset-0 z-10 bg-black transition-opacity duration-500"
          style={{ opacity: dimLevel === 1 ? 0.5 : 0.8 }}
        />
      )}
      {active && (
        <div
          className="pointer-events-none absolute inset-0 z-20 rounded-[12px] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background:
              "radial-gradient(circle at var(--glow-x, 50%) var(--glow-y, 120%), rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.06) 45%, transparent 72%)",
            filter: "blur(5px)",
          }}
        />
      )}
      </div>
    </div>
  );
}