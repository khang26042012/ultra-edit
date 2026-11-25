import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { Star } from "@remotion/shapes";
import { z } from "zod";

export const motionTypographySchema = z.object({
  headline: z.string(),
  tagline: z.string(),
  primaryColor: z.string(),
});

type MotionTypographyProps = z.infer<typeof motionTypographySchema>;

export const MotionTypography: React.FC<MotionTypographyProps> = ({
  headline,
  tagline,
  primaryColor,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const enter = spring({ frame, fps, config: { damping: 16, stiffness: 100 } });
  const rotation = interpolate(frame, [0, 150], [0, 180]);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#050816",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "system-ui, -apple-system, sans-serif",
        color: "#f8fafc",
      }}
    >
      <div
        style={{
          position: "absolute",
          opacity: 0.16,
          transform: `rotate(${rotation}deg) scale(${0.8 + enter * 0.4})`,
        }}
      >
        <Star points={6} innerRadius={160} outerRadius={340} fill={primaryColor} />
      </div>

      <div
        style={{
          textAlign: "center",
          transform: `scale(${interpolate(enter, [0, 1], [0.85, 1])})`,
          opacity: enter,
          zIndex: 1,
          padding: "0 80px",
        }}
      >
        <h1 style={{ fontSize: 92, fontWeight: 800, margin: 0, letterSpacing: "-0.02em" }}>
          {headline}
        </h1>
        <p style={{ fontSize: 34, color: primaryColor, marginTop: 24, fontWeight: 500 }}>
          {tagline}
        </p>
      </div>
    </AbsoluteFill>
  );
};
