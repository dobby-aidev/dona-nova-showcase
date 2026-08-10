"use client";

/**
 * DONA NOVA — DataBadge Component
 * 
 * Her veri noktasında kaynağı, güncellik zamanını ve 
 * güvenilirlik skorunu gösteren premium badge bileşeni.
 * 
 * Bu bileşen DONA NOVA'yı mock data platformlarından ayıran
 * en kritik güven unsurudur.
 */

import React from "react";
import { motion } from "framer-motion";
import { 
  Radio, 
  Clock, 
  ShieldCheck, 
  AlertTriangle, 
  ExternalLink,
  Zap,
  Waves,
  Globe2
} from "lucide-react";
import type { DataSourceMeta } from "@/types/infrastructure";

// ─── Kaynak İkon & Renk Mapping ──────────────────────────────────────────────

const SOURCE_CONFIG: Record<string, {
  label: string;
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  color: string;
  bg: string;
  border: string;
  dot: string;
  url: string;
}> = {
  eia: {
    label: "EIA",
    icon: Zap,
    color: "text-amber-400",
    bg: "bg-amber-500/10",
    border: "border-amber-500/30",
    dot: "bg-amber-400",
    url: "https://www.eia.gov/opendata/",
  },
  entsoe: {
    label: "ENTSO-E",
    icon: Zap,
    color: "text-blue-400",
    bg: "bg-blue-500/10",
    border: "border-blue-500/30",
    dot: "bg-blue-400",
    url: "https://transparency.entsoe.eu/",
  },
  electricity_maps: {
    label: "Electricity Maps",
    icon: Globe2,
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/30",
    dot: "bg-emerald-400",
    url: "https://electricitymaps.com/",
  },
  global_power_plant_db: {
    label: "WRI GPPD",
    icon: Globe2,
    color: "text-violet-400",
    bg: "bg-violet-500/10",
    border: "border-violet-500/30",
    dot: "bg-violet-400",
    url: "https://github.com/wri/global-power-plant-database",
  },
  wri_aqueduct: {
    label: "WRI Aqueduct",
    icon: Waves,
    color: "text-sky-400",
    bg: "bg-sky-500/10",
    border: "border-sky-500/30",
    dot: "bg-sky-400",
    url: "https://www.wri.org/data/aqueduct-global-maps-30-data",
  },
  manual: {
    label: "DONA NOVA",
    icon: ShieldCheck,
    color: "text-slate-400",
    bg: "bg-slate-500/10",
    border: "border-slate-500/30",
    dot: "bg-slate-500",
    url: "#",
  },
  unknown: {
    label: "Bilinmeyen",
    icon: AlertTriangle,
    color: "text-orange-400",
    bg: "bg-orange-500/10",
    border: "border-orange-500/30",
    dot: "bg-orange-400",
    url: "#",
  },
};

// ─── Güncelleme Zamanı Formatı ────────────────────────────────────────────────

function formatRelativeTime(isoString: string): string {
  try {
    const date = new Date(isoString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 1) return "Az önce";
    if (diffMins < 60) return `${diffMins} dk. önce`;
    if (diffHours < 24) return `${diffHours} sa. önce`;
    if (diffDays < 7) return `${diffDays} gün önce`;
    return date.toLocaleDateString("tr-TR", { day: "numeric", month: "short" });
  } catch {
    return "Bilinmiyor";
  }
}

// ─── Güvenilirlik Rengi ───────────────────────────────────────────────────────

function reliabilityColor(reliability: string) {
  switch (reliability) {
    case "high":     return "text-emerald-400";
    case "medium":   return "text-amber-400";
    case "low":      return "text-orange-400";
    case "estimated": return "text-slate-400";
    default:          return "text-slate-500";
  }
}

function reliabilityLabel(reliability: string) {
  switch (reliability) {
    case "high":      return "Yüksek";
    case "medium":    return "Orta";
    case "low":       return "Düşük";
    case "estimated": return "Tahminsel";
    default:           return "—";
  }
}

// ─── Güncelleme Sıklığı Etiket ────────────────────────────────────────────────

function frequencyLabel(freq: string) {
  switch (freq) {
    case "realtime": return "Gerçek Zamanlı";
    case "hourly":   return "Saatlik";
    case "daily":    return "Günlük";
    case "weekly":   return "Haftalık";
    case "static":   return "Statik";
    case "estimated": return "Tahmin";
    default:          return freq;
  }
}

// ─── Ana DataBadge Bileşeni ───────────────────────────────────────────────────

interface DataBadgeProps {
  meta: DataSourceMeta;
  /** Compact mod: sadece icon + kaynak adı (globe pinleri için) */
  compact?: boolean;
  /** Tam mod: tüm detaylar (panel için) */
  full?: boolean;
  className?: string;
}

