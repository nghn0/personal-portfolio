"use client";

import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import ProjectGallery from "@/components/ui/3d-project-gallery";

export default function AllProjectsPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-black">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="absolute top-20 left-6 z-30"
      >
        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors group"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />{" "}
          Back to Home
        </Link>
      </motion.div>

      <div className="absolute inset-0 z-10">
        <ProjectGallery />
      </div>
    </main>
  );
}