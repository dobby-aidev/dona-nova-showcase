"use client";

import React from "react";

interface DonaLogoProps {
  size?: "sm" | "md" | "lg";
  showText?: boolean;
}

export function DonaLogo({ size = "md", showText = true }: DonaLogoProps) {
  const iconSize = size === "sm" ? 28 : size === "lg" ? 44 : 34;

  return (
    <div className="flex items-center gap-3 select-none">
      {/* Unique Custom Geometric Vector Emblem for DONA NOVA */}
      <div className="relative flex items-center justify-center">
        <svg
          width={iconSize}
          height={iconSize}
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="filter drop-shadow-[0_0_12px_rgba(59,130,246,0.5)] transition-transform hover:scale-105 duration-300"
        >
          <defs>
            <linearGradient id="donaGradPrimary" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="50%" stopColor="#6366f1" />
              <stop offset="100%" stopColor="#a855f7" />
            </linearGradient>
            <linearGradient id="donaGradAccent" x1="48" y1="0" x2="0" y2="48" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="100%" stopColor="#3b82f6" />
            </linearGradient>
          </defs>

          {/* Outer Orbital Ring */}
          <circle cx="24" cy="24" r="21" stroke="url(#donaGradPrimary)" strokeWidth="2.2" strokeDasharray="90 30" opacity="0.85" />
          
          {/* Inner Polygon Nodes / Infrastructure Lattice */}
          <path
            d="M24 6L39.5885 15V33L24 42L8.41154 33V15L24 6Z"
            stroke="url(#donaGradAccent)"
            strokeWidth="1.8"
            strokeLinejoin="round"
            opacity="0.9"
          />

          {/* Center Neural Core Dot */}
          <circle cx="24" cy="24" r="5" fill="url(#donaGradPrimary)" />
          <circle cx="24" cy="24" r="2.5" fill="#ffffff" />

          {/* Connecting Infrastructure Beams */}
          <line x1="24" y1="6" x2="24" y2="19" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="2 2" />
          <line x1="24" y1="29" x2="24" y2="42" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="2 2" />
          <line x1="8.4" y1="15" x2="19" y2="21" stroke="#a855f7" strokeWidth="1.5" />
          <line x1="39.6" y1="33" x2="29" y2="27" stroke="#a855f7" strokeWidth="1.5" />
        </svg>
      </div>

      {/* Brand Typography */}
      {showText && (
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5 leading-none">
            <span className="text-[15px] font-black tracking-tight text-white font-sans">
              DONA
            </span>
            <span className="text-[15px] font-black tracking-tight bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent">
              NOVA
            </span>
          </div>
          <span className="mt-0.5 text-[9px] font-bold uppercase tracking-[0.18em] text-slate-400">
            Infrastructure Intelligence
          </span>
        </div>
      )}
    </div>
  );
}
