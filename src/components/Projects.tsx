"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, ArrowRight } from "lucide-react";
import Link from "next/link";
import { allProjects, Project } from "@/data/projects";
import { cn } from "@/lib/utils";
import { AsciiField } from "@/components/ui/hero-ascii-one";
import { BlurReveal } from "@/components/ui/blur-reveal";
import { StackedCarousel } from "@/components/ui/stacked-carousel";
import { LiquidMetalFrame } from "@/components/ui/liquid-metal-frame";

const GithubIcon = ({ size = 24, className = "" }: { size?: number; className?: string }) => (
  <svg width={size} height={size} className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
);

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Show only top 6 featured projects on the homepage
  const featuredProjects = allProjects.slice(0, 6);

  return (
    <section id="projects" className="py-24 relative overflow-hidden bg-black">
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-0 hidden h-full opacity-60 [mask-image:linear-gradient(to_bottom,black,black_8%,transparent_28%)] lg:block">
        <AsciiField />
      </div>
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <BlurReveal className="mb-16">
          <h2
            className="font-mono text-3xl font-bold tracking-wider text-white md:text-5xl"
            style={{ letterSpacing: "0.1em" }}
          >
            Featured Projects
          </h2>
          <div className="mt-3 h-1 w-28 bg-white rounded-full"></div>
        </BlurReveal>

        <StackedCarousel projects={featuredProjects} onSelect={setSelectedProject} />

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-24 flex justify-center"
        >
          <div className="group relative rounded-[13.5px] p-[1.5px]">
            <LiquidMetalFrame radius={13.5} speed={0.5} repetition={0.6} />
            <Link
              href="/projects"
              className="relative flex items-center gap-2 overflow-hidden rounded-[12px] bg-[#0d0d12] px-8 py-4 font-bold text-white transition-shadow duration-300"
            >
              <span className="relative z-10 flex items-center gap-2">
                View All My Projects <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>

            {/* White smoke hover */}
            <div
              className="pointer-events-none absolute inset-0 rounded-[12px] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              style={{
                background:
                  "radial-gradient(130% 130% at 50% 120%, rgba(255,255,255,0.16) 0%, rgba(255,255,255,0.05) 45%, transparent 72%)",
                filter: "blur(5px)",
              }}
            />
          </div>
        </motion.div>
      </div>

      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 bg-[#0a0a0f]/80 backdrop-blur-sm"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-[#0d0d12] border border-white/10 rounded-2xl p-6 md:p-10 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 md:top-6 md:right-6 p-2 rounded-full hover:bg-white/10 transition-colors text-gray-400 hover:text-white"
              >
                <X size={24} />
              </button>

              <div className="pr-14 md:pr-0">
                <span className="inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-neutral-300">
                  <span className="h-1 w-1 rounded-full bg-white" />
                  {selectedProject.type}
                </span>
                <h3 className="text-3xl md:text-4xl font-bold font-heading mt-3 mb-6 text-white">{selectedProject.title}</h3>
              </div>
              
              <div className="prose prose-invert max-w-none">
                <p className="text-gray-300 text-lg leading-relaxed mb-8">
                  {selectedProject.description}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                  <div>
                    <h4 className="text-xl font-heading font-semibold mb-4 text-white">Key Features</h4>
                    <ul className="space-y-2">
                      {selectedProject.features.map((feature, i) => (
                         <li key={i} className="flex items-start gap-2 text-gray-400">
                          <span className="text-neutral-400 mt-1">▹</span> {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-xl font-heading font-semibold mb-4 text-white">Technologies</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.tech.map((t) => (
                        <span key={t} className="px-3 py-1.5 text-sm rounded-lg bg-white/5 border border-white/10 text-gray-300">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-4 pt-4 border-t border-white/10">
                  <a 
                    href={selectedProject.github} 
                    target="_blank" 
                    rel="noreferrer"
                    className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-colors text-white font-medium"
                  >
                    <GithubIcon size={20} /> View Source
                  </a>
                  {selectedProject.pageUrl && (
                    <Link 
                      href={selectedProject.pageUrl}
                      className="flex items-center gap-2 px-6 py-3 rounded-xl border border-white/20 bg-white/5 hover:bg-white/10 transition-colors text-white font-medium"
                    >
                      <ExternalLink size={20} /> View Case Study
                    </Link>
                  )}
                  {selectedProject.liveUrl && (
                    <a 
                      href={selectedProject.liveUrl}
                      target="_blank" 
                      rel="noreferrer"
                      className="flex items-center gap-2 px-6 py-3 rounded-xl border border-white/20 bg-white/5 hover:bg-white/10 transition-colors text-white font-medium"
                    >
                      <ExternalLink size={20} /> Live Site
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
