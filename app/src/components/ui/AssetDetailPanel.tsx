"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X, MapPin, Zap, Building2, Calendar, ExternalLink,
  Share2, Bookmark, Check, Activity, Network
} from "lucide-react";
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
  operational:  { label: "Aktif Üretimde",             bg: "rgba(16,185,129,0.12)",  color: "#34d399", dot: "#34d399" },
  construction: { label: "İnşaat / Test Aşamasında",  bg: "rgba(212,175,55,0.12)",  color: "#f5d77f", dot: "#d4af37" },
  offline:      { label: "Bakımda / Pasif",            bg: "rgba(239,68,68,0.12)",   color: "#f87171", dot: "#ef4444" },
};

function MetricRow({ label, value, icon: Icon }: { label: string; value: string; icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }> }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 12,
        padding: "8px 0",
        borderBottom: "1px solid var(--gold-border)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 8, minWidth: 0, flexShrink: 0 }}>
        <Icon style={{ width: 13, height: 13, color: "var(--gold-primary)", flexShrink: 0 }} />
        <span style={{ fontSize: "0.72rem", color: "var(--text-muted)", fontFamily: "var(--font-mono)", letterSpacing: "0.04em" }}>
          {label}
        </span>
      </div>
      <span
        style={{
          fontSize: "0.75rem",
          fontWeight: 600,
          color: "var(--text-main)",
          textAlign: "right",
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
          maxWidth: "220px",
        }}
        title={value}
      >
        {value}
      </span>
    </div>
  );
}

