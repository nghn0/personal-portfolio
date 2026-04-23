"use client";

import { motion } from "framer-motion";
import { ArrowLeft, FileJson, Image as ImageIcon, Box, Terminal } from "lucide-react";

const GithubIcon = ({ size = 24, className = "" }: { size?: number; className?: string }) => (
  <svg width={size} height={size} className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
);

import Link from "next/link";

export default function QRDetectionPage() {
  return (
    <main className="min-h-screen pt-32 pb-24 px-6 relative overflow-hidden bg-[#0a0a0f]">
      {/* Background Glow */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-neon-cyan/20 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] left-[-5%] w-[600px] h-[600px] bg-neon-purple/20 rounded-full blur-[150px]"></div>
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <Link href="/#projects" className="inline-flex items-center gap-2 text-neon-cyan hover:text-white transition-colors group">
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Back to Projects
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-4 mb-6">
            <span className="px-4 py-1.5 rounded-full glass border-neon-cyan/30 text-neon-cyan text-sm font-accent tracking-widest uppercase">
              Computer Vision
            </span>
            <span className="px-4 py-1.5 rounded-full glass border-white/10 text-gray-300 text-sm font-accent tracking-widest uppercase">
              YOLOv8
            </span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold font-heading mb-6 tracking-tight">
            QR Code Detection <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan to-neon-purple">Pipeline</span>
          </h1>
          
          <p className="text-xl text-gray-400 font-body leading-relaxed mb-10">
            A complete end-to-end computer vision pipeline for training and inference of a YOLOv8 model to detect and decode QR codes in images, featuring custom dataset preparation and robust JSON output formatting.
          </p>

          <div className="flex flex-wrap gap-4 mb-16">
            <a href="https://github.com/nghn0" target="_blank" rel="noreferrer" className="flex items-center gap-2 px-6 py-3 rounded-xl bg-neon-cyan/10 hover:bg-neon-cyan/20 border border-neon-cyan/50 transition-all text-white font-medium hover:shadow-[0_0_15px_rgba(0,240,255,0.3)]">
              <GithubIcon size={20} /> View Repository
            </a>
          </div>
        </motion.div>

        {/* Content Sections */}
        <div className="space-y-16">
          
          {/* Workflow */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="glass-card p-8 md:p-10"
          >
            <h2 className="text-2xl font-bold font-heading text-white mb-6 flex items-center gap-3">
              <Terminal className="text-neon-cyan" /> Project Workflow
            </h2>
            <ul className="space-y-4 text-gray-300">
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0 text-sm font-bold text-neon-cyan mt-0.5">1</span>
                <div>Environment setup and dependency installation (Ultralytics, Label Studio).</div>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0 text-sm font-bold text-neon-cyan mt-0.5">2</span>
                <div>Manual annotation of training images using Label Studio and exporting to YOLO TXT format.</div>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0 text-sm font-bold text-neon-cyan mt-0.5">3</span>
                <div>Execution of <code className="text-neon-purple bg-white/5 px-1.5 py-0.5 rounded">train.py</code> to automatically split the dataset (80/20), generate YAML configs, and train YOLOv8 for 50 epochs.</div>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0 text-sm font-bold text-neon-cyan mt-0.5">4</span>
                <div>Execution of <code className="text-neon-purple bg-white/5 px-1.5 py-0.5 rounded">infer.py</code> to run predictions and output both annotated images and detailed JSON payload for downstream applications.</div>
              </li>
            </ul>
          </motion.section>

          {/* Architecture/Structure */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="glass-card p-8 md:p-10"
          >
            <h2 className="text-2xl font-bold font-heading text-white mb-6 flex items-center gap-3">
              <Box className="text-neon-purple" /> Directory Architecture
            </h2>
            <div className="bg-black/50 p-6 rounded-xl overflow-x-auto border border-white/5">
              <pre className="text-gray-300 text-sm font-mono leading-relaxed">
{`📂 Project Structure
├── labels/              # Raw YOLO annotations
├── QR_Dataset/          # Core dataset folder
│   ├── train_images/    # Original training images
│   ├── test_images/     # Test images for inference
│   ├── labels/          # Split labels (train/val)
│   ├── images/          # Split images (train/val)
│   └── data.yaml        # Auto-generated config
├── src/
│   └── model/           # YOLO weights & logs (best.pt)
├── outputs/
│   ├── image_output/    # Annotated inference images
│   ├── submission_detection_1.json
│   └── submission_decoding_2.json
├── train.py             # Training script
└── infer.py             # Inference script`}
              </pre>
            </div>
          </motion.section>

          {/* Output Format */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            <div className="glass-card p-8">
              <h3 className="text-xl font-bold font-heading text-white mb-4 flex items-center gap-2">
                <FileJson className="text-accent-pink" size={20} /> Detection Output
              </h3>
              <p className="text-sm text-gray-400 mb-4">JSON payload containing precise bounding box coordinates for each detected QR code.</p>
              <div className="bg-black/50 p-4 rounded-lg border border-white/5 overflow-x-auto">
                <pre className="text-accent-pink/90 text-xs font-mono">
{`[
  {
    "image_id": "image_001",
    "qrs": [
      {"bbox": [34, 45, 120, 200]}
    ]
  }
]`}
                </pre>
              </div>
            </div>

            <div className="glass-card p-8">
              <h3 className="text-xl font-bold font-heading text-white mb-4 flex items-center gap-2">
                <FileJson className="text-neon-cyan" size={20} /> Decoding Output
              </h3>
              <p className="text-sm text-gray-400 mb-4">Extended payload containing decoded QR string values and classification types.</p>
              <div className="bg-black/50 p-4 rounded-lg border border-white/5 overflow-x-auto">
                <pre className="text-neon-cyan/90 text-xs font-mono">
{`[
  {
    "image_id": "image_001",
    "qrs": [
      {
         "bbox": [34, 45, 120, 200],
         "value": "5a0SBZ0D",
         "type": "serial"
      }
    ]
  }
]`}
                </pre>
              </div>
            </div>
          </motion.section>

        </div>
      </div>
    </main>
  );
}
