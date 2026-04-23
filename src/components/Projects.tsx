"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, ArrowRight } from "lucide-react";
import Link from "next/link";
import { allProjects, Project } from "@/data/projects";
import { cn } from "@/lib/utils";

const GithubIcon = ({ size = 24, className = "" }: { size?: number; className?: string }) => (
  <svg width={size} height={size} className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
);

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Show only top 6 featured projects on the homepage
  const featuredProjects = allProjects.slice(0, 6);

  return (
    <section id="projects" className="py-24 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-heading font-bold mb-4">
            Featured <span className="text-neon-cyan">Projects</span>
          </h2>
          <div className="h-1 w-20 bg-neon-cyan/50 rounded-full shadow-[0_0_10px_rgba(0,240,255,0.5)]"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {featuredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onClick={() => setSelectedProject(project)}
              className="glass-card p-8 cursor-pointer group relative overflow-hidden"
            >
              <div className={cn("absolute top-0 left-0 w-full h-1 bg-gradient-to-r transition-all duration-300 opacity-50 group-hover:opacity-100", 
                project.color === "neon-cyan" ? "from-transparent via-neon-cyan to-transparent shadow-[0_0_15px_rgba(0,240,255,1)]" : 
                project.color === "neon-purple" ? "from-transparent via-neon-purple to-transparent shadow-[0_0_15px_rgba(122,0,255,1)]" : 
                "from-transparent via-accent-pink to-transparent shadow-[0_0_15px_rgba(255,0,200,1)]"
              )}></div>
              
              <div className="mb-4">
                <span className="text-xs font-accent tracking-widest text-gray-400 uppercase">{project.type}</span>
                <h3 className="text-2xl font-bold font-heading mt-2 group-hover:text-neon-cyan transition-colors">{project.title}</h3>
              </div>
              
              <p className="text-gray-400 text-sm md:text-base mb-6 line-clamp-3">
                {project.shortDesc}
              </p>
              
              <div className="flex flex-wrap gap-2 mt-auto">
                {project.tech.slice(0, 4).map((t) => (
                  <span key={t} className="px-3 py-1 text-xs rounded-full bg-white/5 border border-white/10 text-gray-300">
                    {t}
                  </span>
                ))}
                {project.tech.length > 4 && (
                  <span className="px-3 py-1 text-xs rounded-full bg-white/5 border border-white/10 text-gray-300">
                    +{project.tech.length - 4}
                  </span>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 flex justify-center"
        >
          <Link href="/projects" className="group relative px-8 py-4 bg-transparent border border-white/20 rounded-xl font-bold text-white overflow-hidden transition-all duration-300 hover:border-neon-cyan/50 hover:shadow-[0_0_20px_rgba(0,240,255,0.2)]">
            <span className="relative z-10 flex items-center gap-2">
              View All My Projects <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </span>
            <div className="absolute inset-0 h-full w-0 bg-neon-cyan/10 transition-all duration-300 ease-out group-hover:w-full"></div>
          </Link>
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
              className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto glass border border-white/10 rounded-2xl p-6 md:p-10 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 md:top-6 md:right-6 p-2 rounded-full hover:bg-white/10 transition-colors text-gray-400 hover:text-white"
              >
                <X size={24} />
              </button>

              <span className="text-sm font-accent tracking-widest text-neon-cyan uppercase">{selectedProject.type}</span>
              <h3 className="text-3xl md:text-4xl font-bold font-heading mt-2 mb-6">{selectedProject.title}</h3>
              
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
                          <span className="text-neon-cyan mt-1">▹</span> {feature}
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

                <div className="flex gap-4 pt-4 border-t border-white/10">
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
                      className="flex items-center gap-2 px-6 py-3 rounded-xl bg-neon-cyan/10 hover:bg-neon-cyan/20 border border-neon-cyan/50 transition-colors text-white font-medium shadow-[0_0_15px_rgba(0,240,255,0.1)] hover:shadow-[0_0_15px_rgba(0,240,255,0.3)]"
                    >
                      <ExternalLink size={20} /> View Case Study
                    </Link>
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
