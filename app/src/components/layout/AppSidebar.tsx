"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Globe, Zap, Truck, Server,
  Sliders, ChevronLeft, ChevronRight,
  LayoutDashboard, Droplets, Search,
  ShieldCheck, ArrowUpRight
} from "lucide-react";
import { CommandPalette } from "@/components/ui/CommandPalette";
import { SettingsModal } from "@/components/ui/SettingsModal";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavItem {
  id: string;
  labelTr: string;
  labelEn: string;
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  badge?: string;
  badgeType?: "gold" | "emerald" | "amber";
  group: "radar" | "layers";
}

const NAV_ITEMS: NavItem[] = [
  { id: "explore",     labelTr: "3D Küresel Radar",    labelEn: "3D Global Radar",     icon: Globe,           group: "radar",  badge: "3.1K",  badgeType: "gold" },
  { id: "dashboard",   labelTr: "Telemetri Paneli",    labelEn: "Telemetry Deck",      icon: LayoutDashboard, group: "radar" },
  { id: "energy",      labelTr: "Elektrik Şebekesi",   labelEn: "Power Grid",          icon: Zap,             group: "layers", badge: "CANLI", badgeType: "emerald" },
  { id: "water",       labelTr: "Su & Baraj Ağları",   labelEn: "Water & Reservoirs",  icon: Droplets,        group: "layers" },
  { id: "transport",   labelTr: "Ulaşım & Lojistik",   labelEn: "Transport Hubs",      icon: Truck,           group: "layers" },
  { id: "datacenters", labelTr: "AI Veri Merkezleri",  labelEn: "AI Data Centers",     icon: Server,          group: "layers", badge: "AI DC", badgeType: "gold" },
];

const GROUPS = [
  { key: "radar",  labelTr: "KÜRESEL RADAR",      labelEn: "GLOBAL RADAR" },
  { key: "layers", labelTr: "ALTYAPI KATMANLARI", labelEn: "INFRASTRUCTURE" },
];

interface AppSidebarProps {
  activeNav: string;
  setActiveNav: (id: string) => void;
  lang: "tr" | "en";
}

const GOLD = "var(--gold-primary)";
const GOLD_BRIGHT = "var(--gold-bright)";
const GOLD_BORDER = "var(--gold-border)";

