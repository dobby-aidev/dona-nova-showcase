"use client";

import React, { Suspense, useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GlobeCanvas, REAL_LOCATIONS, HotspotLocation } from "@/components/globe/GlobeCanvas";
import { AssetDetailPanel } from "@/components/ui/AssetDetailPanel";
import {
  Activity, MapPin, ChevronUp, ChevronDown,
  Layers, Search, Zap, Droplets, Server,
  Truck, ChevronRight, ChevronLeft, Wifi, Cpu,
} from "lucide-react";
import { useIsMobile } from "@/hooks/useIsMobile";

/* ── Gold palette constants ─────────────────────────────────────────── */
const GOLD = "var(--gold-primary)";
const GOLD_BRIGHT = "var(--gold-bright)";
const GOLD_BORDER = "var(--gold-border)";
const GOLD_DIM = "var(--gold-dim)";

interface ExplorePageProps {
  lang?: "tr" | "en";
  activeNav?: string;
}

const ACTIVE_LABELS: Record<string, { tr: string; en: string }> = {
  explore:     { tr: "NASA 3D Küresel Radar",       en: "NASA 3D Global Radar" },
  telemetry:   { tr: "Küresel Telemetri",           en: "Global Telemetry" },
  dashboard:   { tr: "Altyapı Telemetri Paneli",    en: "Infrastructure Telemetry" },
  energy:      { tr: "Küresel Elektrik Santralleri", en: "Global Power Plants" },
  water:       { tr: "Tatlı Su & Baraj Sistemleri", en: "Water & Reservoir Networks" },
  transport:   { tr: "Ulaşım & Lojistik Ağları",   en: "Transport & Logistics" },
  datacenters: { tr: "Yapay Zeka Veri Merkezleri",  en: "AI Data Centers" },
};

const CATEGORY_TABS = [
  { id: "all",        tr: "Tümü",          en: "All" },
  { id: "elektrik",   tr: "Santraller",    en: "Power Plants" },
  { id: "datacenter", tr: "AI DC",         en: "AI DCs" },
  { id: "su",         tr: "Su & Baraj",    en: "Water" },
  { id: "ulasim",     tr: "Ulaşım Hub",    en: "Transit Hub" },
];

