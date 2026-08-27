"use client";

import React, {
  Suspense,
  useEffect,
  useMemo,
  useRef,
  useState,
  createContext,
  useContext,
} from "react";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  OrbitControls,
  Environment,
  Html,
  Sphere,
} from "@react-three/drei";
import { X, ExternalLink } from "lucide-react";
import Link from "next/link";
import { allProjects, Project } from "@/data/projects";
import { LiquidMetalFrame } from "@/components/ui/liquid-metal-frame";
import SpaceJetLoader from "@/components/ui/space-jet-loader";

/* =========================
   Accent tokens — monochrome silver, matching the featured-projects
   section (liquid-metal silver + white). Cards don't use neon colors.
   ========================= */

const ACCENT_RGB = "185, 195, 212";

const GITHUB_PATH =
  "M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4";

const GithubIcon = ({
  size = 20,
  className = "",
}: {
  size?: number;
  className?: string;
}) => (
  <svg
    width={size}
    height={size}
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d={GITHUB_PATH} />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

/* =========================
   Card Context
   ========================= */

type CardContextType = {
  selectedCard: Project | null;
  setSelectedCard: (card: Project | null) => void;
  cards: Project[];
};

const CardContext = createContext<CardContextType | undefined>(undefined);

function useCard() {
  const ctx = useContext(CardContext);
  if (!ctx) throw new Error("useCard must be used within CardProvider");
  return ctx;
}

function CardProvider({ children }: { children: React.ReactNode }) {
  const [selectedCard, setSelectedCard] = useState<Project | null>(null);
  return (
    <CardContext.Provider
      value={{ selectedCard, setSelectedCard, cards: allProjects }}
    >
      {children}
    </CardContext.Provider>
  );
}

/* =========================
   Starfield Background
   ========================= */

function StarfieldBackground() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      2000
    );
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setClearColor(0x000000, 1);
    mount.appendChild(renderer.domElement);

    const starsGeometry = new THREE.BufferGeometry();
    const starsCount = 6000;
    const positions = new Float32Array(starsCount * 3);
    for (let i = 0; i < starsCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 2000;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 2000;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 2000;
    }
    starsGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3)
    );
    const starsMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.7,
      sizeAttenuation: true,
    });
    const stars = new THREE.Points(starsGeometry, starsMaterial);
    scene.add(stars);

    camera.position.z = 10;

    let animationId = 0;
    const animate = () => {
      animationId = requestAnimationFrame(animate);
      stars.rotation.y += 0.0001;
      stars.rotation.x += 0.00005;
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationId);
      if (mount && renderer.domElement) {
        mount.removeChild(renderer.domElement);
      }
      renderer.dispose();
      starsGeometry.dispose();
      starsMaterial.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="absolute top-0 left-0 w-full h-full z-0 bg-black"
    />
  );
}

/* =========================
   Floating Card
   ========================= */

