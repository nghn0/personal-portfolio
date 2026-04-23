"use client";

import { motion } from "framer-motion";
import { Briefcase, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";

const experiences = [
  {
    id: 1,
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
    id: 2,
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

export default function Experience() {
  return (
    <section id="experience" className="py-24 relative overflow-hidden bg-[#0a0a0f]">
      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-20 text-left"
        >
          <h2 className="text-3xl md:text-5xl font-heading font-bold mb-4">
            Professional <span className="text-neon-purple">Experience</span>
          </h2>
          <div className="h-1 w-20 bg-neon-purple/50 rounded-full shadow-[0_0_10px_rgba(122,0,255,0.5)]"></div>
        </motion.div>

        <div className="relative">
          {/* Vertical Line - Positioned strictly on the left now */}
          <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-neon-purple/50 to-transparent shadow-[0_0_10px_rgba(122,0,255,0.5)]"></div>

          <div className="space-y-8 md:space-y-12">
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative flex flex-col items-start pl-8 md:pl-10"
              >
                {/* Timeline Node - On the left line */}
                <div className="absolute left-[-5.5px] mt-2 w-3 h-3 rounded-full bg-neon-purple shadow-[0_0_15px_rgba(122,0,255,0.8)] z-10"></div>

                {/* Content Card - Full width */}
                <div className="w-full">
                  <div className="glass-card p-6 md:p-8 relative group hover:border-neon-purple/30 transition-all duration-300">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-neon-purple to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-[0_0_15px_rgba(122,0,255,0.8)]"></div>
                    
                    <h3 className="text-xl md:text-2xl font-bold font-heading text-white mb-2 group-hover:text-neon-purple transition-colors">
                      {exp.role}
                    </h3>
                    
                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-6 mb-6 text-sm font-medium text-gray-400">
                      <span className="flex items-center gap-2"><Briefcase size={16} className="text-neon-cyan" /> {exp.company}</span>
                      <span className="flex items-center gap-2"><Calendar size={16} className="text-neon-cyan" /> {exp.duration}</span>
                    </div>

                    <ul className="space-y-3 text-gray-400 text-sm md:text-base leading-relaxed list-none">
                      {exp.description.map((desc, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <span className="text-neon-purple mt-1 flex-shrink-0">▹</span>
                          <span>{desc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
