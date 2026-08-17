"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Server, Bot, ShieldAlert } from "lucide-react";
import Link from "next/link";
const GithubIcon = ({ size = 24, className = "" }: { size?: number; className?: string }) => (
  <svg width={size} height={size} className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
);

export default function MCPServerPage() {
  return (
    <main className="min-h-screen pt-32 pb-24 px-6 relative overflow-hidden bg-[#0a0a0f]">
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-white/5 rounded-full blur-[120px]"></div>
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} className="mb-12">
          <Link href="/projects" className="inline-flex items-center gap-2 text-[#b9c3d4] hover:text-white transition-colors group">
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Back to Projects
          </Link>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <span className="px-4 py-1.5 rounded-full glass border-white/10 text-[#b9c3d4] text-sm font-accent tracking-widest uppercase">
              Systems Architecture
            </span>
            <span className="px-4 py-1.5 rounded-full glass border-white/10 text-gray-300 text-sm font-accent tracking-widest uppercase">
              MCP • Docker • Gemini
            </span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold font-heading mb-6 tracking-tight">
            MCP Intelligent <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-neutral-400">Intake</span>
          </h1>
          
          <p className="text-xl text-gray-400 font-body leading-relaxed mb-10">
            A Model Context Protocol (MCP) server supporting dynamic routing, severity scoring, and category classification across multiple industries (Healthcare, Finance) using configurable JSON-RPC rules and LLM integration.
          </p>

          <div className="flex flex-wrap gap-4 mb-16">
            <a href="https://github.com/nghn0/mcpserver" target="_blank" rel="noreferrer" className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/20 transition-all text-white font-medium hover:shadow-[0_0_15px_rgba(185,195,212,0.15)]">
              <GithubIcon size={20} /> View Repository
            </a>
          </div>
        </motion.div>

        <div className="space-y-16">
          <motion.section initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6 }} className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="glass-card p-8">
              <h3 className="text-xl font-bold font-heading text-white mb-4 flex items-center gap-2">
                <Server className="text-[#b9c3d4]" size={20} /> Multi-Industry Configuration
              </h3>
              <p className="text-sm text-gray-400 mb-4">
                Containerized with Docker to seamlessly switch between configurations using volume mounts and environment variables (`CONFIG_PATH`).
              </p>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li className="flex items-start gap-2"><span className="text-[#b9c3d4] mt-1">▹</span> <code>routing.json</code> for queue mapping</li>
                <li className="flex items-start gap-2"><span className="text-[#b9c3d4] mt-1">▹</span> <code>severity.yaml</code> for priority scoring</li>
                <li className="flex items-start gap-2"><span className="text-[#b9c3d4] mt-1">▹</span> <code>taxonomy.json</code> for keyword classification</li>
              </ul>
            </div>
            <div className="glass-card p-8">
              <h3 className="text-xl font-bold font-heading text-white mb-4 flex items-center gap-2">
                <Bot className="text-[#b9c3d4]" size={20} /> LLM & Triage Engine
              </h3>
              <p className="text-sm text-gray-400 mb-4">
                Employs the Gemini API alongside standard NLP to parse unstructured data. It extracts key entities and dynamically assigns priority levels (e.g., ER_Triage vs Billing_Department) in real-time via JSON-RPC.
              </p>
              <div className="flex flex-wrap gap-2 mt-auto">
                {["Docker", "Python", "FastMCP", "Gemini API", "JSON-RPC"].map(t => (
                  <span key={t} className="px-2 py-1 text-xs rounded-md bg-white/5 border border-white/10 text-gray-300">{t}</span>
                ))}
              </div>
            </div>
          </motion.section>
        </div>
      </div>
    </main>
  );
}