export function AssetDetailPanel({ asset, onClose }: AssetDetailPanelProps) {
  const [saved, setSaved] = useState(false);
  const [copied, setCopied] = useState(false);
  const [focused, setFocused] = useState(false);

  // Check saved state from localStorage
  useEffect(() => {
    if (!asset) return;
    try {
      const savedList = JSON.parse(localStorage.getItem("dona_saved_assets") || "[]");
      setSaved(savedList.includes(asset.name));
    } catch {}
  }, [asset]);

  const toggleSave = () => {
    if (!asset) return;
    try {
      const savedList = JSON.parse(localStorage.getItem("dona_saved_assets") || "[]");
      let nextList: string[];
      if (saved) {
        nextList = savedList.filter((n: string) => n !== asset.name);
      } else {
        nextList = [...savedList, asset.name];
      }
      localStorage.setItem("dona_saved_assets", JSON.stringify(nextList));
      setSaved(!saved);
    } catch {
      setSaved(!saved);
    }
  };

  const handleShare = () => {
    if (!asset) return;
    const url = typeof window !== "undefined" ? `${window.location.origin}/#asset=${encodeURIComponent(asset.name)}` : "";
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(url).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2200);
      }).catch(() => {});
    }
  };

  const handleFocusOnGlobe = () => {
    if (!asset) return;
    setFocused(true);
    setTimeout(() => setFocused(false), 2400);

    // Dispatch global event for GlobeCanvas to focus/re-orient if coordinates exist
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("dona:focus-asset", { detail: asset }));
    }
  };

  const handleOpenExternal = () => {
    if (!asset) return;
    let targetUrl = "https://github.com/wri/global-power-plant-database";
    if (asset.coordinates) {
      // Direct Satellite View via Google Maps Coordinates
      const cleanCoords = asset.coordinates.replace(/[^0-9.,-]/g, "");
      targetUrl = `https://www.google.com/maps?q=${encodeURIComponent(asset.coordinates)}&t=k`;
    } else {
      targetUrl = `https://www.google.com/search?q=${encodeURIComponent(asset.name + " " + asset.country + " infrastructure")}`;
    }
    window.open(targetUrl, "_blank", "noopener,noreferrer");
  };

  if (!asset) return null;
  const s = STATUS_STYLE[asset.status] ?? STATUS_STYLE.operational;

  return (
    <AnimatePresence>
      {asset && (
        <>
          {/* Transparent Click-Catcher (NO blur, crystal clear background per user request) */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 48,
              background: "transparent",
              backdropFilter: "none",
              WebkitBackdropFilter: "none",
            }}
          />

          {/* Floating Glass Panel — Perfectly Sized & Positioned */}
          <motion.aside
            key="panel"
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0 }}
            transition={{ type: "spring", stiffness: 350, damping: 32 }}
            style={{
              position: "fixed",
              right: 16,
              top: 16,
              bottom: 16,
              zIndex: 55,
              display: "flex",
              height: "calc(100vh - 32px)",
              width: "100%",
              maxWidth: 390,
              flexDirection: "column",
              overflow: "hidden",
              borderRadius: 18,
              border: "1px solid var(--gold-border)",
              background: "rgba(8, 9, 15, 0.65)",
              backdropFilter: "blur(32px)",
              WebkitBackdropFilter: "blur(32px)",
              boxShadow: "0 20px 60px rgba(0,0,0,0.85), 0 0 28px rgba(212,175,55,0.1)",
              userSelect: "none",
            }}
          >
            {/* Header: Clean 2-Row Layout Preventing Overlap */}
            <div
              style={{
                padding: "14px 16px",
                borderBottom: "1px solid var(--gold-border)",
                background: "rgba(10, 11, 18, 0.35)",
                flexShrink: 0,
              }}
            >
              {/* Row 1: Status Pill + Action Buttons */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8, marginBottom: 8 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 5,
                      borderRadius: 9999,
                      padding: "2px 8px",
                      fontSize: "0.62rem",
                      fontWeight: 700,
                      background: s.bg,
                      color: s.color,
                      border: `1px solid ${s.color}40`,
                    }}
                  >
                    <span style={{ width: 5, height: 5, borderRadius: "50%", background: s.dot, animation: asset.status === "operational" ? "dn-pulse-glow 2s infinite" : undefined }} />
                    {s.label}
                  </span>
                </div>

                {/* Right Action Icons: Bookmark, Share, Close */}
                <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                  <button
                    onClick={toggleSave}
                    style={{
                      display: "flex",
                      width: 28,
                      height: 28,
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: 8,
                      border: "1px solid var(--gold-border)",
                      background: saved ? "rgba(212,175,55,0.2)" : "rgba(212,175,55,0.04)",
                      color: saved ? "var(--gold-bright)" : "var(--text-muted)",
                      cursor: "pointer",
                      transition: "all 0.18s ease",
                    }}
                    title={saved ? "Kayıtlardan Çıkar" : "Tesis Kaydet"}
                    aria-label="Kaydet"
                  >
                    <Bookmark style={{ width: 13, height: 13, fill: saved ? "currentColor" : "none" }} />
                  </button>

                  <button
                    onClick={handleShare}
                    style={{
                      display: "flex",
                      width: 28,
                      height: 28,
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: 8,
                      border: "1px solid var(--gold-border)",
                      background: copied ? "rgba(16,185,129,0.2)" : "rgba(212,175,55,0.04)",
                      color: copied ? "#34d399" : "var(--text-muted)",
                      cursor: "pointer",
                      transition: "all 0.18s ease",
                    }}
                    title={copied ? "Kopyalandı!" : "Bağlantıyı Paylaş"}
                    aria-label="Paylaş"
                  >
                    {copied ? <Check style={{ width: 13, height: 13 }} /> : <Share2 style={{ width: 13, height: 13 }} />}
                  </button>

                  <button
                    onClick={onClose}
                    style={{
                      display: "flex",
                      width: 28,
                      height: 28,
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: 8,
                      border: "1px solid var(--gold-border)",
                      background: "rgba(212,175,55,0.04)",
                      color: "var(--text-muted)",
                      cursor: "pointer",
                      transition: "all 0.18s ease",
                      marginLeft: 2,
                    }}
                    title="Kapat"
                    aria-label="Kapat"
                  >
                    <X style={{ width: 13, height: 13 }} />
                  </button>
                </div>
              </div>

              {/* Row 2: Asset Title & Type */}
              <h2
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "0.98rem",
                  fontWeight: 800,
                  color: "var(--text-main)",
                  margin: 0,
                  lineHeight: 1.3,
                  wordBreak: "break-word",
                }}
              >
                {asset.name}
              </h2>

              {/* Row 3: Meta tags: Type + Country */}
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 6, flexWrap: "wrap" }}>
                <span
                  style={{
                    borderRadius: 6,
                    padding: "1px 6px",
                    fontSize: "0.58rem",
                    fontWeight: 600,
                    background: "rgba(212,175,55,0.08)",
                    border: "1px solid var(--gold-border)",
                    color: "var(--gold-bright)",
                    fontFamily: "var(--font-mono)",
                    letterSpacing: "0.04em",
                  }}
                >
                  {asset.type}
                </span>

                <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                  <span style={{ fontSize: "0.85rem" }}>{asset.flagEmoji}</span>
                  <span style={{ color: "var(--text-muted)", fontSize: "0.68rem", fontFamily: "var(--font-mono)" }}>
                    {asset.country}
                  </span>
                </div>
              </div>
            </div>

            {/* Scrollable Content Body */}
            <div style={{ flex: 1, overflowY: "auto", padding: "14px 16px", display: "flex", flexDirection: "column", gap: 14 }}>
              {/* Telemetry Registry Warning / Source */}
              <div
                style={{
                  borderRadius: 10,
                  border: "1px solid rgba(212,175,55,0.25)",
                  background: "rgba(212,175,55,0.04)",
                  padding: "10px 12px",
                  display: "flex",
                  flexDirection: "column",
                  gap: 4,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <span style={{ color: "var(--gold-bright)", fontSize: "0.75rem" }}>⚠️</span>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.58rem", fontWeight: 700, color: "var(--gold-bright)", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                    VERİ KAYNAĞI • WRI & OPEN REGISTRY
                  </span>
                </div>
                <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.72rem", color: "rgba(210,205,195,0.85)", margin: 0, lineHeight: 1.5 }}>
                  {asset.country} bölgesinde yer alan {asset.capacity} kapasiteli doğrulanmış altyapı tesisi.
                </p>
              </div>

              {/* Core Metrics Table */}
              <div>
                <p style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.58rem",
                  fontWeight: 700,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "var(--gold-bright)",
                  marginBottom: 6,
                }}>
                  TEMEL TESİS VERİLERİ
                </p>

                <div style={{ display: "flex", flexDirection: "column" }}>
                  <MetricRow label="Kurulu Kapasite" value={asset.capacity} icon={Zap} />
                  <MetricRow label="Sahibi / İşletmeci" value={asset.owner || "Kamu / Konsorsiyum"} icon={Building2} />
                  {asset.coordinates && <MetricRow label="Coğrafi Konum (GPS)" value={asset.coordinates} icon={MapPin} />}
                  {asset.completionYear && <MetricRow label="Hizmete Giriş Yılı" value={asset.completionYear} icon={Calendar} />}
                  <MetricRow label="Bağlı Olduğu Ülke" value={asset.country} icon={MapPin} />
                </div>
              </div>

              {/* Mini Sparkline Telemetry */}
              <div style={{
                borderRadius: 10,
                border: "1px solid var(--gold-border)",
                background: "rgba(0,0,0,0.3)",
                padding: "10px 12px",
              }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 6 }}>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.58rem", fontWeight: 700, color: "var(--text-main)", letterSpacing: "0.06em" }}>
                    Üretim Kararlılık Eğrisi
                  </span>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.54rem", color: "#34d399", fontWeight: 700 }}>
                    Son 12 Ay (Sabit)
                  </span>
                </div>

                <svg viewBox="0 0 300 45" style={{ width: "100%", height: 36, overflow: "visible" }}>
                  <defs>
                    <linearGradient id="panelSparkGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#d4af37" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="#d4af37" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <path d="M 0 32 Q 50 25 100 20 T 200 15 T 300 8 L 300 45 L 0 45 Z" fill="url(#panelSparkGrad)" />
                  <path d="M 0 32 Q 50 25 100 20 T 200 15 T 300 8" fill="none" stroke="#d4af37" strokeWidth="2" />
                  <circle cx="300" cy="8" r="3.5" fill="#f5d77f" />
                </svg>
              </div>

              {/* Tags & Graph Links */}
              <div>
                <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.56rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: 6 }}>
                  KNOWLEDGE GRAPH BAĞLANTILARI
                </p>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
                  {["İletim Hatları", "Yatırımcı Ağı", "Şebeke Düğümü", "Regülasyon"].map(rel => (
                    <button
                      key={rel}
                      onClick={handleFocusOnGlobe}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: "6px 8px",
                        borderRadius: 8,
                        border: "1px solid var(--gold-border)",
                        background: "rgba(212,175,55,0.03)",
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.6rem",
                        color: "var(--text-muted)",
                        cursor: "pointer",
                        transition: "all 0.18s ease",
                      }}
                    >
                      <span>{rel}</span>
                      <Network style={{ width: 10, height: 10, color: "var(--gold-primary)" }} />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer Actions: Fully Functional Buttons */}
            <div
              style={{
                flexShrink: 0,
                padding: "12px 16px",
                borderTop: "1px solid var(--gold-border)",
                background: "rgba(10, 11, 18, 0.45)",
                display: "flex",
                flexDirection: "column",
                gap: 8,
              }}
            >
              <button
                id="view-on-globe"
                onClick={handleFocusOnGlobe}
                style={{
                  display: "flex",
                  width: "100%",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 8,
                  borderRadius: 10,
                  border: "none",
                  background: focused
                    ? "linear-gradient(135deg, #10b981 0%, #34d399 100%)"
                    : "linear-gradient(135deg, #d4af37 0%, #f5d77f 60%, #d4af37 100%)",
                  padding: "9px 14px",
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.72rem",
                  fontWeight: 800,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "#060608",
                  cursor: "pointer",
                  boxShadow: focused
                    ? "0 0 20px rgba(16,185,129,0.5)"
                    : "0 0 18px rgba(212,175,55,0.45)",
                  transition: "all 0.2s ease",
                }}
              >
                <Activity style={{ width: 14, height: 14 }} />
                <span>{focused ? "KÜREDE ODAKLANDI ✓" : "KÜRE'DE GÖSTER"}</span>
              </button>

              <button
                id="full-profile"
                onClick={handleOpenExternal}
                style={{
                  display: "flex",
                  width: "100%",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 6,
                  borderRadius: 10,
                  border: "1px solid var(--gold-border)",
                  background: "rgba(212,175,55,0.05)",
                  padding: "7px 12px",
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.64rem",
                  fontWeight: 700,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "var(--text-main)",
                  cursor: "pointer",
                  transition: "all 0.18s ease",
                }}
              >
                <span>RESMİ UYDU / KAYIT BİLGİSİ</span>
                <ExternalLink style={{ width: 11, height: 11, color: "var(--gold-primary)" }} />
              </button>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
