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
      {/* Unique NOVA Cosmic-Infrastructure Vector Emblem */}
      <div className="relative flex items-center justify-center">
        <svg
          width={iconSize}
          height={iconSize}
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="filter drop-shadow-[0_0_12px_rgba(0,240,255,0.4)] transition-transform hover:scale-105 duration-300"
        >
          <defs>
            <linearGradient id="novaPlatinumGrad" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#f8fafc" />
              <stop offset="50%" stopColor="#94a3b8" />
              <stop offset="100%" stopColor="#475569" />
            </linearGradient>
            <linearGradient id="novaCyanGrad" x1="0" y1="48" x2="48" y2="0" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#00f0ff" />
              <stop offset="60%" stopColor="#38bdf8" />
              <stop offset="100%" stopColor="#818cf8" />
            </linearGradient>
          </defs>

          {/* Platinum Outer Orbit Gauge */}
          <circle
            cx="24"
            cy="24"
            r="21.5"
            stroke="url(#novaPlatinumGrad)"
            strokeWidth="1.8"
            strokeDasharray="6 3"
            opacity="0.75"
          />

          {/* Hexagonal Global Infrastructure Mesh */}
          <polygon
            points="24,6 39.5,15 39.5,33 24,42 8.5,33 8.5,15"
            stroke="url(#novaPlatinumGrad)"
            strokeWidth="1.2"
            fill="none"
            opacity="0.4"
          />

          {/* Nova Celestial Burst Shape */}
          <path
            d="M24 8 Q24 24 40 24 Q24 24 24 40 Q24 24 8 24 Q24 24 24 8 Z"
            fill="url(#novaCyanGrad)"
            opacity="0.9"
          />

          {/* Inner Quantum Infrastructure Core */}
          <circle cx="24" cy="24" r="4.5" fill="#090a0f" stroke="url(#novaPlatinumGrad)" strokeWidth="1.5" />
          <circle cx="24" cy="24" r="2.2" fill="#00f0ff" className="animate-pulse" />
        </svg>
      </div>

      {/* Brand Typography */}
      {showText && (
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5 leading-none">
            <span className="text-[15px] font-black tracking-wider text-slate-100 font-mono">
              DONA
            </span>
            <span className="text-[15px] font-black tracking-widest bg-gradient-to-r from-cyan-300 via-sky-200 to-indigo-300 bg-clip-text text-transparent">
              NOVA
            </span>
          </div>
          <span className="mt-0.5 text-[8.5px] font-bold uppercase tracking-[0.2em] text-slate-400">
            Infrastructure Radar
          </span>
        </div>
      )}
    </div>
  );
}
