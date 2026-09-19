"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Globe, Zap, Droplets, Truck, Server, Search, ChevronRight, ChevronLeft, Settings, ShieldCheck, ArrowUpRight } from "lucide-react";
import { useIsMobile } from "@/hooks/useIsMobile";
import Link from "next/link";

const GOLD = "var(--gold-primary)";
const GOLD_BRIGHT = "var(--gold-bright)";
const GOLD_BORDER = "var(--gold-border)";

interface AppHeaderProps {
  lang: "tr" | "en";
  setLang: (lang: "tr" | "en") => void;
  /** Mobile only: pass setActiveNav so hamburger can navigate */
  setActiveNav?: (id: string) => void;
  activeNav?: string;
}

interface DrawerNavItem {
  id: string;
  labelTr: string;
  labelEn: string;
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  badge?: string;
  badgeType?: "gold" | "emerald";
  group: "radar" | "layers";
}

const DRAWER_GROUPS = [
  { key: "radar",  labelTr: "KÜRESEL RADAR",      labelEn: "GLOBAL RADAR" },
  { key: "layers", labelTr: "ALTYAPI KATMANLARI", labelEn: "INFRASTRUCTURE" },
];

const DRAWER_ITEMS: DrawerNavItem[] = [
  { id: "explore",     labelTr: "3D Küresel Radar",   labelEn: "3D Global Radar",    icon: Globe,    group: "radar",  badge: "3.1K",  badgeType: "gold" },
  { id: "energy",      labelTr: "Elektrik Şebekesi",  labelEn: "Power Grid",         icon: Zap,      group: "layers", badge: "CANLI", badgeType: "emerald" },
  { id: "water",       labelTr: "Su & Baraj Ağları",  labelEn: "Water & Reservoirs", icon: Droplets, group: "layers" },
  { id: "transport",   labelTr: "Ulaşım & Lojistik",  labelEn: "Transport Hubs",     icon: Truck,    group: "layers" },
  { id: "datacenters", labelTr: "AI Veri Merkezleri", labelEn: "AI Data Centers",    icon: Server,   group: "layers", badge: "AI DC", badgeType: "gold" },
];

