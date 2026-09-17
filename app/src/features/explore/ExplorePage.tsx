"use client";

import React, { Suspense, useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GlobeCanvas, REAL_LOCATIONS, HotspotLocation } from "@/components/globe/GlobeCanvas";
import { AssetDetailPanel } from "@/components/ui/AssetDetailPanel";
import {
  Activity, MapPin, TrendingUp, Sparkles, ChevronUp, ChevronDown,
  Layers, Search, Filter, ArrowUpRight, Zap, Droplets, Server, Plane,
  Database, RefreshCw, BarChart2
} from "lucide-react";

interface ExplorePageProps {
  lang?: "tr" | "en";
  activeNav?: string;
}

export default function ExplorePage({ lang = "tr", activeNav = "explore" }: ExplorePageProps) {
  const [selectedAsset, setSelectedAsset] = useState<HotspotLocation | null>(null);
  const [dockExpanded, setDockExpanded] = useState(false);
  const [locations, setLocations] = useState<HotspotLocation[]>(REAL_LOCATIONS);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTab, setSelectedTab] = useState<"all" | "elektrik" | "datacenter" | "su" | "ulasim">("all");
  const [sortBy, setSortBy] = useState<"capacity" | "name" | "country">("capacity");

  // Fetch 3,160+ real facilities on mount directly from local verified dataset
  useEffect(() => {
    let isMounted = true;
    async function loadData() {
      try {
        const res = await fetch("/data/facilities.json");
        if (!res.ok || !isMounted) return;
        const data: HotspotLocation[] = await res.json();
        if (data.length > 0 && isMounted) {
          setLocations(data);
        }
      } catch (err) {
        console.error("Facilities load error:", err);
      }
    }
    loadData();
    return () => { isMounted = false; };
  }, []);

  // Category filter from sidebar or dock tab
  const activeCategory = useMemo(() => {
    if (activeNav === "energy") return "elektrik";
    if (activeNav === "water") return "su";
    if (activeNav === "transport") return "ulasim";
    if (activeNav === "datacenters") return "datacenter";
    return selectedTab;
  }, [activeNav, selectedTab]);

  // Filtered assets on globe
  const globeAssets = useMemo(() => {
    if (activeCategory === "all") return locations;
    return locations.filter((a) => a.category === activeCategory);
  }, [locations, activeCategory]);

  // Filtered & searched assets for the bottom deck list
  const deckAssets = useMemo(() => {
    let list = globeAssets;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (a) =>
          a.name.toLowerCase().includes(q) ||
          a.country.toLowerCase().includes(q) ||
          a.type.toLowerCase().includes(q)
      );
    }

    if (sortBy === "capacity") {
      list = [...list].sort((a, b) => {
        const numA = parseInt(a.capacity.replace(/[^0-9]/g, "")) || 0;
        const numB = parseInt(b.capacity.replace(/[^0-9]/g, "")) || 0;
        return numB - numA;
      });
    } else if (sortBy === "name") {
      list = [...list].sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === "country") {
      list = [...list].sort((a, b) => a.country.localeCompare(b.country));
    }

    return list;
  }, [globeAssets, searchQuery, sortBy]);

  // Aggregate stats
  const totalMW = useMemo(() => {
    return locations
      .filter((a) => a.category === "elektrik")
      .reduce((sum, a) => sum + (parseInt(a.capacity.replace(/[^0-9]/g, "")) || 0), 0);
  }, [locations]);

  const totalDC = useMemo(() => {
    return locations.filter((a) => a.category === "datacenter").length;
  }, [locations]);

  const totalWater = useMemo(() => {
    return locations.filter((a) => a.category === "su").length;
  }, [locations]);

  return (
    <div className="relative h-full w-full overflow-hidden bg-[#090a0e] select-none">

      {/* 100% Full-Screen Photorealistic NASA 3D Earth Globe */}
      <Suspense
        fallback={
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#090a0e] z-10">
            <div className="h-12 w-12 rounded-full border-2 border-cyan-400 border-t-transparent animate-spin mb-3" />
            <span className="font-mono text-xs text-[#dad3c1] tracking-wider uppercase">
              NASA 3D Küre Yükleniyor...
            </span>
          </div>
        }
      >
        <GlobeCanvas
          locations={globeAssets}
          activeFilter={activeCategory}
          selectedAsset={selectedAsset}
          onSelectAsset={(loc) => setSelectedAsset(loc)}
          lang={lang}
        />
      </Suspense>

      {/* Radial Vignette Overlay */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(9,10,14,0.7)_100%)]" />

      {/* Top Floating Telemetry & Category Badge */}
      <div className="absolute top-4 left-5 right-5 z-10 pointer-events-auto flex items-center justify-between gap-4">
        {/* Active Layer Capsule */}
        <motion.div
          key={activeNav}
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-3 rounded-2xl border border-[#faebd7]/20 bg-[#12141c]/90 px-4 py-2 backdrop-blur-2xl shadow-2xl"
        >
          <div className="flex h-7 w-7 items-center justify-center rounded-xl bg-cyan-950/60 text-cyan-400 border border-cyan-500/30">
            <Layers className="h-3.5 w-3.5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xs font-black tracking-tight text-[#fcf8ee] uppercase font-mono">
                {activeNav === "explore" && "NASA 3D Küresel Radar"}
                {activeNav === "dashboard" && "Altyapı Telemetri Paneli"}
                {activeNav === "energy" && "Küresel Elektrik Santralleri"}
                {activeNav === "water" && "Tatlı Su & Baraj Sistemleri"}
                {activeNav === "transport" && "Ulaşım & Lojistik Ağları"}
                {activeNav === "datacenters" && "Yapay Zeka Veri Merkezleri"}
              </h1>
              <span className="rounded-full bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 px-2 py-0.2 font-mono text-[9.5px] font-bold">
                {globeAssets.length.toLocaleString()} Tesis Canlı
              </span>
            </div>
            <p className="text-[9.5px] text-[#dad3c1]">
              Dünyayı 3D döndürün • Tesis noktalarını seçerek telemetriyi inceleyin
            </p>
          </div>
        </motion.div>

        {/* Live Quick Counters */}
        <div className="hidden lg:flex items-center gap-3 rounded-2xl border border-white/[0.08] bg-[#12141c]/90 px-4 py-2 backdrop-blur-2xl shadow-xl text-xs font-mono">
          <div className="flex items-center gap-1.5">
            <Zap className="h-3.5 w-3.5 text-amber-400" />
            <span className="text-[#858a96]">GÜÇ:</span>
            <span className="text-[#fcf8ee] font-bold">{(totalMW / 1000).toFixed(0)}k MW</span>
          </div>
          <div className="h-3 w-px bg-white/10" />
          <div className="flex items-center gap-1.5">
            <Server className="h-3.5 w-3.5 text-emerald-400" />
            <span className="text-[#858a96]">AI DC:</span>
            <span className="text-[#fcf8ee] font-bold">{totalDC} Kampüs</span>
          </div>
          <div className="h-3 w-px bg-white/10" />
          <div className="flex items-center gap-1.5">
            <Droplets className="h-3.5 w-3.5 text-cyan-400" />
            <span className="text-[#858a96]">SU:</span>
            <span className="text-[#fcf8ee] font-bold">{totalWater} Havza</span>
          </div>
        </div>
      </div>

      {/* ── HIGH-UTILITY INTERACTIVE BOTTOM TELEMETRY DOCK ──────────────── */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 pointer-events-auto w-full max-w-4xl px-4">
        <div className="rounded-2xl border border-[#faebd7]/20 bg-[#12141c]/95 backdrop-blur-3xl shadow-2xl overflow-hidden transition-all duration-300">
          
          {/* Header Bar of the Dock */}
          <div
            onClick={() => setDockExpanded(!dockExpanded)}
            className="flex items-center justify-between px-5 py-3 cursor-pointer hover:bg-white/[0.03] transition-colors border-b border-white/[0.06]"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-cyan-950 text-cyan-400 border border-cyan-500/30">
                <Activity className="h-3.5 w-3.5 animate-pulse" />
              </div>
              <div>
                <h3 className="text-xs font-black text-[#fcf8ee] uppercase tracking-wider font-mono flex items-center gap-2">
                  <span>KÜRESEL TELEMETRİ GÜVERTESİ</span>
                  <span className="rounded-full bg-emerald-500/15 border border-emerald-500/30 px-2 py-0.2 text-[9px] text-emerald-400">
                    {locations.length.toLocaleString()} Tesis
                  </span>
                </h3>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-[10px] font-mono font-bold text-[#dad3c1] uppercase tracking-wider">
                {dockExpanded ? "Güverteyi Kapat" : "Detaylı Telemetriyi Aç"}
              </span>
              <div className="flex h-5 w-5 items-center justify-center rounded-lg bg-slate-900 border border-white/10 text-slate-300">
                {dockExpanded ? <ChevronDown className="h-3.5 w-3.5" /> : <ChevronUp className="h-3.5 w-3.5" />}
              </div>
            </div>
          </div>

          {/* Expanded Rich Telemetry Center */}
          <AnimatePresence>
            {dockExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.28 }}
                className="p-5 space-y-4 max-h-[360px] overflow-y-auto scrollbar-thin"
              >
                {/* Controls Bar: Category Tabs + Search + Sort */}
                <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-white/[0.06]">
                  {/* Category Pills */}
                  <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none py-1">
                    {[
                      { id: "all", label: "Tümü (3,160)", icon: GlobeCanvas },
                      { id: "elektrik", label: "Santraller", icon: Zap },
                      { id: "datacenter", label: "AI Veri Merkezleri", icon: Server },
                      { id: "su", label: "Su & Baraj", icon: Droplets },
                      { id: "ulasim", label: "Ulaşım Hub", icon: Plane },
                    ].map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => setSelectedTab(tab.id as any)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                          selectedTab === tab.id
                            ? "bg-[#faebd7] text-slate-950 shadow-md font-black"
                            : "bg-white/[0.04] text-[#dad3c1] hover:bg-white/[0.08] hover:text-white"
                        }`}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>

                  {/* Search Input & Sort Selector */}
                  <div className="flex items-center gap-2 ml-auto">
                    <div className="relative">
                      <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Tesis veya ülke ara..."
                        className="rounded-xl border border-white/[0.12] bg-[#090a0e] pl-8 pr-3 py-1.5 text-xs text-[#fcf8ee] placeholder:text-[#858a96] focus:border-cyan-400 focus:outline-none w-48 transition-all"
                      />
                    </div>

                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value as any)}
                      className="rounded-xl border border-white/[0.12] bg-[#090a0e] px-2.5 py-1.5 text-xs text-[#dad3c1] focus:outline-none"
                    >
                      <option value="capacity">En Yüksek Kapasite</option>
                      <option value="name">Ada Göre (A-Z)</option>
                      <option value="country">Ülkeye Göre</option>
                    </select>
                  </div>
                </div>

                {/* Facility Cards Grid (Responsive, Highly Informative) */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {deckAssets.slice(0, 30).map((asset) => (
                    <div
                      key={asset.id}
                      onClick={() => setSelectedAsset(asset)}
                      className="group cursor-pointer rounded-xl border border-white/[0.08] bg-[#0e1017] p-3 hover:border-cyan-400/50 hover:bg-[#151822] transition-all shadow-md relative overflow-hidden"
                    >
                      <div className="flex items-start justify-between gap-2 mb-1.5">
                        <div className="flex items-center gap-1.5 min-w-0">
                          <span className="text-base">{asset.flagEmoji}</span>
                          <h4 className="text-xs font-bold text-[#fcf8ee] truncate font-sans group-hover:text-cyan-300 transition-colors">
                            {asset.name}
                          </h4>
                        </div>
                        <ArrowUpRight className="h-3.5 w-3.5 text-slate-500 group-hover:text-cyan-400 transition-colors shrink-0" />
                      </div>

                      <div className="flex items-center justify-between text-[10.5px] text-[#dad3c1] mb-2 font-mono">
                        <span className="text-[#858a96] truncate">{asset.type}</span>
                        <span className="font-bold text-amber-300 shrink-0 ml-1">{asset.capacity}</span>
                      </div>

                      <div className="flex items-center justify-between text-[9.5px] pt-2 border-t border-white/[0.05] text-[#858a96]">
                        <span className="truncate">{asset.country}</span>
                        <span className="text-cyan-400 font-mono">Telemetriyi İncele →</span>
                      </div>
                    </div>
                  ))}
                </div>

                {deckAssets.length === 0 && (
                  <div className="py-8 text-center text-xs text-[#858a96]">
                    Aramanızla eşleşen altyapı tesisi bulunamadı.
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </div>

      {/* Asset Detail Inspector Panel */}
      <AssetDetailPanel
        asset={selectedAsset}
        onClose={() => setSelectedAsset(null)}
      />

    </div>
  );
}
