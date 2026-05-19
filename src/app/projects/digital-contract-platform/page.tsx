"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Database, Layers, Network, Server, Shield, BrainCircuit } from "lucide-react";

const GithubIcon = ({ size = 24, className = "" }: { size?: number; className?: string }) => (
  <svg width={size} height={size} className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
);

const GlobeIcon = ({ size = 24, className = "" }: { size?: number; className?: string }) => (
  <svg width={size} height={size} className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/><path d="M2 12h20"/></svg>
);

import Link from "next/link";

export default function DigitalContractPlatformPage() {
  return (
    <main className="min-h-screen pt-32 pb-24 px-6 relative overflow-hidden bg-[#0a0a0f]">
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-neon-cyan/20 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[10%] left-[-5%] w-[400px] h-[400px] bg-neon-purple/20 rounded-full blur-[120px]"></div>
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} className="mb-12">
          <Link href="/projects" className="inline-flex items-center gap-2 text-neon-cyan hover:text-white transition-colors group">
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Back to Projects
          </Link>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <span className="px-4 py-1.5 rounded-full glass border-neon-cyan/30 text-neon-cyan text-sm font-accent tracking-widest uppercase">
              Full-Stack + AI + Web3
            </span>
            <span className="px-4 py-1.5 rounded-full glass border-white/10 text-gray-300 text-sm font-accent tracking-widest uppercase">
              Next.js • Express • gRPC • Python • Smart Contracts
            </span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold font-heading mb-6 tracking-tight">
            Digital Contract <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan to-neon-purple">Platform</span>
          </h1>
          
          <p className="text-xl text-gray-400 font-body leading-relaxed mb-10">
            A distributed microservices application designed for secure contract management, AI-powered legal risk analysis, and blockchain-based cryptographic verification.
          </p>

          <div className="flex flex-wrap gap-4 mb-16">
            <a href="https://github.com/nghn0/digital-contract-platform" target="_blank" rel="noreferrer" className="flex items-center gap-2 px-6 py-3 rounded-xl bg-neon-cyan/10 hover:bg-neon-cyan/20 border border-neon-cyan/50 transition-all text-white font-medium hover:shadow-[0_0_15px_rgba(0,240,255,0.3)]">
              <GithubIcon size={20} /> View Repository
            </a>
            <a href="https://digital-contract-platform.vercel.app/" target="_blank" rel="noreferrer" className="flex items-center gap-2 px-6 py-3 rounded-xl bg-neon-purple/10 hover:bg-neon-purple/20 border border-neon-purple/50 transition-all text-white font-medium hover:shadow-[0_0_15px_rgba(122,0,255,0.3)]">
              <GlobeIcon size={20} /> Live Application
            </a>
          </div>
        </motion.div>

        <div className="space-y-16">
          {/* Architecture Pillars */}
          <motion.section initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6 }} className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="glass-card p-8">
              <h3 className="text-xl font-bold font-heading text-white mb-4 flex items-center gap-2">
                <Layers className="text-neon-cyan" size={20} /> Frontend Interface
              </h3>
              <p className="text-gray-300 text-sm leading-relaxed mb-4">
                Built with Next.js (16.1.6) and React (19.2.3) in TypeScript, featuring Tailwind CSS styling. Serves as the dashboard for contract management and viewing. Uses Ethers.js for Web3 wallet integration and cryptographically signing documents.
              </p>
            </div>
            
            <div className="glass-card p-8">
              <h3 className="text-xl font-bold font-heading text-white mb-4 flex items-center gap-2">
                <Server className="text-accent-pink" size={20} /> Backend Orchestrator
              </h3>
              <p className="text-gray-300 text-sm leading-relaxed mb-4">
                Express.js (5.2.1) Node API that manages Supabase database interactions, handles user JWT authentication, coordinates file storage securely, and interacts with both the AI Model and Blockchain layers.
              </p>
            </div>

            <div className="glass-card p-8">
              <h3 className="text-xl font-bold font-heading text-white mb-4 flex items-center gap-2">
                <BrainCircuit className="text-neon-purple" size={20} /> AI Analysis Model
              </h3>
              <p className="text-gray-300 text-sm leading-relaxed mb-4">
                Python gRPC microservice for processing legal documents using NLP. Uses pdfplumber, spacy, transformers, and ChromaDB for RAG-based analysis. Communicates with LLMs to extract risks and missing clauses.
              </p>
            </div>

            <div className="glass-card p-8">
              <h3 className="text-xl font-bold font-heading text-white mb-4 flex items-center gap-2">
                <Shield className="text-[#F6851B]" size={20} /> Blockchain Verification
              </h3>
              <p className="text-gray-300 text-sm leading-relaxed mb-4">
                Smart contract layer ensuring cryptographic non-repudiation. Stores contract proofs (SHA-256 hashes and combined signatures) on the Ethereum blockchain for immutable verification.
              </p>
            </div>
          </motion.section>

          {/* Workflow & Communication */}
          <motion.section initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6 }} className="glass-card p-8 md:p-10">
            <h3 className="text-2xl font-bold font-heading text-white mb-6 flex items-center gap-2">
              <Network className="text-neon-cyan" size={24} /> Communication & Workflow
            </h3>
            
            <div className="space-y-6">
              <div>
                <h4 className="text-lg font-bold text-white mb-2">Backend ↔ AI Model (gRPC)</h4>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Remote Procedure Call over HTTP/2 defined via strict Protobuf schemas. Sending raw binary data (PDF bytes) is highly efficient. The strict typing ensures the AI outputs exact nested risk structures back to the Node.js orchestrator.
                </p>
              </div>

              <div>
                <h4 className="text-lg font-bold text-white mb-2">Backend ↔ Supabase</h4>
                <p className="text-gray-300 text-sm leading-relaxed">
                  The backend uses a Service Role key to act as a privileged admin, bypassing RLS to manage file uploads to S3-compatible buckets securely and orchestrate PostgreSQL relational data operations.
                </p>
              </div>

              <div>
                <h4 className="text-lg font-bold text-white mb-2">End-to-End Execution Flow</h4>
                <ol className="list-decimal list-inside space-y-2 text-gray-300 text-sm mt-4">
                  <li>User uploads a `.pdf` file via standard multipart/form-data.</li>
                  <li>Express.js intercepts with multer, hashes for integrity, uploads to Supabase, and updates Postgres.</li>
                  <li>User triggers "Analyze". The Node backend fetches the buffer and calls the Python gRPC server over port `50051`.</li>
                  <li>Python extracts text, chunks it, queries an LLM via the OpenAI package augmented with ChromaDB RAG.</li>
                  <li>Complex Protobuf risk analysis object is returned to Node, parsed, and forwarded as JSON to the UI.</li>
                  <li>On final execution, Ethers.js stores the immutable hash and digital signatures on-chain via smart contracts.</li>
                </ol>
              </div>
            </div>
          </motion.section>
        </div>
      </div>
    </main>
  );
}
