"use client";

import type { ButtonHTMLAttributes, CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/utils";

export type StarButtonProps = {
  className?: string;
  children?: ReactNode;
  /** border thickness in px */
  thickness?: number;
  /** ms for one full loop of the travelling white light */
  duration?: number;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export function StarButton({
  className,
  children,
  thickness = 2,
  duration = 4500,
  style,
  ...props
}: StarButtonProps) {
  return (
    <button
      style={
        {
          "--ring-thickness": `${thickness}px`,
          "--ring-duration": `${duration}ms`,
          ...style,
        } as CSSProperties
      }
      className={cn(
        "star-border-btn inline-flex h-10 items-center justify-center gap-2 whitespace-nowrap rounded-3xl px-4 py-2 text-sm font-medium transition-colors disabled:pointer-events-none disabled:opacity-50",
        className
      )}
      {...props}
    >
      <span className="relative z-10 inline-block bg-gradient-to-t from-white to-neutral-400 bg-clip-text text-transparent">
        {children}
      </span>
    </button>
  );
}