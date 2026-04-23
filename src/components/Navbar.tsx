"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const navLinks = [
  { name: "Projects", href: "#projects" },
  { name: "Experience", href: "#experience" },
  { name: "Writing", href: "#writing" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace("#", "");
    const element = document.getElementById(targetId);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80, // offset for navbar
        behavior: "smooth",
      });
    }
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={cn(
        "fixed top-0 left-0 right-0 z-40 transition-all duration-300 px-6 py-4 flex items-center justify-between",
        scrolled ? "glass py-3" : "bg-transparent"
      )}
    >
      <div className="flex items-center gap-2 font-heading font-bold text-xl text-white group cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
        <span className="text-neon-cyan transition-all duration-300 group-hover:text-glow-cyan">&lt;</span>
        <span className="tracking-wider">Nithish</span>
        <span className="text-neon-purple transition-all duration-300 group-hover:text-glow-purple">/&gt;</span>
      </div>

      <nav className="hidden md:flex items-center gap-8">
        {navLinks.map((link) => (
          <a
            key={link.name}
            href={link.href}
            onClick={(e) => handleSmoothScroll(e, link.href)}
            className="text-sm text-gray-400 hover:text-white transition-colors duration-300 font-medium tracking-wide relative group"
          >
            {link.name}
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-neon-cyan transition-all duration-300 group-hover:w-full group-hover:shadow-[0_0_8px_rgba(0,240,255,0.8)]"></span>
          </a>
        ))}
      </nav>
      
      <a 
        href="#contact" 
        onClick={(e) => handleSmoothScroll(e, "#contact")}
        className="hidden md:flex items-center justify-center px-5 py-2 text-sm font-bold text-white glass border-neon-cyan/50 rounded-full hover:shadow-[0_0_15px_rgba(0,240,255,0.4)] transition-all duration-300"
      >
        Hire Me
      </a>
    </motion.header>
  );
}
