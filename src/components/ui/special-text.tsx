"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

const SCRAMBLE_CHARS = "!<>-_\\/[]{}—=+*^?#________";

function scrambleOnlyCharacters(text: string): string {
  return text
    .split("")
    .map((ch) =>
      ch === " "
        ? " "
        : SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)]
    )
    .join("");
}

type SpecialTextProps = {
  text: string;
  className?: string;
  /** ms per scramble frame */
  speed?: number;
  /** ms the fully-revealed word stays before re-scrambling from the right */
  hold?: number;
};

export function SpecialText({
  text,
  className,
  speed = 120,
  hold = 1200,
}: SpecialTextProps) {
  const displayRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = displayRef.current;
    if (!el) return;

    let state: "reveal" | "hold" | "wipe" = "reveal";
    let i = 0;
    let timer: ReturnType<typeof setTimeout> | null = null;

    const render = (value: string) => {
      el.textContent = value;
    };

    const revealLTR = () => {
      state = "reveal";
      i = 1;
      render(text);
      stepReveal();
    };

    const stepReveal = () => {
      if (i >= text.length) {
        render(text);
        timer = setTimeout(() => wipeRTL(), hold);
        return;
      }
      render(text.slice(0, i) + scrambleOnlyCharacters(text.slice(i)));
      i++;
      timer = setTimeout(stepReveal, speed);
    };

    const wipeRTL = () => {
      state = "wipe";
      i = 0;
      stepWipe();
    };

    const stepWipe = () => {
      if (i >= text.length) {
        render(scrambleOnlyCharacters(text));
        timer = setTimeout(revealLTR, 150);
        return;
      }
      const split = text.length - i;
      render(text.slice(0, split) + scrambleOnlyCharacters(text.slice(split)));
      i++;
      timer = setTimeout(stepWipe, speed);
    };

    // Initial frame: full scramble, then start revealing
    render(scrambleOnlyCharacters(text));
    timer = setTimeout(revealLTR, 150);

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [text, speed, hold]);

  return (
    <span ref={displayRef} className={cn("inline-block whitespace-pre", className)}>
      &nbsp;
    </span>
  );
}