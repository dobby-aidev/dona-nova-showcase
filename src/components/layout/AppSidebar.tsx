"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Globe, Zap, Truck, Server,
  Sliders, ChevronLeft, ChevronRight,
  LayoutDashboard, Droplets, Search,
  ShieldCheck, ArrowUpRight, Settings
} from "lucide-react";
import { CommandPalette } from "@/components/ui/CommandPalette";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useIsMobile } from "@/hooks/useIsMobile";

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
  { id: "explore",     labelTr: "3D Küresel Radar",    labelEn: "3D Global Radar",     icon: Globe,    group: "radar",  badge: "3.1K",  badgeType: "gold" },
  { id: "energy",      labelTr: "Elektrik Şebekesi",   labelEn: "Power Grid",          icon: Zap,      group: "layers", badge: "CANLI", badgeType: "emerald" },
  { id: "water",       labelTr: "Su & Baraj Ağları",   labelEn: "Water & Reservoirs",  icon: Droplets, group: "layers" },
  { id: "transport",   labelTr: "Ulaşım & Lojistik",   labelEn: "Transport Hubs",      icon: Truck,    group: "layers" },
  { id: "datacenters", labelTr: "AI Veri Merkezleri",  labelEn: "AI Data Centers",     icon: Server,   group: "layers", badge: "AI DC", badgeType: "gold" },
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
  const pathname = usePathname();
  const isMobile = useIsMobile();

  // Sidebar is replaced by hamburger drawer on mobile — render nothing
  if (isMobile) return null;

  const triggerSearch = () => {
    window.dispatchEvent(new CustomEvent("dona:open-search"));
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
        animate={{ width: collapsed ? 0 : 246 }}
        transition={{ type: "spring", stiffness: 380, damping: 34 }}
        style={{
          position: "relative",
          display: "flex",
          height: "100%",
          flexDirection: "column",
          flexShrink: 0,
          overflow: "visible", // let the toggle button pop out clearly
          zIndex: 50,
          userSelect: "none",
          background: collapsed ? "transparent" : "rgba(7, 8, 14, 0.72)",
          backdropFilter: "none",
          WebkitBackdropFilter: "none",
          borderRight: collapsed ? "none" : "1px solid rgba(212, 175, 55, 0.20)",
          boxShadow: "none",
        }}
      >
        {/* Inner Content Container — hides cleanly when collapsed */}
        <div
          style={{
            width: 246,
            minWidth: 246,
            height: "100%",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            opacity: collapsed ? 0 : 1,
            pointerEvents: collapsed ? "none" : "auto",
            transition: "opacity 0.18s ease",
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
            onClick={() => window.dispatchEvent(new CustomEvent("dona:open-settings"))}
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
            title={collapsed ? (lang === "tr" ? "Ayarlar" : "Settings") : undefined}
          >
            <Settings style={{ width: 12, height: 12, flexShrink: 0, color: GOLD }} />
            {!collapsed && (
              <span style={{ fontFamily: "var(--font-sans)", fontWeight: 600, color: "var(--text-main)", fontSize: "0.72rem" }}>
                {lang === "tr" ? "Ayarlar" : "Settings"}
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
      </div>

        {/* ── UNIFIED HUD EDGE TAB TOGGLE (Exact 26x96px symmetrical match to right Telemetry tab) ── */}
        <button
          onClick={() => {
            setCollapsed(c => {
              const next = !c;
              if (typeof window !== "undefined") {
                window.dispatchEvent(new CustomEvent("dona:sidebar-toggle", { detail: { collapsed: next } }));
              }
              return next;
            });
          }}
          style={{
            position: "absolute",
            right: -26,
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 45,
            display: "flex",
            flexDirection: "column",
            width: 26,
            height: 96,
            alignItems: "center",
            justifyContent: "center",
            gap: 6,
            borderRadius: "0 10px 10px 0",
            border: `1px solid ${GOLD_BORDER}`,
            borderLeft: "none",
            background: "rgba(7, 8, 14, 0.78)",
            backdropFilter: "none",
            WebkitBackdropFilter: "none",
            color: GOLD_BRIGHT,
            boxShadow: "none",
            cursor: "pointer",
            padding: "8px 0",
            transition: "all 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
          aria-label={collapsed ? "Menüyü Aç" : "Menüyü Kapat"}
          title={collapsed ? (lang === "tr" ? "Menüyü Genişlet" : "Expand Menu") : (lang === "tr" ? "Menüyü Daralt" : "Collapse Menu")}
        >
          {collapsed
            ? <ChevronRight style={{ width: 14, height: 14, color: GOLD, strokeWidth: 2.5 }} />
            : <ChevronLeft style={{ width: 14, height: 14, color: GOLD, strokeWidth: 2.5 }} />
          }
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
            {collapsed ? (lang === "tr" ? "MENÜ" : "MENU") : (lang === "tr" ? "KAPAT" : "CLOSE")}
          </span>
        </button>
      </motion.aside>
    </>
  );
}