export function DataBadge({ meta, compact = false, full = false, className = "" }: DataBadgeProps) {
  const config = SOURCE_CONFIG[meta.source] ?? SOURCE_CONFIG.unknown;
  const Icon = config.icon;
  const isRealtime = meta.updateFrequency === "realtime" || meta.updateFrequency === "hourly";

  if (compact) {
    return (
      <div className={`inline-flex items-center gap-1 rounded-full px-1.5 py-0.5 ${config.bg} ${config.border} border text-[9px] font-bold ${config.color} ${className}`}>
        <span className={`h-1.5 w-1.5 rounded-full ${config.dot} ${isRealtime ? "animate-pulse" : ""}`} />
        {config.label}
      </div>
    );
  }

  if (full) {
    const fullClass = ["rounded-xl border", config.border, config.bg, "p-3 space-y-2", className].join(" ");

    return (
      <motion.div
        initial={{ opacity: 0, y: 4 }}
        animate={{ opacity: 1, y: 0 }}
        className={fullClass}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className={`flex h-6 w-6 items-center justify-center rounded-lg ${config.bg} ${config.color}`}>
              <Icon className="h-3.5 w-3.5" />
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Veri Kaynağı</p>
              <p className={`text-[12px] font-extrabold ${config.color}`}>{meta.sourceName}</p>
            </div>
          </div>
          {meta.sourceUrl && meta.sourceUrl !== "#" && (
            <a
              href={meta.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 rounded-lg px-2 py-1 text-[10px] text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <ExternalLink className="h-3 w-3" />
              Kaynak
            </a>
          )}
        </div>

        <div className="grid grid-cols-3 gap-2">
          <div className="rounded-lg bg-slate-900/60 p-1.5">
            <p className="text-[9px] font-semibold uppercase tracking-wide text-slate-500 mb-0.5">
              Güncellik
            </p>
            <div className="flex items-center gap-1">
              <Clock className="h-2.5 w-2.5 text-slate-400 flex-shrink-0" />
              <p className="text-[10px] font-bold text-slate-200 leading-tight">
                {formatRelativeTime(meta.lastUpdated)}
              </p>
            </div>
          </div>

          <div className="rounded-lg bg-slate-900/60 p-1.5">
            <p className="text-[9px] font-semibold uppercase tracking-wide text-slate-500 mb-0.5">
              Güvenilirlik
            </p>
            <p className={`text-[10px] font-bold ${reliabilityColor(meta.reliability)}`}>
              {reliabilityLabel(meta.reliability)}
            </p>
          </div>

          <div className="rounded-lg bg-slate-900/60 p-1.5">
            <p className="text-[9px] font-semibold uppercase tracking-wide text-slate-500 mb-0.5">
              Sıklık
            </p>
            <div className="flex items-center gap-1">
              {isRealtime && <Radio className="h-2.5 w-2.5 text-emerald-400 flex-shrink-0" />}
              <p className={`text-[10px] font-bold ${isRealtime ? "text-emerald-400" : "text-slate-300"}`}>
                {frequencyLabel(meta.updateFrequency)}
              </p>
            </div>
          </div>
        </div>

        {isRealtime && (
          <div className="flex items-center gap-1.5 rounded-lg border border-emerald-500/20 bg-emerald-500/5 px-2 py-1">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <p className="text-[10px] font-semibold text-emerald-400">
              Bu veri gerçek zamanlı olarak izleniyor
            </p>
          </div>
        )}
      </motion.div>
    );
  }

  // Default: orta boy
  const defaultClass = ["inline-flex items-center gap-2 rounded-full border", config.border, config.bg, "px-3 py-1", className].join(" ");

  return (
    <div className={defaultClass}>
      <span className={`flex h-2 w-2 rounded-full ${config.dot} ${isRealtime ? "animate-pulse" : ""}`} />
      <Icon className={`h-3 w-3 ${config.color} flex-shrink-0`} />
      <span className={`text-[10px] font-bold ${config.color}`}>{config.label}</span>
      <span className="text-[10px] text-slate-400">·</span>
      <span className="text-[10px] text-slate-400">{formatRelativeTime(meta.lastUpdated)}</span>
    </div>
  );
}

// ─── Global Veri Durumu Paneli ────────────────────────────────────────────────

interface DataStatusBarProps {
  sources: Array<{
    id: string;
    label: string;
    connected: boolean;
    lastUpdate?: string;
    recordCount?: number;
  }>;
}

export function DataStatusBar({ sources }: DataStatusBarProps) {
  const connectedCount = sources.filter(s => s.connected).length;

  return (
    <div className="flex items-center gap-3 flex-wrap">
      <div className="flex items-center gap-1.5">
        <span className={`h-2 w-2 rounded-full ${connectedCount > 0 ? "bg-emerald-400 animate-pulse" : "bg-slate-600"}`} />
        <span className="text-[11px] font-bold text-slate-300">
          {connectedCount}/{sources.length} Kaynak Aktif
        </span>
      </div>
      
      <div className="flex items-center gap-1.5">
        {sources.map(source => (
          <div
            key={source.id}
            title={`${source.label}${source.lastUpdate ? ` · ${formatRelativeTime(source.lastUpdate)}` : ""}${source.recordCount ? ` · ${source.recordCount.toLocaleString("tr-TR")} kayıt` : ""}`}
            className={`h-2 w-2 rounded-full transition-colors ${
              source.connected ? "bg-emerald-400" : "bg-slate-700"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
