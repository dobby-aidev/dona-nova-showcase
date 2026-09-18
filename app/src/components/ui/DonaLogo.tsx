"use client";

import React from "react";

interface DonaLogoProps {
  size?: "sm" | "md" | "lg";
  showText?: boolean;
}

export function DonaLogo({ size = "md", showText = true }: DonaLogoProps) {
  const iconSize = size === "sm" ? 30 : size === "lg" ? 46 : 36;

  return (
    <div className="flex items-center gap-3 select-none group cursor-pointer">
      {/* High-Precision NOVA Cyber Emblem */}
      <div className="relative flex items-center justify-center">
        <svg
          width={iconSize}
          height={iconSize}
          viewBox="0 0 64 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="filter drop-shadow-[0_0_14px_rgba(0,240,255,0.45)] transition-transform group-hover:scale-105 duration-300"
        >
          <defs>
            <linearGradient id="donaNovaEmblemGrad" x1="8" y1="56" x2="56" y2="8" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#00f0ff" />
              <stop offset="45%" stopColor="#38bdf8" />
              <stop offset="85%" stopColor="#6366f1" />
              <stop offset="100%" stopColor="#c084fc" />
            </linearGradient>
            <linearGradient id="donaNovaPlatRing" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
              <stop offset="50%" stopColor="#94a3b8" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.8" />
            </linearGradient>
            <filter id="donaNovaNeon" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="2.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Outer Orbital Telemetry Ring */}
          <circle
            cx="32"
            cy="32"
            r="28"
            stroke="url(#donaNovaPlatRing)"
            strokeWidth="1.6"
            strokeDasharray="6 4"
            opacity="0.8"
          />

          {/* Concentric Gyroscope Arc */}
          <circle
            cx="32"
            cy="32"
            r="21"
            stroke="url(#donaNovaEmblemGrad)"
            strokeWidth="1.8"
            strokeDasharray="10 8"
            opacity="0.9"
          />

          {/* Global Infrastructure Hexagon Matrix */}
          <polygon
            points="32,8 52,20 52,44 32,56 12,44 12,20"
            stroke="#38bdf8"
            strokeWidth="1.4"
            strokeLinejoin="round"
            fill="none"
            opacity="0.5"
          />

          {/* Four Cardinal Diamond Ticks */}
          <polygon points="32,2 34,5 32,8 30,5" fill="#00f0ff" filter="url(#donaNovaNeon)" />
          <polygon points="32,56 34,59 32,62 30,59" fill="#00f0ff" filter="url(#donaNovaNeon)" />
          <polygon points="2,32 5,34 8,32 5,30" fill="#00f0ff" filter="url(#donaNovaNeon)" />
          <polygon points="56,32 59,34 62,32 59,30" fill="#00f0ff" filter="url(#donaNovaNeon)" />

          {/* Central Supernova 8-Point Starburst Core */}
          <path
            d="M32 12 Q32 32 52 32 Q32 32 32 52 Q32 32 12 32 Q32 32 32 12 Z"
            fill="url(#donaNovaEmblemGrad)"
            filter="url(#donaNovaNeon)"
          />
          <path
            d="M32 18 Q32 32 46 32 Q32 32 32 46 Q32 32 18 32 Q32 32 32 18 Z"
            fill="#ffffff"
            opacity="0.9"
          />

          {/* Central Quantum Infrastructure Core */}
          <circle cx="32" cy="32" r="5" fill="#06080e" stroke="url(#donaNovaPlatRing)" strokeWidth="1.5" />
          <circle cx="32" cy="32" r="2.5" fill="#00f0ff" className="animate-pulse" />
        </svg>
      </div>

      {/* Brand Typography */}
      {showText && (
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5 leading-none">
            <span className="text-[15px] font-black tracking-wider text-white font-mono">
              DONA
            </span>
            <span className="text-[15px] font-black tracking-widest bg-gradient-to-r from-cyan-400 via-sky-400 to-indigo-400 bg-clip-text text-transparent drop-shadow-[0_0_10px_rgba(6,182,212,0.5)]">
              NOVA
            </span>
          </div>
          <span className="mt-0.5 text-[8.5px] font-bold uppercase tracking-[0.22em] text-zinc-400 font-mono">
            Infrastructure Radar
          </span>
        </div>
      )}
    </div>
  );
}
