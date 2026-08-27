"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Lock, Database, Wifi } from "lucide-react";

const GithubIcon = ({ size = 24, className = "" }: { size?: number; className?: string }) => (
  <svg width={size} height={size} className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
);

import Link from "next/link";

export default function SmartLockPage() {
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
              Hardware + IoT
            </span>
            <span className="px-4 py-1.5 rounded-full glass border-white/10 text-gray-300 text-sm font-accent tracking-widest uppercase">
              NodeMCU ESP8266 • RFID
            </span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold font-heading mb-6 tracking-tight">
            Smart Lock <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-neutral-400">System</span>
          </h1>
          
          <p className="text-xl text-gray-400 font-body leading-relaxed mb-10">
            A real-time IoT solution using RFID and NodeMCU ESP8266. Authenticates users by scanning RFID cards and logs access details to a remote PHP server over WiFi.
          </p>

          <div className="flex flex-wrap gap-4 mb-16">
            <a href="https://github.com/nghn0/RFID_smart_locking_system" target="_blank" rel="noreferrer" className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/20 transition-all text-white font-medium hover:shadow-[0_0_15px_rgba(185,195,212,0.15)]">
              <GithubIcon size={20} /> View Repository
            </a>
          </div>
        </motion.div>

        <div className="space-y-16">
          <motion.section initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6 }} className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="glass-card p-8 bg-black/50">
              <Lock className="text-[#b9c3d4] mb-4" size={32} />
              <h3 className="text-lg font-bold font-heading text-white mb-2">RFID Auth</h3>
              <p className="text-gray-400 text-sm">Secure entry via MFRC522 RFID module. Triggers a relay to open a solenoid lock.</p>
            </div>
            <div className="glass-card p-8 bg-black/50">
              <Wifi className="text-[#b9c3d4] mb-4" size={32} />
              <h3 className="text-lg font-bold font-heading text-white mb-2">NodeMCU WiFi</h3>
              <p className="text-gray-400 text-sm">ESP8266 handles HTTP GET requests to send the UID to the remote server automatically.</p>
            </div>
            <div className="glass-card p-8 bg-black/50">
              <Database className="text-[#b9c3d4] mb-4" size={32} />
              <h3 className="text-lg font-bold font-heading text-white mb-2">PHP Backend Log</h3>
              <p className="text-gray-400 text-sm">A remote PHP & MySQL setup records the ID, username, and precise timestamp of entry.</p>
            </div>
          </motion.section>
        </div>
      </div>
    </main>
  );
}