export default function ExplorePage({ lang = "tr", activeNav = "explore" }: ExplorePageProps) {
  const [selectedAsset, setSelectedAsset] = useState<HotspotLocation | null>(null);
  const [dockExpanded, setDockExpanded] = useState(false);
  const [locations, setLocations] = useState<HotspotLocation[]>(REAL_LOCATIONS);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTab, setSelectedTab] = useState<string>("all");
  const [sortBy, setSortBy] = useState<"capacity" | "name" | "country">("capacity");
  const [displayCount, setDisplayCount] = useState(30);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (activeNav === "telemetry") {
      setDockExpanded(true);
    }
  }, [activeNav]);

  useEffect(() => {
    let isMounted = true;
    (async () => {
      try {
        const res = await fetch("/data/facilities.json");
        if (!res.ok || !isMounted) return;
        const data: HotspotLocation[] = await res.json();
        if (data.length > 0 && isMounted) setLocations(data);
      } catch {}
    })();
    return () => { isMounted = false; };
  }, []);

  const activeCategory = useMemo(() => {
    if (activeNav === "energy")      return "elektrik";
    if (activeNav === "water")       return "su";
    if (activeNav === "transport")   return "ulasim";
    if (activeNav === "datacenters") return "datacenter";
    return selectedTab;
  }, [activeNav, selectedTab]);

  const globeAssets = useMemo(() =>
    activeCategory === "all" ? locations : locations.filter(a => a.category === activeCategory),
    [locations, activeCategory]
  );

  const deckAssets = useMemo(() => {
    let list = globeAssets;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(a =>
        a.name.toLowerCase().includes(q) ||
        a.country.toLowerCase().includes(q) ||
        a.type.toLowerCase().includes(q)
      );
    }
    if (sortBy === "capacity") {
      list = [...list].sort((a, b) =>
        (parseInt(b.capacity.replace(/[^0-9]/g, "")) || 0) -
        (parseInt(a.capacity.replace(/[^0-9]/g, "")) || 0)
      );
    } else if (sortBy === "name") {
      list = [...list].sort((a, b) => a.name.localeCompare(b.name));
    } else {
      list = [...list].sort((a, b) => a.country.localeCompare(b.country));
    }
    return list;
  }, [globeAssets, searchQuery, sortBy]);

  const totalMW = useMemo(() =>
    locations.filter(a => a.category === "elektrik")
      .reduce((s, a) => s + (parseInt(a.capacity.replace(/[^0-9]/g, "")) || 0), 0),
    [locations]
  );
  const totalDC        = useMemo(() => locations.filter(a => a.category === "datacenter").length, [locations]);
  const totalWater     = useMemo(() => locations.filter(a => a.category === "su").length, [locations]);
  const totalTransport = useMemo(() => locations.filter(a => a.category === "ulasim").length, [locations]);

  const [telemetryRailOpen, setTelemetryRailOpen] = useState(true);

  useEffect(() => {
    const handleOpenSearch = () => {
      setDockExpanded(true);
      setTimeout(() => {
        const input = document.getElementById("deck-search-input");
        if (input) {
          input.focus();
          (input as HTMLInputElement).select();
        }
      }, 150);
    };
    window.addEventListener("dona:open-search", handleOpenSearch);
    return () => window.removeEventListener("dona:open-search", handleOpenSearch);
  }, []);

  const activeLabel = ACTIVE_LABELS[activeNav] ?? ACTIVE_LABELS["explore"];

  return (
    <div style={{ position: "relative", height: "100%", width: "100%", overflow: "hidden", background: "var(--obsidian-dark)", userSelect: "none" }}>

      {/* ── Full-Screen 3D Globe ─────────────────────────────────────────── */}
      <Suspense fallback={
        <div style={{
          position: "absolute", inset: 0,
          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
          background: "var(--obsidian-dark)", zIndex: 10,
          gap: "1rem",
        }}>
          <div style={{
            width: 48, height: 48, borderRadius: "50%",
            border: `2px solid ${GOLD}`,
            borderTopColor: "transparent",
            animation: "spin 1s linear infinite",
            boxShadow: `0 0 18px ${GOLD}`,
          }} />
          <span style={{
            fontFamily: "var(--font-mono)", fontSize: "0.68rem", fontWeight: 700,
            letterSpacing: "0.15em", textTransform: "uppercase", color: GOLD_BRIGHT,
          }}>
            {lang === "tr" ? "NASA 3D Küre Yükleniyor..." : "Loading NASA 3D Globe..."}
          </span>
        </div>
      }>
        <GlobeCanvas
          locations={globeAssets}
          activeFilter={activeCategory}
          selectedAsset={selectedAsset}
          onSelectAsset={(loc) => setSelectedAsset(loc)}
          lang={lang}
        />
      </Suspense>

      {/* ── Vignette Overlay ─────────────────────────────────────────────── */}
      <div className="dn-vignette" style={{ pointerEvents: "none", position: "absolute", inset: 0 }} />

      {/* ── Scanline Grid (desktop) ──────────────────────────────────────── */}
      <div className="dn-grid-bg desktop-only" style={{
        pointerEvents: "none", position: "absolute", inset: 0, opacity: 0.3, zIndex: 1,
      }} />

      {/* ── Top Floating Info Bar (Centered below header, clear of sidebar) ─ */}
      <div style={{
        position: "absolute",
        top: isMobile ? 42 : 52,
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 25,
        pointerEvents: "auto",
        display: "flex",
        alignItems: "center",
        gap: isMobile ? 4 : 10,
      }}>
        {/* Active Layer Micro-Capsule (Ultra-sleek on mobile) */}
        <motion.div
          key={activeNav}
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            display: "inline-flex", alignItems: "center",
            gap: isMobile ? 5 : 8,
            borderRadius: 9999, border: `1px solid ${GOLD_BORDER}`,
            background: "rgba(6, 7, 12, 0.35)",
            padding: isMobile ? "2px 8px" : "4px 12px",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            boxShadow: "0 6px 24px rgba(0,0,0,0.4), 0 0 12px rgba(212,175,55,0.06)",
          }}
        >
          <Layers style={{ width: isMobile ? 10 : 12, height: isMobile ? 10 : 12, color: GOLD, flexShrink: 0 }} />
          <span style={{
            fontFamily: "var(--font-mono)",
            fontSize: isMobile ? "0.52rem" : "0.64rem",
            fontWeight: 700,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "var(--text-main)",
          }}>
            {lang === "tr" ? activeLabel.tr : activeLabel.en}
          </span>
          <span style={{
            borderRadius: 9999,
            background: "rgba(212,175,55,0.14)",
            border: `1px solid ${GOLD_BORDER}`,
            padding: isMobile ? "1px 5px" : "1px 6px",
            fontFamily: "var(--font-mono)",
            fontSize: isMobile ? "0.46rem" : "0.54rem",
            fontWeight: 700,
            letterSpacing: "0.06em",
            color: GOLD_BRIGHT,
          }}>
            {globeAssets.length.toLocaleString()} {lang === "tr" ? "Tesis" : "Assets"}
          </span>
        </motion.div>
      </div>

      {/* ── Vertical Telemetry HUD (Slide-In / Collapsible Live Grid HUD) ────── */}
      <AnimatePresence>
        {!selectedAsset && !telemetryRailOpen && (
          <motion.button
            key="hud-toggle-tab"
            id="telemetry-rail-open-tab"
            initial={{ x: 40, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 40, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            onClick={() => setTelemetryRailOpen(true)}
            title={lang === "tr" ? "Canlı Telemetri Izgarasını Aç" : "Open Live Telemetry Grid"}
            style={{
              position: "fixed",
              right: 0,
              top: "50%",
              transform: "translateY(-50%)",
              zIndex: 38,
              display: "flex",
              flexDirection: "column",
              width: 26,
              height: 96,
              alignItems: "center",
              justifyContent: "center",
              gap: 6,
              borderRadius: "10px 0 0 10px",
              border: `1px solid ${GOLD_BORDER}`,
              borderRight: "none",
              background: "rgba(7, 8, 14, 0.78)",
              backdropFilter: "none",
              WebkitBackdropFilter: "none",
              color: GOLD_BRIGHT,
              boxShadow: "none",
              cursor: "pointer",
              padding: "8px 0",
              pointerEvents: "auto",
              touchAction: "manipulation",
              WebkitTapHighlightColor: "transparent",
              transition: "all 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
            aria-label="Telemetri Izgarasını Aç"
          >
            <ChevronLeft style={{ width: 14, height: 14, color: GOLD, strokeWidth: 2.5 }} />
            <span style={{
              width: 5,
              height: 5,
              borderRadius: "50%",
              background: "#34d399",
              boxShadow: "0 0 6px #34d399",
              animation: "dn-pulse-glow 2s infinite",
            }} />
            <span style={{
              writingMode: "vertical-rl",
              transform: "rotate(180deg)",
              fontFamily: "var(--font-mono)",
              fontSize: "0.54rem",
              fontWeight: 800,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: GOLD,
            }}>
              {lang === "tr" ? "TELEMETRİ" : "TELEMETRY"}
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Main HUD Aside: Full live grid on desktop and mobile when open */}
      {!selectedAsset && telemetryRailOpen && (
        <aside
          id="vertical-telemetry-rail"
          style={isMobile ? {
            position: "fixed",
            right: 8,
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 35,
            pointerEvents: "auto",
            display: "flex",
            flexDirection: "column",
            gap: 5,
            borderRadius: 12,
            border: `1px solid ${GOLD_BORDER}`,
            background: "rgba(7, 8, 14, 0.72)",
            padding: "8px 8px",
            backdropFilter: "none",
            WebkitBackdropFilter: "none",
            boxShadow: "none",
            width: 96,
            userSelect: "none",
          } : {
            position: "fixed",
            right: 14,
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 35,
            pointerEvents: "auto",
            display: "flex",
            flexDirection: "column",
            gap: 7,
            borderRadius: 16,
            border: `1px solid ${GOLD_BORDER}`,
            background: "rgba(7, 8, 14, 0.72)",
            padding: "12px 11px",
            backdropFilter: "none",
            WebkitBackdropFilter: "none",
            boxShadow: "none",
            width: 140,
            userSelect: "none",
          }}
        >
          {/* Edge Tab on the left of open HUD — user immediately knows where to close it on mobile & desktop */}
          <button
            onClick={() => setTelemetryRailOpen(false)}
            style={{
              position: "absolute",
              left: -26,
              top: "50%",
              transform: "translateY(-50%)",
              zIndex: 35,
              display: "flex",
              flexDirection: "column",
              width: 26,
              height: 96,
              alignItems: "center",
              justifyContent: "center",
              gap: 6,
              borderRadius: "10px 0 0 10px",
              border: `1px solid ${GOLD_BORDER}`,
              borderRight: "none",
              background: "rgba(7, 8, 14, 0.94)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              color: GOLD_BRIGHT,
              boxShadow: `-4px 0 20px rgba(0,0,0,0.7), 0 0 14px rgba(212,175,55,0.2)`,
              cursor: "pointer",
              padding: "8px 0",
              touchAction: "manipulation",
              WebkitTapHighlightColor: "transparent",
              transition: "all 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
            title={lang === "tr" ? "Telemetri Izgarasını Kapat" : "Collapse Telemetry Grid"}
            aria-label="Telemetri Izgarasını Kapat"
          >
            <ChevronRight style={{ width: 14, height: 14, color: GOLD, strokeWidth: 2.5 }} />
            <span style={{
              width: 5,
              height: 5,
              borderRadius: "50%",
              background: "#34d399",
              boxShadow: "0 0 6px #34d399",
              animation: "dn-pulse-glow 2s infinite",
            }} />
            <span style={{
              writingMode: "vertical-rl",
              transform: "rotate(180deg)",
              fontFamily: "var(--font-mono)",
              fontSize: "0.54rem",
              fontWeight: 800,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: GOLD,
            }}>
              {lang === "tr" ? "KAPAT" : "CLOSE"}
            </span>
          </button>

          {/* Rail Header with Slide-Out Close Button on Desktop */}
          <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingBottom: isMobile ? 3 : 6,
            borderBottom: `1px solid ${GOLD_BORDER}`,
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
              <span style={{
                width: isMobile ? 4 : 6,
                height: isMobile ? 4 : 6,
                borderRadius: "50%",
                background: "#34d399",
                boxShadow: "0 0 8px #34d399",
                animation: "dn-pulse-glow 2s infinite",
              }} />
              <span style={{
                fontFamily: "var(--font-mono)",
                fontSize: isMobile ? "0.46rem" : "0.56rem",
                fontWeight: 800,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: GOLD_BRIGHT,
              }}>
                {lang === "tr" ? "TELEMETRİ" : "TELEMETRY"}
              </span>
            </div>

            <button
              onClick={() => setTelemetryRailOpen(false)}
              title={lang === "tr" ? "Izgarayı Gizle" : "Collapse Grid"}
              style={{
                background: "transparent",
                border: "none",
                color: "var(--text-muted)",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: isMobile ? "2px 4px" : 2,
                borderRadius: 4,
                transition: "all 0.15s ease",
              }}
            >
              <ChevronRight style={{ width: 13, height: 13, color: "var(--text-muted)" }} />
            </button>
          </div>

          {/* 1: GÜÇ / POWER */}
          <div style={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            padding: isMobile ? "3px 5px" : "6px 7px",
            borderRadius: 8,
            background: "rgba(212,175,55,0.04)",
            border: `1px solid ${GOLD_BORDER}`,
          }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 3 }}>
                <Zap style={{ width: isMobile ? 9 : 11, height: isMobile ? 9 : 11, color: GOLD }} />
                <span style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: isMobile ? "0.44rem" : "0.52rem",
                  fontWeight: 700,
                  letterSpacing: "0.06em",
                  color: "var(--text-muted)",
                  textTransform: "uppercase",
                }}>
                  {lang === "tr" ? "GÜÇ" : "POWER"}
                </span>
              </div>
              {!isMobile && (
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.46rem", color: "#34d399", fontWeight: 700 }}>
                  %91.2
                </span>
              )}
            </div>
            <span style={{
              fontFamily: "var(--font-mono)",
              fontSize: isMobile ? "0.70rem" : "0.82rem",
              fontWeight: 800,
              color: GOLD_BRIGHT,
              lineHeight: 1.1,
            }}>
              {(totalMW / 1000).toFixed(0)}k <span style={{ fontSize: isMobile ? "0.48rem" : "0.56rem", fontWeight: 600, color: "var(--text-muted)" }}>MW</span>
            </span>
          </div>

          {/* 2: AI DC COMPUTE */}
          <div style={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            padding: isMobile ? "3px 5px" : "6px 7px",
            borderRadius: 8,
            background: "rgba(212,175,55,0.04)",
            border: `1px solid ${GOLD_BORDER}`,
          }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 3 }}>
                <Server style={{ width: isMobile ? 9 : 11, height: isMobile ? 9 : 11, color: GOLD }} />
                <span style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: isMobile ? "0.44rem" : "0.52rem",
                  fontWeight: 700,
                  letterSpacing: "0.06em",
                  color: "var(--text-muted)",
                  textTransform: "uppercase",
                }}>
                  AI DC
                </span>
              </div>
              {!isMobile && (
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.46rem", color: GOLD, fontWeight: 700 }}>
                  T-IV
                </span>
              )}
            </div>
            <span style={{
              fontFamily: "var(--font-mono)",
              fontSize: isMobile ? "0.70rem" : "0.82rem",
              fontWeight: 800,
              color: GOLD_BRIGHT,
              lineHeight: 1.1,
            }}>
              {totalDC} <span style={{ fontSize: isMobile ? "0.48rem" : "0.56rem", fontWeight: 600, color: "var(--text-muted)" }}>{lang === "tr" ? "Düğüm" : "Nodes"}</span>
            </span>
          </div>

          {/* 3: SU / WATER */}
          <div style={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            padding: isMobile ? "3px 5px" : "6px 7px",
            borderRadius: 8,
            background: "rgba(212,175,55,0.04)",
            border: `1px solid ${GOLD_BORDER}`,
          }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 3 }}>
                <Droplets style={{ width: isMobile ? 9 : 11, height: isMobile ? 9 : 11, color: GOLD }} />
                <span style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: isMobile ? "0.44rem" : "0.52rem",
                  fontWeight: 700,
                  letterSpacing: "0.06em",
                  color: "var(--text-muted)",
                  textTransform: "uppercase",
                }}>
                  {lang === "tr" ? "SU" : "WATER"}
                </span>
              </div>
              {!isMobile && (
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.46rem", color: "#60a5fa", fontWeight: 700 }}>
                  %78.6
                </span>
              )}
            </div>
            <span style={{
              fontFamily: "var(--font-mono)",
              fontSize: isMobile ? "0.70rem" : "0.82rem",
              fontWeight: 800,
              color: GOLD_BRIGHT,
              lineHeight: 1.1,
            }}>
              {totalWater} <span style={{ fontSize: isMobile ? "0.48rem" : "0.56rem", fontWeight: 600, color: "var(--text-muted)" }}>{lang === "tr" ? "Havza" : "Basins"}</span>
            </span>
          </div>

          {/* 4: TRANSİT / LOGISTICS (Desktop Extended) */}
          {!isMobile && (
            <div style={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              padding: "6px 7px",
              borderRadius: 8,
              background: "rgba(212,175,55,0.04)",
              border: `1px solid ${GOLD_BORDER}`,
            }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 3 }}>
                  <Truck style={{ width: 11, height: 11, color: GOLD }} />
                  <span style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.52rem",
                    fontWeight: 700,
                    letterSpacing: "0.06em",
                    color: "var(--text-muted)",
                    textTransform: "uppercase",
                  }}>
                    {lang === "tr" ? "TRANSİT" : "TRANSIT"}
                  </span>
                </div>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.46rem", color: "#f5d77f", fontWeight: 700 }}>
                  AKTİF
                </span>
              </div>
              <span style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.82rem",
                fontWeight: 800,
                color: GOLD_BRIGHT,
                lineHeight: 1.1,
              }}>
                {totalTransport || 184} <span style={{ fontSize: "0.56rem", fontWeight: 600, color: "var(--text-muted)" }}>{lang === "tr" ? "Hub" : "Hubs"}</span>
              </span>
            </div>
          )}

          {/* 5: SATELLITE LATENCY STREAM (Desktop Extended) */}
          {!isMobile && (
            <div style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "5px 7px",
              borderRadius: 8,
              background: "rgba(16,185,129,0.05)",
              border: "1px solid rgba(16,185,129,0.25)",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                <Wifi style={{ width: 10, height: 10, color: "#34d399" }} />
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.5rem", fontWeight: 700, color: "#34d399" }}>
                  12ms LIVE
                </span>
              </div>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.46rem", color: "var(--text-muted)" }}>
                SENTINEL-2
              </span>
            </div>
          )}

          {/* Rail Footer Status & Expand Trigger */}
          <div
            onClick={() => setDockExpanded(d => !d)}
            style={{
              paddingTop: isMobile ? 3 : 5,
              borderTop: `1px solid ${GOLD_BORDER}`,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 2,
              cursor: "pointer",
            }}
          >
            <span style={{
              fontFamily: "var(--font-mono)",
              fontSize: isMobile ? "0.42rem" : "0.5rem",
              color: GOLD_BRIGHT,
              letterSpacing: "0.06em",
              textAlign: "center",
              fontWeight: 700,
            }}>
              {lang === "tr" ? "%99.8 DOĞRULUK" : "99.8% ACCURACY"}
            </span>
            {!isMobile && (
              <span style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.44rem",
                color: "var(--text-muted)",
                letterSpacing: "0.04em",
              }}>
                {dockExpanded ? (lang === "tr" ? "▲ GÜVERTE AÇIK" : "▲ DOCK OPEN") : (lang === "tr" ? "▼ GÜVERTEYİ AÇ" : "▼ OPEN DOCK")}
              </span>
            )}
          </div>
        </aside>
      )}

      {/* ── Bottom Telemetry Deck: Fixed center positioning, sleek HUD Tab design ────── */}
      <div
        id="telemetry-deck-dock"
        style={{
          position: "absolute",
          bottom: isMobile ? 64 : 16,
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: isMobile ? 50 : 22,
          pointerEvents: "auto",
          width: isMobile ? "calc(100% - 16px)" : "min(760px, calc(100vw - 40px))",
          maxWidth: isMobile ? 440 : 760,
          padding: "0",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          transition: "bottom 0.28s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        {/* Sleek Top HUD Tab for Bottom Deck — matching the unified edge tab style! */}
        <button
          onClick={() => setDockExpanded(d => !d)}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            padding: isMobile ? "9px 18px" : "6px 18px",
            minHeight: isMobile ? 46 : 38,
            borderRadius: "10px 10px 0 0",
            border: `1px solid ${GOLD_BORDER}`,
            borderBottom: "none",
            background: "rgba(7, 8, 14, 0.78)",
            backdropFilter: "none",
            WebkitBackdropFilter: "none",
            color: GOLD_BRIGHT,
            cursor: "pointer",
            boxShadow: "none",
            transition: "all 0.2s ease",
            userSelect: "none",
            touchAction: "manipulation",
            WebkitTapHighlightColor: "transparent",
          }}
          title={dockExpanded ? (lang === "tr" ? "Güverteyi Gizle" : "Collapse Deck") : (lang === "tr" ? "Küresel Telemetri Güvertesini Aç" : "Expand Telemetry Deck")}
        >
          {dockExpanded
            ? <ChevronDown style={{ width: 14, height: 14, color: GOLD, strokeWidth: 2.5 }} />
            : <ChevronUp style={{ width: 14, height: 14, color: GOLD, strokeWidth: 2.5 }} />
          }
          <Activity style={{ width: 13, height: 13, color: "#34d399", animation: "dn-pulse-glow 2s infinite" }} />
          <span style={{
            fontFamily: "var(--font-mono)",
            fontSize: isMobile ? "0.62rem" : "0.64rem",
            fontWeight: 800,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: GOLD_BRIGHT,
          }}>
            {lang === "tr" ? "KÜRESEL TELEMETRİ GÜVERTESİ" : "GLOBAL TELEMETRY DECK"}
          </span>
          <span style={{
            borderRadius: 9999,
            background: "rgba(16,185,129,0.12)",
            border: "1px solid rgba(16,185,129,0.35)",
            padding: "2px 7px",
            fontFamily: "var(--font-mono)",
            fontSize: "0.54rem",
            fontWeight: 700,
            color: "#34d399",
          }}>
            {locations.length.toLocaleString()}
          </span>
          <span style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.54rem",
            fontWeight: 700,
            color: GOLD_BRIGHT,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            marginLeft: 4,
            padding: "2px 8px",
            borderRadius: 6,
            background: "rgba(212,175,55,0.12)",
            border: "1px solid rgba(212,175,55,0.25)",
          }}>
            {dockExpanded ? (lang === "tr" ? "KAPAT" : "CLOSE") : (lang === "tr" ? "AÇ" : "OPEN")}
          </span>
        </button>

        {/* Deck Expanded Content Box */}
        <AnimatePresence>
          {dockExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.28 }}
              style={{
                width: "100%",
                borderRadius: 14,
                border: `1px solid ${GOLD_BORDER}`,
                background: "rgba(7, 8, 14, 0.75)",
                backdropFilter: "none",
                WebkitBackdropFilter: "none",
                boxShadow: "none",
                overflow: "hidden",
                padding: isMobile ? "10px 12px" : "14px 18px",
                display: "flex",
                flexDirection: "column",
                gap: 12,
                maxHeight: isMobile ? "66vh" : 360,
                overflowY: "auto",
              }}
            >
              {/* Controls: Tabs + Search + Sort (Unified geometric layout, no awkward wrapping on desktop) */}
                <div style={{
                  display: "flex",
                  flexDirection: isMobile ? "column" : "row",
                  alignItems: isMobile ? "stretch" : "center",
                  justifyContent: "space-between",
                  gap: isMobile ? 8 : 12,
                  paddingBottom: 10,
                  borderBottom: `1px solid ${GOLD_BORDER}`,
                  width: "100%",
                  boxSizing: "border-box",
                }}>
                  {/* Category Pills (Equal height 28px, crisp tactile gold border, smooth scroll with no cutoff) */}
                  <div style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    overflowX: "auto",
                    flex: "1 1 auto",
                    minWidth: 0,
                    paddingBottom: isMobile ? 2 : 0,
                    scrollbarWidth: "none",
                  }}>
                    {CATEGORY_TABS.map(tab => {
                      const isSel = selectedTab === tab.id;
                      return (
                        <button
                          key={tab.id}
                          onClick={() => setSelectedTab(tab.id)}
                          style={{
                            height: 28,
                            padding: isMobile ? "0 9px" : "0 11px",
                            display: "inline-flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: 5,
                            borderRadius: 9999,
                            border: `1px solid ${isSel ? GOLD : "rgba(212,175,55,0.22)"}`,
                            background: isSel ? "rgba(212,175,55,0.16)" : "rgba(7,8,14,0.6)",
                            fontFamily: "var(--font-mono)",
                            fontSize: "0.58rem",
                            fontWeight: 700,
                            letterSpacing: "0.04em",
                            textTransform: "uppercase",
                            color: isSel ? GOLD_BRIGHT : "var(--text-muted)",
                            cursor: "pointer",
                            transition: "all 0.18s ease",
                            whiteSpace: "nowrap",
                            flexShrink: 0,
                            boxShadow: isSel ? `0 0 12px rgba(212,175,55,0.25)` : "none",
                            boxSizing: "border-box",
                            touchAction: "manipulation",
                            WebkitTapHighlightColor: "transparent",
                          }}
                        >
                          <span style={{
                            width: 5, height: 5, borderRadius: "50%",
                            background: isSel ? "#34d399" : "rgba(212,175,55,0.4)",
                            boxShadow: isSel ? "0 0 6px #34d399" : "none",
                            flexShrink: 0,
                          }} />
                          <span>{lang === "tr" ? tab.tr : tab.en}</span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Search + Sort (Matched to 28px height, razor-sharp alignment) */}
                  <div style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    flexShrink: 0,
                    width: isMobile ? "100%" : "auto",
                  }}>
                    <div style={{ position: "relative", flex: isMobile ? 1 : "initial" }}>
                      <Search style={{
                        position: "absolute",
                        left: 9,
                        top: "50%",
                        transform: "translateY(-50%)",
                        width: 12,
                        height: 12,
                        color: "var(--text-muted)",
                        pointerEvents: "none",
                      }} />
                      <input
                        id="deck-search-input"
                        type="text"
                        value={searchQuery}
                        onChange={e => setSearchQuery(e.target.value)}
                        placeholder={lang === "tr" ? "Tesis veya ülke ara..." : "Search facility..."}
                        style={{
                          height: 28,
                          borderRadius: 9999,
                          border: `1px solid ${GOLD_BORDER}`,
                          background: "rgba(0,0,0,0.45)",
                          paddingLeft: 26,
                          paddingRight: 10,
                          fontFamily: "var(--font-mono)",
                          fontSize: "0.60rem",
                          color: "var(--text-main)",
                          width: isMobile ? "100%" : 145,
                          outline: "none",
                          boxSizing: "border-box",
                          transition: "border-color 0.2s ease",
                        }}
                      />
                    </div>

                    <select
                      value={sortBy}
                      onChange={e => setSortBy(e.target.value as any)}
                      style={{
                        height: 28,
                        borderRadius: 9999,
                        border: `1px solid ${GOLD_BORDER}`,
                        background: "rgba(0,0,0,0.55)",
                        padding: "0 10px",
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.60rem",
                        fontWeight: 600,
                        color: "var(--text-muted)",
                        outline: "none",
                        cursor: "pointer",
                        boxSizing: "border-box",
                      }}
                    >
                      <option value="capacity" style={{ background: "#0a0b12" }}>
                        {lang === "tr" ? "Kapasite" : "Capacity"}
                      </option>
                      <option value="name" style={{ background: "#0a0b12" }}>
                        {lang === "tr" ? "A-Z" : "A-Z"}
                      </option>
                      <option value="country" style={{ background: "#0a0b12" }}>
                        {lang === "tr" ? "Ülke" : "Country"}
                      </option>
                    </select>
                  </div>
                </div>

                {/* Facility Cards Grid */}
                <div style={{
                  display: "grid",
                  gridTemplateColumns: isMobile
                    ? "1fr"
                    : (Boolean(selectedAsset)
                      ? "repeat(auto-fill, minmax(195px, 1fr))"
                      : "repeat(auto-fill, minmax(230px, 1fr))"),
                  gap: 10,
                }}>
                  {deckAssets.slice(0, displayCount).map(asset => (
                    <div
                      key={asset.id}
                      onClick={() => {
                        setSelectedAsset(asset);
                        if (isMobile) setDockExpanded(false);
                      }}
                      style={{
                        cursor: "pointer",
                        borderRadius: 10,
                        border: `1px solid ${GOLD_BORDER}`,
                        background: "rgba(6, 7, 12, 0.28)",
                        padding: "10px 12px",
                        transition: "all 0.18s cubic-bezier(0.16,1,0.3,1)",
                        position: "relative",
                        overflow: "hidden",
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 8, marginBottom: 5 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 6, minWidth: 0 }}>
                          <span style={{ fontSize: "1rem" }}>{asset.flagEmoji}</span>
                          <h4 style={{
                            fontFamily: "var(--font-sans)", fontSize: "0.75rem", fontWeight: 700,
                            color: "var(--text-main)", overflow: "hidden", whiteSpace: "nowrap",
                            textOverflow: "ellipsis", margin: 0,
                          }}>
                            {asset.name}
                          </h4>
                        </div>
                        <MapPin style={{ width: 12, height: 12, color: GOLD, flexShrink: 0 }} />
                      </div>

                      <div style={{
                        display: "flex", alignItems: "center", justifyContent: "space-between",
                        fontFamily: "var(--font-mono)", fontSize: "0.62rem", marginBottom: 8,
                      }}>
                        <span style={{ color: "var(--text-muted)", overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis" }}>
                          {asset.type}
                        </span>
                        <span style={{
                          fontWeight: 700, color: GOLD_BRIGHT, flexShrink: 0, marginLeft: 4,
                          background: "rgba(212,175,55,0.1)", border: `1px solid ${GOLD_BORDER}`,
                          borderRadius: 4, padding: "1px 5px",
                        }}>
                          {asset.capacity}
                        </span>
                      </div>

                      <div style={{
                        display: "flex", alignItems: "center", justifyContent: "space-between",
                        paddingTop: 6, borderTop: `1px solid ${GOLD_BORDER}`,
                        fontFamily: "var(--font-mono)", fontSize: "0.6rem",
                      }}>
                        <span style={{ color: "var(--text-muted)", overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis" }}>
                          {asset.country}
                        </span>
                        <span style={{ color: GOLD_BRIGHT, fontWeight: 700, flexShrink: 0 }}>
                          {lang === "tr" ? "Telemetriyi İncele →" : "View Telemetry →"}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Load More & Pagination Indicator */}
                {deckAssets.length > displayCount && (
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12, marginTop: 14 }}>
                    <button
                      onClick={() => setDisplayCount(prev => Math.min(prev + 60, deckAssets.length))}
                      style={{
                        padding: "8px 18px",
                        borderRadius: 8,
                        background: "rgba(212, 175, 55, 0.12)",
                        border: `1px solid ${GOLD_BORDER}`,
                        color: GOLD_BRIGHT,
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.68rem",
                        fontWeight: 700,
                        cursor: "pointer",
                        letterSpacing: "0.06em",
                        transition: "all 0.2s ease",
                      }}
                    >
                      {lang === "tr"
                        ? `Daha Fazla Göster (+60) — [${Math.min(displayCount, deckAssets.length)} / ${deckAssets.length.toLocaleString()}]`
                        : `Load More (+60) — [${Math.min(displayCount, deckAssets.length)} / ${deckAssets.length.toLocaleString()}]`}
                    </button>
                    <button
                      onClick={() => setDisplayCount(deckAssets.length)}
                      style={{
                        padding: "8px 16px",
                        borderRadius: 8,
                        background: "rgba(255, 255, 255, 0.04)",
                        border: "1px solid rgba(255, 255, 255, 0.12)",
                        color: "var(--text-muted)",
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.66rem",
                        cursor: "pointer",
                        transition: "all 0.2s ease",
                      }}
                    >
                      {lang === "tr" ? "Tümünü Yükle" : "Load All"}
                    </button>
                  </div>
                )}

                {deckAssets.length === 0 && (
                  <div style={{
                    padding: "2rem", textAlign: "center",
                    fontFamily: "var(--font-mono)", fontSize: "0.68rem", color: "var(--text-muted)",
                  }}>
                    {lang === "tr" ? "Aramanızla eşleşen tesis bulunamadı." : "No facilities match your search."}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

        {/* Official Copyright Line */}
        <div style={{
          textAlign: "center",
          paddingTop: 8,
          paddingBottom: 2,
          fontFamily: "var(--font-mono)",
          fontSize: "0.58rem",
          letterSpacing: "0.08em",
          color: "rgba(163, 155, 141, 0.65)",
        }}>
          © 2026 Dona Codex. All rights reserved.
        </div>
      </div>

      {/* ── Asset Detail Panel ───────────────────────────────────────────── */}
      <AssetDetailPanel
        asset={selectedAsset}
        onClose={() => setSelectedAsset(null)}
        lang={lang}
      />

      {/* Spin animation for loader */}
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
