"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X, MapPin, Zap, Building2, Calendar, ExternalLink,
  TrendingUp, Globe2, ArrowUpRight, Share2, Bookmark,
  ChevronRight, Activity, BarChart3, Network
} from "lucide-react";

import { DataBadge } from "@/components/ui/DataBadge";
import type { DataSourceMeta } from "@/types/infrastructure";

interface Asset {
  name: string;
  type: string;
  capacity: string;
  country: string;
  status: "operational" | "construction" | "offline";
  owner: string;
  flagEmoji: string;
  coordinates?: string;
  completionYear?: string;
  investment?: string;
  description?: string;
  tags?: string[];
  dataMeta?: DataSourceMeta;
}

interface AssetDetailPanelProps {
  asset: Asset | null;
  onClose: () => void;
}

const STATUS_STYLE = {
  operational:  { label: "Aktif Üretimde",  bg: "hsl(145 65% 42% / 0.15)", color: "hsl(145 65% 58%)",  dot: "hsl(145 65% 55%)" },
  construction: { label: "İnşaat / Test Aşamasında", bg: "hsl(38 95% 55% / 0.15)",  color: "hsl(38 80% 65%)",   dot: "hsl(38 95% 60%)"  },
  offline:      { label: "Bakımda / Pasif",      bg: "hsl(0 80% 58% / 0.15)",   color: "hsl(0 70% 65%)",    dot: "hsl(0 80% 60%)"  },
};

function MetricRow({ label, value, icon: Icon }: { label: string; value: string; icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }> }) {
  return (
    <div className="flex items-center justify-between gap-3 py-2.5" style={{ borderBottom: "1px solid hsl(220 15% 10%)" }}>
      <div className="flex items-center gap-2 min-w-0 flex-shrink-0">
        <Icon className="h-3.5 w-3.5 flex-shrink-0" style={{ color: "hsl(215 15% 40%)" }} />
        <span className="text-[11.5px] truncate" style={{ color: "hsl(215 15% 50%)" }}>{label}</span>
      </div>
      <span className="text-[12px] font-semibold truncate max-w-[200px] text-right" style={{ color: "hsl(210 35% 88%)" }} title={value}>
        {value}
      </span>
    </div>
  );
}

