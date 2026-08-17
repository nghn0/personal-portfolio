"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

export default function CursorGlow() {
  const pathname = usePathname();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [fade, setFade] = useState(1);

  // No cursor glow on the 3D projects gallery — it would fight the scene.
  const isGallery = pathname === "/projects";

  useEffect(() => {
    if (isGallery) return;

    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);

    const updateFade = () => {
      const hero = document.getElementById("hero");
      if (!hero) {
        setFade(1);
        return;
      }
      const rect = hero.getBoundingClientRect();
      const vh = window.innerHeight;
      // Fully opaque while the hero fills the viewport, then fade out
      // smoothly as the hero scrolls up toward the projects section.
      setFade(Math.max(0, Math.min(1, rect.bottom / (vh * 0.5))));
    };

    updateFade();
    window.addEventListener("mousemove", updateMousePosition);
    window.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("scroll", updateFade, { passive: true });
    window.addEventListener("resize", updateFade);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      window.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("scroll", updateFade);
      window.removeEventListener("resize", updateFade);
    };
  }, [isVisible, isGallery]);

  if (!isVisible || isGallery) return null;

  return (
    <motion.div
      className="pointer-events-none fixed top-0 left-0 z-50 h-[400px] w-[400px] rounded-full bg-white/20 blur-[90px]"
      animate={{
        x: mousePosition.x - 200,
        y: mousePosition.y - 200,
        opacity: fade,
      }}
      transition={{
        type: "spring",
        damping: 30,
        stiffness: 200,
        mass: 0.5,
        opacity: { duration: 0.4, ease: "easeOut" },
      }}
    />
  );
}