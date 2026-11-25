import React from "react";
import { Composition } from "remotion";
import { UltraShowcase, ultraShowcaseSchema } from "./compositions/UltraShowcase";
import { MotionTypography, motionTypographySchema } from "./compositions/MotionTypography";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="UltraShowcase"
        component={UltraShowcase}
        durationInFrames={180}
        fps={30}
        width={1920}
        height={1080}
        schema={ultraShowcaseSchema}
        defaultProps={{
          title: "ULTRA EDIT",
          subtitle: "HyperFrames • Remotion • React Three Fiber • Three.js • GSAP",
          accentColor: "#6366f1",
        }}
      />
      <Composition
        id="MotionTypography"
        component={MotionTypography}
        durationInFrames={150}
        fps={30}
        width={1920}
        height={1080}
        schema={motionTypographySchema}
        defaultProps={{
          headline: "Programmatic Video Studio",
          tagline: "Frame-accurate motion graphics built with code",
          primaryColor: "#22d3ee",
        }}
      />
    </>
  );
};
