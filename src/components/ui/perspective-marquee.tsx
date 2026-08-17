"use client";

import { useEffect, useRef } from "react";

export interface PerspectiveMarqueeProps {
  items?: string[];
  fontSize?: number;
  color?: string;
  fontWeight?: number;
  pixelsPerFrame?: number;
  rotateY?: number;
  rotateX?: number;
  perspective?: number;
  fadeColor?: string;
  speed?: number;
  className?: string;
}

const FONT_FAMILY =
  "var(--font-heading), -apple-system, BlinkMacSystemFont, sans-serif";

export function PerspectiveMarquee({
  items = [],
  fontSize = 84,
  color = "#fafafa",
  fontWeight = 700,
  pixelsPerFrame = 2,
  rotateY = -28,
  rotateX = 8,
  perspective = 1200,
  fadeColor = "#050505",
  speed = 1,
  className,
}: PerspectiveMarqueeProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const spanRefs = useRef<(HTMLSpanElement | null)[]>([]);

  const itemPadding = fontSize * 0.9;

  useEffect(() => {
    const track = trackRef.current;
    const container = containerRef.current;
    if (!track || !container || !items.length) return;

    // Measure the REAL rendered width of each span (one copy), instead of
    // estimating from string length. The old estimate was ~12% off, which made
    // the loop jump ("reset") every cycle. Also re-measure after fonts load.
    let widths: number[] = [];
    let copyWidth = 0;

    const measure = () => {
      const n = items.length;
      widths = [];
      copyWidth = 0;
      for (let i = 0; i < n; i++) {
        const el = spanRefs.current[i];
        const w = el ? el.offsetWidth : 0;
        widths.push(w);
        copyWidth += w;
      }
    };

    measure();
    let fontsReady = false;
    if (document.fonts?.ready) {
      document.fonts.ready.then(() => {
        fontsReady = true;
        measure();
      });
    }

    const onResize = () => measure();
    window.addEventListener("resize", onResize);

    const frame = { value: 0 };
    let raf = 0;

    const apply = () => {
      frame.value += speed;
      const offset = -((frame.value * pixelsPerFrame) % copyWidth);
      track.style.transform = `translateX(${offset}px)`;

      const n = items.length;
      const containerWidth = container.clientWidth || window.innerWidth;
      const crispZone = Math.min(160, containerWidth * 0.12);
      const spans = spanRefs.current;

      let pos = 0;
      for (let i = 0; i < spans.length; i++) {
        const el = spans[i];
        if (!el) continue;
        if (i % n === 0) pos = (i / n) * copyWidth;
        const w = widths[i % n] || 0;
        // Screen-space position of this span's left edge (can exceed viewport
        // on the right because of the perspective squash)
        const screenPos = pos + offset;
        pos += w;

        // Crisp at the left edge of the viewport, blur ramping toward the right.
        const norm = Math.min(1, Math.max(0, (screenPos - crispZone) / (containerWidth - crispZone)));
        el.style.filter = `blur(${norm * 6}px)`;
        el.style.opacity = String(1 - norm * 0.35);
      }

      raf = requestAnimationFrame(apply);
    };

    raf = requestAnimationFrame(apply);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, [items.length, pixelsPerFrame, speed]);

  const rendered = [...items, ...items, ...items];

  return (
    <div
      ref={containerRef}
      className={className}
      style={{
        position: "relative",
        width: "100%",
        overflow: "hidden",
        perspective: `${perspective}px`,
        padding: `${fontSize * 0.55}px 0`,
      }}
    >
      <div
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
          transformStyle: "preserve-3d",
        }}
      >
        <div
          ref={trackRef}
          style={{
            display: "flex",
            whiteSpace: "nowrap",
            willChange: "transform",
          }}
        >
          {rendered.map((item, i) => (
            <span
              key={i}
              ref={(el) => {
                spanRefs.current[i] = el;
              }}
              style={{
                display: "inline-block",
                fontFamily: FONT_FAMILY,
                fontSize,
                fontWeight,
                color,
                letterSpacing: "-0.03em",
                paddingRight: itemPadding,
                filter: "blur(0px)",
                opacity: 1,
              }}
            >
              {item}
            </span>
          ))}
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background: `linear-gradient(90deg, ${fadeColor} 0%, transparent 18%, transparent 82%, ${fadeColor} 100%)`,
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background: `linear-gradient(180deg, ${fadeColor} 0%, transparent 25%, transparent 75%, ${fadeColor} 100%)`,
        }}
      />
    </div>
  );
}

export default PerspectiveMarquee;