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
    id: 1,
    role: "Software Development Engineer",
    company: "Neutrinos, Singapore",
    duration: "Present",
    description: [
      "Building SQAT (Software Quality Assurance Testing) - an AI-assisted end-to-end QA automation platform",
      "Contributing to framework design and development using Next.js 16, FastAPI, PostgreSQL, and Playwright",
      "Writing and automating test cases, implementing human-in-the-loop approval gates for test execution",
      "Integrating AI agents for scenario generation, script creation, and result classification",
      "Working on Jira integration and X-Ray CSV export for defect tracking and reporting"
    ]
  },
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

      const pathLength = path?.getTotalLength() ?? 500;
      if (path) {
        gsap.set(path, { strokeDasharray: pathLength, strokeDashoffset: pathLength });
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          end: "top -30%",
          scrub: 1.2,
        },
      });

      // Card 1 slides in from the left, rotating into place
      tl.fromTo(
        cards[0],
        { x: -110, opacity: 0, scale: 0.92 },
        { x: 0, opacity: 1, scale: 1, duration: 1, ease: "power2.out" }
      );

      // Connector line draws between the cards
      if (path) {
        tl.to(
          path,
          { strokeDashoffset: 0, duration: 1, ease: "power2.inOut" },
          "-=0.5"
        );
      }

      // Card 2 slides in from the right, rotating into place
      if (cards[1]) {
        tl.fromTo(
          cards[1],
          { x: 110, opacity: 0, scale: 0.92 },
          { x: 0, opacity: 1, scale: 1, duration: 1, ease: "power2.out" },
          "-=0.7"
        );
      }

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

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Header — same animation as Featured Projects */}
        <BlurReveal className="mb-20">
          <h2
            className="font-mono text-3xl font-bold tracking-wider text-white md:text-5xl"
            style={{ letterSpacing: "0.1em" }}
          >
            Professional Experience
          </h2>
          <div className="mt-3 h-1 w-28 bg-white rounded-full"></div>
        </BlurReveal>

        {/* Pinned cards stage */}
        <div className="relative w-full max-w-[1000px] mx-auto h-auto md:h-[820px]">
          {/* Connector SVG */}
          <svg
            className="absolute top-0 left-0 w-full h-full pointer-events-none hidden md:block z-0"
            viewBox="0 0 1000 820"
            preserveAspectRatio="none"
          >
            <path
              ref={pathRef}
              d="M 190 150 C 400 150, 450 380, 790 380"
              stroke="rgba(185, 195, 212, 0.5)"
              strokeWidth="2"
              strokeDasharray="8 6"
              fill="none"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
            />
          </svg>

          {experiences.map((exp, index) => (
            <div
              key={exp.id}
              ref={(el) => {
                cardRefs.current[index] = el;
              }}
              className={
                index === 0
                  ? "relative md:absolute md:top-0 md:left-[2%] mb-10 md:mb-0"
                  : index === 1
                  ? "relative md:absolute md:top-[80px] md:right-[2%]"
                  : index === 2
                  ? "relative md:absolute md:top-[180px] md:left-[2%]"
                  : "relative md:absolute md:top-[280px] md:right-[2%]"
              }
            >
              <div
                className={`group relative w-full md:w-[340px] transition-transform duration-300 hover:scale-105 hover:z-30 ${
                  index === 0 ? "rotate-1 md:rotate-6" : "rotate-[-1deg] md:-rotate-3"
                }`}
              >
                <div className="bg-[#0d0d12] p-2] p-2 rounded-[25px] shadow-[0_10px_30px_rgba(0,0,0,0.6)] border border-white/10">
                  <Pin className="w-8 h-8 text-[#b9c3d4] z-20 mb-5 mx-auto" />
                  <div className="bg-[#101014] border border-white/10 rounded-[15px] p-5 flex flex-col relative overflow-hidden font-mono">
                    {/* Hairline accent */}
                    <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />

                    <h3 className="text-xl font-bold text-white leading-tight mb-3">
                      {exp.role}
                    </h3>

                    <div className="flex flex-col gap-2 mb-5 text-sm font-medium text-neutral-400">
                      <span className="flex items-center gap-2">
                        <Briefcase size={14} className="text-[#b9c3d4]" />{" "}
                        {exp.company}
                      </span>
                      <span className="flex items-center gap-2">
                        <Calendar size={14} className="text-[#b9c3d4]" />{" "}
                        {exp.duration}
                      </span>
                    </div>

                    <ul className="space-y-2.5 text-neutral-400 text-sm leading-relaxed list-none">
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
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}