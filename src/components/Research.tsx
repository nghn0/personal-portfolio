"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, BookOpen, FileText, X, type LucideIcon } from "lucide-react";
import { BlurReveal } from "@/components/ui/blur-reveal";

type ResearchItem = {
  id: number;
  type: string;
  title: string;
  shortDesc: string;
  description: string;
  icon: LucideIcon;
  link: string;
  features: string[];
  tech: string[];
};

const writings: ResearchItem[] = [
  {
    id: 1,
    type: "IEEE Conference Paper",
    title: "Design and Enhanced Analysis of Silk Fabric Classification Using MobileNetV2 with Grad-CAM Interpretability",
    shortDesc: "An AI-based fabric estimator solution to help customers confidently buy silk sarees online, reducing return rates.",
    description: "The task of choosing the right silk saree online is a great challenge for customers. The sensory experience of the customers is lacking. This drawback accounts for up to 25% of returned orders. Loomera, an online platform for sarees like Kancheepuram, Banarasi, Uppada Pattu, Mysore Silk, and Champa Silk, offers an AI fabric estimator as the solution. Through a saree image, users can instantly identify its texture— smooth and lustrous, firm and crisp, soft and structured, lightweight and flowy, or soft and glossy—and make informed buying decisions and help curb product returns. MobileNetV2, a small-screen deep learning architecture, is strengthened with convolution layers for the effective output of fabric features from images. Having been trained on labeled images of fabrics, it precisely distinguishes textures. Through the combination of AI and online shopping, Loomera fills the gap between online and offline and enables customers to shop for silk sarees with confidence.",
    icon: FileText,
    link: "https://ieeexplore.ieee.org/abstract/document/11368429",
    features: [
      "Solves high return rates (up to 25%) in online silk shopping",
      "Identifies 5 distinct silk textures instantly from images",
      "Uses MobileNetV2 augmented with custom convolution layers",
      "Bridges the gap between online and offline shopping experiences"
    ],
    tech: ["MobileNetV2", "Deep Learning", "Grad-CAM", "Computer Vision"]
  },
  {
    id: 2,
    type: "Data Science & AI",
    title: "SolarCycle Analysis & Prediction",
    shortDesc: "End-to-end analysis of solar sunspot cycles and LSTM-based forecasting modeling.",
    description: "This project performs an end-to-end analysis of solar sunspot cycles and builds an LSTM-based forecasting model to predict future Solar Sunspot Numbers (SSN). It combines scientific visualization, time-series pattern discovery, and deep learning forecasting to better understand solar activity and its impact on space weather.",
    icon: BookOpen,
    link: "https://github.com/nghn0/SolarCycle-analysis_and_prediction",
    features: [
      "Analyzes historical sunspot cycles from 1749 to 2021",
      "Correlates SSN with 10.7 cm Radio Flux and Polar Field data",
      "3-layer LSTM architecture with 16-step lag window",
      "Achieved a highly accurate MAE of 13.29 (inverse transformed)"
    ],
    tech: ["LSTM", "Time-Series Analysis", "Python", "TensorFlow", "Pandas"]
  }
];

export default function Research() {
  const [selectedItem, setSelectedItem] = useState<ResearchItem | null>(null);

  return (
    <section id="research" className="py-20 relative overflow-hidden bg-black">
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Header — same animation as Featured Projects */}
        <BlurReveal className="mb-16">
          <h2
            className="font-mono text-3xl font-bold tracking-wider text-white md:text-5xl"
            style={{ letterSpacing: "0.1em" }}
          >
            Research
          </h2>
          <div className="mt-3 h-1 w-28 bg-white rounded-full"></div>
        </BlurReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {writings.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.id}
                onClick={() => setSelectedItem(item)}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-[#13131a]/60 backdrop-blur-xl border border-white/5 rounded-2xl transition-all duration-300 hover:border-white/20 hover:shadow-[0_0_20px_rgba(185,195,212,0.15)] hover:-translate-y-1 p-8 group relative overflow-hidden cursor-pointer hover:bg-white/5"
              >
                {/* Hairline accent */}
                <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/40 to-transparent"></div>

                <div className="w-12 h-12 rounded-xl glass flex items-center justify-center mb-6 text-[#b9c3d4] border-white/10 transition-transform duration-300 group-hover:scale-110 group-hover:-translate-y-1">
                  <Icon size={24} />
                </div>

                <span className="text-xs font-accent tracking-widest text-gray-400 uppercase block mb-3">{item.type}</span>
                <h3 className="text-xl font-bold font-heading text-white mb-4 group-hover:text-gray-200 transition-colors">{item.title}</h3>

                <p className="text-gray-400 text-sm leading-relaxed mb-6">
                  {item.shortDesc}
                </p>

                <div className="flex items-center gap-2 text-sm font-medium text-gray-300 group-hover:text-white transition-colors mt-auto">
                  Read Full Abstract <ExternalLink size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 bg-[#0a0a0f]/80 backdrop-blur-sm"
            onClick={() => setSelectedItem(null)}
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
                onClick={() => setSelectedItem(null)}
                className="absolute top-4 right-4 md:top-6 md:right-6 p-2 rounded-full hover:bg-white/10 transition-colors text-gray-400 hover:text-white"
              >
                <X size={24} />
              </button>

              <div className="pr-14 md:pr-0">
                <span className="text-sm font-accent tracking-widest uppercase text-[#b9c3d4]">
                  {selectedItem.type}
                </span>
                <h3 className="text-2xl md:text-3xl font-bold font-heading mt-2 mb-6 text-white">{selectedItem.title}</h3>
              </div>

              <div className="prose prose-invert max-w-none">
                <p className="text-gray-300 text-base md:text-lg leading-relaxed mb-8">
                  {selectedItem.description}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                  <div>
                    <h4 className="text-xl font-heading font-semibold mb-4 text-white">Key Insights</h4>
                    <ul className="space-y-2">
                      {selectedItem.features.map((feature, i) => (
                         <li key={i} className="flex items-start gap-2 text-gray-400 text-sm">
                          <span className="mt-1 text-[#b9c3d4]">▹</span> {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-xl font-heading font-semibold mb-4 text-white">Methodology & Tech</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedItem.tech.map((t) => (
                        <span key={t} className="px-3 py-1.5 text-xs rounded-lg bg-white/5 border border-white/10 text-gray-300">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex gap-4 pt-4 border-t border-white/10">
                  <a
                    href={selectedItem.link}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-colors text-white font-medium"
                  >
                    <ExternalLink size={20} /> View Full Source
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}