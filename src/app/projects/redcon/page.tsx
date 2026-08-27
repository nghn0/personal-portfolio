"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Shield, Database, Clock } from "lucide-react";

const GithubIcon = ({ size = 24, className = "" }: { size?: number; className?: string }) => (
  <svg width={size} height={size} className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
);

export default function RedconPage() {
  return (
    <main className="min-h-screen pt-32 pb-24 px-6 relative overflow-hidden bg-[#0a0a0f]">
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-white/5 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[10%] left-[-5%] w-[400px] h-[400px] bg-white/5 rounded-full blur-[120px]"></div>
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} className="mb-12">
          <a href="/projects" className="inline-flex items-center gap-2 text-[#b9c3d4] hover:text-white transition-colors group">
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Back to Projects
          </motion.div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <span className="px-4 py-1.5 rounded-full glass border-white/10 text-[#b9c3d4] text-sm font-accent tracking-widest uppercase">
              AI Security + Full-Stack
            </span>
            <span className="px-4 py-1.5 rounded-full glass border-white/10 text-gray-300 text-sm font-accent tracking-widest uppercase">
              Docker • Ollama • Python • React • Vite
            </span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold font-heading mb-6 tracking-tight">
            Redcon <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-neutral-400">— AI Red Team Platform</span>
          </h1>
          
          <p className="text-xl text-gray-400 font-body leading-relaxed mb-10">
            AI-driven, scope-enforced red team / pentest orchestration platform. You give it an authorized target (an engagement scope), and its AI assistant plans and runs reconnaissance, scanning, and validation actions against that target — automatically, but never outside your authorization.
          </p>
          
          <div className="flex flex-wrap gap-4 mb-16">
            <a href="https://github.com/nghn0/redcon" target="_blank" rel="noreferrer" className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/20 transition-all text-white font-medium hover:shadow-[0_0_15px_rgba(185,195,212,0.15)]">
              <GithubIcon size={20} /> View Repository
            </a>
            <a href="https://redcon.vercel.app/" target="_blank" rel="noreferrer" className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/20 transition-all text-white font-medium hover:shadow-[0_0_15px_rgba(185,195,212,0.15)]">
              Live Application
            </a>
          </div>
        </motion.div>

        <div className="space-y-16">
          {/* Scope Engine */}
          <motion.section initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6 }} className="glass-card p-8 md:p-10">
            <h3 className="text-2xl font-bold font-heading text-white mb-6 flex items-center gap-2">
              <Shield className="text-[#b9c3d4]" size={24} /> Scope Engine
            </h3>
            <div className="prose prose-invert text-gray-300 text-sm leading-relaxed">
              <p>Engagements: You register an engagement with authorized targets, exclusions, allowed attack classes, time window, and contacts.</p>
              <p>Scope Validation: Every action is validated against the engagement scope first. The sandbox egress gateway drops traffic to anything out of scope.</p>
            </div>
          </motion.section>

          {/* Tool Registry */}
          <motion.section initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6 }} className="glass-card p-8 md:p-10">
            <h3 className="text-2xl font-bold font-heading text-white mb-6 flex items-center gap-2">
              <Database className="text-[#b9c3d4]" size={24} /> Tool Registry
            </h3>
            <div className="prose prose-invert text-gray-300 text-sm leading-relaxed">
              <p>Capability catalog maps high-level needs to real tools (nmap, nuclei, hydra, etc.) with command templates, parameter validation, and output parsers that turn raw tool output into structured findings.</p>
            </div>
          </motion.section>

          {/* Sandbox Executor */}
          <motion.section initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6 }} className="glass-card p-8 md:p-10">
            <h3 className="text-2xl font-bold font-heading text-white mb-6 flex items-center gap-2">
              <Clock className="text-[#b9c3d4]" size={24} /> Sandbox Executor
            </h3>
            <div className="prose prose-invert text-gray-300 text-sm leading-relaxed">
              <p>All tools run inside ephemeral Docker containers built from the redteam-tools:latest image. Each engagement gets an isolated network with an egress gateway running iptables rules. Scans are capped by memory/CPU/timeout, and all output is captured and parsed.</p>
            </div>
          </motion.section>

          {/* Approval Gate */}
          <motion.section initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6 }} className="glass-card p-8 md:p-10">
            <h3 className="text-2xl font-bold font-heading text-white mb-6 flex items-center gap-2">
              <Shield className="text-[#EF4444]" size={24} /> Approval Gate
            </h3>
            <div className="prose prose-invert text-gray-300 text-sm leading-relaxed">
              <p>active_scan and exploit tier actions never run without human approval in the UI. Passive recon (nmap, subfinder) runs automatically.</p>
            </div>
          </motion.section>

          {/* AI Assistant Orchestrator */}
          <motion.section initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6 }} className="glass-card p-8 md:p-10">
            <h3 className="text-2xl font-bold font-heading text-white mb-6 flex items-center gap-2">
              <BrainCircuit className="text-[#b9c3d4]" size={24} /> AI Assistant Orchestrator
            </h3>
            <div className="prose prose-invert text-gray-300 text-sm leading-relaxed">
              <p>An LLM (via Ollama) drives an autonomous investigation loop: Observe → Analyze → Plan → Select. It reads the blackboard of confirmed facts and hypotheses, proposes the next action, and you confirm the parameters in the UI before execution.</p>
            </div>
          </motion.section>
        </div>
      </div>
    </main>
  );
}