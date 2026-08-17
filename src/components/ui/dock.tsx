"use client";

import { createContext, useContext, useRef } from "react";
import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { cn } from "@/lib/utils";

type DockCtx = {
  mouseX: MotionValue<number>;
  spring: { mass: number; stiffness: number; damping: number };
  distance: number;
  maxScale: number;
};

const DockContext = createContext<DockCtx | null>(null);

function useDock() {
  const ctx = useContext(DockContext);
  if (!ctx) throw new Error("Dock components must be used within <Dock>");
  return ctx;
}

type DockProps = {
  className?: string;
  children?: React.ReactNode;
  magnification?: number;
  distance?: number;
};

export function Dock({
  className,
  children,
  magnification = 72,
  distance = 170,
}: DockProps) {
  const mouseX = useMotionValue(Infinity);
  const spring = { mass: 0.1, stiffness: 160, damping: 14 };
  const maxScale = magnification / 44;

  return (
    <DockContext.Provider value={{ mouseX, spring, distance, maxScale }}>
      <motion.div
        onMouseMove={(e) => mouseX.set(e.pageX)}
        onMouseLeave={() => mouseX.set(Infinity)}
        className={cn(
          "flex items-center gap-8 rounded-2xl border border-white/10 bg-[#0a0a0f]/70 px-10 py-3 backdrop-blur-xl",
          className
        )}
      >
        {children}
      </motion.div>
    </DockContext.Provider>
  );
}

type DockItemProps = {
  className?: string;
  children?: React.ReactNode;
  href?: string;
  onClick?: () => void;
  ariaLabel?: string;
  asChild?: boolean;
  /** Cap the magnification scale-up for this item (defaults to the dock's max) */
  maxMagnify?: number;
};

export function DockItem({
  className,
  children,
  href,
  onClick,
  ariaLabel,
  asChild,
  maxMagnify,
}: DockItemProps) {
  const { mouseX, spring, distance, maxScale } = useDock();
  const ref = useRef<HTMLDivElement>(null);
  const distanceToCenter = useMotionValue(-100000);

  const scale = useSpring(
    useTransform(
      distanceToCenter,
      [-distance, 0, distance],
      [1, (maxMagnify ?? maxScale), 1]
    ),
    spring
  );

  useMotionValueEvent(mouseX, "change", (v) => {
    const rect = ref.current?.getBoundingClientRect();
    if (rect) distanceToCenter.set(v - rect.x - rect.width / 2);
  });

  const Element: any = href ? motion.a : motion.button;

  if (asChild) {
    return (
      <div ref={ref} className="relative inline-flex items-center justify-center">
        <motion.div
          style={{ scale }}
          className={cn("inline-flex items-center justify-center", className)}
        >
          {children}
        </motion.div>
      </div>
    );
  }

  return (
    <div ref={ref} className="relative inline-flex items-center justify-center">
      <Element
        style={{ scale }}
        aria-label={ariaLabel}
        onClick={href ? undefined : onClick}
        className={cn(
          "relative inline-flex items-center justify-center whitespace-nowrap rounded-xl px-3.5 py-1.5 font-mono text-xs tracking-widest text-white/80 transition-colors hover:text-white lg:text-sm",
          className
        )}
      >
        {children}
      </Element>
    </div>
  );
}

type IconProps = {
  className?: string;
  children?: React.ReactNode;
};

export function DockIcon({ className, children }: IconProps) {
  return (
    <div className={cn("flex items-center justify-center", className)}>
      {children}
    </div>
  );
}

export function DockLabel({ className, children }: IconProps) {
  return (
    <span
      className={cn(
        "absolute -top-7 left-1/2 w-max -translate-x-1/2 whitespace-nowrap rounded-md border border-white/10 bg-[#1b1b24] px-2 py-0.5 font-mono text-[11px] text-gray-300",
        className
      )}
    >
      {children}
    </span>
  );
}
