"use client";

import { useRef } from "react";
import { Briefcase, Calendar } from "lucide-react";
import { BlurReveal } from "@/components/ui/blur-reveal";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const experiences = [
  {
    id: 4,
    role: "Software Development Engineer Intern",
    company: "Neutrinos, Singapore",
    duration: "Mar 2026 – Jun 2026",
    description: [
      "Automated test case generation and execution across the full product lifecycle, measured by end-to-end SQAT framework coverage, by architecting a Software Quality Assurance Testing pipeline from requirements intake to execution.",
      "Cut manual test case creation effort by ~70%, measured by requirement-to-script conversion time, by designing 7 AI agents that auto-generate Playwright test scripts from requirements documents and recorded workflows.",
      "Improved test reliability and QA team velocity, measured by faster review-to-approval cycles, by implementing human-in-the-loop approval gates within automated QA workflows."
    ]
  },
  {
    id: 2,
    role: "Full-Stack Developer Intern",
    company: "Janmamithra Trust, Bengaluru",
    duration: "Dec 2024 – Jan 2025",
    description: [
      "Designed and implemented responsive web interfaces ensuring cross-device compatibility and seamless user experience.",
      "Built a secure PHP–MySQL administrative portal for managing projects, volunteers, and organizational events with role-based access.",
      "Implemented authentication mechanisms, session handling, and CRUD database operations to ensure secure data management."
    ]
  },
  {
    id: 3,
    role: "AI Intern",
    company: "Dhee Center for AI & Data Science",
    duration: "Jun 2024 – Jul 2024",
    description: [
      "Developed an LSTM-based time series forecasting model to predict sunspot activity by designing optimized preprocessing pipelines and feature scaling strategies.",
      "Conducted trend analysis and data visualization to interpret long-term periodic patterns and model performance stability.",
      "Improved prediction accuracy through hyperparameter tuning, loss optimization, and iterative experimentation."
    ]
  }
];

const Pin = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M16 3a1 1 0 0 1 .117 1.993l-.117 .007v4.764l1.894 3.789a1 1 0 0 1 .1 .331l.006 .116v2a1 1 0 0 1 -.883 .993l-.117 .007h-4v4a1 1 0 0 1 -1.993 .117l-.007 -.117v-2a1 1 0 0 1 .06 -.34l.046 -.107l1.894 -3.791v-4.762a1 1 0 0 1 -.117 -1.993l.117 -.007h8z" />
  </svg>
);

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const pathRef = useRef<SVGPathElement>(null);

  useGSAP(
    () => {
      const cards = cardRefs.current.filter(Boolean) as HTMLDivElement[];
      const path = pathRef.current;

      if (!cards.length) return;

      const prefersReduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      if (prefersReduced) {
        cards.forEach((el) => {
          if (!el) return;
          gsap.set(el, { x: 0, y: 0, opacity: 1 });
        });
        return;
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "bottom 20%",
          scrub: 1,
        },
      });

      // Set initial positions - cards spread out horizontally
      cards.forEach((el, i) => {
        if (!el) return;
        // Position cards: center one, others slightly offset
        const offset = i - 1; // -1, 0, 1 for 3 cards
        const baseX = offset * 140;
        const baseY = 0;
        gsap.set(el, {
          x: baseX,
          y: baseY,
          scale: 1,
          opacity: 1,
        });
      });

      // Animate connector line
      if (path) {
        const totalLength = path.getTotalLength();
        gsap.set(path, { strokeDasharray: totalLength, strokeDashoffset: totalLength });
        tl.to(path, { strokeDashoffset: 0, duration: 1.5, ease: "power2.inOut" });
      }

      // Animate cards sliding into centered position
      cards.forEach((el, i) => {
        if (!el) return;
        const targetX = (i - 1) * 140;
        tl.to(el, {
          x: targetX,
          duration: 1,
          ease: "power3.out",
          overwrite: "auto",
        });
      });

      return () => {
        ScrollTrigger.getAll().forEach((st) => st.kill());
      };
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="pt-24 pb-0 relative overflow-hidden bg-black"
    >
      {/* Subtle grid paper background */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage: "linear-gradient(#fff 1px, transparent 1px)",
          backgroundSize: "100% 32px",
          marginTop: "4px",
        }}
      />
      <div className="from-background pointer-events-none absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r" />
      <div className="from-background pointer-events-none absolute inset-y-0 right-0 w-1/2 bg-gradient-to-l" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <BlurReveal className="mb-20">
          <h2
            className="font-mono text-3xl font-bold tracking-wider text-white md:text-5xl"
            style={{ letterSpacing: "0.1em" }}
          >
            Professional Experience
          </h2>
          <div className="mt-3 h-1 w-28 bg-white rounded-full"></div>
        </BlurReveal>

        {/* Process flow cards */}
        <div className="relative w-full mx-auto max-w-[1200px]">
          {/* Connector line */}
          <svg
            className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-2 pointer-events-none z-0"
            viewBox="0 0 1000 2"
          >
            <path
              ref={pathRef}
              d="M 0 1 C 250 1, 500 1, 750 1, 1000 1"
              stroke="rgba(185, 195, 212, 0.5)"
              strokeWidth="2"
              strokeDasharray="8 6"
              fill="none"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
            />
          </svg>

          {/* Cards container */}
          <div className="relative pt-24 pb-24 flex justify-center gap-8">
            {experiences.map((exp, index) => {
              const isCenter = index === 1; // Middle card is centered
              const offset = index - 1; // -1, 0, 1
              const cardX = offset * 140;
              const cardY = 0;

              return (
                <div
                  key={exp.id}
                  ref={(el) => {
                    cardRefs.current[index] = el;
                  }}
                  className="relative flex flex-col items-center min-w-[280px] transition-all duration-500 ease-out hover:scale-[105] hover:shadow-2xl"
                  style={{
                    transform: "translateX(" + cardX + "px) translateY(" + cardY + "px)",
                  }}
                >
                  <div
                    className={
                      "relative w-full md:w-[340px] bg-[#0d0d12] p-6 rounded-2xl border border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.6)] transition-transform duration-300 " +
                        (isCenter
                          ? "group-hover:scale-105 group-z-30 rotate-0"
                          : "rotate-[-1deg] md:-rotate-3")
                    }
                  >
                    {/* Pin icon */}
                    <Pin className="w-7 h-7 text-[#b9c3d4] mx-0 mb-4 pt-1" />

                    <div className="bg-[#101014] border border-white/10 rounded-xl p-5 flex flex-col relative overflow-hidden font-mono">
                      {/* Hairline accent */}
                      <div
                        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"
                      />

                      <h3 className="text-xl font-bold text-white leading-tight mb-3">
                        {exp.role}
                      </h3>

                      <div className="flex flex-col gap-2 mb-5 text-sm font-medium text-neutral-400">
                        <span className="flex items-center gap-2">
                          <Briefcase size={14} className="text-[#b9c3d4]" />
                          {" "}
                          {exp.company}
                        </span>
                        <span className="flex items-center gap-2">
                          <Calendar size={14} className="text-[#b9c3d4]" />
                          {" "}
                          {exp.duration}
                        </span>
                      </div>

                      <ul className="space-y-3 text-neutral-400 text-sm leading-relaxed list-none">
                        {exp.description.map((desc, i) => (
                          <li key={i} className="flex items-start gap-2.5">
                            <span className="text-[#b9c3d4] mt-0.5 flex-shrink-0">▹</span>
                            <span>{desc}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}