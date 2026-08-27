"use client";

import { useEffect, useRef, useState } from "react";
import { motion, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";

type BlurRevealProps = {
  children?: React.ReactNode;
  className?: string;
  delay?: number;
  /** The blur amount in px that text starts at */
  blur?: number;
  duration?: number;
};

export function BlurReveal({
  children,
  className,
  delay = 0.4,
  blur = 12,
  duration = 2,
}: BlurRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // IntersectionObserver rootMargin (especially negative margins) is unreliable
    // on mobile. Use a direct geometry check with the same -80px offset so desktop
    // reveal timing stays identical.
    const check = () => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;
      if (rect.top < vh - 80 && rect.bottom > 80) {
        setInView(true);
        cleanup();
      }
    };

    const cleanup = () => {
      window.removeEventListener("scroll", check);
      window.removeEventListener("resize", check);
    };

    check();
    window.addEventListener("scroll", check, { passive: true });
    window.addEventListener("resize", check);
    return cleanup;
  }, []);

  const variants: Variants = {
    hidden: {
      opacity: 0,
      filter: `blur(${blur}px)`,
      clipPath: "inset(0% 100% 0% 0%)",
    },
    visible: {
      opacity: 1,
      filter: "blur(0px)",
      clipPath: "inset(0% 0% 0% 0%)",
      transition: {
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      className={cn(className)}
      variants={variants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
    >
      {children}
    </motion.div>
  );
}