import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow Three.js and WebGL modules
  transpilePackages: ["three", "@react-three/fiber", "@react-three/drei"],
  // Empty turbopack config silences the warning
  turbopack: {},
};

export default nextConfig;
