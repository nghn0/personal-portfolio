"use client";

import { useEffect, useState, useRef, useMemo } from "react";
import { motion } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
// @ts-ignore
import * as random from "maath/random/dist/maath-random.esm";

function StarBackground(props: any) {
  const ref = useRef<any>(null);
  const [sphere] = useState(() => random.inSphere(new Float32Array(3000), { radius: 1.5 }));

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 10;
      ref.current.rotation.y -= delta / 15;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled {...props}>
        <PointMaterial
          transparent
          color="#00f0ff"
          size={0.003}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
}

function FallbackBackground() {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden bg-[#0a0a0f]">
      {/* Fallback CSS animated gradients */}
      <div className="absolute top-[20%] left-[20%] w-[500px] h-[500px] bg-neon-cyan/10 rounded-full blur-[120px] mix-blend-screen animate-pulse-slow"></div>
      <div className="absolute bottom-[20%] right-[20%] w-[400px] h-[400px] bg-neon-purple/10 rounded-full blur-[100px] mix-blend-screen animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
    </div>
  );
}

export default function Hero() {
  const [useThree, setUseThree] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Device performance check
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const hardwareConcurrency = navigator.hardwareConcurrency || 4;
    const isMobile = window.innerWidth < 768;
    
    // Only use Three.js if not preferring reduced motion, has decent cores, and not mobile
    if (!prefersReducedMotion && hardwareConcurrency >= 4 && !isMobile) {
      setUseThree(true);
    }
  }, []);

  return (
    <section className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden">
      {mounted && useThree ? (
        <div className="absolute inset-0 z-0 bg-[#0a0a0f]">
          <Canvas camera={{ position: [0, 0, 1] }}>
            <StarBackground />
          </Canvas>
        </div>
      ) : (
        <FallbackBackground />
      )}

      {/* Middle Overlay Gradient */}
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-transparent via-[#0a0a0f]/50 to-[#0a0a0f]"></div>

      {/* Foreground Content */}
      <div className="relative z-20 flex flex-col items-center text-center px-6 max-w-4xl mx-auto mt-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-6 px-4 py-1.5 rounded-full glass border-white/10 text-xs md:text-sm font-medium tracking-widest uppercase text-gray-300 inline-flex items-center gap-2"
        >
          <span className="w-2 h-2 rounded-full bg-neon-cyan animate-pulse"></span>
          System Online
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="text-4xl md:text-6xl lg:text-7xl font-bold font-heading mb-6 tracking-tight"
        >
          Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan to-neon-purple text-glow-cyan">Nithish</span>
          <br className="hidden md:block" />
          <span className="text-3xl md:text-5xl lg:text-6xl text-gray-100 block mt-2">
            AI Engineer & Intelligent Systems Builder
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl font-body"
        >
          Building end-to-end intelligent systems combining deep learning, scalable architectures, and explainable AI to solve complex real-world problems.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          className="flex flex-col sm:flex-row items-center gap-4"
        >
          <a
            href="#projects"
            className="group relative px-8 py-4 bg-neon-cyan/10 border border-neon-cyan/50 rounded-xl font-bold text-white overflow-hidden transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,240,255,0.4)] hover:bg-neon-cyan/20"
          >
            <span className="relative z-10 flex items-center gap-2">
              Explore Projects
            </span>
            <div className="absolute inset-0 h-full w-0 bg-neon-cyan/20 transition-all duration-300 ease-out group-hover:w-full"></div>
          </a>
          
          <button
            onClick={() => {
              const chatBtn = document.getElementById('ai-chat-btn');
              if(chatBtn) chatBtn.click();
            }}
            className="group px-8 py-4 glass border-white/10 rounded-xl font-bold text-white transition-all duration-300 hover:border-neon-purple/50 hover:shadow-[0_0_20px_rgba(122,0,255,0.3)] hover:bg-white/10"
          >
            Talk to My AI
          </button>
        </motion.div>
      </div>
    </section>
  );
}