export function AppHeader({ lang, setLang, setActiveNav, activeNav }: AppHeaderProps) {
  const isMobile = useIsMobile();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  React.useEffect(() => {
    const handleToggle = (e: any) => {
      if (typeof e.detail?.collapsed === "boolean") {
        setSidebarCollapsed(e.detail.collapsed);
      }
    };
    window.addEventListener("dona:sidebar-toggle", handleToggle);
    return () => window.removeEventListener("dona:sidebar-toggle", handleToggle);
  }, []);

  const handleNavSelect = (id: string) => {
    setActiveNav?.(id);
    setDrawerOpen(false);
  };

  const handleSearchClick = () => {
    setDrawerOpen(false);
    window.dispatchEvent(new CustomEvent("dona:open-search"));
  };

  const handleLang = (l: "tr" | "en") => {
    setLang(l);
    try { localStorage.setItem("dona_lang", l); } catch {}
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("dona:lang-change", { detail: l }));
    }
  };

  return (
    <>
      <header
        id="app-header"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: isMobile ? 48 : 60,
          padding: isMobile ? "0 14px" : "0 2rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: "transparent",
          border: "none",
          pointerEvents: "none",
          zIndex: 40,
          boxSizing: "border-box",
        }}
      >
        {/* ── LEFT: GitHub Star button (Desktop Only — hides when sidebar is open, shows when collapsed) ── */}
        <div style={{ flex: "0 0 auto", minWidth: 0, pointerEvents: "auto" }}>
          {!isMobile && (
            <a
              id="star-github-btn"
              href="https://github.com/dobby-aidev/dona-nova-showcase"
              target="_blank"
              rel="noopener noreferrer"
              title="Star on GitHub ⭐"
              style={{
                display: "inline-flex", alignItems: "center", gap: "0.38rem",
                padding: "0.24rem 0.72rem", borderRadius: "9999px",
                border: "1px solid rgba(212,175,55,0.35)",
                background: "rgba(6,7,12,0.45)", backdropFilter: "none",
                WebkitBackdropFilter: "none",
                color: "var(--gold-bright)", fontFamily: "var(--font-mono)",
                fontSize: "0.64rem", fontWeight: 700, letterSpacing: "0.06em",
                textDecoration: "none", transition: "all 0.25s ease",
                boxShadow: "none",
                opacity: sidebarCollapsed ? 1 : 0,
                pointerEvents: sidebarCollapsed ? "auto" : "none",
                transform: sidebarCollapsed ? "translateX(0)" : "translateX(-15px)",
              }}
            >
              <span style={{ fontSize: "0.74rem", color: "#FFE082" }}>⭐</span>
              <span>{lang === "tr" ? "GitHub'da Yıldız Ver" : "Star on GitHub"}</span>
              <span style={{ color: "rgba(212,175,55,0.5)", fontSize: "0.66rem" }}>↗</span>
            </a>
          )}
        </div>



        {/* ── CENTER: Logo (Mathematically Dead-Centered in Full Screen) ── */}
        <div style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          pointerEvents: "auto",
        }}>
          <div
            className="brand-group"
            style={{ display: "inline-flex", alignItems: "center", gap: isMobile ? "0.5rem" : "0.75rem", cursor: "pointer" }}
            title="DONA NOVA"
          >
            <div style={{ width: isMobile ? 20 : 30, height: isMobile ? 20 : 30, flexShrink: 0 }}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="100%" height="100%">
                <defs>
                  <linearGradient id="hdrStarGold" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%"   stopColor="#FFFFFF" />
                    <stop offset="25%"  stopColor="#FFE082" />
                    <stop offset="60%"  stopColor="#F5D77F" />
                    <stop offset="85%"  stopColor="#D4AF37" />
                    <stop offset="100%" stopColor="#8C6D23" />
                  </linearGradient>
                </defs>
                <circle cx="16" cy="16" r="11" fill="none" stroke="#D4AF37" strokeWidth="1" opacity="0.55" />
                <path d="M16 7.5 L17.8 14.2 L24.5 16 L17.8 17.8 L16 24.5 L14.2 17.8 L7.5 16 L14.2 14.2 Z" fill="#D4AF37" opacity="0.85" />
                <path d="M16 2.5 Q16 16 29.5 16 Q16 16 16 29.5 Q16 16 2.5 16 Q16 16 16 2.5 Z" fill="url(#hdrStarGold)" />
                <circle cx="16" cy="16" r="3.2" fill="#07080e" stroke="#FFF" strokeWidth="0.8" />
                <circle cx="16" cy="16" r="1.8" fill="#FFFFFF" />
              </svg>
            </div>
            <span style={{
              fontFamily: "var(--font-display)",
              fontSize: isMobile ? "0.95rem" : "1.22rem",
              fontWeight: 900,
              letterSpacing: isMobile ? "0.18em" : "0.22em",
              textTransform: "uppercase",
              background: "linear-gradient(135deg, #ffffff 0%, #faeed9 30%, #f5d77f 60%, #d4af37 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              filter: "drop-shadow(0 2px 10px rgba(212,175,55,0.4))",
            }}>
              DONA NOVA
            </span>
          </div>
        </div>

        {/* ── RIGHT: Lang pill (Desktop Only) ── */}
        {!isMobile && (
          <div style={{ flex: "0 0 auto", display: "flex", alignItems: "center", gap: "12px", pointerEvents: "auto" }}>
            {/* Language Pill */}
            <div style={{
              display: "inline-flex", alignItems: "center",
              borderRadius: "9999px",
              border: "1px solid rgba(212,175,55,0.28)",
              background: "rgba(7,8,14,0.65)",
              backdropFilter: "none",
              WebkitBackdropFilter: "none",
              overflow: "hidden",
            }}>
              <button
                id="lang-btn-tr"
                onClick={() => handleLang("tr")}
                aria-label="Türkçe"
                style={{
                  background: lang === "tr" ? "var(--gold-primary)" : "transparent",
                  border: "none",
                  padding: "0.22rem 0.6rem",
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.62rem",
                  fontWeight: 800,
                  letterSpacing: "0.1em",
                  color: lang === "tr" ? "#07080e" : "rgba(212,175,55,0.7)",
                  cursor: "pointer",
                  transition: "all 0.18s ease",
                  WebkitTapHighlightColor: "transparent",
                }}
              >
                TR
              </button>
              <div style={{ width: 1, height: 14, background: "rgba(212,175,55,0.2)", flexShrink: 0 }} />
              <button
                id="lang-btn-en"
                onClick={() => handleLang("en")}
                aria-label="English"
                style={{
                  background: lang === "en" ? "var(--gold-primary)" : "transparent",
                  border: "none",
                  padding: "0.22rem 0.6rem",
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.62rem",
                  fontWeight: 800,
                  letterSpacing: "0.1em",
                  color: lang === "en" ? "#07080e" : "rgba(212,175,55,0.7)",
                  cursor: "pointer",
                  transition: "all 0.18s ease",
                  WebkitTapHighlightColor: "transparent",
                }}
              >
                EN
              </button>
            </div>
          </div>
        )}
      </header>

      {/* ── Mobile Left HUD Edge Tab (Outside header, exact viewport 50% vertical center) ── */}
      {isMobile && !drawerOpen && (
        <button
          id="mobile-menu-edge-tab"
          onClick={() => setDrawerOpen(true)}
          style={{
            position: "fixed",
            left: 0,
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
            pointerEvents: "auto",
            touchAction: "manipulation",
            WebkitTapHighlightColor: "transparent",
            transition: "all 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
          aria-label="Menüyü Aç"
          title={lang === "tr" ? "Menüyü Aç" : "Open Menu"}
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
            {lang === "tr" ? "MENÜ" : "MENU"}
          </span>
        </button>
      )}

      {/* ── MOBILE SIDE DRAWER (Web AppSidebar Architecture + Glassmorphic Transparency) ── */}
      <AnimatePresence>
        {isMobile && drawerOpen && (
          <>
            {/* Soft Translucent Backdrop */}
            <motion.div
              key="drawer-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setDrawerOpen(false)}
              style={{
                position: "fixed", inset: 0, zIndex: 65,
                background: "rgba(3, 4, 8, 0.35)",
                backdropFilter: "none",
                WebkitBackdropFilter: "none",
              }}
            />

            {/* Translucent Glass Drawer Panel (z:70 sits safely above MobileBottomNav z:52) */}
            <motion.div
              key="drawer-panel"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 380, damping: 34 }}
              style={{
                position: "fixed",
                top: 0, left: 0, bottom: 0,
                width: 275,
                maxHeight: "100dvh",
                zIndex: 70,
                background: "rgba(7, 8, 14, 0.72)",
                backdropFilter: "none",
                WebkitBackdropFilter: "none",
                borderRight: "1px solid rgba(212, 175, 55, 0.22)",
                boxShadow: "none",
                display: "flex",
                flexDirection: "column",
                paddingTop: "env(safe-area-inset-top, 0px)",
                overflow: "visible",
              }}
            >
              {/* Close Edge Tab sticking out of open mobile drawer (Exact symmetrical match to left HUD tab) */}
              <button
                onClick={() => setDrawerOpen(false)}
                style={{
                  position: "absolute",
                  right: -26,
                  top: "50%",
                  transform: "translateY(-50%)",
                  zIndex: 75,
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
                  touchAction: "manipulation",
                  WebkitTapHighlightColor: "transparent",
                }}
                aria-label="Menüyü Kapat"
                title={lang === "tr" ? "Menüyü Kapat" : "Close Menu"}
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
                  {lang === "tr" ? "KAPAT" : "CLOSE"}
                </span>
              </button>

              {/* Drawer Header — Brand & Close */}
              <div style={{
                height: 56,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "0 16px",
                borderBottom: "1px solid rgba(212, 175, 55, 0.15)",
                flexShrink: 0,
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" width="22" height="22" style={{ filter: "drop-shadow(0 0 6px rgba(212,175,55,0.6))" }}>
                    <defs>
                      <linearGradient id="drwNovaGold" x1="10%" y1="90%" x2="90%" y2="10%">
                        <stop offset="0%" stopColor="#8C6D23" /><stop offset="50%" stopColor="#FAEED9" /><stop offset="100%" stopColor="#D4AF37" />
                      </linearGradient>
                    </defs>
                    <circle cx="64" cy="64" r="48" stroke="#D4AF37" strokeWidth="2" strokeDasharray="6 4" opacity="0.4" />
                    <path d="M 64 18 Q 64 64 110 64 Q 64 64 64 110 Q 64 64 18 64 Q 64 64 64 18 Z" fill="url(#drwNovaGold)" />
                    <circle cx="64" cy="64" r="9" fill="#07080e" stroke="#FAEED9" strokeWidth="2" />
                    <circle cx="64" cy="64" r="4" fill="#FFFFFF" />
                  </svg>
                  <span style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "0.86rem",
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
                  <span style={{
                    display: "inline-flex", alignItems: "center", gap: 4,
                    padding: "2px 6px", borderRadius: 9999,
                    background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.3)",
                    fontFamily: "var(--font-mono)", fontSize: "0.52rem", color: "#34d399", fontWeight: 700,
                  }}>
                    <span style={{ width: 4, height: 4, borderRadius: "50%", background: "#34d399", boxShadow: "0 0 6px #34d399" }} />
                    v1.0
                  </span>
                </div>

                <button
                  onClick={() => setDrawerOpen(false)}
                  aria-label="Menüyü Kapat"
                  style={{
                    display: "flex", alignItems: "center", justifyContent: "center",
                    width: 32, height: 32, borderRadius: 8,
                    background: "rgba(212,175,55,0.08)", border: "1px solid rgba(212,175,55,0.2)",
                    color: "var(--text-muted)", cursor: "pointer", WebkitTapHighlightColor: "transparent",
                  }}
                >
                  <X style={{ width: 16, height: 16 }} />
                </button>
              </div>

              {/* Quick Search Button (Matches Desktop AppSidebar) */}
              <div style={{ padding: "12px 14px 4px 14px", flexShrink: 0 }}>
                <button
                  onClick={handleSearchClick}
                  style={{
                    display: "flex", width: "100%", alignItems: "center", gap: 8,
                    borderRadius: 8, border: "1px solid rgba(212,175,55,0.22)",
                    background: "rgba(10, 11, 18, 0.6)", padding: "7px 10px",
                    color: "var(--text-muted)", cursor: "pointer", WebkitTapHighlightColor: "transparent",
                  }}
                >
                  <Search style={{ width: 13, height: 13, color: "var(--gold-primary)", flexShrink: 0 }} />
                  <span style={{ flex: 1, textAlign: "left", fontFamily: "var(--font-sans)", fontSize: "0.74rem" }}>
                    {lang === "tr" ? "Tesis veya Düğüm Ara..." : "Search Node or Facility..."}
                  </span>
                  <span style={{
                    borderRadius: 4, border: "1px solid rgba(212,175,55,0.25)",
                    padding: "1px 5px", fontFamily: "var(--font-mono)", fontSize: "0.54rem", color: "var(--gold-bright)",
                  }}>⌘K</span>
                </button>
              </div>

              {/* Mobile Language Switcher (Clean, High-Touch Target Segment Pill inside drawer) */}
              <div style={{ padding: "4px 14px 4px 14px", flexShrink: 0 }}>
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  borderRadius: 8,
                  border: `1px solid ${GOLD_BORDER}`,
                  background: "rgba(10, 11, 18, 0.65)",
                  padding: 3,
                  gap: 4,
                }}>
                  <button
                    onClick={() => handleLang("tr")}
                    style={{
                      flex: 1,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 6,
                      padding: "8px 0",
                      borderRadius: 6,
                      border: "none",
                      background: lang === "tr" ? "var(--gold-primary)" : "transparent",
                      color: lang === "tr" ? "#07080e" : "rgba(212,175,55,0.75)",
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.66rem",
                      fontWeight: 800,
                      letterSpacing: "0.08em",
                      cursor: "pointer",
                      transition: "all 0.18s ease",
                      touchAction: "manipulation",
                      WebkitTapHighlightColor: "transparent",
                    }}
                  >
                    <span>🇹🇷</span>
                    <span>TR</span>
                  </button>
                  <button
                    onClick={() => handleLang("en")}
                    style={{
                      flex: 1,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 6,
                      padding: "8px 0",
                      borderRadius: 6,
                      border: "none",
                      background: lang === "en" ? "var(--gold-primary)" : "transparent",
                      color: lang === "en" ? "#07080e" : "rgba(212,175,55,0.75)",
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.66rem",
                      fontWeight: 800,
                      letterSpacing: "0.08em",
                      cursor: "pointer",
                      transition: "all 0.18s ease",
                      touchAction: "manipulation",
                      WebkitTapHighlightColor: "transparent",
                    }}
                  >
                    <span>🌐</span>
                    <span>EN</span>
                  </button>
                </div>
              </div>

              {/* Grouped Nav Items (Matches Web AppSidebar Architecture) */}
              <div style={{ flex: 1, overflowY: "auto", padding: "10px 10px 16px 10px", display: "flex", flexDirection: "column", gap: 14 }}>
                {DRAWER_GROUPS.map(({ key, labelTr, labelEn }) => {
                  const items = DRAWER_ITEMS.filter(i => i.group === key);
                  return (
                    <div key={key} style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                      <p style={{
                        fontFamily: "var(--font-mono)", fontSize: "0.54rem", fontWeight: 700,
                        letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(163,155,141,0.6)",
                        padding: "0 8px 2px 8px", margin: 0,
                      }}>
                        {lang === "tr" ? labelTr : labelEn}
                      </p>

                      {items.map((item) => {
                        const Icon = item.icon;
                        const isActive = activeNav === item.id;
                        const badgeColor = item.badgeType === "emerald" ? "#34d399" : "var(--gold-bright)";
                        const badgeBg = item.badgeType === "emerald" ? "rgba(16,185,129,0.12)" : "rgba(212,175,55,0.14)";
                        const badgeBorder = item.badgeType === "emerald" ? "rgba(16,185,129,0.3)" : "rgba(212,175,55,0.3)";

                        return (
                          <button
                            key={item.id}
                            id={`drawer-nav-${item.id}`}
                            onClick={() => handleNavSelect(item.id)}
                            style={{
                              position: "relative",
                              display: "flex",
                              alignItems: "center",
                              width: "100%",
                              borderRadius: 8,
                              padding: "9px 12px",
                              border: isActive ? "1px solid rgba(212,175,55,0.38)" : "1px solid transparent",
                              background: isActive ? "rgba(212,175,55,0.12)" : "transparent",
                              boxShadow: isActive ? "0 0 16px rgba(212,175,55,0.08)" : "none",
                              cursor: "pointer",
                              WebkitTapHighlightColor: "transparent",
                              transition: "all 0.18s ease",
                              textAlign: "left",
                              gap: 10,
                            }}
                          >
                            <Icon style={{
                              width: 16, height: 16, flexShrink: 0,
                              color: isActive ? "var(--gold-primary)" : "rgba(163,155,141,0.75)",
                              filter: isActive ? "drop-shadow(0 0 6px rgba(212,175,55,0.6))" : "none",
                            }} />

                            <span style={{
                              flex: 1,
                              fontFamily: "var(--font-sans)",
                              fontSize: "0.82rem",
                              fontWeight: isActive ? 700 : 500,
                              color: isActive ? "var(--text-main)" : "var(--text-muted)",
                              letterSpacing: "0.01em",
                            }}>
                              {lang === "tr" ? item.labelTr : item.labelEn}
                            </span>

                            {item.badge && (
                              <span style={{
                                borderRadius: 9999,
                                background: badgeBg,
                                border: `1px solid ${badgeBorder}`,
                                padding: "1px 6px",
                                fontFamily: "var(--font-mono)",
                                fontSize: "0.54rem",
                                fontWeight: 700,
                                letterSpacing: "0.06em",
                                color: badgeColor,
                                flexShrink: 0,
                              }}>
                                {item.badge}
                              </span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  );
                })}
              </div>

              {/* Drawer Footer (Matches Web AppSidebar) */}
              <div style={{
                padding: "10px 14px",
                borderTop: "1px solid rgba(212,175,55,0.12)",
                flexShrink: 0,
                background: "rgba(6, 7, 12, 0.4)",
                paddingBottom: "calc(14px + env(safe-area-inset-bottom, 0px))",
                display: "flex",
                flexDirection: "column",
                gap: 8,
              }}>
                {/* Settings Trigger Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setDrawerOpen(false);
                    setTimeout(() => {
                      window.dispatchEvent(new CustomEvent("dona:open-settings"));
                    }, 40);
                  }}
                  style={{
                    display: "flex", alignItems: "center", gap: 8,
                    borderRadius: 8, border: "1px solid rgba(212,175,55,0.25)",
                    background: "rgba(212,175,55,0.06)", padding: "8px 10px",
                    color: "var(--gold-bright)", cursor: "pointer",
                    fontFamily: "var(--font-mono)", fontSize: "0.62rem", fontWeight: 700,
                    letterSpacing: "0.06em",
                    touchAction: "manipulation",
                    WebkitTapHighlightColor: "transparent",
                  }}
                >
                  <Settings style={{ width: 13, height: 13, color: GOLD }} />
                  <span style={{ flex: 1, textAlign: "left" }}>{lang === "tr" ? "Ayarlar" : "Settings"}</span>
                  <span style={{ color: "rgba(212,175,55,0.5)", fontSize: "0.60rem" }}>⚙</span>
                </button>

                {/* Star on GitHub */}
                <a
                  href="https://github.com/dobby-aidev/dona-nova-showcase"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "flex", alignItems: "center", gap: 8,
                    borderRadius: 8, border: "1px solid rgba(212,175,55,0.20)",
                    background: "rgba(212,175,55,0.03)", padding: "7px 10px",
                    textDecoration: "none", color: "var(--text-muted)",
                    fontFamily: "var(--font-mono)", fontSize: "0.60rem", fontWeight: 600,
                    letterSpacing: "0.06em",
                    touchAction: "manipulation",
                    WebkitTapHighlightColor: "transparent",
                  }}
                >
                  <span style={{ fontSize: "0.72rem" }}>⭐</span>
                  <span style={{ flex: 1 }}>{lang === "tr" ? "GitHub'da Yıldız Ver" : "Star on GitHub"}</span>
                  <span style={{ color: "rgba(212,175,55,0.4)" }}>↗</span>
                </a>

                {/* Open Data & Transparency Button (Exact match to Settings button style, replaces Terms & Privacy) */}
                <Link
                  href="/data-sources"
                  onClick={() => setDrawerOpen(false)}
                  style={{
                    display: "flex", alignItems: "center", gap: 8,
                    borderRadius: 8, border: "1px solid rgba(212,175,55,0.22)",
                    background: "rgba(212,175,55,0.04)", padding: "8px 10px",
                    color: "var(--text-main)", textDecoration: "none",
                    fontFamily: "var(--font-mono)", fontSize: "0.62rem", fontWeight: 700,
                    letterSpacing: "0.06em",
                    touchAction: "manipulation",
                    WebkitTapHighlightColor: "transparent",
                    transition: "all 0.18s ease",
                  }}
                >
                  <ShieldCheck style={{ width: 13, height: 13, color: "#34d399", flexShrink: 0 }} />
                  <span style={{ flex: 1, textAlign: "left", textTransform: "uppercase", color: "var(--text-muted)" }}>
                    {lang === "tr" ? "Açık Veri & Şeffaflık" : "Open Data & Transparency"}
                  </span>
                  <ArrowUpRight style={{ width: 11, height: 11, color: GOLD, flexShrink: 0 }} />
                </Link>

                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", marginTop: 4 }}>
                  <span style={{
                    fontFamily: "var(--font-mono)", fontSize: "0.52rem",
                    color: "rgba(163,155,141,0.4)", letterSpacing: "0.06em",
                  }}>
                    © 2026 Dona Codex
                  </span>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
