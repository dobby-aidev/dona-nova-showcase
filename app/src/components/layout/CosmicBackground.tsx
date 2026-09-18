"use client";

import React from "react";
import dynamic from "next/dynamic";

// Dynamic import with ssr: false for Three.js Canvas
const GlobeCanvas = dynamic(
  () => import("@/components/globe/GlobeCanvas").then((mod) => mod.GlobeCanvas),
  { ssr: false }
);

export function CosmicBackground() {
  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
        overflow: "hidden",
        opacity: 0.65,
      }}
    >
      <GlobeCanvas />
      {/* Cinematic Vignette for maximum text legibility */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(circle at 50% 40%, rgba(7, 8, 14, 0.4) 0%, rgba(7, 8, 14, 0.88) 100%)",
          pointerEvents: "none",
        }}
      />
    </div>
  );
}