function FloatingCard({
  card,
  index,
  position,
}: {
  card: Project;
  index: number;
  position: {
    x: number;
    y: number;
    z: number;
    rotationX: number;
    rotationY: number;
    rotationZ: number;
  };
}) {
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  const { setSelectedCard } = useCard();

  useFrame(({ camera }) => {
    if (groupRef.current) {
      groupRef.current.lookAt(camera.position);
    }
  });

  const handleClick = () => {
    setSelectedCard(card);
  };
  const handlePointerOver = () => {
    setHovered(true);
    document.body.style.cursor = "pointer";
  };
  const handlePointerOut = () => {
    setHovered(false);
    document.body.style.cursor = "auto";
  };

  return (
    <group ref={groupRef} position={[position.x, position.y, position.z]}>
      <Html
        transform
        distanceFactor={10}
        position={[0, 0, 0.01]}
        style={{
          pointerEvents: "auto",
        }}
      >
        <div
          className="relative w-40 h-52 rounded-lg overflow-hidden bg-[#0d0d12] flex flex-col select-none cursor-pointer p-2.5"
          onClick={handleClick}
          onPointerEnter={handlePointerOver}
          onPointerLeave={handlePointerOut}
          style={{
            transform: hovered ? "scale(1.08)" : "scale(1)",
            transition: "transform 0.3s ease",
            boxShadow: hovered
              ? `0 25px 50px rgba(${ACCENT_RGB}, 0.45), 0 0 30px rgba(${ACCENT_RGB}, 0.25)`
              : "0 15px 30px rgba(0, 0, 0, 0.6)",
            border: hovered
              ? `1.5px solid rgba(${ACCENT_RGB}, 0.7)`
              : "1px solid rgba(255, 255, 255, 0.12)",
          }}
        >
          {/* Hairline accent — matches featured card */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />

          {/* Index — centered on its own row */}
          <div className="flex items-center justify-center mb-1.5">
            <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-white/40">
              {String(index + 1).padStart(2, "0")}
            </span>
          </div>

          {/* Type — centered pill on its own row */}
          <div className="flex items-center justify-center mb-2">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[7px] font-semibold uppercase tracking-[0.18em] text-neutral-300">
              <span className="h-1 w-1 rounded-full bg-white" />
              {card.type}
            </span>
          </div>

          {/* Title */}
          <h3 className="font-heading font-bold text-white text-sm leading-snug mt-1 mb-1.5 line-clamp-2">
            {card.title}
          </h3>

          {/* Short description */}
          <p className="text-[9px] leading-relaxed text-neutral-400 line-clamp-3 flex-grow">
            {card.shortDesc}
          </p>

          {/* Tech pills — matches featured card */}
          <div className="flex flex-wrap gap-1 mt-2">
            {card.tech.slice(0, 2).map((t) => (
              <span
                key={t}
                className="px-1.5 py-0.5 text-[7px] rounded-full border border-white/10 bg-white/5 text-neutral-300 truncate max-w-full"
              >
                {t}
              </span>
            ))}
            {card.tech.length > 2 && (
              <span className="px-1.5 py-0.5 text-[7px] rounded-full border border-white/10 bg-white/5 text-neutral-500">
                +{card.tech.length - 2}
              </span>
            )}
          </div>
        </div>
      </Html>
    </group>
  );
}

/* =========================
   Project Modal
   ========================= */

function ProjectModal() {
  const { selectedCard: project, setSelectedCard } = useCard();
  const cardRef = useRef<HTMLDivElement>(null);

  if (!project) return null;

  // Same tilt + glow behavior as the featured card on the homepage:
  // px*36 / -py*28 rotation, cursor light tracked via --glow-x/--glow-y.
  const handleMouseMove: React.MouseEventHandler<HTMLDivElement> = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    cardRef.current.style.transform = `perspective(1000px) rotateX(${py * 36}deg) rotateY(${-px * 28}deg)`;
    cardRef.current.style.setProperty("--glow-x", `${(px + 0.5) * 100}%`);
    cardRef.current.style.setProperty("--glow-y", `${(py + 0.5) * 100}%`);
  };

  const handleMouseLeave = () => {
    if (cardRef.current) {
      cardRef.current.style.transition = "transform 0.5s ease-out";
      cardRef.current.style.transform =
        "perspective(1000px) rotateX(0deg) rotateY(0deg)";
      cardRef.current.style.setProperty("--glow-x", "50%");
      cardRef.current.style.setProperty("--glow-y", "120%");
    }
  };

  const handleClose = () => setSelectedCard(null);
  const handleBackdropClick: React.MouseEventHandler<HTMLDivElement> = (e) => {
    if (e.target === e.currentTarget) handleClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
      onClick={handleBackdropClick}
    >
      <div className="relative max-w-2xl w-full mx-4 max-h-[85vh] pt-16">
        <button
          onClick={handleClose}
          className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors z-10"
        >
          <X className="w-8 h-8" />
        </button>

        <div style={{ perspective: "1000px" }} className="w-full">
          {/* Tilt applies to the whole assembly so the metallic frame moves with the card */}
          <div
            ref={cardRef}
            className="group relative rounded-[16.5px] p-[1.5px] transition-all duration-500 ease-out"
            style={{
              transformStyle: "preserve-3d",
              boxShadow: `0 25px 60px rgba(${ACCENT_RGB}, 0.12), 0 8px 30px rgba(0,0,0,0.6)`,
            }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <LiquidMetalFrame radius={16.5} thickness={1.5} speed={0.5} />
            <div className="relative rounded-[15px] bg-[#0d0d12] w-full max-h-[75vh]">
              {/* Scrollable content */}
              <div className="max-h-[75vh] overflow-y-auto p-6 md:p-7">
            {/* Type */}
            <span
              className="inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-neutral-300"
            >
              <span className="h-1 w-1 rounded-full bg-white" />
              {project.type}
            </span>

            {/* Title */}
            <h3 className="text-2xl md:text-3xl font-bold font-heading mt-2 mb-5 text-white">
              {project.title}
            </h3>

            {/* Description */}
            <p className="text-gray-300 text-base leading-relaxed mb-6">
              {project.description}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <h4 className="text-lg font-heading font-semibold mb-3 text-white">
                  Key Features
                </h4>
                <ul className="space-y-2">
                  {project.features.map((feature, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-gray-400 text-sm"
                    >
                      <span className="mt-1 text-neutral-400">▹</span>{" "}
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-heading font-semibold mb-3 text-white">
                  Technologies
                </h4>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="px-2.5 py-1 text-xs rounded-lg bg-white/5 border border-white/10 text-gray-300"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-3 pt-4 border-t border-white/10">
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-colors text-white font-medium text-sm"
              >
                <GithubIcon size={18} /> View Source
              </a>
              {project.pageUrl && (
                <Link
                  href={project.pageUrl}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-white/20 bg-white/5 hover:bg-white/10 transition-colors text-white font-medium text-sm"
                >
                  <ExternalLink size={18} /> View Case Study
                </Link>
              )}
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-white/20 bg-white/5 hover:bg-white/10 transition-colors text-white font-medium text-sm"
                >
                  <ExternalLink size={18} /> Live Site
                </a>
              )}
            </div>

            </div>
            {/* Cursor light — fixed overlay over the visible card area, does NOT scroll with content */}
            <div
              className="pointer-events-none absolute inset-0 z-20 rounded-[15px] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              style={{
                background:
                  "radial-gradient(circle at var(--glow-x, 50%) var(--glow-y, 120%), rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.06) 45%, transparent 72%)",
                filter: "blur(5px)",
              }}
            />
          </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* =========================
   Project Galaxy
   ========================= */

function ProjectGalaxy() {
  const { cards } = useCard();

  const cardPositions = useMemo(() => {
    const positions: {
      x: number;
      y: number;
      z: number;
      rotationX: number;
      rotationY: number;
      rotationZ: number;
    }[] = [];
    const numCards = cards.length;
    const goldenRatio = (1 + Math.sqrt(5)) / 2;

    for (let i = 0; i < numCards; i++) {
      const y = 1 - (i / (numCards - 1)) * 2;
      const radiusAtY = Math.sqrt(1 - y * y);
      const theta = (2 * Math.PI * i) / goldenRatio;
      const x = Math.cos(theta) * radiusAtY;
      const z = Math.sin(theta) * radiusAtY;
      const layerRadius = 11 + (i % 3) * 4;

      positions.push({
        x: x * layerRadius,
        y: y * layerRadius,
        z: z * layerRadius,
        rotationX: Math.atan2(z, Math.sqrt(x * x + y * y)),
        rotationY: Math.atan2(x, z),
        rotationZ: ((i * 37) % 17) / 17 - 0.5 * 0.2,
      });
    }
    return positions;
  }, [cards.length]);

  return (
    <>
      <Sphere args={[2, 32, 32]} position={[0, 0, 0]}>
        <meshStandardMaterial color="#1a1a2e" transparent opacity={0.15} wireframe />
      </Sphere>
      <Sphere args={[12, 32, 32]} position={[0, 0, 0]}>
        <meshStandardMaterial color="#c0c8d4" transparent opacity={0.06} wireframe />
      </Sphere>
      <Sphere args={[16, 32, 32]} position={[0, 0, 0]}>
        <meshStandardMaterial color="#b9c3d4" transparent opacity={0.045} wireframe />
      </Sphere>
      <Sphere args={[20, 32, 32]} position={[0, 0, 0]}>
        <meshStandardMaterial color="#8a93a3" transparent opacity={0.03} wireframe />
      </Sphere>

      {cards.map((card, i) => (
        <FloatingCard
          key={card.id}
          card={card}
          index={i}
          position={cardPositions[i]}
        />
      ))}
    </>
  );
}

/* =========================
   Root Component
   ========================= */

export default function ProjectGallery() {
  return (
    <CardProvider>
      <div className="relative w-full h-screen overflow-hidden bg-black">
        <StarfieldBackground />

        <Canvas
          camera={{ position: [0, 0, 46], fov: 50 }}
          className="absolute inset-0 z-10"
          onCreated={({ gl }) => {
            gl.domElement.style.pointerEvents = "auto";
          }}
        >
          <Suspense fallback={null}>
            <Environment preset="night" />
            <ambientLight intensity={0.4} />
            <pointLight position={[10, 10, 10]} intensity={0.6} />
            <pointLight position={[-10, -10, -10]} intensity={0.3} />
            <ProjectGalaxy />
            <OrbitControls
              enablePan
              enableZoom
              enableRotate
              minDistance={8}
              maxDistance={80}
              autoRotate={false}
              rotateSpeed={0.5}
              zoomSpeed={1.2}
              panSpeed={0.8}
              target={[0, 0, 0]}
            />
          </Suspense>
        </Canvas>

        <SpaceJetLoader />

        <ProjectModal />

        {/* HUD */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 text-center pointer-events-none">
          <p className="text-[10px] sm:text-sm font-semibold text-white/90 font-mono tracking-[0.2em] uppercase drop-shadow-[0_0_10px_rgba(255,255,255,0.4)]">
            Drag to look around • Scroll to zoom • Click a card for details
          </p>
        </div>
      </div>
    </CardProvider>
  );
}