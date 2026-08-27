"use client";

import { useEffect, useRef } from "react";
import type { CSSProperties } from "react";
import type { ShaderMount } from "@paper-design/shaders";
import { cn } from "@/lib/utils";

type LiquidMetalFrameProps = {
  className?: string;
  /** Corner radius of the frame in px — match the host card's radius + thickness */
  radius?: number;
  /** Ring band width in px — match the host's padding */
  thickness?: number;
  /** Shader animation speed. 0 stops it entirely. */
  speed?: number;
  /** Metallic tint applied via color-burn blend */
  tint?: string;
  /** Density of the metal stripes (1 to 10) */
  repetition?: number;
  /** Direction of pattern animation in degrees */
  angle?: number;
  /** Organic distortion of the liquid flow (0 to 1) */
  distortion?: number;
  /** Distortion hugging the frame edges (0 to 1) */
  contour?: number;
  /** 0 = full brightness, 1 = veiled, 2 = heavily veiled (depth cue) */
  dim?: number;
};

export function LiquidMetalFrame({
  className,
  radius = 15,
  thickness = 1.5,
  speed = 0.9,
  tint = "#b9c3d4",
  repetition = 1.5,
  angle = -45,
  distortion = 0.35,
  contour = 0.75,
  dim = 0,
}: LiquidMetalFrameProps) {
  const shaderRef = useRef<HTMLDivElement>(null);
  const mountRef = useRef<ShaderMount | null>(null);

  useEffect(() => {
    const el = shaderRef.current;
    if (!el) return;

    const load = async () => {
      try {
        const { liquidMetalFragmentShader, ShaderMount: Mount, getShaderColorFromString } =
          await import("@paper-design/shaders");

        if (!el.isConnected) return;

        mountRef.current?.dispose();
        mountRef.current = new Mount(
          el,
          liquidMetalFragmentShader,
          {
            u_isImage: false,
            u_shape: 0,
            u_colorBack: [0.03, 0.03, 0.05, 1],
            u_colorTint: getShaderColorFromString(tint),
            u_repetition: repetition,
            u_softness: 0.5,
            u_shiftRed: 0.3,
            u_shiftBlue: 0.3,
            u_distortion: distortion,
            u_contour: contour,
            u_angle: angle,
            u_scale: 1.3,
            u_rotation: 0,
            u_offsetX: 0.05,
            u_offsetY: -0.05,
            u_fit: 0,
            u_originX: 0.5,
            u_originY: 0.5,
            u_worldWidth: 0,
            u_worldHeight: 0,
          },
          undefined,
          speed
        );
      } catch {
        // Shader module failed to load — the static fallback ring remains.
      }
    };

    load();

    return () => {
      mountRef.current?.dispose();
      mountRef.current = null;
    };
  }, [speed, repetition, angle, distortion, contour, tint]);

  const clip: CSSProperties = {
    borderRadius: radius,
    overflow: "hidden",
  };

  const veilMask: CSSProperties = {
    WebkitMaskImage: "linear-gradient(#000 0 0), linear-gradient(#000 0 0)",
    WebkitMaskSize: `100% 100%, calc(100% - ${thickness * 2}px) calc(100% - ${thickness * 2}px)`,
    WebkitMaskPosition: `0 0, ${thickness}px ${thickness}px`,
    WebkitMaskRepeat: "no-repeat",
    WebkitMaskComposite: "exclude",
    maskImage: "linear-gradient(#000 0 0), linear-gradient(#000 0 0)",
    maskSize: `100% 100%, calc(100% - ${thickness * 2}px) calc(100% - ${thickness * 2}px)`,
    maskPosition: `0 0, ${thickness}px ${thickness}px`,
    maskRepeat: "no-repeat",
    maskComposite: "exclude",
    borderRadius: radius,
    overflow: "hidden",
  };

  return (
    <div className={cn("pointer-events-none absolute inset-0", className)} aria-hidden>
      {/* Static metallic fallback — visible until the shader paints over it */}
      <div
        className="absolute inset-0"
        style={{
          ...clip,
          background:
            "linear-gradient(160deg, rgba(255,255,255,0.9) 0%, rgba(160,172,196,0.85) 28%, rgba(70,78,96,0.9) 55%, rgba(210,224,240,0.9) 82%, rgba(120,130,150,0.9) 100%)",
        }}
      />
      {/* WebGL liquid metal */}
      <div ref={shaderRef} className="absolute inset-0" style={clip} />
      {/* Depth veil — dims only the ring band on flanking cards */}
      {dim > 0 && (
        <div
          className="absolute inset-0"
          style={{
            ...veilMask,
            background: dim >= 2 ? "rgba(0,0,0,0.85)" : "rgba(0,0,0,0.55)",
          }}
        />
      )}
    </div>
  );
}