export function AssetDetailPanel({ asset, onClose }: AssetDetailPanelProps) {
  const [saved, setSaved] = useState(false);

  if (!asset) return null;
  const s = STATUS_STYLE[asset.status];

  return (
    <AnimatePresence>
      {asset && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 z-40"
            style={{ background: "hsl(222 20% 4% / 0.6)", backdropFilter: "blur(4px)" }}
          />

          {/* Floating Glass Panel */}
          <motion.aside
            key="panel"
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0 }}
            transition={{ type: "spring", stiffness: 340, damping: 32 }}
            className="fixed right-4 top-4 bottom-4 z-50 flex h-[calc(100vh-2rem)] w-full max-w-[400px] flex-col overflow-hidden rounded-3xl border border-slate-800/90 bg-slate-950/92 backdrop-blur-3xl shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-start justify-between gap-4 p-5 pb-4"
              style={{ borderBottom: "1px solid hsl(220 15% 10%)" }}>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span
                    className="flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[10px] font-bold"
                    style={{ background: s.bg, color: s.color }}
                  >
                    <span className="h-1.5 w-1.5 rounded-full" style={{ background: s.dot, animation: asset.status === "operational" ? "dn-pulse-dot 2s ease-in-out infinite" : undefined }} />
                    {s.label}
                  </span>
                  <span className="rounded-full px-2 py-0.5 text-[10px] font-medium"
                    style={{ background: "hsl(220 15% 10%)", color: "hsl(215 15% 45%)" }}>
                    {asset.type}
                  </span>
                </div>
                <h2 className="text-[16px] font-bold leading-snug" style={{ color: "hsl(210 40% 94%)" }}>
                  {asset.name}
                </h2>
                <div className="mt-1.5 flex items-center gap-1.5">
                  <span>{asset.flagEmoji}</span>
                  <span className="text-[12px]" style={{ color: "hsl(215 15% 48%)" }}>{asset.country}</span>
                </div>
              </div>
              <div className="flex items-center gap-1.5 shrink-0 mt-1">
                <button
                  onClick={() => setSaved(s => !s)}
                  className="flex h-8 w-8 items-center justify-center rounded-lg transition-colors hover:bg-white/[0.05]"
                  aria-label="Save asset"
                >
                  <Bookmark
                    className="h-4 w-4"
                    style={{ color: saved ? "hsl(220 85% 65%)" : "hsl(215 15% 40%)" }}
                    fill={saved ? "hsl(220 85% 65%)" : "none"}
                  />
                </button>
                <button
                  className="flex h-8 w-8 items-center justify-center rounded-lg transition-colors hover:bg-white/[0.05]"
                  aria-label="Share"
                >
                  <Share2 className="h-4 w-4" style={{ color: "hsl(215 15% 40%)" }} />
                </button>
                <button
                  onClick={onClose}
                  className="flex h-8 w-8 items-center justify-center rounded-lg transition-colors hover:bg-white/[0.05]"
                  aria-label="Close"
                >
                  <X className="h-4 w-4" style={{ color: "hsl(215 15% 40%)" }} />
                </button>
              </div>
            </div>

            {/* Scrollable content */}
            <div className="flex-1 overflow-y-auto">

              {/* Data Source Badge */}
              {asset.dataMeta && (
                <div className="px-5 pt-4">
                  <DataBadge meta={asset.dataMeta} full />
                </div>
              )}

              {/* Description */}
              {asset.description && (
                <div className="px-5 pt-4 pb-3">
                  <p className="text-[13px] leading-relaxed" style={{ color: "hsl(215 15% 52%)" }}>
                    {asset.description}
                  </p>
                </div>
              )}

              {/* Key Metrics */}
              <div className="px-5 pb-2">
                <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-blue-400">
                  Temel Tesis Verileri
                </p>
                <MetricRow label="Kurulu Kapasite" value={asset.capacity} icon={Zap} />
                <MetricRow label="Sahibi / İşletmeci" value={asset.owner} icon={Building2} />
                {asset.coordinates && (
                  <MetricRow label="Coğrafi Konum (GPS)" value={asset.coordinates} icon={MapPin} />
                )}
                {asset.completionYear && (
                  <MetricRow label="Hizmete Giriş Yılı" value={asset.completionYear} icon={Calendar} />
                )}
                {asset.investment && (
                  <MetricRow label="Toplam Yatırım Tutarı" value={asset.investment} icon={TrendingUp} />
                )}
                <MetricRow label="Bağlı Olduğu Ülke" value={asset.country} icon={Globe2} />
              </div>

              {/* Performance chart placeholder */}
              <div className="mx-5 my-4 rounded-xl overflow-hidden"
                style={{ border: "1px solid hsl(220 15% 11%)" }}>
                <div className="flex items-center justify-between px-4 py-3"
                  style={{ borderBottom: "1px solid hsl(220 15% 10%)" }}>
                  <div className="flex items-center gap-2">
                    <BarChart3 className="h-3.5 w-3.5" style={{ color: "hsl(220 85% 65%)" }} />
                    <span className="text-[12px] font-semibold" style={{ color: "hsl(210 35% 78%)" }}>
                      Output Performance
                    </span>
                  </div>
                  <span className="text-[10px]" style={{ color: "hsl(215 12% 38%)" }}>Last 12 months</span>
                </div>
                {/* SVG sparkline */}
                <div className="px-4 py-4" style={{ background: "hsl(222 20% 6%)" }}>
                  <svg viewBox="0 0 320 80" className="w-full" style={{ height: 80 }}>
                    <defs>
                      <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="hsl(220 95% 60%)" stopOpacity="0.3" />
                        <stop offset="100%" stopColor="hsl(220 95% 60%)" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    {/* Area fill */}
                    <path
                      d="M0 60 C30 50, 50 30, 80 35 C110 40, 130 20, 160 25 C190 30, 210 15, 240 20 C270 25, 295 10, 320 8 L320 80 L0 80 Z"
                      fill="url(#chartGrad)"
                    />
                    {/* Line */}
                    <path
                      d="M0 60 C30 50, 50 30, 80 35 C110 40, 130 20, 160 25 C190 30, 210 15, 240 20 C270 25, 295 10, 320 8"
                      fill="none"
                      stroke="hsl(220 95% 65%)"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    {/* Dot at end */}
                    <circle cx="320" cy="8" r="3.5" fill="hsl(220 95% 65%)" />
                    <circle cx="320" cy="8" r="6" fill="hsl(220 95% 65%)" fillOpacity="0.2" />
                  </svg>
                  <div className="flex justify-between mt-1">
                    {["Jan", "Mar", "May", "Jul", "Sep", "Nov"].map(m => (
                      <span key={m} className="text-[9px]" style={{ color: "hsl(215 12% 30%)" }}>{m}</span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Tags */}
              {asset.tags && asset.tags.length > 0 && (
                <div className="px-5 pb-4">
                  <p className="mb-2 text-[10px] font-bold uppercase tracking-wider" style={{ color: "hsl(215 12% 32%)" }}>Tags</p>
                  <div className="flex flex-wrap gap-1.5">
                    {asset.tags.map(tag => (
                      <span key={tag} className="rounded-full px-2.5 py-1 text-[11px] font-medium"
                        style={{ background: "hsl(220 15% 10%)", color: "hsl(215 15% 52%)" }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Related assets */}
              <div className="px-5 pb-4">
                <div className="flex items-center gap-2 mb-2">
                  <Network className="h-3 w-3" style={{ color: "hsl(215 12% 35%)" }} />
                  <p className="text-[10px] font-bold uppercase tracking-wider" style={{ color: "hsl(215 12% 32%)" }}>
                    Knowledge Graph Links
                  </p>
                </div>
                <div className="space-y-1.5">
                  {["Investor network", "Supply chain partners", "Grid connections", "Regulatory bodies"].map(rel => (
                    <button key={rel}
                      className="flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-[12px] font-medium transition-colors hover:bg-white/[0.03]"
                      style={{
                        background: "hsl(222 20% 7%)",
                        border: "1px solid hsl(220 15% 11%)",
                        color: "hsl(215 15% 50%)",
                      }}>
                      {rel}
                      <ChevronRight className="h-3.5 w-3.5" />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer actions */}
            <div className="shrink-0 p-4 space-y-2"
              style={{ borderTop: "1px solid hsl(220 15% 10%)" }}>
              <button
                id="view-on-globe"
                className="flex w-full items-center justify-center gap-2 rounded-xl py-2.5 text-[13px] font-semibold transition-all hover:brightness-110 active:scale-[0.97]"
                style={{
                  background: "linear-gradient(135deg, hsl(220 95% 58%), hsl(258 85% 62%))",
                  color: "white",
                }}
              >
                <Activity className="h-4 w-4" />
                View on Globe
              </button>
              <button
                id="full-profile"
                className="flex w-full items-center justify-center gap-2 rounded-xl py-2.5 text-[12px] font-medium transition-colors hover:bg-white/[0.04]"
                style={{
                  background: "hsl(220 15% 9%)",
                  border: "1px solid hsl(220 15% 13%)",
                  color: "hsl(215 15% 55%)",
                }}
              >
                Full Profile <ExternalLink className="h-3.5 w-3.5" />
              </button>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
