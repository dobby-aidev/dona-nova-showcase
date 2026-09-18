"use client";

import React, { Suspense, useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GlobeCanvas, REAL_LOCATIONS, HotspotLocation } from "@/components/globe/GlobeCanvas";
import { AssetDetailPanel } from "@/components/ui/AssetDetailPanel";
import {
  Activity, MapPin, ChevronUp, ChevronDown,
  Layers, Search, Zap, Droplets, Server,
} from "lucide-react";

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
  const totalDC    = useMemo(() => locations.filter(a => a.category === "datacenter").length, [locations]);
  const totalWater = useMemo(() => locations.filter(a => a.category === "su").length, [locations]);

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
        top: 52,
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 25,
        pointerEvents: "auto",
        display: "flex",
        alignItems: "center",
        gap: 10,
      }}>
        {/* Active Layer Micro-Capsule (Shrunk as requested in Screenshot 1) */}
        <motion.div
          key={activeNav}
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            borderRadius: 9999, border: `1px solid ${GOLD_BORDER}`,
            background: "rgba(6, 7, 12, 0.2)",
            padding: "4px 12px",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            boxShadow: "0 6px 24px rgba(0,0,0,0.4), 0 0 12px rgba(212,175,55,0.06)",
          }}
        >
          <Layers style={{ width: 12, height: 12, color: GOLD, flexShrink: 0 }} />
          <span style={{
            fontFamily: "var(--font-mono)", fontSize: "0.64rem", fontWeight: 700,
            letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--text-main)",
          }}>
            {lang === "tr" ? activeLabel.tr : activeLabel.en}
          </span>
          <span style={{
            borderRadius: 9999, background: "rgba(212,175,55,0.12)", border: `1px solid ${GOLD_BORDER}`,
            padding: "1px 6px", fontFamily: "var(--font-mono)", fontSize: "0.54rem",
            fontWeight: 700, letterSpacing: "0.06em", color: GOLD_BRIGHT,
          }}>
            {globeAssets.length.toLocaleString()} {lang === "tr" ? "Tesis" : "Assets"}
          </span>
        </motion.div>
      </div>

      {/* ── Vertical Telemetry Rail (Shrunk & Translucent as requested) ────── */}
      <aside
        className="desktop-only"
        style={{
          position: "absolute",
          right: 14,
          top: "46%",
          transform: "translateY(-50%)",
          zIndex: 25,
          pointerEvents: "auto",
          display: "flex",
          flexDirection: "column",
          gap: 8,
          borderRadius: 14,
          border: `1px solid ${GOLD_BORDER}`,
          background: "rgba(6, 7, 12, 0.18)",
          padding: "10px 10px",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          boxShadow: "0 10px 36px rgba(0,0,0,0.5), 0 0 18px rgba(212,175,55,0.05)",
          width: 118,
          userSelect: "none",
        }}
      >
        {/* Rail Header */}
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          paddingBottom: 5,
          borderBottom: `1px solid ${GOLD_BORDER}`,
        }}>
          <span style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.52rem",
            fontWeight: 700,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "rgba(163,155,141,0.65)",
          }}>
            {lang === "tr" ? "TELEMETRİ" : "TELEMETRY"}
          </span>
          <span style={{
            width: 5,
            height: 5,
            borderRadius: "50%",
            background: "#34d399",
            boxShadow: "0 0 6px #34d399",
            animation: "dn-pulse-glow 2s infinite",
          }} />
        </div>

        {/* 1: GÜÇ / POWER */}
        <div style={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          padding: "5px 6px",
          borderRadius: 8,
          background: "rgba(212,175,55,0.03)",
          border: `1px solid ${GOLD_BORDER}`,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <Zap style={{ width: 10, height: 10, color: GOLD }} />
            <span style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.5rem",
              fontWeight: 700,
              letterSpacing: "0.06em",
              color: "var(--text-muted)",
              textTransform: "uppercase",
            }}>
              GÜÇ
            </span>
          </div>
          <span style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.78rem",
            fontWeight: 800,
            color: GOLD_BRIGHT,
            lineHeight: 1.1,
          }}>
            {(totalMW / 1000).toFixed(0)}k <span style={{ fontSize: "0.54rem", fontWeight: 600, color: "var(--text-muted)" }}>MW</span>
          </span>
        </div>

        {/* 2: AI DC */}
        <div style={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          padding: "5px 6px",
          borderRadius: 8,
          background: "rgba(212,175,55,0.03)",
          border: `1px solid ${GOLD_BORDER}`,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <Server style={{ width: 10, height: 10, color: GOLD }} />
            <span style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.5rem",
              fontWeight: 700,
              letterSpacing: "0.06em",
              color: "var(--text-muted)",
              textTransform: "uppercase",
            }}>
              AI DC
            </span>
          </div>
          <span style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.78rem",
            fontWeight: 800,
            color: GOLD_BRIGHT,
            lineHeight: 1.1,
          }}>
            {totalDC} <span style={{ fontSize: "0.54rem", fontWeight: 600, color: "var(--text-muted)" }}>{lang === "tr" ? "Düğüm" : "Nodes"}</span>
          </span>
        </div>

        {/* 3: SU / WATER */}
        <div style={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          padding: "5px 6px",
          borderRadius: 8,
          background: "rgba(212,175,55,0.03)",
          border: `1px solid ${GOLD_BORDER}`,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <Droplets style={{ width: 10, height: 10, color: GOLD }} />
            <span style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.5rem",
              fontWeight: 700,
              letterSpacing: "0.06em",
              color: "var(--text-muted)",
              textTransform: "uppercase",
            }}>
              SU
            </span>
          </div>
          <span style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.78rem",
            fontWeight: 800,
            color: GOLD_BRIGHT,
            lineHeight: 1.1,
          }}>
            {totalWater} <span style={{ fontSize: "0.54rem", fontWeight: 600, color: "var(--text-muted)" }}>{lang === "tr" ? "Havza" : "Basins"}</span>
          </span>
        </div>

        {/* Rail Footer Status */}
        <div style={{
          paddingTop: 5,
          borderTop: `1px solid ${GOLD_BORDER}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}>
          <span style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.48rem",
            color: "var(--text-muted)",
            letterSpacing: "0.06em",
            textAlign: "center",
          }}>
            %99.8 DOĞRULUK
          </span>
        </div>
      </aside>

      {/* ── Bottom Telemetry Dock ────────────────────────────────────────── */}
      <div style={{
        position: "absolute", bottom: 20,
        left: "50%", transform: "translateX(-50%)",
        zIndex: 20, pointerEvents: "auto",
        width: "100%", maxWidth: 900, padding: "0 16px",
      }}>
        <div style={{
          borderRadius: 16, border: `1px solid ${GOLD_BORDER}`,
          background: "rgba(6, 7, 12, 0.22)",
          backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)",
          boxShadow: "0 16px 50px rgba(0,0,0,0.6), 0 0 24px rgba(212,175,55,0.05)",
          overflow: "hidden",
          transition: "all 0.3s ease",
        }}>
          {/* Dock Header */}
          <div
            onClick={() => setDockExpanded(d => !d)}
            style={{
              display: "flex", alignItems: "center", justifyContent: "space-between",
              padding: "10px 18px", cursor: "pointer",
              borderBottom: dockExpanded ? `1px solid ${GOLD_BORDER}` : "none",
              transition: "background 0.2s ease",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{
                display: "flex", width: 24, height: 24, alignItems: "center", justifyContent: "center",
                borderRadius: 6, background: GOLD_DIM, border: `1px solid ${GOLD_BORDER}`,
              }}>
                <Activity style={{ width: 13, height: 13, color: GOLD, animation: "dn-pulse-glow 2s infinite" }} />
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{
                  fontFamily: "var(--font-mono)", fontSize: "0.68rem", fontWeight: 700,
                  letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--text-main)",
                }}>
                  {lang === "tr" ? "KÜRESEL TELEMETRİ GÜVERTESİ" : "GLOBAL TELEMETRY DECK"}
                </span>
                <span style={{
                  borderRadius: 9999, background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.3)",
                  padding: "2px 8px", fontFamily: "var(--font-mono)", fontSize: "0.58rem",
                  fontWeight: 700, color: "#34d399",
                }}>
                  {locations.length.toLocaleString()} {lang === "tr" ? "Tesis" : "Facilities"}
                </span>
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{
                fontFamily: "var(--font-mono)", fontSize: "0.6rem", fontWeight: 700,
                letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--text-muted)",
              }}>
                {dockExpanded
                  ? (lang === "tr" ? "Kapat" : "Close")
                  : (lang === "tr" ? "Telemetriyi Aç" : "Open Telemetry")}
              </span>
              <div style={{
                display: "flex", width: 20, height: 20, alignItems: "center", justifyContent: "center",
                borderRadius: 6, background: GOLD_DIM, border: `1px solid ${GOLD_BORDER}`,
                color: GOLD,
              }}>
                {dockExpanded
                  ? <ChevronDown style={{ width: 12, height: 12 }} />
                  : <ChevronUp style={{ width: 12, height: 12 }} />}
              </div>
            </div>
          </div>

          {/* Expanded Content */}
          <AnimatePresence>
            {dockExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.28 }}
                style={{ padding: "14px 18px", display: "flex", flexDirection: "column", gap: 12, maxHeight: 360, overflowY: "auto" }}
              >
                {/* Controls: Tabs + Search + Sort */}
                <div style={{
                  display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between",
                  gap: 10, paddingBottom: 12, borderBottom: `1px solid ${GOLD_BORDER}`,
                }}>
                  {/* Category Pills */}
                  <div style={{ display: "flex", alignItems: "center", gap: 6, overflowX: "auto", flexWrap: "nowrap" }}>
                    {CATEGORY_TABS.map(tab => (
                      <button
                        key={tab.id}
                        onClick={() => setSelectedTab(tab.id)}
                        style={{
                          padding: "5px 12px",
                          borderRadius: 9999,
                          border: `1px solid ${selectedTab === tab.id ? GOLD : GOLD_BORDER}`,
                          background: selectedTab === tab.id ? GOLD_DIM : "transparent",
                          fontFamily: "var(--font-mono)", fontSize: "0.62rem", fontWeight: 700,
                          letterSpacing: "0.06em", textTransform: "uppercase",
                          color: selectedTab === tab.id ? GOLD_BRIGHT : "var(--text-muted)",
                          cursor: "pointer", transition: "all 0.18s ease",
                          whiteSpace: "nowrap",
                          boxShadow: selectedTab === tab.id ? `0 0 10px rgba(212,175,55,0.25)` : "none",
                        }}
                      >
                        {lang === "tr" ? tab.tr : tab.en}
                      </button>
                    ))}
                  </div>

                  {/* Search + Sort */}
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginLeft: "auto" }}>
                    <div style={{ position: "relative" }}>
                      <Search style={{ position: "absolute", left: 9, top: "50%", transform: "translateY(-50%)", width: 12, height: 12, color: "var(--text-muted)" }} />
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={e => setSearchQuery(e.target.value)}
                        placeholder={lang === "tr" ? "Tesis veya ülke ara..." : "Search facility or country..."}
                        style={{
                          borderRadius: 9999, border: `1px solid ${GOLD_BORDER}`,
                          background: "rgba(0,0,0,0.4)", paddingLeft: 28, paddingRight: 10,
                          paddingTop: 5, paddingBottom: 5,
                          fontFamily: "var(--font-mono)", fontSize: "0.65rem", color: "var(--text-main)",
                          width: 180, outline: "none",
                        }}
                      />
                    </div>

                    <select
                      value={sortBy}
                      onChange={e => setSortBy(e.target.value as any)}
                      style={{
                        borderRadius: 9999, border: `1px solid ${GOLD_BORDER}`,
                        background: "rgba(0,0,0,0.5)", padding: "5px 10px",
                        fontFamily: "var(--font-mono)", fontSize: "0.65rem",
                        color: "var(--text-muted)", outline: "none", cursor: "pointer",
                      }}
                    >
                      <option value="capacity" style={{ background: "#0a0b12" }}>
                        {lang === "tr" ? "En Yüksek Kapasite" : "Highest Capacity"}
                      </option>
                      <option value="name" style={{ background: "#0a0b12" }}>
                        {lang === "tr" ? "Ada Göre (A-Z)" : "Name (A–Z)"}
                      </option>
                      <option value="country" style={{ background: "#0a0b12" }}>
                        {lang === "tr" ? "Ülkeye Göre" : "By Country"}
                      </option>
                    </select>
                  </div>
                </div>

                {/* Facility Cards Grid */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(230px, 1fr))", gap: 10 }}>
                  {deckAssets.slice(0, displayCount).map(asset => (
                    <div
                      key={asset.id}
                      onClick={() => setSelectedAsset(asset)}
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
        </div>

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
      />

      {/* Spin animation for loader */}
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