export function AppSidebar({ activeNav, setActiveNav, lang }: AppSidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const pathname = usePathname();

  const triggerSearch = () => {
    const btn = document.getElementById("command-palette-trigger");
    if (btn) btn.click();
  };

  const getBadgeStyle = (type?: string) => {
    if (type === "emerald") {
      return {
        background: "rgba(16,185,129,0.12)",
        border: "1px solid rgba(16,185,129,0.35)",
        color: "#34d399",
      };
    }
    return {
      background: "rgba(212,175,55,0.12)",
      border: `1px solid ${GOLD_BORDER}`,
      color: GOLD_BRIGHT,
    };
  };

  return (
    <>
      <motion.aside
        animate={{ width: collapsed ? 64 : 246 }}
        transition={{ type: "spring", stiffness: 380, damping: 34 }}
        style={{
          position: "relative",
          display: "flex",
          height: "100%",
          flexDirection: "column",
          flexShrink: 0,
          overflow: "visible", // let the toggle button pop out clearly
          zIndex: 30,
          userSelect: "none",
          background: "rgba(6, 7, 12, 0.06)",
          backdropFilter: "blur(2px)",
          WebkitBackdropFilter: "blur(2px)",
          borderRight: "1px solid rgba(212, 175, 55, 0.18)",
          boxShadow: "none",
        }}
      >
        {/* ── Brand Header ────────────────────────────────────────────── */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            height: 56,
            flexShrink: 0,
            padding: "0 12px",
            overflow: "hidden",
            borderBottom: "1px solid rgba(212, 175, 55, 0.15)",
            background: "transparent",
          }}
        >
          {collapsed ? (
            <button
              onClick={() => setCollapsed(false)}
              style={{
                margin: "0 auto",
                cursor: "pointer",
                background: "transparent",
                border: "none",
                padding: "4px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              title={lang === "tr" ? "Menüyü Genişlet" : "Expand Menu"}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="26" height="26" style={{ filter: "drop-shadow(0 0 8px rgba(212,175,55,0.6))" }}>
                <defs>
                  <linearGradient id="sbMiniGold" x1="15%" y1="90%" x2="85%" y2="15%">
                    <stop offset="0%" stopColor="#D4AF37" /><stop offset="50%" stopColor="#FAEED9" /><stop offset="100%" stopColor="#D4AF37" />
                  </linearGradient>
                </defs>
                <g transform="translate(256,256) scale(1.65) translate(-285,-260)">
                  <path d="M 228 175 L 272 175 L 272 305 C 272 320 258 338 242 344 C 230 348 214 340 216 328 L 228 300 Z" fill="url(#sbMiniGold)" />
                  <path d="M 272 175 C 325 175 395 210 395 258 C 395 308 325 348 242 344 C 278 335 348 305 348 258 C 348 212 295 185 272 175 Z" fill="url(#sbMiniGold)" opacity="0.85" />
                </g>
              </svg>
            </button>
          ) : (
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" width="24" height="24" style={{ filter: "drop-shadow(0 0 8px rgba(212,175,55,0.6))", flexShrink: 0 }}>
                  <defs>
                    <linearGradient id="sbNovaGold" x1="10%" y1="90%" x2="90%" y2="10%">
                      <stop offset="0%" stopColor="#8C6D23" /><stop offset="50%" stopColor="#FAEED9" /><stop offset="100%" stopColor="#D4AF37" />
                    </linearGradient>
                  </defs>
                  <circle cx="64" cy="64" r="48" stroke="#D4AF37" strokeWidth="2" strokeDasharray="6 4" opacity="0.4" />
                  <path d="M 64 18 Q 64 64 110 64 Q 64 64 64 110 Q 64 64 18 64 Q 64 64 64 18 Z" fill="url(#sbNovaGold)" />
                  <circle cx="64" cy="64" r="9" fill="#07080e" stroke="#FAEED9" strokeWidth="2" />
                  <circle cx="64" cy="64" r="4" fill="#FFFFFF" />
                </svg>
                <span style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "0.88rem",
                  fontWeight: 900,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  background: "linear-gradient(135deg, #ffffff 0%, #faeed9 30%, #f5d77f 60%, #d4af37 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}>
                  Dona Nova
                </span>
              </div>

              {/* Live indicator chip */}
              <div style={{
                display: "flex",
                alignItems: "center",
                gap: 4,
                padding: "2px 6px",
                borderRadius: 9999,
                background: "rgba(16,185,129,0.08)",
                border: "1px solid rgba(16,185,129,0.3)",
              }}>
                <span style={{
                  width: 5,
                  height: 5,
                  borderRadius: "50%",
                  background: "#34d399",
                  boxShadow: "0 0 6px #34d399",
                  animation: "dn-pulse-glow 2s infinite",
                  flexShrink: 0,
                }} />
                <span style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.54rem",
                  fontWeight: 700,
                  letterSpacing: "0.08em",
                  color: "#34d399",
                }}>
                  v1.0
                </span>
              </div>
            </div>
          )}
        </div>

        {/* ── Search & Navigation Area ─────────────────────────────────── */}
        <nav style={{
          flex: 1,
          overflowY: "auto",
          padding: "10px 6px",
          display: "flex",
          flexDirection: "column",
          gap: 12,
        }}>
          {/* Quick Search Button */}
          <button
            onClick={triggerSearch}
            style={{
              display: "flex",
              width: "100%",
              alignItems: "center",
              borderRadius: 8,
              border: "1px solid rgba(212,175,55,0.2)",
              background: "transparent",
              padding: "6px 8px",
              fontSize: "0.72rem",
              fontWeight: 500,
              color: "rgba(210,205,195,0.75)",
              cursor: "pointer",
              transition: "all 0.2s ease",
              justifyContent: collapsed ? "center" : "flex-start",
              gap: collapsed ? 0 : 8,
            }}
            title={collapsed ? (lang === "tr" ? "Hızlı Arama (⌘K)" : "Search (⌘K)") : undefined}
          >
            <Search style={{ width: 12, height: 12, flexShrink: 0, color: GOLD }} />
            {!collapsed && (
              <span style={{ flex: 1, textAlign: "left", fontFamily: "var(--font-sans)", color: "var(--text-muted)", fontSize: "0.72rem" }}>
                {lang === "tr" ? "Tesis veya Düğüm..." : "Search Node..."}
              </span>
            )}
            {!collapsed && (
              <span style={{
                borderRadius: 4,
                border: "1px solid rgba(212,175,55,0.25)",
                background: "transparent",
                padding: "1px 4px",
                fontFamily: "var(--font-mono)",
                fontSize: "0.54rem",
                color: "var(--text-muted)",
                flexShrink: 0,
              }}>⌘K</span>
            )}
          </button>

          {/* Hidden CommandPalette modal anchor */}
          <div style={{ display: "none" }}>
            <CommandPalette />
          </div>

          {/* Core Navigation Groups */}
          {GROUPS.map(({ key, labelTr, labelEn }) => {
            const items = NAV_ITEMS.filter(i => i.group === key);
            return (
              <div key={key} style={{ display: "flex", flexDirection: "column", gap: 3 }}>
                {!collapsed && (
                  <p style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.54rem",
                    fontWeight: 700,
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    color: "rgba(163,155,141,0.5)",
                    padding: "0 6px 2px 6px",
                    margin: 0,
                  }}>
                    {lang === "tr" ? labelTr : labelEn}
                  </p>
                )}

                {items.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeNav === item.id;

                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveNav(item.id)}
                      style={{
                        position: "relative",
                        display: "flex",
                        width: "100%",
                        alignItems: "center",
                        borderRadius: 8,
                        padding: "7px 8px",
                        fontSize: "0.75rem",
                        cursor: "pointer",
                        transition: "all 0.18s cubic-bezier(0.16,1,0.3,1)",
                        justifyContent: collapsed ? "center" : "flex-start",
                        gap: collapsed ? 0 : 8,
                        border: isActive ? "1px solid rgba(212,175,55,0.35)" : "1px solid transparent",
                        background: "transparent",
                        color: isActive ? "var(--text-main)" : "var(--text-muted)",
                        boxShadow: "none",
                      }}
                      title={collapsed ? (lang === "tr" ? item.labelTr : item.labelEn) : undefined}
                    >
                      {/* Active gold left indicator bar */}
                      {isActive && (
                        <span style={{
                          position: "absolute",
                          left: 0,
                          top: "50%",
                          transform: "translateY(-50%)",
                          width: 3,
                          height: 16,
                          borderRadius: "0 3px 3px 0",
                          background: GOLD,
                          boxShadow: `0 0 8px ${GOLD}`,
                        }} />
                      )}

                      <Icon style={{
                        width: 14,
                        height: 14,
                        flexShrink: 0,
                        color: isActive ? GOLD : "rgba(163,155,141,0.7)",
                        transition: "color 0.2s ease",
                      }} />

                      {!collapsed && (
                        <span style={{
                          flex: 1,
                          textAlign: "left",
                          fontFamily: "var(--font-sans)",
                          fontWeight: isActive ? 700 : 500,
                          fontSize: "0.75rem",
                          overflow: "hidden",
                          whiteSpace: "nowrap",
                          textOverflow: "ellipsis",
                          color: isActive ? "var(--text-main)" : "var(--text-muted)",
                        }}>
                          {lang === "tr" ? item.labelTr : item.labelEn}
                        </span>
                      )}

                      {item.badge && !collapsed && (
                        <span style={{
                          borderRadius: 4,
                          border: item.badgeType === "emerald" ? "1px solid rgba(16,185,129,0.4)" : "1px solid rgba(212,175,55,0.3)",
                          background: "transparent",
                          color: item.badgeType === "emerald" ? "#34d399" : GOLD_BRIGHT,
                          padding: "1px 4px",
                          fontFamily: "var(--font-mono)",
                          fontSize: "0.54rem",
                          fontWeight: 700,
                          letterSpacing: "0.06em",
                          flexShrink: 0,
                          marginLeft: "auto",
                        }}>
                          {item.badge === "CANLI" ? (lang === "tr" ? "CANLI" : "LIVE") : item.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            );
          })}
        </nav>

        {/* ── Sleek Architectural Footer ───────────────────────────────── */}
        <div style={{
          flexShrink: 0,
          padding: "8px",
          borderTop: "1px solid rgba(212, 175, 55, 0.15)",
          background: "transparent",
          display: "flex",
          flexDirection: "column",
          gap: 6,
        }}>
          {/* Radar Preferences Button */}
          <button
            onClick={() => setIsSettingsOpen(true)}
            style={{
              display: "flex",
              width: "100%",
              alignItems: "center",
              borderRadius: 8,
              padding: "6px 8px",
              fontSize: "0.72rem",
              fontWeight: 600,
              color: "var(--text-muted)",
              cursor: "pointer",
              transition: "all 0.2s ease",
              justifyContent: collapsed ? "center" : "flex-start",
              gap: collapsed ? 0 : 8,
              background: "transparent",
              border: "1px solid rgba(212,175,55,0.2)",
            }}
            title={collapsed ? (lang === "tr" ? "Radar Tercihleri" : "Radar Preferences") : undefined}
          >
            <Sliders style={{ width: 12, height: 12, flexShrink: 0, color: GOLD }} />
            {!collapsed && (
              <span style={{ fontFamily: "var(--font-sans)", fontWeight: 600, color: "var(--text-main)", fontSize: "0.72rem" }}>
                {lang === "tr" ? "Radar Tercihleri" : "Radar Preferences"}
              </span>
            )}
          </button>

          {/* Star on GitHub link in sidebar */}
          {!collapsed ? (
            <a
              href="https://github.com/dobby-aidev/dona-nova-showcase"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "6px 8px",
                borderRadius: 8,
                border: "1px solid rgba(212,175,55,0.3)",
                background: "rgba(212,175,55,0.06)",
                textDecoration: "none",
                transition: "all 0.2s ease",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <span style={{ fontSize: "0.75rem", color: "#FFE082" }}>⭐</span>
                <span style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.62rem",
                  fontWeight: 700,
                  color: "var(--gold-bright)",
                }}>
                  {lang === "tr" ? "GitHub'da Yıldız Ver" : "Star on GitHub"}
                </span>
              </div>
              <ArrowUpRight style={{ width: 11, height: 11, color: GOLD }} />
            </a>
          ) : (
            <a
              href="https://github.com/dobby-aidev/dona-nova-showcase"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "6px",
                borderRadius: 8,
                border: "1px solid rgba(212,175,55,0.3)",
                background: "rgba(212,175,55,0.06)",
                textDecoration: "none",
              }}
              title={lang === "tr" ? "GitHub'da Yıldız Ver ⭐" : "Star on GitHub ⭐"}
            >
              <span style={{ fontSize: "0.75rem" }}>⭐</span>
            </a>
          )}

          {/* Single clean link to Open Data & Transparency */}
          {!collapsed ? (
            <Link
              href="/data-sources"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "6px 8px",
                borderRadius: 8,
                border: "1px solid rgba(212,175,55,0.2)",
                background: "transparent",
                textDecoration: "none",
                transition: "all 0.2s ease",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                <ShieldCheck style={{ width: 12, height: 12, color: "#34d399" }} />
                <span style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.58rem",
                  fontWeight: 700,
                  letterSpacing: "0.06em",
                  color: "var(--text-muted)",
                  textTransform: "uppercase",
                }}>
                  {lang === "tr" ? "Açık Veri & Şeffaflık" : "Open Data"}
                </span>
              </div>
              <ArrowUpRight style={{ width: 10, height: 10, color: GOLD }} />
            </Link>
          ) : (
            <Link
              href="/data-sources"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "6px",
                borderRadius: 8,
                border: "1px solid rgba(212,175,55,0.2)",
                background: "transparent",
                textDecoration: "none",
              }}
              title={lang === "tr" ? "Açık Veri & Şeffaflık" : "Open Data"}
            >
              <ShieldCheck style={{ width: 12, height: 12, color: "#34d399" }} />
            </Link>
          )}
        </div>

        {/* ── ENHANCED COLLAPSE TOGGLE BUTTON (Bigger, perfectly clickable, prominent) ── */}
        <button
          onClick={() => setCollapsed(c => !c)}
          style={{
            position: "absolute",
            right: -15,
            top: 68,
            zIndex: 45,
            display: "flex",
            width: 30,
            height: 30,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "50%",
            border: `1.5px solid var(--gold-primary)`,
            background: "rgba(10, 11, 18, 0.95)",
            backdropFilter: "blur(12px)",
            color: "var(--gold-bright)",
            boxShadow: `0 4px 18px rgba(0,0,0,0.9), 0 0 12px rgba(212,175,55,0.45)`,
            cursor: "pointer",
            transition: "all 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
          aria-label={collapsed ? "Menüyü Aç" : "Menüyü Kapat"}
          title={collapsed ? (lang === "tr" ? "Menüyü Aç" : "Expand Menu") : (lang === "tr" ? "Menüyü Kapat" : "Collapse Menu")}
        >
          {collapsed
            ? <ChevronRight style={{ width: 16, height: 16, color: "var(--gold-bright)", strokeWidth: 2.5 }} />
            : <ChevronLeft style={{ width: 16, height: 16, color: "var(--gold-bright)", strokeWidth: 2.5 }} />
          }
        </button>
      </motion.aside>

      {/* Radar Preferences Modal */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        lang={lang}
      />
    </>
  );
}
