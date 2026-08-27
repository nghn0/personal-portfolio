"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Dock, DockItem } from "@/components/ui/dock";
import { StarButton } from "@/components/ui/star-button";

const navLinks = [
  { name: "Projects", href: "#projects" },
  { name: "Experience", href: "#experience" },
  { name: "Research", href: "#research" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSmoothScroll = (id: string) => {
    setMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 90,
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      <header className="pointer-events-none fixed top-4 left-1/2 z-40 -translate-x-1/2 px-4">
        <Dock
          className={cn(
            "pointer-events-auto hidden md:flex",
            scrolled
              ? "border-white/20 bg-[#0a0a0f]/80 shadow-[0_8px_30px_rgba(0,0,0,0.4)]"
              : "border-white/10 bg-[#0a0a0f]/60"
          )}
        >
          {navLinks.map((link) => (
            <DockItem
              key={link.name}
              ariaLabel={link.name}
              onClick={() => handleSmoothScroll(link.href.replace("#", ""))}
            >
              {link.name}
            </DockItem>
          ))}

          <DockItem asChild className="ml-1" maxMagnify={1.2}>
            <StarButton
              id="hire-me-star"
              className="bg-transparent text-white"
              onClick={() => handleSmoothScroll("contact")}
            >
              Let&apos;s Build
            </StarButton>
          </DockItem>
        </Dock>
      </header>

      {/* Mobile hamburger */}
      <button
        onClick={() => setMenuOpen((o) => !o)}
        aria-label="Toggle menu"
        className="pointer-events-auto fixed top-4 right-4 z-50 flex h-11 w-11 items-center justify-center rounded-xl border border-white/15 bg-[#0a0a0f]/70 text-white backdrop-blur-xl transition-colors hover:bg-[#0a0a0f] md:hidden"
      >
        {menuOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Mobile menu panel */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-4 top-20 z-50 md:hidden"
          >
            <div className="rounded-2xl border border-white/15 bg-[#0a0a0f]/95 p-3 shadow-[0_8px_30px_rgba(0,0,0,0.5)] backdrop-blur-xl">
              <nav className="flex flex-col gap-1">
                {navLinks.map((link) => (
                  <button
                    key={link.name}
                    onClick={() => handleSmoothScroll(link.href.replace("#", ""))}
                    className="rounded-xl px-4 py-3 text-left font-mono text-sm tracking-widest text-white/80 transition-colors hover:bg-white/10 hover:text-white"
                  >
                    {link.name}
                  </button>
                ))}
                <button
                  onClick={() => handleSmoothScroll("contact")}
                  className="mt-1 rounded-xl border border-white/20 px-4 py-3 text-left font-mono text-sm font-semibold tracking-widest text-white transition-colors hover:bg-white/10"
                >
                  Let&apos;s Build
                </button>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
