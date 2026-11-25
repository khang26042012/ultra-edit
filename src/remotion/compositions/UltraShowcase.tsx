import React, { useMemo } from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { ThreeCanvas } from "@remotion/three";
import gsap from "gsap";
import { z } from "zod";

export const ultraShowcaseSchema = z.object({
  title: z.string(),
  subtitle: z.string(),
  accentColor: z.string(),
});

type UltraShowcaseProps = z.infer<typeof ultraShowcaseSchema>;

const RotatingTorus: React.FC<{ frame: number; fps: number; accentColor: string }> = ({
  frame,
  fps,
  accentColor,
}) => {
  const progress = frame / fps;

  // Deterministic GSAP tween evaluated at exact frame time (no wall-clock drift)
  const anim = useMemo(() => {
    const state = { rotX: 0, rotY: 0, scale: 0.2 };
    const tl = gsap.timeline({ paused: true });
    tl.to(state, { scale: 1.15, duration: 1.2, ease: "elastic.out(1, 0.5)" }, 0);
    tl.to(state, { rotX: Math.PI * 2, rotY: Math.PI * 3, duration: 6, ease: "power1.inOut" }, 0);
    tl.seek(progress);
    return state;
  }, [progress]);

  return (
    <group rotation={[anim.rotX, anim.rotY, 0]} scale={anim.scale}>
      <mesh>
        <torusKnotGeometry args={[1.25, 0.38, 180, 32]} />
        <meshStandardMaterial color={accentColor} metalness={0.65} roughness={0.2} />
      </mesh>
    </group>
  );
};

export const UltraShowcase: React.FC<UltraShowcaseProps> = ({
  title,
  subtitle,
  accentColor,
}) => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  const titleSpring = spring({
    frame: frame - 15,
    fps,
    config: { damping: 14, stiffness: 120 },
  });

  const subtitleOpacity = interpolate(frame, [35, 60], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: "radial-gradient(circle at 50% 35%, #1e1b4b 0%, #09090b 75%)",
        fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
        color: "#ffffff",
      }}
    >
      <ThreeCanvas width={width} height={height} camera={{ position: [0, 0, 5.5], fov: 45 }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} intensity={1.8} color="#ffffff" />
        <pointLight position={[-5, -4, 3]} intensity={1.4} color="#38bdf8" />
        <RotatingTorus frame={frame} fps={fps} accentColor={accentColor} />
      </ThreeCanvas>

      <AbsoluteFill
        style={{
          justifyContent: "flex-end",
          alignItems: "center",
          paddingBottom: 96,
          pointerEvents: "none",
        }}
      >
        <div
          style={{
            transform: `translateY(${interpolate(titleSpring, [0, 1], [40, 0])}px)`,
            opacity: titleSpring,
            fontSize: 88,
            fontWeight: 900,
            letterSpacing: "0.14em",
            textShadow: "0 12px 40px rgba(0,0,0,0.65)",
          }}
        >
          {title}
        </div>
        <div
          style={{
            marginTop: 18,
            opacity: subtitleOpacity,
            fontSize: 28,
            fontWeight: 500,
            color: "#c7d2fe",
            letterSpacing: "0.06em",
          }}
        >
          {subtitle}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
