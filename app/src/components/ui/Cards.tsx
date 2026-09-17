"use client";

import React, { useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";

interface StatCardProps {
  label: string;
  value: string;
  unit: string;
  delta: string;
  deltaType: "up" | "down" | "neutral";
  color: "blue" | "teal" | "violet" | "amber" | "green";
}

const COLOR_MAP = {
  blue:   { bg: "hsl(186 100% 50% / 0.08)", border: "hsl(186 100% 50% / 0.25)", glow: "hsl(186 100% 50%)", text: "hsl(186 100% 65%)" },
  teal:   { bg: "hsl(174 80% 45% / 0.08)", border: "hsl(174 80% 45% / 0.2)", glow: "hsl(174 80% 50%)", text: "hsl(174 60% 70%)" },
  violet: { bg: "hsl(220 20% 90% / 0.08)", border: "hsl(220 20% 90% / 0.2)", glow: "hsl(220 20% 90%)", text: "hsl(215 30% 85%)" },
  amber:  { bg: "hsl(38 95% 55% / 0.08)",  border: "hsl(38 95% 55% / 0.2)",  glow: "hsl(38 95% 60%)",  text: "hsl(38 80% 72%)" },
  green:  { bg: "hsl(145 65% 42% / 0.08)", border: "hsl(145 65% 42% / 0.2)", glow: "hsl(145 65% 50%)", text: "hsl(145 55% 65%)" },
};

export function StatCard({ label, value, unit, delta, deltaType, color }: StatCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const c = COLOR_MAP[color];

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    cardRef.current.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
    cardRef.current.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
  }, []);

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ y: -2 }}
      transition={{ type: "spring", stiffness: 400, damping: 32 }}
      className="group relative overflow-hidden rounded-2xl p-5 cursor-default"
      style={{
        background: c.bg,
        border: `1px solid ${c.border}`,
        backdropFilter: "blur(12px)",
      }}
    >
      {/* Mouse glow */}
      <div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(300px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), ${c.glow}18, transparent 60%)`,
        }}
      />

      <div className="relative z-10">
        <p className="text-[11px] font-semibold uppercase tracking-wider"
          style={{ color: "hsl(var(--dn-text-disabled))" }}>
          {label}
        </p>
        <div className="mt-2 flex items-end gap-1.5">
          <span className="text-3xl font-bold tracking-tight leading-none" style={{ color: c.text }}>
            {value}
          </span>
          <span className="mb-0.5 text-sm font-medium" style={{ color: "hsl(var(--dn-text-tertiary))" }}>
            {unit}
          </span>
        </div>
        <div className="mt-2 flex items-center gap-1.5">
          <span
            className="rounded-full px-2 py-0.5 text-[10px] font-semibold"
            style={{
              background: deltaType === "up"
                ? "hsl(145 65% 42% / 0.15)"
                : deltaType === "down"
                ? "hsl(0 80% 58% / 0.15)"
                : "hsl(var(--dn-bg-overlay))",
              color: deltaType === "up"
                ? "hsl(145 65% 55%)"
                : deltaType === "down"
                ? "hsl(0 70% 65%)"
                : "hsl(var(--dn-text-tertiary))",
            }}
          >
            {deltaType === "up" ? "↑" : deltaType === "down" ? "↓" : "—"} {delta}
          </span>
          <span className="text-[10px]" style={{ color: "hsl(var(--dn-text-disabled))" }}>vs last month</span>
        </div>
      </div>
    </motion.div>
  );
}

/* ── Infrastructure Asset Card ────────────────────────────────────────── */
interface AssetCardProps {
  name: string;
  type: string;
  capacity: string;
  country: string;
  status: "operational" | "construction" | "offline";
  owner: string;
  flagEmoji: string;
  onClick?: () => void;
}

const STATUS_STYLE = {
  operational:  { label: "Operational",  bg: "hsl(145 65% 42% / 0.15)", color: "hsl(145 65% 55%)", dot: "#4ade80" },
  construction: { label: "Construction", bg: "hsl(38 95% 55% / 0.15)",  color: "hsl(38 80% 65%)",  dot: "#fbbf24" },
  offline:      { label: "Offline",      bg: "hsl(0 80% 58% / 0.15)",   color: "hsl(0 70% 65%)",   dot: "#f87171" },
};

export function AssetCard({ name, type, capacity, country, status, owner, flagEmoji, onClick }: AssetCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const s = STATUS_STYLE[status];

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    cardRef.current.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
    cardRef.current.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
  }, []);

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onClick={onClick}
      whileHover={{ y: -2 }}
      transition={{ type: "spring", stiffness: 400, damping: 32 }}
      className="group relative overflow-hidden rounded-2xl p-5 cursor-pointer"
      style={{
        background: "hsl(var(--dn-bg-surface))",
        border: "1px solid hsl(var(--dn-border-subtle))",
      }}
    >
      {/* Specular glow */}
      <div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(350px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), hsl(220 95% 60% / 0.08), transparent 60%)`,
        }}
      />

      <div className="relative z-10">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="truncate font-semibold leading-snug" style={{ color: "hsl(var(--dn-text-primary))" }}>
              {name}
            </p>
            <p className="mt-0.5 text-xs" style={{ color: "hsl(var(--dn-text-tertiary))" }}>{type}</p>
          </div>
          <span
            className="shrink-0 flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold"
            style={{ background: s.bg, color: s.color }}
          >
            <span className="h-1.5 w-1.5 rounded-full dn-pulse" style={{ background: s.dot }} />
            {s.label}
          </span>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3">
          <div>
            <p className="text-[10px] uppercase tracking-wider" style={{ color: "hsl(var(--dn-text-disabled))" }}>Capacity</p>
            <p className="mt-0.5 text-sm font-semibold" style={{ color: "hsl(var(--dn-text-secondary))" }}>{capacity}</p>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-wider" style={{ color: "hsl(var(--dn-text-disabled))" }}>Owner</p>
            <p className="mt-0.5 truncate text-sm font-semibold" style={{ color: "hsl(var(--dn-text-secondary))" }}>{owner}</p>
          </div>
        </div>

        <div className="mt-3 flex items-center gap-1.5 text-xs" style={{ color: "hsl(var(--dn-text-tertiary))" }}>
          <span>{flagEmoji}</span>
          <span>{country}</span>
        </div>
      </div>
    </motion.div>
  );
}
