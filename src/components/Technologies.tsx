"use client";

import { BlurReveal } from "@/components/ui/blur-reveal";
import { PerspectiveMarquee } from "@/components/ui/perspective-marquee";

const technologies = [
  "Python",
  "Deep Learning",
  "Computer Vision",
  "TensorFlow",
  "Next.js",
  "React",
  "Node.js",
  "Cybersecurity",
  "Blockchain",
  "Docker",
  "gRPC",
  "OpenCV",
  "YOLOv8",
  "MongoDB",
  "Transformers",
];

export default function Technologies() {
  return (
    <section id="technologies" className="py-24 relative overflow-hidden bg-black">
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Header — same animation as Research */}
        <BlurReveal className="mb-16">
          <h2
            className="font-mono text-3xl font-bold tracking-wider text-white md:text-5xl"
            style={{ letterSpacing: "0.1em" }}
          >
            Technologies
          </h2>
          <div className="mt-3 h-1 w-28 bg-white rounded-full"></div>
        </BlurReveal>
      </div>

      <PerspectiveMarquee
        items={technologies}
        fontSize={64}
        color="#fafafa"
        fontWeight={700}
        pixelsPerFrame={1.5}
        rotateY={-28}
        rotateX={8}
        perspective={1400}
        fadeColor="#000000"
        speed={1}
      />
    </section>
  );
}